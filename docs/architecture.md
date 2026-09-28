# SagarRakshak AI — System Architecture

SagarRakshak AI is built on a decoupled, cloud-scalable architecture designed to process multi-hazard geospatial satellite feeds and provide sub-second decision support for disaster management authorities in India.

---

## 1. High-Level Architecture Diagram

```mermaid
graph TD
    subgraph Data Layer
        IMD["IMD Cyclone Warning Endpoints<br/>(Track, Radii, Cone)"]
        IBTrACS["NOAA IBTrACS v4 Archive<br/>(Historical Cyclone Replay)"]
        GEE["Google Earth Engine Collections<br/>SRTM 30m, GPM IMERG, Dynamic World, WorldPop"]
        OSM["OpenStreetMap & OSDMA Registries<br/>(Hospitals, Shelters, Grids, Arterial Roads)"]
    end

    subgraph Backend Services [FastAPI on Cloud Run]
        Ingest["API Ingestion & Cache Adapter<br/>5-minute TTL Gateway Protection"]
        GEE_Engine["GEE Spatial Analysis Engine<br/>Hydro-connectivity & Low-Elevation Screening"]
        Risk_Engine["Multi-Hazard Risk Engine<br/>Risk = Hazard × Exposure × Vulnerability"]
        Gemini_Pipeline["Gemini 3.7 / 2.5 Flash Pipeline<br/>Structured JSON & Multilingual Generation"]
        Routing_Engine["Safe Route Navigation Engine<br/>Google Routes API Hazard Exclusion"]
        Audit_Logger["Cryptographic Audit Logger<br/>SHA-256 CAP Dispatch Receipts"]
        Health_Monitor["/health Observability Engine"]
    end

    subgraph Client Application [Next.js App Router on Vercel]
        Map_View["Interactive GIS Leaflet Canvas<br/>Dark CartoDB, Inundation Polygons, Corridors"]
        Scenario_Ctrl["Scenario Switcher & Surge Slider<br/>(Low +1.5m / Base +3.0m / High +5.0m)"]
        Risk_Panel["District Vulnerability & Threat Index"]
        Asset_Drawer["Asset Breakdown & Referral Panel"]
        Advisory_Modal["DEOC Action Brief & Multilingual Broadcast"]
        Audio_TTS["Audio Speech Synthesis Readout"]
    end

    IMD --> Ingest
    IBTrACS --> Ingest
    GEE --> GEE_Engine
    OSM --> Risk_Engine

    Ingest --> Risk_Engine
    GEE_Engine --> Risk_Engine
    Risk_Engine --> Gemini_Pipeline
    Risk_Engine --> Routing_Engine
    Gemini_Pipeline --> Audit_Logger

    Risk_Engine --> Client_Application
    Gemini_Pipeline --> Advisory_Modal
    Routing_Engine --> Map_View
    Audit_Logger --> Advisory_Modal
    Health_Monitor --> Client_Application
```

---

## 2. Component Specifications

### 2.1 Geospatial Engine (Google Earth Engine)
- **Elevation:** USGS SRTM 30m DEM (`USGS/SRTMGL1_003`) identifies coastal lowlands below 5.0m elevation.
- **Rainfall:** NASA GPM IMERG V07 (`NASA/GPM_L3/IMERG_V07`) computes 6h, 12h, and 24h accumulated rainfall compared against historical percentile thresholds.
- **Surface Water:** JRC Global Surface Water (`JRC/GSW1_4/GlobalSurfaceWater`) removes persistent lakes, lagoons (Chilika), and estuaries from surge screening calculations.
- **Population:** WorldPop 100m Population Density (`WorldPop/GP/100m/pop`) estimates the number of citizens residing in each intersecting risk buffer.

### 2.2 Risk & Vulnerability Formula
The engine computes composite risk using transparent, configurable weights:
$$Risk = \text{normalize}(w_H \cdot \text{Hazard} + w_E \cdot \text{Exposure} + w_V \cdot \text{Vulnerability})$$

Where:
- $\text{Hazard} = w_{hw} \cdot \text{Wind} + w_{hr} \cdot \text{Rainfall} + w_{hs} \cdot \text{Surge}$
- $\text{Exposure} = w_{ep} \cdot \text{PopScore} + w_{ea} \cdot \text{Criticality} + w_{er} \cdot \text{Capacity}$
- $\text{Vulnerability} = w_{ve} \cdot \text{ElevVuln} + w_{vf} \cdot \text{FloodHistory} + w_{vp} \cdot \text{PowerBackup} + w_{vr} \cdot \text{RouteRedundancy}$

### 2.3 Gemini Grounded Advisory Generation
- Ingests a structured Evidence Packet containing computed metrics, storm status, and threatened facilities.
- Constrained with system prompts preventing hallucinated casualties or coordinates.
- Validates output using Pydantic JSON schemas.
- Produces simultaneous broadcasts in **English, Hindi, and Odia**.
