from typing import List, Optional, Dict
from pydantic import BaseModel, Field

class HazardComponents(BaseModel):
    wind_score: float = Field(..., ge=0.0, le=1.0)
    rainfall_score: float = Field(..., ge=0.0, le=1.0)
    inundation_score: float = Field(..., ge=0.0, le=1.0)
    composite_hazard: float = Field(..., ge=0.0, le=1.0)

class InundationScenarioConfig(BaseModel):
    scenario: str = Field(..., description="'low', 'base', or 'high'")
    surge_height_m: float
    description: str
    assumptions: str

class RainfallHazardSummary(BaseModel):
    district: str
    accum_24h_mm: float
    percentile: float
    rating: str
    saturation_index: float
