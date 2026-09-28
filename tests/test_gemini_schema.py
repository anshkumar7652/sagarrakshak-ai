import sys
from pathlib import Path

# Path resolution for standalone runner
ROOT = Path(__file__).resolve().parent.parent
API_DIR = ROOT / "services" / "api"
if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))

import pytest
from app.services.gemini.advisory import generate_grounded_advisory
from app.models.advisory import GroundedAdvisory

def test_grounded_advisory_structure():
    """Verify that generated advisory adheres to the grounded DEOC schema."""
    evidence = {
        "analysis_id": "ANALYSIS_TEST_01",
        "cyclone_name": "Cyclone Fani",
        "category": "Extremely Severe Cyclonic Storm",
        "max_winds_kmh": 215,
        "landfall_target": "Puri, Odisha",
        "inundation_scenario": "base",
        "high_risk_districts": ["Puri", "Jagatsinghpur", "Khurda"]
    }
    adv = generate_grounded_advisory(evidence)
    assert isinstance(adv, GroundedAdvisory)
    assert adv.situation_summary != ""
    assert len(adv.priority_actions) >= 3
    assert adv.public_alerts.en != ""
    assert adv.public_alerts.hi != ""
    assert adv.public_alerts.or_text != ""
    assert len(adv.public_alerts.sms_version) <= 180

def test_evidence_id_linkage():
    """Ensure priority actions cite explicit data evidence tokens."""
    evidence = {"cyclone_name": "Cyclone Fani"}
    adv = generate_grounded_advisory(evidence)
    for act in adv.priority_actions:
        assert len(act.evidence_ids) > 0
        for ev in act.evidence_ids:
            assert isinstance(ev, str)
            assert len(ev) > 2

if __name__ == "__main__":
    test_grounded_advisory_structure()
    test_evidence_id_linkage()
    print("test_gemini_schema: ALL PASSED")
