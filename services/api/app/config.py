import os
from pathlib import Path
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

_env_fixtures = os.getenv("FIXTURES_PATH")
if _env_fixtures:
    FIXTURES_DIR = Path(_env_fixtures)
else:
    BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
    _candidates = [
        BASE_DIR / "data" / "fixtures",
        Path("/app/data/fixtures"),
        Path(__file__).resolve().parent.parent / "data" / "fixtures",
        Path("data/fixtures"),
    ]
    FIXTURES_DIR = next((p for p in _candidates if p.exists()), BASE_DIR / "data" / "fixtures")

class RiskEngineWeights(BaseModel):
    # Top-level weights (normalized to 1.0)
    w_hazard: float = 0.40
    w_exposure: float = 0.35
    w_vulnerability: float = 0.25

    # Hazard sub-weights
    w_hazard_wind: float = 0.35
    w_hazard_rainfall: float = 0.35
    w_hazard_surge: float = 0.30

    # Exposure sub-weights
    w_exposure_population: float = 0.45
    w_exposure_assets: float = 0.35
    w_exposure_road_network: float = 0.20

    # Vulnerability sub-weights
    w_vuln_elevation: float = 0.35
    w_vuln_flood_history: float = 0.25
    w_vuln_land_cover: float = 0.20
    w_vuln_route_redundancy: float = 0.20

class Settings(BaseModel):
    app_name: str = "SagarRakshak AI — Backend API"
    app_version: str = "1.0.0"
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    routes_api_key: str = os.getenv("GOOGLE_ROUTES_API_KEY", os.getenv("GOOGLE_MAPS_API_KEY", ""))
    fixtures_path: Path = FIXTURES_DIR
    risk_weights: RiskEngineWeights = RiskEngineWeights()
    enable_mock_if_missing_keys: bool = True

settings = Settings()
