import sys
from pathlib import Path

# Path resolution for standalone runner
ROOT = Path(__file__).resolve().parent.parent
API_DIR = ROOT / "services" / "api"
if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))

import pytest
from app.services.routing.safe_routes import compute_safe_evacuation_route

def test_compute_safe_evacuation_route():
    """Verify emergency evacuation route generation avoiding flood zones."""
    route = compute_safe_evacuation_route(
        origin_id="HOSP_PURI_001",
        destination_id="HOSP_KHUR_001",
        hazard_level="base"
    )
    assert route["route_id"] == "ROUTE_HOSP_PURI_001_HOSP_KHUR_001"
    assert route["clearance_status"] == "OPEN_EMERGENCY_CORRIDOR"
    assert route["total_distance_km"] > 0
    assert len(route["route_coordinates"]) > 2
    assert len(route["hazard_avoidance"]) > 0

if __name__ == "__main__":
    test_compute_safe_evacuation_route()
    print("test_routing: PASSED")
