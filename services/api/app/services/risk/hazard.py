import math
from typing import Dict, Any, List
from app.config import settings

def compute_wind_hazard(lat: float, lon: float, track_lat: float, track_lon: float, max_wind_kmh: float) -> float:
    """
    Parametric wind decay model from cyclone centre based on distance.
    Returns normalized hazard score in [0.0, 1.0].
    """
    # Approximate Haversine distance in km
    dlat = math.radians(lat - track_lat)
    dlon = math.radians(lon - track_lon)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(track_lat)) * math.cos(math.radians(lat)) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    dist_km = 6371.0 * c

    # Radius of maximum winds (RMW) roughly 35 km for Category 4/5 storms
    rmw_km = 35.0
    if dist_km <= rmw_km:
        local_wind = max_wind_kmh
    else:
        # Holland/DeMaria parametric radial decay exponent
        decay_factor = (rmw_km / dist_km) ** 0.55
        local_wind = max_wind_kmh * decay_factor

    # Normalize by ESCS threshold (220 km/h)
    score = min(1.0, max(0.0, local_wind / 220.0))
    return round(score, 3)

def compute_rainfall_hazard(district: str, rain_data: Dict[str, Any]) -> float:
    """
    Calculates rainfall hazard score from GPM IMERG 24h accumulation and baseline percentile.
    """
    dist_info = rain_data.get("district_accumulations_mm", {}).get(district, {})
    if not dist_info:
        return 0.5
    accum = dist_info.get("accum_24h_mm", 100.0)
    # 300mm+ in 24h is catastrophic/extreme in Bay of Bengal coastal plains
    score = min(1.0, max(0.0, accum / 320.0))
    return round(score, 3)

def compute_inundation_hazard(elevation_m: float, scenario: str, dist_to_coast_km: float = 5.0) -> float:
    """
    Scenario-based coastal inundation screening score.
    Low scenario: +1.5m, Base: +3.0m, High: +5.0m
    """
    surge_heights = {"low": 1.5, "base": 3.0, "high": 5.0}
    surge_m = surge_heights.get(scenario.lower(), 3.0)

    water_head = surge_m - elevation_m
    if water_head <= -1.0:
        return 0.1  # Well above surge zone
    elif water_head <= 0.0:
        return 0.35  # Marginal exposure / spray / high tide buffer
    else:
        # Inundation depth scaled up to 3 meters deep
        depth_score = min(1.0, 0.4 + (water_head / 3.0) * 0.6)
        # Distance attenuation if far inland
        if dist_to_coast_km > 15.0:
            depth_score *= 0.6
        return round(depth_score, 3)

def compute_composite_hazard(
    wind_score: float,
    rain_score: float,
    surge_score: float
) -> Dict[str, float]:
    w = settings.risk_weights
    composite = (
        w.w_hazard_wind * wind_score +
        w.w_hazard_rainfall * rain_score +
        w.w_hazard_surge * surge_score
    )
    return {
        "wind": round(wind_score, 3),
        "rainfall": round(rain_score, 3),
        "inundation": round(surge_score, 3),
        "composite": round(min(1.0, max(0.0, composite)), 3)
    }
