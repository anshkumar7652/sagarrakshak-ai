from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict
from app.db.database import get_db
from app.db.models import CriticalAsset

router = APIRouter(prefix="/api/assets", tags=["assets"])

class AssetSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    asset_id: str
    name: str
    type: str
    district: str
    subdistrict: Optional[str] = None
    criticality: str
    lat: float
    lon: float
    elevation_m: float
    population_served: int
    capacity_beds: Optional[int] = None
    capacity_persons: Optional[int] = None
    backup_power: bool
    nearest_alternative_id: Optional[str] = None
    alternative_name: Optional[str] = None
    alternative_dist_km: Optional[float] = None
    source: str
    verification_status: str

class AssetStats(BaseModel):
    total_assets: int
    by_type: Dict[str, int]
    by_district: Dict[str, int]
    by_criticality: Dict[str, int]
    backup_power_rate_percent: float
    total_population_served: int
    total_shelter_capacity: int
    total_hospital_beds: int

class AssetCreateRequest(BaseModel):
    asset_id: str
    name: str
    type: str
    district: str
    subdistrict: Optional[str] = None
    criticality: str = "HIGH"
    lat: float
    lon: float
    elevation_m: float
    population_served: int = 10000
    capacity_beds: Optional[int] = None
    capacity_persons: Optional[int] = None
    backup_power: bool = True
    alternative_name: Optional[str] = None
    alternative_dist_km: Optional[float] = None

@router.get("", response_model=List[AssetSchema])
def list_assets(
    district: Optional[str] = Query(None, description="Filter by district name (e.g. Puri, Khurda)"),
    asset_type: Optional[str] = Query(None, alias="type", description="Filter by asset type (hospital, shelter, power_substation, arterial_road)"),
    criticality: Optional[str] = Query(None, description="Filter by criticality level (CRITICAL, HIGH, MEDIUM)"),
    backup_power: Optional[bool] = Query(None, description="Filter by backup diesel generator availability"),
    search: Optional[str] = Query(None, description="Search keyword in asset name or ID"),
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    """
    Lists critical infrastructure assets with enterprise multi-attribute filtering,
    geospatial attributes, and elevation profiles.
    """
    query = db.query(CriticalAsset)

    if district:
        query = query.filter(CriticalAsset.district.ilike(f"%{district}%"))
    if asset_type:
        query = query.filter(CriticalAsset.type == asset_type)
    if criticality:
        query = query.filter(CriticalAsset.criticality == criticality)
    if backup_power is not None:
        query = query.filter(CriticalAsset.backup_power == backup_power)
    if search:
        query = query.filter(
            (CriticalAsset.name.ilike(f"%{search}%")) |
            (CriticalAsset.asset_id.ilike(f"%{search}%")) |
            (CriticalAsset.district.ilike(f"%{search}%"))
        )

    return query.order_by(CriticalAsset.criticality.desc(), CriticalAsset.elevation_m.asc()).offset(offset).limit(limit).all()

@router.get("/stats", response_model=AssetStats)
def get_asset_statistics(db: Session = Depends(get_db)):
    """Computes real-time operational aggregates across the critical infrastructure registry."""
    assets = db.query(CriticalAsset).all()
    if not assets:
        return AssetStats(
            total_assets=0,
            by_type={},
            by_district={},
            by_criticality={},
            backup_power_rate_percent=0.0,
            total_population_served=0,
            total_shelter_capacity=0,
            total_hospital_beds=0
        )

    by_type: Dict[str, int] = {}
    by_district: Dict[str, int] = {}
    by_criticality: Dict[str, int] = {}
    backup_count = 0
    pop_served = 0
    shelter_cap = 0
    hospital_beds = 0

    for a in assets:
        by_type[a.type] = by_type.get(a.type, 0) + 1
        by_district[a.district] = by_district.get(a.district, 0) + 1
        by_criticality[a.criticality] = by_criticality.get(a.criticality, 0) + 1
        if a.backup_power:
            backup_count += 1
        pop_served += (a.population_served or 0)
        shelter_cap += (a.capacity_persons or 0)
        hospital_beds += (a.capacity_beds or 0)

    return AssetStats(
        total_assets=len(assets),
        by_type=by_type,
        by_district=by_district,
        by_criticality=by_criticality,
        backup_power_rate_percent=round((backup_count / len(assets)) * 100, 1),
        total_population_served=pop_served,
        total_shelter_capacity=shelter_cap,
        total_hospital_beds=hospital_beds
    )

@router.post("", response_model=AssetSchema)
def add_asset(req: AssetCreateRequest, db: Session = Depends(get_db)):
    """Enrolls a newly surveyed critical facility into the live GIS database."""
    existing = db.query(CriticalAsset).filter(CriticalAsset.asset_id == req.asset_id).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Asset with ID '{req.asset_id}' already exists.")

    new_asset = CriticalAsset(
        asset_id=req.asset_id,
        name=req.name,
        type=req.type,
        district=req.district,
        subdistrict=req.subdistrict,
        criticality=req.criticality,
        lat=req.lat,
        lon=req.lon,
        elevation_m=req.elevation_m,
        population_served=req.population_served,
        capacity_beds=req.capacity_beds,
        capacity_persons=req.capacity_persons,
        backup_power=req.backup_power,
        alternative_name=req.alternative_name,
        alternative_dist_km=req.alternative_dist_km,
        source="DEOC Field Survey Enrolment",
        verification_status="FIELD_VERIFIED"
    )
    db.add(new_asset)
    db.commit()
    db.refresh(new_asset)
    return new_asset

@router.patch("/{asset_id}/backup-power")
def toggle_backup_power(asset_id: str, enabled: bool, db: Session = Depends(get_db)):
    """Updates operational backup power generator status in real time."""
    asset = db.query(CriticalAsset).filter(CriticalAsset.asset_id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    asset.backup_power = enabled
    db.commit()
    return {"asset_id": asset_id, "backup_power": asset.backup_power, "status": "UPDATED"}
