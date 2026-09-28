from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class AlternativeFacility(BaseModel):
    id: str
    name: str
    distance_km: float

class InfrastructureAsset(BaseModel):
    id: str
    name: str
    type: str  # hospital, shelter, power_substation, arterial_road
    district: str
    subdistrict: Optional[str] = None
    criticality: str
    lat: float
    lon: float
    elevation_m: float
    population_served: Optional[int] = 0
    capacity_info: Optional[Dict[str, Any]] = None
    access_road_id: Optional[str] = None
    nearest_alternative: Optional[AlternativeFacility] = None
    source: str
    verification_status: str

class AssetRiskAssessment(BaseModel):
    asset_id: str
    name: str
    type: str
    district: str
    coordinates: List[float]  # [lon, lat]
    elevation_m: float
    criticality: str
    population_served: int
    hazard_score: float
    exposure_score: float
    vulnerability_score: float
    composite_risk_score: float
    hazard_breakdown: Dict[str, float]
    access_road_status: str  # CLEAR, CAUTION, HIGH_RISK, IMPASSIBLE
    nearest_alternative: Optional[AlternativeFacility] = None
    risk_rank: int
    confidence: str  # HIGH, MEDIUM, LOW
    recommended_action: str
    explanation: str
