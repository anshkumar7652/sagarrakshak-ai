import sys
from pathlib import Path

# Path resolution for standalone runner
ROOT = Path(__file__).resolve().parent.parent
API_DIR = ROOT / "services" / "api"
if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))

import pytest
from app.services.risk.engine import run_risk_analysis
from app.services.risk.hazard import compute_wind_hazard, compute_inundation_hazard
from app.models.analysis import AnalysisRunResponse

def test_risk_analysis_output_structure():
    """Verify that run_risk_analysis produces a valid AnalysisRunResponse."""
    res = run_risk_analysis(scenario_id="fani_historical", inundation_scenario="base", time_step_idx=5)
    assert isinstance(res, AnalysisRunResponse)
    assert res.cyclone_name == "Cyclone Fani"
    assert len(res.district_summaries) == 3
    assert len(res.top_threatened_assets) > 0
    assert res.total_population_at_risk > 0

def test_risk_score_bounds():
    """Ensure all composite risk scores are strictly bounded in [0.0, 1.0]."""
    res = run_risk_analysis(scenario_id="fani_historical", inundation_scenario="base", time_step_idx=5)
    for asset in res.top_threatened_assets:
        assert 0.0 <= asset.composite_risk_score <= 1.0
        assert 0.0 <= asset.hazard_score <= 1.0
        assert 0.0 <= asset.exposure_score <= 1.0
        assert 0.0 <= asset.vulnerability_score <= 1.0

def test_risk_ranking_order():
    """Assets must be sorted strictly in descending order of composite risk score."""
    res = run_risk_analysis(scenario_id="fani_historical", inundation_scenario="base", time_step_idx=5)
    scores = [a.composite_risk_score for a in res.top_threatened_assets]
    assert scores == sorted(scores, reverse=True)
    for idx, asset in enumerate(res.top_threatened_assets):
        assert asset.risk_rank == idx + 1

def test_inundation_hazard_sensitivity():
    """Higher surge scenario must produce equal or higher hazard for low-elevation ground."""
    elev = 2.5
    low_surge = compute_inundation_hazard(elev, scenario="low")
    base_surge = compute_inundation_hazard(elev, scenario="base")
    high_surge = compute_inundation_hazard(elev, scenario="high")
    assert low_surge <= base_surge <= high_surge

if __name__ == "__main__":
    test_risk_analysis_output_structure()
    test_risk_score_bounds()
    test_risk_ranking_order()
    test_inundation_hazard_sensitivity()
    print("test_risk_engine: ALL PASSED")
