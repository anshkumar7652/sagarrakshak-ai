from typing import List, Optional
from pydantic import BaseModel, Field

class TrackPoint(BaseModel):
    timestamp: str
    lat: float
    lon: float
    wind_kmh: float
    pressure_hpa: float
    category: str
    cone_radius_km: float
    stage: str

class CycloneTrack(BaseModel):
    cyclone_id: str
    name: str
    basin: str
    category: str
    max_wind_kmh: float
    min_pressure_hpa: float
    landfall_location: str
    landfall_time: str
    source: str
    track_points: List[TrackPoint]

class ScenarioMetadata(BaseModel):
    scenario_id: str
    name: str
    mode: str = Field(..., description="'historical_replay' or 'live_imd'")
    description: str
    cyclone_name: str
    region: str
    timestamp: str
