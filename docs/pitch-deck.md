# 📑 SagarRakshak AI — 11-Slide Pitch Deck Specification
### *“From cyclone track to local action in minutes.”*

> **Track 5:** AI-Powered Predictive Risk & Vulnerability Platform  
> **Event:** Build with AI: Code for Communities 2.0  
> **Format:** 10–12 Slides (Structured to answer all 5 rubric criteria)

---

### **Slide 1: Title & Vision**
- **Headline:** SagarRakshak AI (सागररक्षक)
- **Tagline:** *"From cyclone track to local infrastructure action in minutes."*
- **Sub-caption:** Multi-hazard decision support fusing Google Earth Engine, IMD cyclone feeds, and Gemini Flash multimodal reasoning.
- **Team / Track:** Track 5 — Predictive Risk & Vulnerability | Code for Communities 2.0.

---

### **Slide 2: The Core Problem**
- **The Bottleneck:** Modern meteorology (IMD) reliably forecasts *where a cyclone will make landfall*, but disaster officers face a critical 24-hour pre-landfall bottleneck:
  - *Which hospital ground-floor ICUs will flood?*
  - *Which arterial roads and bridges will be submerged by storm surge?*
  - *Which communities must be evacuated first, and to which specific cyclone shelters?*
- **Current Reality:** Fragmented static flood maps, manual spreadsheet lookups, and ungrounded broadcast delays lead to reactive rather than preemptive evacuations.

---

### **Slide 3: User Persona — The DEOC Commander**
- **Primary User:** District Emergency Operations Centre (DEOC) Officer (e.g. Puri District Control Room, Odisha).
- **Critical Pre-Landfall Decisions (T-48h to T-0):**
  1. *Identify highest-risk blocks* (Puri Sadar, Astaranga, Brahmagiri, Ersama).
  2. *Assess critical lifeline vulnerability* (DHH Puri ICU, OPTCL Samagara power substation, NH-316 highway).
  3. *Issue verified, culturally authentic early warnings* to citizens in their native dialect before cellular towers fail.

---

### **Slide 4: The SagarRakshak AI Solution**
- **End-to-End Decision Flow:**
  $$\text{IMD Cyclone Track} \longrightarrow \text{GEE Planetary Screening} \longrightarrow \text{Multi-Hazard Risk Engine} \longrightarrow \text{Gemini Action Brief} \longrightarrow \text{CAP Dispatch}$$
- **Key Differentiator:** Not another generic weather tracking map — it connects meteorological hazard directly to **infrastructure disruption, route accessibility, and auditable action directives**.

---

### **Slide 5: Live Demonstration — Cyclone Fani Replay**
- **Historical Ground-Truth Validation:** Replays Cat-5 Extremely Severe Cyclonic Storm Fani (215 km/h landfall over Puri Coast).
- **Screening Layers:**
  - **Surge Inundation:** 3-scenario screening (Low +1.5m / Base +3.0m / High +5.0m) via USGS SRTM 30m DEM minus persistent water.
  - **Precipitation Saturation:** NASA GPM IMERG V07 24-hour accumulation (>312mm).
  - **Wind Decay Buffer:** Parametric radial wind model intersecting infrastructure.

---

### **Slide 6: AI & Technical Depth (Google Stack)**
- **Google Earth Engine (GEE):** Server-side raster processing across 5 planetary collections (SRTM DEM, GPM IMERG, Dynamic World LULC, JRC Water, WorldPop).
- **Gemini Flash Reasoning:**
  - Ingests structured Evidence Packets.
  - Generates grounded, panic-free action items citing explicit evidence tokens (`[ELEV_7.5M]`, `[WIND_215KMH]`, `[BHARGAVI_BRIDGE]`).
  - Multilingual translation across English, Hindi, and Odia.
- **Google Routes API:** Real-time evacuation routing avoiding submerged causeways.

---

### **Slide 7: Infrastructure Disruption & Safe Routing**
- **Direct vs Indirect Risk:**
  - *Direct Risk:* Structural wind load on transmission towers and coastal shelters.
  - *Indirect / Network Risk:* Loss of road access to hospitals due to river backflow.
- **Safe Evacuation Corridors:** Automatically identifies high-embankment routes (e.g. NH-316 bypassing Bhargavi River low spillways) to divert emergency ambulances from DHH Puri to AIIMS Bhubaneswar.

---

### **Slide 8: Depth & Reach Across India**
- **Linguistic Localization:** Native Odia (ଓଡ଼ିଆ) dialect for coastal fishing communities, Hindi for inter-state NDRF coordination, and English for ministerial briefs.
- **Multi-State Extensibility:** Config-driven architecture supporting Odisha, Andhra Pradesh, West Bengal, Tamil Nadu, and Gujarat.
- **Multi-Channel Dissemination:** Formatted for NDMA Common Alerting Protocol (CAP), police VHF dispatch, and low-bandwidth SMS (160 characters).

---

### **Slide 9: Quantifiable Humanitarian Impact**
- **Population Safeguarded:** Computes exact population in harm's way via WorldPop 100m grids (~1.37M residents in demo AOI).
- **Zero-Casualty Enablement:** Preemptively shifts ICU wards to higher elevations and pre-stages diesel generators at cyclone shelters 12 hours before storm impact.
- **Asset Protection:** Safeguards critical grid infrastructure via controlled load-shedding to prevent coastal salt-spray transformer explosions.

---

### **Slide 10: Responsible AI, Security & Deployability**
- **Mandatory Human-in-the-Loop:** No autonomous public dispatch without officer review and digital signature.
- **Cryptographic Audit Trail:** Unalterable SHA-256 hash receipt recorded with timestamp, officer ID, and evidence citations.
- **Production Architecture:** FastAPI asynchronous container on Cloud Run with sub-second auto-scaling, client-side 5-minute caching to protect IMD gateways, and live `/health` observability.

---

### **Slide 11: Roadmap & The Ask**
- **Phase 1 (Current):** Working prototype with Odisha coastal districts & Cyclone Fani historical backtest.
- **Phase 2 (Next 6 Months):** Field pilot integration with Odisha State Disaster Management Authority (OSDMA) and Andhra Pradesh SDMA.
- **Phase 3 (Scale):** National rollout across all 13 coastal states and integration with the national Sachet CAP portal.
- **Closing Call:** *"SagarRakshak AI turns complex satellite science into decisive local action—protecting lives and lifelines before disaster strikes."*
