from typing import Dict, Any
from app.config import settings

CRITICALITY_MULTIPLIER = {
    "APEX_STRATEGIC": 1.0,
    "CRITICAL": 0.9,
    "CRITICAL_GRID_SPINE": 0.95,
    "PRIMARY_LIFELINE": 0.85,
    "PORT_LIFELINE": 0.85,
    "HIGH": 0.75,
    "HIGH_COASTAL_RISK": 0.8,
    "MODERATE": 0.5
}

def compute_asset_exposure(asset_props: Dict[str, Any]) -> float:
    """
    Computes normalized exposure score [0.0, 1.0] based on population served,
    criticality, and facility capacity.
    """
    w = settings.risk_weights
    criticality = asset_props.get("criticality", "MODERATE")
    crit_weight = CRITICALITY_MULTIPLIER.get(criticality, 0.5)

    pop_served = asset_props.get("population_served", 0)
    # Scale population up to 500,000 baseline
    pop_score = min(1.0, max(0.1, pop_served / 350000.0))

    # Capacity weighting if hospital/shelter
    cap_score = 0.5
    if "capacity_beds" in asset_props:
        cap_score = min(1.0, asset_props["capacity_beds"] / 500.0)
    elif "capacity_persons" in asset_props:
        cap_score = min(1.0, asset_props["capacity_persons"] / 2500.0)

    exposure = (
        w.w_exposure_population * pop_score +
        w.w_exposure_assets * crit_weight +
        w.w_exposure_road_network * cap_score
    )
    return round(min(1.0, max(0.0, exposure)), 3)
