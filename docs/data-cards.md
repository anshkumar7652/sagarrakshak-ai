# SagarRakshak AI — Data Cards

Every dataset used in SagarRakshak AI is documented with its source, licensing, resolution, update cadence, and ethical considerations.

---

### 1. India Meteorological Department (IMD) Cyclone Warning APIs
- **Provider:** India Meteorological Department, Ministry of Earth Sciences, Govt of India
- **Endpoints:** Cyclone Track, Cyclone Wind Warning, Cone of Uncertainty
- **Resolution:** Synoptic station / basin-scale forecasts (3-hourly during storm)
- **License / Terms:** Open Government Data (OGD) India / Mausam API Terms
- **Caching Policy:** 5-minute client-side TTL in accordance with IMD peak demand guidelines

### 2. NOAA IBTrACS v4 (International Best Track Archive)
- **Catalog ID:** `NOAA/IBTrACS/v4` (Earth Engine Data Catalog)
- **Provider:** NOAA National Centers for Environmental Information (NCEI)
- **Resolution:** 3-hourly global tropical cyclone track and intensity positions
- **License:** Public Domain / NOAA Open Data Policy

### 3. NASA GPM IMERG V07 (Global Precipitation Measurement)
- **Catalog ID:** `NASA/GPM_L3/IMERG_V07` (Earth Engine Data Catalog)
- **Provider:** NASA Goddard Space Flight Center
- **Resolution:** 0.1° × 0.1° (~10 km), half-hourly global precipitation
- **License:** NASA Open Data Policy

### 4. USGS SRTM 30m Digital Elevation Model
- **Catalog ID:** `USGS/SRTMGL1_003` (Earth Engine Data Catalog)
- **Provider:** NASA Jet Propulsion Laboratory / USGS
- **Resolution:** 1 arc-second (~30 meters) global void-filled elevation
- **License:** Public Domain

### 5. Google Dynamic World V1
- **Catalog ID:** `GOOGLE/DYNAMICWORLD/V1` (Earth Engine Data Catalog)
- **Provider:** World Resources Institute & Google
- **Resolution:** 10m near-real-time Land Use / Land Cover (LULC)
- **License:** CC-BY-4.0

### 6. JRC Global Surface Water Mapping Layers (v1.4)
- **Catalog ID:** `JRC/GSW1_4/GlobalSurfaceWater` (Earth Engine Data Catalog)
- **Provider:** European Commission Joint Research Centre
- **Resolution:** 30m spatial resolution
- **License:** Open Access

### 7. WorldPop Global Project Population Data
- **Catalog ID:** `WorldPop/GP/100m/pop` (Earth Engine Data Catalog)
- **Provider:** University of Southampton / WorldPop Project
- **Resolution:** ~100m raster grid cells
- **License:** CC-BY-4.0
