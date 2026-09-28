from fastapi import APIRouter, Query, HTTPException
from typing import Dict, Any, List
from app.models.analysis import AnalysisRunRequest, AnalysisRunResponse
from app.models.cyclone import ScenarioMetadata
from app.services.risk.engine import run_risk_analysis
from app.services.ingestion.ibtracs_adapter import load_fani_track

router = APIRouter(prefix="/api/analysis", tags=["analysis"])

@router.get("/scenarios", response_model=List[ScenarioMetadata])
def list_available_scenarios():
    """Returns available cyclone scenarios (Historical Fani replay and Live IMD)."""
    return [
        ScenarioMetadata(
            scenario_id="fani_historical",
            name="Cyclone Fani (May 2019) — Historical Replay",
            mode="historical_replay",
            description="Replay of Cat-5 Extremely Severe Cyclonic Storm Fani making landfall over Puri, Odisha.",
            cyclone_name="Cyclone Fani",
            region="Puri–Khurda–Jagatsinghpur, Odisha",
            timestamp="2019-05-03T03:30:00Z"
        ),
        ScenarioMetadata(
            scenario_id="imd_live_feed",
            name="IMD Operational Feed / Simulation",
            mode="live_imd",
            description="Real-time / operational IMD bulletin ingestion for Bay of Bengal cyclonic systems.",
            cyclone_name="Deep Depression BOB-01",
            region="Bay of Bengal / Odisha Coast",
            timestamp="2026-09-28T18:00:00Z"
        )
    ]

@router.post("/run", response_model=AnalysisRunResponse)
def execute_risk_analysis(req: AnalysisRunRequest):
    """
    Executes the spatial multi-hazard risk engine:
    Hazard × Exposure × Vulnerability across infrastructure and population.
    """
    try:
        response = run_risk_analysis(
            scenario_id=req.scenario_id,
            inundation_scenario=req.inundation_scenario,
            time_step_idx=req.time_step_index or 5
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk engine evaluation error: {str(e)}")

@router.get("/track/fani")
def get_historical_track():
    """Returns the full parsed Cyclone Fani track points."""
    return load_fani_track()
