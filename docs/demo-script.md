# 🎬 SagarRakshak AI — 3–5 Minute Working Demo Video Script & Storyboard

> **Target Duration:** 3 minutes 45 seconds  
> **Speaker Role:** System Architect & Disaster Operations Specialist  
> **Screen Display:** SagarRakshak AI Live Web Dashboard (`http://localhost:3000`)

---

### **0:00 – 0:30 | The Problem & Vision**
- **Screen Action:** Open full-screen dashboard at `http://localhost:3000`. Show the dark Leaflet map of the Bay of Bengal and Odisha coastline, with the active banner: *Cyclone Fani — Category 5 ESCS (215 km/h)*.
- **Voiceover:**
  > *"When a Category 5 cyclone forms in the Bay of Bengal, meteorologists can tell us where the eye will travel. But for a District Emergency Operations Centre officer on the ground, the critical question is: What happens to our local hospitals, roads, power grids, and communities?*
  > 
  > *Welcome to SagarRakshak AI: 'From cyclone track to local infrastructure action in minutes.' Built for Track 5 of Build with AI: Code for Communities 2.0, SagarRakshak AI bridges the gap between planetary satellite data and life-saving local decisions."*

---

### **0:30 – 1:15 | Google Earth Engine Geospatial Screening**
- **Screen Action:**
  1. Hover over the Cyclone Track and the pulsing storm eye over the Puri coastline.
  2. Toggle the layer controls: turn on **Surge Inundation Screening** and switch between **Low (+1.5m)**, **Base (+3.0m)**, and **High (+5.0m)**.
  3. Show the dynamic inundation polygons penetrating the Kushabhadra and Bhargavi river estuaries.
- **Voiceover:**
  > *"Here, we are replaying Cyclone Fani making landfall over coastal Odisha using historical NOAA IBTrACS data. Powered by Google Earth Engine, SagarRakshak fuses the USGS SRTM 30m Digital Elevation Model with NASA GPM IMERG 24-hour rainfall accumulation and Dynamic World land cover.*
  > 
  > *Using hydro-connectivity screening, the platform instantly maps low-elevation zones vulnerable to storm surge backflow. As the officer adjusts the surge scenario from base 3-meter surge to high 5-meter spring-tide conditions, our risk engine recalculates exposure in real-time."*

---

### **1:15 – 2:05 | Multi-Hazard Infrastructure Vulnerability & Safe Routing**
- **Screen Action:**
  1. Pan to the left sidebar: show the **District Vulnerability Index** (Puri 91%, Jagatsinghpur 84%, Khurda 67%).
  2. Click on **Rank #1: District Headquarters Hospital (DHH) Puri**. The Asset Detail Drawer slides in from the right.
  3. Point out the hazard breakdown bars (Wind 95%, Rain 88%, Surge 78%), the 185,000 population served, and the warning that ground-floor ICUs are exposed.
  4. Click **"Plot Safe Route on Map"**. The glowing emerald evacuation corridor (NH-316) appears on the map.
- **Voiceover:**
  > *"Our formula evaluates Hazard × Exposure × Vulnerability for every critical asset. The system immediately pinpoints District Headquarters Hospital Puri as the highest-priority threat because its ground-floor ICU sits at just 7.5 meters elevation in direct reach of storm surge backflow.*
  > 
  > *Crucially, SagarRakshak goes beyond static flood maps by assessing network disruption. It identifies that the coastal Marine Drive is impassable, and automatically plots an elevated evacuation corridor along National Highway 316 to safely divert acute trauma patients to AIIMS Bhubaneswar."*

---

### **2:05 – 3:00 | Grounded Gemini Multimodal Reasoning & Multilingual Dissemination**
- **Screen Action:**
  1. Click the primary **"⚡ Generate Action Brief"** button in the top navbar.
  2. The Gemini Advisory Modal opens.
  3. Highlight the **DEOC Situation Summary** and the **Actionable Pre-Landfall Directives** with explicit evidence citations (`[ELEV_7.5M]`, `[WIND_215KMH]`, `[BHARGAVI_BRIDGE]`).
  4. Click between the tabs: **English**, **हिन्दी (Hindi)**, and **ଓଡ଼ିଆ (Odia)**.
  5. Click **"Audio Readout (TTS)"** to play the synthesized voice warning.
  6. In the Officer Authentication section, show the officer name and ID, then click **"Approve & Dispatch Public Alert (CAP Protocol)"**.
  7. Show the instant **Official Dispatch Confirmation Receipt** and the **SHA-256 Cryptographic Audit Hash**.
- **Voiceover:**
  > *"Now comes the core AI reasoning. Clicking 'Generate Action Brief' sends our computed evidence packet to Gemini Flash. Gemini generates a concise executive situation summary and prioritizes action items, with every single recommendation strictly grounded in our data evidence tokens—preventing any AI hallucinations.*
  > 
  > *For public early warnings, Gemini generates synchronized, culturally authentic alerts in English, Hindi, and native Odia for coastal fishing communities, complete with audio text-to-speech and SMS formats.*
  > 
  > *Because human accountability is paramount in disaster response, no message is broadcast autonomously. Once the DEOC officer reviews and approves the alert, the platform issues an unalterable CAP dispatch receipt backed by a cryptographic SHA-256 audit hash."*

---

### **3:00 – 3:35 | System Observability & Scale Across India**
- **Screen Action:**
  1. Close the advisory modal and click the **"Health"** button in the top navbar.
  2. Show the live status and sub-50ms latencies for the IMD API, NOAA IBTrACS, Google Earth Engine, Gemini Flash, and Google Routes API.
  3. Briefly scrub the bottom **Timeline Scrubber** to demonstrate tracking from T-48h approach to landfall.
- **Voiceover:**
  > *"SagarRakshak AI is built for national scale on Google Cloud Run and FastAPI. Our system health monitor proves live connectivity across all data adapters, with client-side caching to ensure zero downtime during peak weather traffic.*
  > 
  > *The architecture is fully modular, allowing rapid deployment across all 13 coastal states of India—from Odisha to Gujarat."*

---

### **3:35 – 3:45 | Closing Summary**
- **Screen Action:** Return to the full dashboard view with the active cyclone layers glowing.
- **Voiceover:**
  > *"SagarRakshak AI transforms complex meteorological data into transparent, localized, pre-landfall decisions—saving lives and protecting lifelines before the storm hits. Thank you."*
