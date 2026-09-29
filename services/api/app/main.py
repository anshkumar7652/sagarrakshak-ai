import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import (
    analysis,
    advisory,
    routes,
    health,
    assets,
    audit,
    cap,
    multimodal,
    analytics
)
from app.db.init_db import initialize_database

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure database schema is initialized and seeded on startup
    try:
        initialize_database()
        logger.info("Database verified and ready.")
    except Exception as e:
        logger.error(f"Startup DB initialization error: {e}")
    yield

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="SagarRakshak AI — Enterprise Decision-Support & Early Action Command Platform for DEOCs in India",
    lifespan=lifespan
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register sub-routers
app.include_router(analysis.router)
app.include_router(advisory.router)
app.include_router(routes.router)
app.include_router(health.router)
app.include_router(assets.router)
app.include_router(audit.router)
app.include_router(cap.router)
app.include_router(multimodal.router)
app.include_router(analytics.router)

@app.get("/")
def root():
    return {
        "service": "SagarRakshak AI — Enterprise Backend API",
        "tagline": "From cyclone track to local action in minutes",
        "status": "OPERATIONAL_READY",
        "modules": [
            "GIS Multi-Hazard Engine (GEE + IBTrACS)",
            "Gemini Multilingual Advisory Synthesizer",
            "NDMA CAP 1.2 Feed Generator",
            "Multimodal IMD Bulletin Vision Ingestor",
            "Critical Infrastructure Asset Registry",
            "Immutable Cryptographic Audit Ledger",
            "Storm Impact Analytics & Historical Comparator"
        ],
        "documentation": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
