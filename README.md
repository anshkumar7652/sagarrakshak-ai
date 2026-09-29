<div align="center">
  <img src="docs/assets/team_logo.png" alt="SagarRakshak AI Logo" width="150" style="border-radius: 24px;" />
  <h1>🌊 SagarRakshak AI (सागररक्षक)</h1>
  <p><strong><em>“From cyclone track to local infrastructure action in minutes.”</em></strong></p>
  <p><strong>Track 5: AI-Powered Predictive Risk & Vulnerability Platform</strong><br/>
  <em>Build with AI: Code for Communities 2.0 (Google Developers Group / Hack2skill)</em></p>
</div>

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org)
[![Google Earth Engine](https://img.shields.io/badge/Google%20Earth%20Engine-Planetary%20Data-4285F4?style=flat&logo=google)](https://earthengine.google.com)
[![Gemini AI](https://img.shields.io/badge/Gemini%20Flash-Grounded%20Reasoning-8E75C2?style=flat&logo=google)](https://ai.google.dev)
[![Tests Passing](https://img.shields.io/badge/Tests-16%2F16%20Passing-10b981?style=flat)]()
[![Live Prototype](https://img.shields.io/badge/Live%20Prototype-sagarrakshak--ai.vercel.app-00dfa2?style=flat&logo=vercel)](https://sagarrakshak-ai.vercel.app)
[![Pitch Deck](https://img.shields.io/badge/Pitch%20Deck-Interactive%20Slides-blueviolet?style=flat)](https://sagarrakshak-ai.vercel.app/slides)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🚀 **Live Production Prototype:** [https://sagarrakshak-ai.vercel.app](https://sagarrakshak-ai.vercel.app)  
> 📊 **Interactive Pitch Deck:** [https://sagarrakshak-ai.vercel.app/slides](https://sagarrakshak-ai.vercel.app/slides)  
> 🗺️ **Operational Command Dashboard:** [https://sagarrakshak-ai.vercel.app/dashboard](https://sagarrakshak-ai.vercel.app/dashboard)

---

### 🖥️ Platform Showcase

<div align="center">
  <img src="docs/assets/dashboard_live.png" alt="SagarRakshak AI Operational Command Dashboard" width="100%" />
  <p><em><b>Operational Command Dashboard:</b> Live Cyclone Fani landfall tracking over Odisha, 1.37M exposed citizens screened via WorldPop 100m grids, and facility-level risk rankings.</em></p>
</div>

<br/>

<div align="center">
  <img src="docs/assets/landing_page.png" alt="SagarRakshak AI Landing Page" width="100%" />
  <p><em><b>Public Decision-Support Portal:</b> Sub-meter coastal risk screening, GEE planetary data fusion, and zero-hallucination Gemini advisory generation.</em></p>
</div>

---

## 📌 Executive Summary

Current disaster systems inform authorities **where a cyclone will go**, but leave a critical gap in answering **what local infrastructure will fail, which populations are cut off, and what actions must be taken first**.

**SagarRakshak AI** bridges this gap for **District Emergency Operations Centre (DEOC) officers**. By fusing **Google Earth Engine (GEE)** satellite feeds, **IMD cyclone advisories**, and **Gemini Flash multimodal reasoning**, it converts cyclone tracks into local, actionable infrastructure-risk maps. The platform ranks threatened hospitals, shelters, power grids, and arterial roads, recommends safer alternatives, and generates evidence-grounded multilingual advisories with human approval.

---

## 🎯 The Hero Workflow

```
[1. Choose Scenario]      Cyclone Fani Historical Replay OR IMD Live Feed
        │
        ▼
[2. Ingest Track]         Sync synoptic coordinates, wind radii (215 km/h), central pressure
        │
        ▼
[3. Run GEE Screening]    USGS SRTM 30m DEM + NASA GPM IMERG 24h Rain + Dynamic World LULC
        │
        ▼
[4. Calculate Risk]       Risk = Hazard × Exposure × Vulnerability across coastal infrastructure
        │
        ▼
[5. Rank Interventions]   Pinpoints Top 5 critical threats (e.g. DHH Puri ground-floor ICU inundation)
        │
        ▼
[6. Plot Safe Route]      Navigates around inundated roads via elevated high-embankment corridors (NH-316)
        │
        ▼
[7. Gemini Reasoning]     Grounded Action Brief + Multilingual alerts (English, हिन्दी, ଓଡ଼ିଆ) + Audio TTS
        │
        ▼
[8. Human Approval]       DEOC Officer edits/authorizes dispatch; generates unalterable SHA-256 CAP receipt
```

---

## 📊 Rubric Traceability & Judging Evidence

| Rubric Criterion | Weight | How SagarRakshak AI Wins | Exact Source Code Reference |
|---|:---:|---|---|
| **Problem–Solution Fit** | **20%** | Built specifically for DEOC officers and SDMAs. Resolves the pre-landfall bottleneck with prioritized operational checklists. | [`apps/web/src/components/RiskSidebar.tsx`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/apps/web/src/components/RiskSidebar.tsx) |
| **AI / Technical Execution** | **25%** | • Real GEE analysis (SRTM, GPM, Dynamic World, WorldPop).<br/>• Gemini Flash structured JSON outputs with evidence tokens.<br/>• Transparent, configurable $H \times E \times V$ risk formula. | [`services/api/app/services/risk/engine.py`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/services/api/app/services/risk/engine.py)<br/>[`services/api/app/services/gemini/advisory.py`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/services/api/app/services/gemini/advisory.py) |
| **Depth & Reach Across India** | **20%** | • Multilingual alerts in **English, Hindi, and Odia (ଓଡ଼ିଆ)**.<br/>• Config-driven state adapters (Odisha validated, scalable to AP, TN, WB).<br/>• Formatted for NDMA Common Alerting Protocol (CAP). | [`apps/web/src/components/AdvisoryModal.tsx`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/apps/web/src/components/AdvisoryModal.tsx) |
| **Impact Potential** | **15%** | Computes exposed population via WorldPop 100m grids (~1.37M citizens in demo AOI) and detects road access disruptions before landfall. | [`docs/validation.md`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/docs/validation.md) |
| **Deployability & Scalability** | **20%** | • Production Docker container & live `/health` latency endpoint.<br/>• IMD 5-minute caching to eliminate server hammering.<br/>• Cryptographic SHA-256 audit receipts on every alert dispatch. | [`services/api/app/routers/health.py`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/services/api/app/routers/health.py)<br/>[`Dockerfile`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/Dockerfile) |

---

## 🛠️ System Architecture

```
IMD APIs + NOAA IBTrACS + GPM Rainfall + SRTM 30m Elevation + WorldPop
                              │
                              ▼
           FastAPI Ingestion & Cache Adapter (Cloud Run)
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
   Google Earth Engine (GEE)      Risk & Vulnerability Engine
    Raster Spatial Screening         Hazard × Exposure × Vuln
               │                             │
               └──────────────┬──────────────┘
                              ▼
           ┌──────────────────┴──────────────────┐
           ▼                                     ▼
    Gemini 3.7 / 2.5 Flash            Google Routes API
  Grounded Multilingual Brief     Safe Evacuation Navigation
           │                                     │
           └──────────────────┬──────────────────┘
                              ▼
             Next.js 14+ Geospatial Command Dashboard
                    (Hosted on Vercel / Cloud Run)
```

---

## 🚀 Quickstart Guide

### Option 1: Running Locally (Fastest)

#### 1. Backend (FastAPI)
```bash
cd services/api
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
*API docs available at: `http://localhost:8000/docs`*  
*Health endpoint: `http://localhost:8000/health`*

#### 2. Frontend (Next.js Dashboard)
```bash
cd apps/web
npm install
npm run dev
```
*Open `http://localhost:3000` in your browser.*

---

### Option 2: Running with Docker Compose (Production Setup)

SagarRakshak AI provides production-optimized multi-stage Docker builds for both the Next.js frontend and FastAPI backend:

1. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your GEMINI_API_KEY, GEE credentials, and SMTP settings
   ```

2. **Build and Launch Containers:**
   ```bash
   docker compose up --build -d
   ```

3. **Verify Deployment:**
   - **Frontend UI:** `http://localhost:3000`
   - **Backend OpenAPI Docs:** `http://localhost:8000/docs`
   - **System Health & Latency:** `http://localhost:8000/health`

4. **Manage Containers:**
   ```bash
   # Follow live service logs
   docker compose logs -f

   # Gracefully shut down containers
   docker compose down
   ```

---

## 🧪 Automated Test Suite

Run all unit tests across the risk engine, hazard bounds, Gemini schemas, enterprise modules, and data adapters:

```bash
pytest -o pythonpath=services/api tests -v
```

Output:
```text
tests/test_adapters.py::test_ibtracs_fani_parsing PASSED                 [  6%]
tests/test_adapters.py::test_imd_feed_caching PASSED                     [ 12%]
tests/test_enterprise_modules.py::test_root_endpoint PASSED              [ 18%]
tests/test_enterprise_modules.py::test_assets_api PASSED                 [ 25%]
tests/test_enterprise_modules.py::test_audit_and_verification PASSED     [ 31%]
tests/test_enterprise_modules.py::test_cap_xml_endpoint PASSED           [ 37%]
tests/test_enterprise_modules.py::test_multimodal_bulletin_extraction PASSED [ 43%]
tests/test_enterprise_modules.py::test_cyclone_analytics_comparison PASSED [ 50%]
tests/test_gemini_schema.py::test_grounded_advisory_structure PASSED     [ 56%]
tests/test_gemini_schema.py::test_evidence_id_linkage PASSED             [ 62%]
tests/test_health.py::test_system_health_endpoint PASSED                 [ 68%]
tests/test_risk_engine.py::test_risk_analysis_output_structure PASSED    [ 75%]
tests/test_risk_engine.py::test_risk_score_bounds PASSED                 [ 81%]
tests/test_risk_engine.py::test_risk_ranking_order PASSED                [ 87%]
tests/test_risk_engine.py::test_inundation_hazard_sensitivity PASSED     [ 93%]
tests/test_routing.py::test_compute_safe_evacuation_route PASSED         [100%]
============================== 16 passed in 1.57s ==============================
```

---

## 📚 Documentation Index

| Document | Purpose | Link |
|---|---|---|
| **Architecture Specification** | High-level system design, data flow, pipeline architecture | [`docs/architecture.md`](file:///docs/architecture.md) |
| **Model Card** | Gemini 3.7 / 2.5 Flash, evidence grounding, ethical considerations | [`docs/model-card.md`](file:///docs/model-card.md) |
| **Data Cards** | GEE, NOAA IBTrACS, IMD, OSM, WorldPop dataset specs | [`docs/data-cards.md`](file:///docs/data-cards.md) |
| **Validation Report** | Cyclone Fani historical validation, ground truth comparison | [`docs/validation.md`](file:///docs/validation.md) |
| **Responsible AI** | HITL safeguards, anti-panic controls, privacy compliance | [`docs/responsible-ai.md`](file:///docs/responsible-ai.md) |
| **Judging Evidence** | Direct mapping of rubric criteria to codebase artifacts | [`docs/judging-evidence.md`](file:///docs/judging-evidence.md) |
| **Pitch Deck Specification** | 11-slide pitch deck structure, problem statement, market | [`docs/pitch-deck.md`](file:///docs/pitch-deck.md) |
| **Demo Script** | Minute-by-minute walkthrough script for screen recording | [`docs/demo-script.md`](file:///docs/demo-script.md) |
| **Submission Copy** | Pre-written text fields for Hack2skill submission portal | [`docs/submission.md`](file:///docs/submission.md) |

---

## 🔒 Responsible AI & Safety Principles

1. **Strict Evidence Grounding:** Gemini is supplied with computed data packets; speculative casualty counts or coordinates are strictly prohibited.
2. **Human-In-The-Loop (HITL):** No warning is ever dispatched to citizen phones or CAP servers without explicit officer review and authorization.
3. **Anti-Panic Standard:** All language adheres to official NDMA/OSDMA broadcast guidelines.
4. **Transparent Methodology:** All hazard screening, inundation water heads, and elevation criteria are configuration parameters visible in the open-source repository.

---

## 📄 License
This project is licensed under the MIT License — see the [`LICENSE`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/LICENSE) file for details.
