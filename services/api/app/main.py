from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import analysis, advisory, routes, health

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="SagarRakshak AI Decision-Support Platform — Pre-landfall infrastructure vulnerability and action brief engine"
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

@app.get("/")
def root():
    return {
        "service": "SagarRakshak AI — Backend API",
        "tagline": "From cyclone track to local action in minutes",
        "documentation": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
