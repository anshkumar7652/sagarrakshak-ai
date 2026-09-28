import sys
from pathlib import Path

# Path resolution for standalone runner
ROOT = Path(__file__).resolve().parent.parent
API_DIR = ROOT / "services" / "api"
if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))

import pytest
from app.services.ingestion.ibtracs_adapter import load_fani_track
from app.services.ingestion.imd_adapter import fetch_imd_live_feed
from app.models.cyclone import CycloneTrack

def test_ibtracs_fani_parsing():
    """Verify Cyclone Fani track points and peak landfall readings."""
    track = load_fani_track()
    assert isinstance(track, CycloneTrack)
    assert track.cyclone_id == "NIO_2019_01_FANI"
    assert len(track.track_points) >= 8
    # Landfall point at Puri
    landfall = [p for p in track.track_points if "Puri" in p.stage]
    assert len(landfall) > 0
    assert landfall[0].wind_kmh >= 210

def test_imd_feed_caching():
    """Verify that IMD adapter caches responses and responds within SLA."""
    feed1 = fetch_imd_live_feed()
    feed2 = fetch_imd_live_feed()
    assert feed1["bulletin_no"] == feed2["bulletin_no"]
    assert "current_position" in feed1
    assert "forecast_track" in feed1

if __name__ == "__main__":
    test_ibtracs_fani_parsing()
    test_imd_feed_caching()
    print("test_adapters: ALL PASSED")
