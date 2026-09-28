import json
from pathlib import Path
from typing import Dict, Any
from app.config import settings
from app.models.cyclone import CycloneTrack

def load_fani_track() -> CycloneTrack:
    """
    Loads historical Cyclone Fani IBTrACS / IMD best-track data from cached fixture.
    """
    fixture_file = settings.fixtures_path / "fani_track.json"
    with open(fixture_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    return CycloneTrack(**data)

def get_track_point_at_index(track: CycloneTrack, index: int) -> Dict[str, Any]:
    """
    Safely retrieves a specific time-step along the cyclone track.
    """
    idx = max(0, min(index, len(track.track_points) - 1))
    return track.track_points[idx].model_dump()
