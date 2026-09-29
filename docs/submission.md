# 📋 SagarRakshak AI — Hackathon Submission Package
> **Event:** Build with AI: Code for Communities 2.0  
> **Track:** Track 5 — AI-Powered Predictive Risk & Vulnerability  
> **Deadline:** 30 September 2026

---

### **1. Project Metadata**
- **Project Title:** SagarRakshak AI (सागररक्षक)
- **Tagline:** *"From cyclone track to local infrastructure action in minutes."*
- **Theme / Track:** Track 5 (Disaster Risk & Infrastructure Vulnerability)
- **Target Persona:** District Emergency Operations Centre (DEOC) officers, Municipal Commissioners, and State Disaster Management Authorities (SDMAs).

---

### **2. Official Submission Copy**

#### **Two-Line Project Description (Portal Requirement)**
> **SagarRakshak AI is a Google Earth Engine and Gemini-powered cyclone decision-support platform that converts official storm tracks, satellite rainfall, and geospatial exposure data into local infrastructure-risk maps. It ranks threatened hospitals, shelters, roads, and communities, recommends safer actions, and generates evidence-grounded multilingual advisories with human approval.**

#### **One-Line Differentiator**
> **Not another generic weather map: it connects cyclone hazard directly to infrastructure disruption, route accessibility, and an auditable, evidence-cited action brief.**

---

### **3. Key Google Technologies Used (Judging Verification)**
1. **Google Earth Engine (GEE):**
   - High-resolution planetary raster processing: USGS SRTM 30m Digital Elevation Model, NASA GPM IMERG V07 Precipitation Accumulation, Dynamic World Land Cover, JRC Global Surface Water, and WorldPop 100m Population Density Grids.
2. **Google Gemini Flash (3.7 / 2.5):**
   - Grounded multimodal reasoning, evidence citation extraction (`[ELEV_7.5M]`, `[WIND_215KMH]`), and localized multilingual warning synthesis in **English, Hindi, and Odia (ଓଡ଼ିଆ)**.
3. **Google Routes API / Maps Platform:**
   - Pre-landfall evacuation corridor calculation bypassing inundated river causeways (NH-316).
4. **Google Cloud Run:**
   - Production container hosting for stateless, auto-scaling backend API services.

---

### **4. Submission Deliverables Checklist**

| Item | Requirement | Location / Reference |
|---|---|---|
| **Public GitHub Repository** | Complete codebase, documentation, tests, and MIT license | [github.com/anshkumar7652/sagarrakshak-ai](https://github.com/anshkumar7652/sagarrakshak-ai) |
| **Working Prototype URL** | Live accessible web application | [sagarrakshak-ai.vercel.app](https://sagarrakshak-ai.vercel.app) |
| **Interactive Pitch Deck** | 11-slide deck with Chart.js and dark glass UI | [sagarrakshak-ai.vercel.app/slides](https://sagarrakshak-ai.vercel.app/slides) (also in [`docs/pitch-deck.md`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/docs/pitch-deck.md)) |
| **Working Demo Video (3–5 Min)** | Full hero workflow demonstration with voiceover | [`docs/demo-script.md`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/docs/demo-script.md) |
| **Judging Evidence Matrix** | 1:1 mapping of official rubric criteria to code | [`docs/judging-evidence.md`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/docs/judging-evidence.md) |
| **Automated Test Suite** | Unit & integration tests for risk engine and schemas | `pytest` (16/16 tests passing) |
| **Data Cards & Model Card** | Sources, licenses, update frequencies, and limitations | [`docs/data-cards.md`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/docs/data-cards.md), [`docs/model-card.md`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/docs/model-card.md) |
| **Responsible AI Guidelines** | Human-in-the-loop, anti-panic standards, SHA-256 CAP receipts | [`docs/responsible-ai.md`](file:///c:/ANSH(DRIVE-D)/Workspace-01/Projects/sagarrakshak-ai/docs/responsible-ai.md) |
