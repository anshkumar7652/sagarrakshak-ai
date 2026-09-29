import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db.database import SessionLocal, Base, engine
from app.db.init_db import initialize_database

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def setup_test_db():
    initialize_database()

def test_root_endpoint():
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert "SagarRakshak AI" in data["service"]
    assert "OPERATIONAL_READY" in data["status"]

def test_assets_api():
    res = client.get("/api/assets")
    assert res.status_code == 200
    assets = res.json()
    assert len(assets) > 0
    assert any(a["type"] == "hospital" for a in assets)

    stats_res = client.get("/api/assets/stats")
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["total_assets"] > 0
    assert stats["backup_power_rate_percent"] >= 0

def test_audit_and_verification():
    logs_res = client.get("/api/audit/logs")
    assert logs_res.status_code == 200
    logs = logs_res.json()
    assert len(logs) > 0

    first_id = logs[0]["receipt_id"]
    verify_res = client.get(f"/api/audit/verify/{first_id}")
    assert verify_res.status_code == 200
    vdata = verify_res.json()
    assert vdata["is_valid"] is True
    assert "VERIFIED" in vdata["tamper_evident_status"]

def test_cap_xml_endpoint():
    res = client.get("/api/cap/feed.xml")
    assert res.status_code == 200
    assert "application/xml" in res.headers["content-type"]
    assert "urn:oasis:names:tc:emergency:cap:1.2" in res.text
    assert "alert" in res.text

def test_multimodal_bulletin_extraction():
    samples_res = client.get("/api/multimodal/samples")
    assert samples_res.status_code == 200
    samples = samples_res.json()
    assert len(samples) >= 2

    # Test sample extraction with Cyclone Fani bulletin
    extract_res = client.post("/api/multimodal/upload-bulletin", data={"sample_id": "SAMPLE_FANI_B24"})
    assert extract_res.status_code == 200
    extracted = extract_res.json()
    assert extracted["bulletin_no"] == "BOB 02/2019/24"
    assert extracted["max_wind_kmh"] > 150
    assert "system_comparison" in extracted
    assert extracted["system_comparison"]["risk_alignment_score_pct"] > 85

def test_cyclone_analytics_comparison():
    res = client.get("/api/analytics/compare-cyclones")
    assert res.status_code == 200
    items = res.json()
    assert len(items) >= 4
    names = [c["cyclone_name"] for c in items]
    assert "Cyclone Fani" in names
    assert "Cyclone Amphan" in names

    matrix_res = client.get("/api/analytics/district-matrix")
    assert matrix_res.status_code == 200
    districts = matrix_res.json()
    assert len(districts) >= 3
    d_names = [d["district"] for d in districts]
    assert "Puri" in d_names
