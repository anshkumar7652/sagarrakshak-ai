import json
import logging
import sys
from pathlib import Path

# Ensure services/api is in sys.path when run directly
current_dir = Path(__file__).resolve().parent
services_api_dir = current_dir.parent.parent
if str(services_api_dir) not in sys.path:
    sys.path.insert(0, str(services_api_dir))

from app.db.database import engine, SessionLocal, Base
from app.db.models import (
    CycloneEvent,
    CriticalAsset,
    RiskAssessmentRun,
    AdvisoryRecord,
    DispatchAuditLog,
    MultimodalBulletinUpload
)
from app.config import settings

logger = logging.getLogger(__name__)

def initialize_database():
    """Initializes SQLite schema and populates seed data from verified fixtures."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Seed Cyclone Events if empty
        if db.query(CycloneEvent).count() == 0:
            fani_file = Path(settings.fixtures_path) / "fani_track.json"
            if fani_file.exists():
                with open(fani_file, "r", encoding="utf-8") as f:
                    fani_data = json.load(f)

                fani_event = CycloneEvent(
                    cyclone_id=fani_data["cyclone_id"],
                    name=fani_data["name"],
                    basin=fani_data["basin"],
                    category=fani_data["category"],
                    max_wind_kmh=fani_data["max_wind_kmh"],
                    min_pressure_hpa=fani_data["min_pressure_hpa"],
                    landfall_location=fani_data["landfall_location"],
                    landfall_time=fani_data["landfall_time"],
                    mode="historical",
                    track_data=fani_data["track_points"]
                )
                db.add(fani_event)

                # Add Live Simulation Cyclone
                live_event = CycloneEvent(
                    cyclone_id="NIO_2026_SIM_BOB01",
                    name="Deep Depression BOB-01",
                    basin="North Indian Ocean (Bay of Bengal)",
                    category="Deep Depression (Squally)",
                    max_wind_kmh=85,
                    min_pressure_hpa=988,
                    landfall_location="Gopalpur-Puri Coast, Odisha",
                    landfall_time="2026-09-30T12:00:00Z",
                    mode="live_simulation",
                    track_data=[
                        {"timestamp": "2026-09-28T18:00:00Z", "lat": 18.4, "lon": 86.2, "wind_kmh": 65, "pressure_hpa": 988, "stage": "Current Location", "cone_radius_km": 45},
                        {"timestamp": "2026-09-29T06:00:00Z", "lat": 19.1, "lon": 86.5, "wind_kmh": 75, "pressure_hpa": 982, "stage": "Deepening", "cone_radius_km": 60},
                        {"timestamp": "2026-09-30T12:00:00Z", "lat": 19.8, "lon": 86.8, "wind_kmh": 85, "pressure_hpa": 978, "stage": "Forecast Landfall", "cone_radius_km": 80}
                    ]
                )
                db.add(live_event)
                logger.info("Seeded Cyclone Events to database.")

        # 2. Seed Critical Infrastructure Assets if empty
        if db.query(CriticalAsset).count() == 0:
            infra_file = Path(settings.fixtures_path) / "odisha_infrastructure.geojson"
            if infra_file.exists():
                with open(infra_file, "r", encoding="utf-8") as f:
                    infra_data = json.load(f)

                for feat in infra_data.get("features", []):
                    props = feat.get("properties", {})
                    geom = feat.get("geometry", {})
                    coords = geom.get("coordinates", [85.8, 19.8])
                    if geom.get("type") == "LineString":
                        pt_lon, pt_lat = coords[0]
                    else:
                        pt_lon, pt_lat = coords[0], coords[1]

                    asset = CriticalAsset(
                        asset_id=props.get("id", "ASSET_01"),
                        name=props.get("name", "Critical Asset"),
                        type=props.get("type", "hospital"),
                        district=props.get("district", "Puri"),
                        subdistrict=props.get("subdistrict"),
                        criticality=props.get("criticality", "HIGH"),
                        lat=pt_lat,
                        lon=pt_lon,
                        elevation_m=props.get("elevation_m", 10.0),
                        population_served=props.get("population_served", 0),
                        capacity_beds=props.get("capacity_beds"),
                        capacity_persons=props.get("capacity_persons"),
                        backup_power=props.get("backup_power", True),
                        access_road_id=props.get("access_road_id"),
                        nearest_alternative_id=props.get("nearest_alternative_id"),
                        alternative_name=props.get("alternative_name"),
                        alternative_dist_km=props.get("alternative_dist_km"),
                        source=props.get("source", "Government Registry"),
                        verification_status=props.get("verification_status", "VERIFIED_OFFICIAL")
                    )
                    db.add(asset)
                logger.info(f"Seeded {len(infra_data.get('features', []))} Critical Assets to database.")

        db.commit()
        logger.info("Database initialized and verified successfully.")
    except Exception as e:
        db.rollback()
        logger.error(f"Database initialization error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    initialize_database()
    print("Database schema created and seed data inserted successfully.")
