import json
import uuid
from typing import Dict, Any, List
from app.config import settings
from app.models.analysis import AnalysisRunResponse, DistrictRiskSummary
from app.models.infrastructure import AssetRiskAssessment, AlternativeFacility
from app.services.ingestion.ibtracs_adapter import load_fani_track, get_track_point_at_index
from app.services.gee.engine import gee_engine
from .hazard import compute_wind_hazard, compute_rainfall_hazard, compute_inundation_hazard, compute_composite_hazard
from .exposure import compute_asset_exposure
from .vulnerability import compute_asset_vulnerability

def run_risk_analysis(scenario_id: str = "fani_historical", inundation_scenario: str = "base", time_step_idx: int = 5) -> AnalysisRunResponse:
    """
    Executes the full transparent risk assessment:
    Hazard × Exposure × Vulnerability across coastal Odisha assets.
    """
    track = load_fani_track()
    current_point = get_track_point_at_index(track, time_step_idx)
    track_lat = current_point["lat"]
    track_lon = current_point["lon"]
    max_wind = current_point["wind_kmh"]

    # Load infrastructure features
    infra_file = settings.fixtures_path / "odisha_infrastructure.geojson"
    with open(infra_file, "r", encoding="utf-8") as f:
        infra_geojson = json.load(f)

    # Load inundation scenario polygons
    inundation_file = settings.fixtures_path / "inundation_scenarios.geojson"
    with open(inundation_file, "r", encoding="utf-8") as f:
        inundation_geojson = json.load(f)

    rain_data = gee_engine.get_rainfall_summary()
    w = settings.risk_weights

    assessed_assets: List[AssetRiskAssessment] = []
    district_scores: Dict[str, List[float]] = {"Puri": [], "Jagatsinghpur": [], "Khurda": []}

    for feat in infra_geojson.get("features", []):
        props = feat.get("properties", {})
        geom = feat.get("geometry", {})
        coords = geom.get("coordinates", [85.8, 19.8])
        # Handle LineString (roads) vs Point
        if geom.get("type") == "LineString":
            pt_lon, pt_lat = coords[0]
        else:
            pt_lon, pt_lat = coords[0], coords[1]

        district = props.get("district", "Puri").split(" ")[0].replace("/", "")

        # 1. Hazard
        wind_h = compute_wind_hazard(pt_lat, pt_lon, track_lat, track_lon, max_wind)
        rain_h = compute_rainfall_hazard(district, rain_data)
        surge_h = compute_inundation_hazard(props.get("elevation_m", 10.0), inundation_scenario)
        hazard_dict = compute_composite_hazard(wind_h, rain_h, surge_h)
        comp_hazard = hazard_dict["composite"]

        # 2. Exposure
        comp_exposure = compute_asset_exposure(props)

        # 3. Vulnerability
        comp_vuln = compute_asset_vulnerability(props)

        # 4. Total Composite Risk
        raw_risk = (
            w.w_hazard * comp_hazard +
            w.w_exposure * comp_exposure +
            w.w_vulnerability * comp_vuln
        )
        norm_risk = round(min(1.0, max(0.05, raw_risk)), 3)

        if district in district_scores:
            district_scores[district].append(norm_risk)

        # Road status & access analysis
        if norm_risk > 0.80 or (surge_h > 0.70 and props.get("elevation_m", 10.0) < 5.0):
            access_status = "HIGH_RISK"
        elif norm_risk > 0.60:
            access_status = "CAUTION"
        else:
            access_status = "CLEAR"

        # Actionable recommendations
        asset_type = props.get("type", "")
        if asset_type == "hospital":
            if norm_risk >= 0.80:
                rec_action = f"Immediate evacuation of ground floor ICU; deploy portable diesel gensets to 1st floor; divert inbound ambulances to {props.get('alternative_name', 'Bhubaneswar Central')}."
            elif norm_risk >= 0.65:
                rec_action = "Secure standby oxygen supply, inspect emergency storm drains, place surgical trauma response on 24-hr standby."
            else:
                rec_action = "Maintain emergency casualty protocol and monitor arterial access road status."
        elif asset_type == "shelter":
            if norm_risk >= 0.75:
                rec_action = "Activate emergency intake capacity; confirm drinking water & halogen tablets; verify satellite comms link."
            else:
                rec_action = "Pre-stage dry ration packets; ensure diesel generator fuel topped to 100%."
        elif asset_type == "power_substation":
            if norm_risk >= 0.70:
                rec_action = "Precautionary sectional load-shedding to prevent coastal surge transformer explosion; isolate feeder lines."
            else:
                rec_action = "Pre-position rapid restoration teams with spare conductors and tree-clearing power equipment."
        else:
            rec_action = "Impose heavy vehicle speed restrictions; position earthmovers for debris clearance."

        explanation = (
            f"{'Critical' if norm_risk > 0.75 else 'Moderate'} risk profile: "
            f"Wind component is {hazard_dict['wind']:.2f}, rainfall saturation is {hazard_dict['rainfall']:.2f}, "
            f"and coastal inundation screening depth indicates {props.get('elevation_m', 5.0):.1f}m ground clearance."
        )

        alt_fac = None
        if props.get("nearest_alternative_id"):
            alt_fac = AlternativeFacility(
                id=props["nearest_alternative_id"],
                name=props.get("alternative_name", "Regional Facility"),
                distance_km=props.get("alternative_dist_km", 15.0)
            )

        assessed_assets.append(AssetRiskAssessment(
            asset_id=props.get("id", str(uuid.uuid4())[:8]),
            name=props.get("name", "Asset"),
            type=props.get("type", "unknown"),
            district=props.get("district", "Odisha"),
            coordinates=[pt_lon, pt_lat],
            elevation_m=props.get("elevation_m", 10.0),
            criticality=props.get("criticality", "MODERATE"),
            population_served=props.get("population_served", 10000),
            hazard_score=comp_hazard,
            exposure_score=comp_exposure,
            vulnerability_score=comp_vuln,
            composite_risk_score=norm_risk,
            hazard_breakdown=hazard_dict,
            access_road_status=access_status,
            nearest_alternative=alt_fac,
            risk_rank=0,  # will set after sorting
            confidence="HIGH" if current_point.get("stage") == "Landfall (Puri Coast)" else "MEDIUM",
            recommended_action=rec_action,
            explanation=explanation
        ))

    # Sort assets by composite risk descending
    assessed_assets.sort(key=lambda a: a.composite_risk_score, reverse=True)
    for idx, asset in enumerate(assessed_assets):
        asset.risk_rank = idx + 1

    # District summaries
    dist_summaries: List[DistrictRiskSummary] = [
        DistrictRiskSummary(
            district_id="OD_PURI",
            district_name="Puri",
            state="Odisha",
            composite_risk_score=round(sum(district_scores["Puri"])/max(1, len(district_scores["Puri"])), 2) if district_scores["Puri"] else 0.88,
            population_exposed=640000,
            critical_assets_at_risk=7,
            primary_threat="Direct Eye Wall Impact & Inundation (+3m surge)",
            recommended_district_action="Mandatory pre-landfall zero-casualty evacuation of coastal barrier strip (0-5km) to multi-purpose cyclone shelters."
        ),
        DistrictRiskSummary(
            district_id="OD_JAGAT",
            district_name="Jagatsinghpur",
            state="Odisha",
            composite_risk_score=round(sum(district_scores["Jagatsinghpur"])/max(1, len(district_scores["Jagatsinghpur"])), 2) if district_scores["Jagatsinghpur"] else 0.82,
            population_exposed=410000,
            critical_assets_at_risk=4,
            primary_threat="Mahanadi Estuary Inundation & Gale Winds (180 km/h)",
            recommended_district_action="Evacuate Ersama and Paradip low-lying fishing hamlets; secure port chemical berths."
        ),
        DistrictRiskSummary(
            district_id="OD_KHUR",
            district_name="Khurda / Bhubaneswar",
            state="Odisha",
            composite_risk_score=round(sum(district_scores["Khurda"])/max(1, len(district_scores["Khurda"])), 2) if district_scores["Khurda"] else 0.65,
            population_exposed=320000,
            critical_assets_at_risk=2,
            primary_threat="Extreme Rainfall Waterlogging & Tree-fall Disruption to NH-16",
            recommended_district_action="Station ODRAF tree-cutters along NH-316 / NH-16; designate AIIMS Bhubaneswar as apex referral facility."
        )
    ]

    total_pop = sum(d.population_exposed for d in dist_summaries)
    high_risk_roads = sum(1 for a in assessed_assets if a.type == "arterial_road" and a.composite_risk_score > 0.70)

    # Filter inundation polygons for requested scenario
    filtered_inundation = {
        "type": "FeatureCollection",
        "features": [
            f for f in inundation_geojson.get("features", [])
            if f.get("properties", {}).get("scenario") == inundation_scenario
        ]
    }

    # Dispatch High Risk Alerts
    from app.services.notifications.dispatcher import email_dispatcher
    critical_threats = [a for a in assessed_assets if a.composite_risk_score >= 0.85 and a.type in ["hospital", "shelter"]]
    critical_districts = [d for d in dist_summaries if d.composite_risk_score >= 0.80]
    
    if critical_threats or critical_districts:
        email_dispatcher.dispatch_high_risk_alerts(
            cyclone_name=track.name,
            districts=critical_districts,
            assets=critical_threats
        )

    return AnalysisRunResponse(
        analysis_id=f"ANALYSIS_{uuid.uuid4().hex[:10].upper()}",
        scenario_id=scenario_id,
        inundation_scenario=inundation_scenario,
        cyclone_name=track.name,
        current_time_step=current_point["timestamp"],
        cyclone_state=current_point,
        district_summaries=dist_summaries,
        top_threatened_assets=assessed_assets[:8],
        total_population_at_risk=total_pop,
        high_risk_roads_count=high_risk_roads,
        confidence_level="HIGH" if inundation_scenario == "base" else "MEDIUM",
        data_freshness_utc=current_point["timestamp"],
        disclaimer="Decision support screening only; confirm all tactical dispatches with official IMD and OSDMA bulletins.",
        geojson_layers={
            "infrastructure": infra_geojson,
            "inundation_screening": filtered_inundation
        }
    )
