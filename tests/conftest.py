import sys
from pathlib import Path

# Ensure services/api is in sys.path before any test imports run
ROOT_DIR = Path(__file__).resolve().parent.parent
API_DIR = ROOT_DIR / "services" / "api"

if str(API_DIR) not in sys.path:
    sys.path.insert(0, str(API_DIR))
