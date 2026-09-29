from fastapi import APIRouter
from typing import List, Dict, Any
from pydantic import BaseModel

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

class CycloneComparisonItem(BaseModel):
    cyclone_name: str
    year: int
    category: str
    peak_wind_kmh: float
    min_pressure_hpa: float
    storm_surge_m: float
    landfall_region: str
    people_evacuated: int
    critical_facilities_threatened: int
    grid_restoration_days: int
    human_loss_mitigation_rate: str

class DistrictRiskProfile(BaseModel):
    district: str
    state: str
    coastal_length_km: float
    population_at_risk: int
    elevation_median_m: float
    multi_hazard_vulnerability_index: float
    cyclone_shelters_count: int
    hospital_bed_capacity: int
    backup_power_ready_pct: float
    primary_evacuation_corridor: str

@router.get("/compare-cyclones", response_model=List[CycloneComparisonItem])
def get_cyclone_benchmarks():
    """
    Returns comparative impact analytics across major North Indian Ocean cyclones,
    evaluating wind severity, storm surges, evacuation scale, and mitigation performance.
    """
    return [
        CycloneComparisonItem(
            cyclone_name="Cyclone Fani",
            year=2019,
            category="Extremely Severe Cyclonic Storm (Cat 5 equivalent)",
            peak_wind_kmh=215.0,
            min_pressure_hpa=937.0,
            storm_surge_m=4.5,
            landfall_region="Puri Coast, Odisha",
            people_evacuated=1200000,
            critical_facilities_threatened=42,
            grid_restoration_days=14,
            human_loss_mitigation_rate="99.2% (World-class evacuation execution by OSDMA)"
        ),
        CycloneComparisonItem(
            cyclone_name="Cyclone Amphan",
            year=2020,
            category="Super Cyclonic Storm (Super Cyclone)",
            peak_wind_kmh=260.0,
            min_pressure_hpa=920.0,
            storm_surge_m=5.0,
            landfall_region="Sundarbans, West Bengal / Odisha Border",
            people_evacuated=3000000,
            critical_facilities_threatened=68,
            grid_restoration_days=21,
            human_loss_mitigation_rate="98.5% (Pre-emptive mass shelter mobilisation)"
        ),
        CycloneComparisonItem(
            cyclone_name="Cyclone Phailin",
            year=2013,
            category="Extremely Severe Cyclonic Storm (Cat 5 equivalent)",
            peak_wind_kmh=215.0,
            min_pressure_hpa=940.0,
            storm_surge_m=3.5,
            landfall_region="Gopalpur, Ganjam, Odisha",
            people_evacuated=1000000,
            critical_facilities_threatened=35,
            grid_restoration_days=10,
            human_loss_mitigation_rate="99.5% (Global benchmark in zero casualty mission)"
        ),
        CycloneComparisonItem(
            cyclone_name="Cyclone Hudhud",
            year=2014,
            category="Very Severe Cyclonic Storm",
            peak_wind_kmh=185.0,
            min_pressure_hpa=950.0,
            storm_surge_m=2.0,
            landfall_region="Visakhapatnam, Andhra Pradesh",
            people_evacuated=250000,
            critical_facilities_threatened=28,
            grid_restoration_days=8,
            human_loss_mitigation_rate="97.8% (Urban infrastructure hardening required)"
        ),
        CycloneComparisonItem(
            cyclone_name="Cyclone Dana",
            year=2024,
            category="Severe Cyclonic Storm",
            peak_wind_kmh=120.0,
            min_pressure_hpa=982.0,
            storm_surge_m=2.0,
            landfall_region="Dhamra / Bhadrak, Odisha",
            people_evacuated=600000,
            critical_facilities_threatened=19,
            grid_restoration_days=4,
            human_loss_mitigation_rate="99.9% (Zero casualties in targeted evacuation zones)"
        )
    ]

@router.get("/district-matrix", response_model=List[DistrictRiskProfile])
def get_district_risk_matrix():
    """
    Returns multi-hazard baseline vulnerability matrices for key coastal districts in the Bay of Bengal basin.
    """
    return [
        DistrictRiskProfile(
            district="Puri",
            state="Odisha",
            coastal_length_km=150.4,
            population_at_risk=284000,
            elevation_median_m=4.2,
            multi_hazard_vulnerability_index=0.88,
            cyclone_shelters_count=148,
            hospital_bed_capacity=650,
            backup_power_ready_pct=92.0,
            primary_evacuation_corridor="NH-316 (Puri-Bhubaneswar Elevated Expressway)"
        ),
        DistrictRiskProfile(
            district="Jagatsinghpur",
            state="Odisha",
            coastal_length_km=67.0,
            population_at_risk=195000,
            elevation_median_m=3.8,
            multi_hazard_vulnerability_index=0.91,
            cyclone_shelters_count=112,
            hospital_bed_capacity=420,
            backup_power_ready_pct=88.5,
            primary_evacuation_corridor="SH-12 (Paradip-Cuttack Highway)"
        ),
        DistrictRiskProfile(
            district="Khurda",
            state="Odisha",
            coastal_length_km=32.0,
            population_at_risk=120000,
            elevation_median_m=8.5,
            multi_hazard_vulnerability_index=0.64,
            cyclone_shelters_count=76,
            hospital_bed_capacity=1450,
            backup_power_ready_pct=96.0,
            primary_evacuation_corridor="NH-16 (Khurda-Bhubaneswar Arterial)"
        ),
        DistrictRiskProfile(
            district="Ganjam",
            state="Odisha",
            coastal_length_km=60.0,
            population_at_risk=160000,
            elevation_median_m=6.1,
            multi_hazard_vulnerability_index=0.78,
            cyclone_shelters_count=120,
            hospital_bed_capacity=800,
            backup_power_ready_pct=90.0,
            primary_evacuation_corridor="NH-516A (Gopalpur-Berhampur Link)"
        ),
        DistrictRiskProfile(
            district="Kendrapara",
            state="Odisha",
            coastal_length_km=68.0,
            population_at_risk=175000,
            elevation_median_m=3.2,
            multi_hazard_vulnerability_index=0.89,
            cyclone_shelters_count=98,
            hospital_bed_capacity=380,
            backup_power_ready_pct=84.0,
            primary_evacuation_corridor="SH-9A (Kendrapara-Cuttack Route)"
        )
    ]
