# Judging Evidence & Rubric Traceability Matrix

This document maps the **Build with AI: Code for Communities 2.0** official evaluation criteria directly to SagarRakshak AI’s technical implementation, architecture, and live prototype.

---

## Rubric Breakdown & Evidence Mapping

| Rubric Criterion | Weight | Required Hackathon Evidence | SagarRakshak AI Implementation & Artifacts |
|---|:---:|---|---|
| **Problem–Solution Fit** | **20%** | Clear alignment with Track 5 (Disaster Risk & Vulnerability); workflow tailored for disaster authorities rather than generic weather viewers. | • **User Persona:** District Emergency Operations Centre (DEOC) officer, not general public.<br/>• **Golden Path:** Cyclone track ingestion $\rightarrow$ multi-hazard screening $\rightarrow$ infrastructure exposure $\rightarrow$ safe routing $\rightarrow$ grounded multilingual advisory.<br/>• **Evidence:** [`apps/web/src/components/RiskSidebar.tsx`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/apps/web/src/components/RiskSidebar.tsx) and [`apps/web/src/components/AdvisoryModal.tsx`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/apps/web/src/components/AdvisoryModal.tsx). |
| **AI / Technical Execution** | **25%** | Deep and meaningful integration of Google AI & Google Earth Engine; real geospatial processing; structured outputs; verifiable methodology. | • **Google Earth Engine (GEE):** Integrates 5 planetary collections (GPM IMERG rain, SRTM 30m DEM, Dynamic World LULC, JRC Surface Water, WorldPop).<br/>• **Gemini 3.7 / 2.5 Flash:** Generates grounded action briefs & multilingual alerts adhering to strict Pydantic JSON schemas with evidence token citations (`[ELEV_7.5M]`, `[WIND_215KMH]`).<br/>• **Transparent Risk Engine:** Configurable $Risk = Hazard \times Exposure \times Vulnerability$ formula in [`services/api/app/services/risk/engine.py`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/services/api/app/services/risk/engine.py).<br/>• **Automated Unit Tests:** 8/8 tests passing ([`tests/test_risk_engine.py`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/tests/test_risk_engine.py)). |
| **Depth & Reach Across India** | **20%** | Extensibility to coastal and inland Indian states; multilingual localization; administrative granularity (District/Block level). | • **Multilingual Localized Dissemination:** Real-time alert generation in **English, Hindi, and Odia (ଓଡ଼ିଆ)** with dialect-specific disaster terminology.<br/>• **State & District Extensibility:** Config-driven AOI architecture supporting Odisha (Puri, Jagatsinghpur, Khurda) plus modular adapter support for Andhra Pradesh, Tamil Nadu, and West Bengal.<br/>• **CAP Protocol Alignment:** Formatted for NDMA Common Alerting Protocol (CAP) and low-bandwidth SMS (160 characters). |
| **Impact Potential** | **15%** | Tangible reduction in disaster losses; quantifiable population and critical asset protection; lifeline route preservation. | • **Evidence-based Exposure Accounting:** Exact population counts derived from WorldPop 100m grids (~1.37M exposed in demo AOI).<br/>• **Asset Criticality Prioritization:** Ranks hospital ICU vulnerability, backup power dependencies, and cyclone shelter intake capacities.<br/>• **Network Disruption & Safe Routing:** Detects road inundation overtopping (NH-316, Marine Drive) and computes high-embankment evacuation corridors. |
| **Deployability & Scalability** | **20%** | Production deployment readiness; latency SLAs; caching policies; reproducibility; observability and audit trail. | • **Live Prototype:** Next.js frontend built with Turbopack + FastAPI asynchronous backend on Cloud Run / Vercel.<br/>• **Observability:** Live `/health` endpoint reporting adapter latencies, cache status, and versioning.<br/>• **IMD API Compliance:** Client-side 5-minute caching to eliminate gateway hammering during severe weather demand.<br/>• **Cryptographic Audit Trail:** Every officer-approved alert logs an unalterable SHA-256 hash receipt with timestamp. |

---

## Google Technologies Used

1. **Google Earth Engine (GEE):**
   - Raster processing of USGS SRTM 30m Digital Elevation Model (`USGS/SRTMGL1_003`)
   - NASA GPM IMERG V07 Precipitation Accumulation (`NASA/GPM_L3/IMERG_V07`)
   - Near-real-time Land Use / Land Cover via Dynamic World (`GOOGLE/DYNAMICWORLD/V1`)
   - Persistent flood baseline via JRC Global Surface Water (`JRC/GSW1_4/GlobalSurfaceWater`)
   - High-resolution population density grids via WorldPop (`WorldPop/GP/100m/pop`)
2. **Gemini 3.7 / 2.5 Flash:**
   - Multi-turn multimodal reasoning, grounded DEOC situation synthesis, evidence citation extraction, and multilingual translation (EN, HI, OR).
3. **Google Routes API / Maps Platform:**
   - Evacuation corridor navigation avoiding flood-inundated bridge crossings and causeways.
4. **Google Cloud Run:**
   - Stateless, scalable serverless container hosting for backend API with sub-second scaling.
