import datetime
from fastapi import APIRouter, Query, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any, List
from app.models.analysis import AnalysisRunRequest, AnalysisRunResponse
from app.models.cyclone import ScenarioMetadata
from app.services.risk.engine import run_risk_analysis
from app.services.ingestion.ibtracs_adapter import load_fani_track
from app.db.database import get_db
from app.db.models import RiskAssessmentRun

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
def execute_risk_analysis(req: AnalysisRunRequest, db: Session = Depends(get_db)):
    """
    Executes the spatial multi-hazard risk engine:
    Hazard × Exposure × Vulnerability across infrastructure and population.
    Persists the full assessment run into the database.
    """
    try:
        step_idx = req.time_step_index if req.time_step_index is not None else 5
        response = run_risk_analysis(
            scenario_id=req.scenario_id,
            inundation_scenario=req.inundation_scenario,
            time_step_idx=step_idx
        )

        # Persist to database (resilient to concurrent write locks)
        try:
            run_record = RiskAssessmentRun(
                run_id=response.analysis_id,
                scenario_id=response.scenario_id,
                inundation_scenario=response.inundation_scenario,
                cyclone_name=response.cyclone_name,
                current_time_step=response.current_time_step,
                total_population_at_risk=response.total_population_at_risk,
                high_risk_assets_count=len(response.top_threatened_assets),
                district_summaries=[d.model_dump() for d in response.district_summaries],
                top_threatened_assets=[a.model_dump() for a in response.top_threatened_assets],
                weights_used={"hazard": 0.40, "exposure": 0.35, "vulnerability": 0.25},
                confidence_level=response.confidence_level
            )
            db.add(run_record)
            db.commit()
        except Exception:
            db.rollback()

        return response
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Risk engine evaluation error: {str(e)}")

@router.get("/runs/history")
def get_assessment_history(limit: int = Query(20, ge=1, le=100), db: Session = Depends(get_db)):
    """Returns past executed risk assessment runs from SQLite."""
    runs = db.query(RiskAssessmentRun).order_by(RiskAssessmentRun.executed_at_utc.desc()).limit(limit).all()
    return [
        {
            "run_id": r.run_id,
            "scenario_id": r.scenario_id,
            "cyclone_name": r.cyclone_name,
            "inundation_scenario": r.inundation_scenario,
            "total_population_at_risk": r.total_population_at_risk,
            "high_risk_assets_count": r.high_risk_assets_count,
            "confidence_level": r.confidence_level,
            "executed_at_utc": r.executed_at_utc.isoformat() if r.executed_at_utc else datetime.datetime.utcnow().isoformat()
        }
        for r in runs
    ]

@router.get("/track/fani")
def get_historical_track():
    """Returns the full parsed Cyclone Fani track points."""
    return load_fani_track()
