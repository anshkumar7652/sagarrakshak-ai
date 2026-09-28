from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from .cyclone import CycloneTrack
from .infrastructure import AssetRiskAssessment

class DistrictRiskSummary(BaseModel):
    district_id: str
    district_name: str
    state: str
    composite_risk_score: float
    population_exposed: int
    critical_assets_at_risk: int
    primary_threat: str
    recommended_district_action: str

class AnalysisRunRequest(BaseModel):
    scenario_id: str = "fani_historical"
    inundation_scenario: str = "base"  # low, base, high
    aoi_id: str = "odisha_coastal"
    time_step_index: Optional[int] = 5  # Landfall peak index

class AnalysisRunResponse(BaseModel):
    analysis_id: str
    scenario_id: str
    inundation_scenario: str
    cyclone_name: str
    current_time_step: str
    cyclone_state: Dict[str, Any]
    district_summaries: List[DistrictRiskSummary]
    top_threatened_assets: List[AssetRiskAssessment]
    total_population_at_risk: int
    high_risk_roads_count: int
    confidence_level: str
    data_freshness_utc: str
    disclaimer: str
    geojson_layers: Dict[str, Any]
