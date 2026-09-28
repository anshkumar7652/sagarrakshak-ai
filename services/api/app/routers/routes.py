from fastapi import APIRouter, Query
from app.services.routing.safe_routes import compute_safe_evacuation_route

router = APIRouter(prefix="/api/routes", tags=["routing"])

@router.get("/safe")
def get_safe_route(
    origin_id: str = Query("HOSP_PURI_001", description="Source facility ID"),
    destination_id: str = Query("HOSP_KHUR_001", description="Destination hospital/shelter ID"),
    hazard_scenario: str = Query("base", description="Inundation hazard scenario: low, base, high")
):
    """
    Computes emergency route avoiding flood sectors and inundated bridges.
    """
    return compute_safe_evacuation_route(origin_id, destination_id, hazard_scenario)
