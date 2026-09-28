import sys
from pathlib import Path

# Path resolution for standalone runner
ROOT = Path(__file__).resolve().parent.parent
API_DIR = ROOT / "services" / "api"
if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))

import pytest
from app.routers.health import get_system_health

def test_system_health_endpoint():
    """Verify /health observability response structure and latency metrics."""
    health = get_system_health()
    assert health["status"] == "HEALTHY"
    assert "adapters" in health
    assert health["adapters"]["imd_cyclone_api"]["status"] == "ONLINE"
    assert health["adapters"]["noaa_ibtracs_v4"]["status"] == "ONLINE"
    assert health["adapters"]["google_earth_engine"]["status"] in ["ONLINE", "CACHED_BASELINE_ACTIVE"]
    assert health["response_time_ms"] >= 0

if __name__ == "__main__":
    test_system_health_endpoint()
    print("test_health: PASSED")
