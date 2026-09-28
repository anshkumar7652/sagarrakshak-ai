# High-Scoring Build Plan: Cyclone Impact & Infrastructure Vulnerability Forecaster
## Executive answer
The strongest submission is **not** a broad disaster-management portal. Build one polished, evidence-backed end-to-end decision flow: **select an approaching or historical cyclone → generate scenario-based surge, rainfall and wind hazard layers → rank exposed infrastructure and population → recommend safe actions/routes → produce a multilingual, human-approved warning**.

A suitable project identity is **SagarRakshak AI — “From cyclone track to local action in minutes.”** The demo should replay **Cyclone Fani over coastal Odisha** using real historical data, while the architecture also accepts current IMD cyclone feeds. This gives judges a reliable demo even when no cyclone is active.

The official current rubric is: **Problem–Solution Fit 20%, AI/Technical Execution 25%, Depth & Reach Across India 20%, Impact Potential 15%, and Deployability & Scalability 20%**.[^1] Older explainers and articles show different criteria from an earlier edition, so the **current event page and submission portal must be treated as authoritative**.[^2][^3]
## Official requirements
The selected Track 5 asks for an AI-powered predictive risk and vulnerability platform using **Google Earth Engine satellite feeds, real-time meteorological data, and Gemini 3.7 Flash multimodal reasoning**. It specifically expects storm-surge simulation, local rainfall-damage pathways, exposure mapping for power grids, arterial roads and medical shelters, plus automated early-warning advisories for municipal and disaster-management authorities.[^1]

The current submission deadline shown by the event is **30 September 2026**; the published timeline places prototype evaluation from 1–15 October, the Top 20 announcement on 16 October and Virtual Demo Day on 23 October.[^1][^4] Because very little build time remains, the correct strategy is a narrow working MVP with excellent evidence and presentation—not five partially implemented modules.
### Mandatory package
The current event instructions require:

- A functioning end-to-end prototype for the track’s core use case.
- Meaningful Google AI integration; submissions without it are not considered.
- Real or realistic data from public datasets, APIs or defensible samples.
- Design for scale across Indian states and communities.
- Public or access-granted GitHub source repository.
- A 3–5 minute working demo video.
- A 10–12 slide pitch deck.
- A 2–3 line project description.
- A live deployed prototype link.[^1]

Rules also require work to be built during the hackathon period, code to be original or based on correctly licensed and cited open-source components, and cross-border applicability to other BRICS contexts.[^1] The team may have up to four members and registration is free.[^1]
## Winning product scope
### Primary user
Design first for a **District Emergency Operations Centre officer**, not the general public. This user needs to answer four questions quickly:

1. Where will the highest-risk areas probably be?
2. Which hospitals, shelters, power assets and roads are exposed?
3. Which actions should be taken first, and why?
4. What warning should be sent, to whom, and in which language?

The public-facing alert view can be the second persona. This keeps the product directly aligned with “local municipal and disaster-management authorities” while still showing community impact.
### Hero workflow
The entire demo should follow a single golden path:

1. **Choose scenario:** “Cyclone Fani — historical replay” or “Current IMD feed.”
2. **Ingest track:** load cyclone position, wind, pressure and forecast cone.
3. **Run analysis:** display low/base/high scenarios for wind, coastal inundation and rainfall.
4. **Calculate exposure:** intersect hazard with population, hospitals/shelters, roads and power assets.
5. **Rank interventions:** show top five at-risk assets and recommended actions with reasons.
6. **Plan movement:** show a shelter or hospital route that avoids high-risk road segments.
7. **Generate advisory:** Gemini creates a grounded district brief and citizen alert in English, Hindi and Odia.
8. **Human approval:** officer edits/approves the message; the system logs a mock dispatch with time, audience and evidence.

A single screen recording completing this flow is more valuable than separate dashboards that do not connect.
### Do not build
- Do not claim a new operational cyclone forecasting model.
- Do not let Gemini invent meteorological values or make evacuation decisions by itself.
- Do not build native Android and iOS apps before the web MVP works.
- Do not spend time on authentication, payment, social features or a complex multi-agent framework.
- Do not label a simple elevation threshold as a scientifically validated storm-surge forecast.
- Do not show fabricated accuracy, lives saved or population-impact numbers.
## Technical architecture
```text
IMD cyclone APIs + historical IBTrACS + rainfall feeds
                         |
                         v
              Ingestion/API adapter layer
                 (Python, Cloud Run)
                         |
              +----------+----------+
              |                     |
              v                     v
       Google Earth Engine      Firestore/BigQuery
  elevation, rain, land cover   tracks, assets, runs,
  water, population, imagery    advisories, audit log
              |                     |
              +----------+----------+
                         v
              Risk and exposure engine
        hazard × exposure × vulnerability
                         |
              +----------+-----------+
              |                      |
              v                      v
       Gemini 3.7 Flash         Routes/Maps API
 grounded summaries,         evacuation and access
 multilingual alerts          route visualisation
              |                      |
              +----------+-----------+
                         v
             React/Next.js operations dashboard
               hosted on Firebase or Cloud Run
```

This architecture makes every Google service visible and purposeful. Earth Engine performs geospatial analysis, Gemini performs multimodal interpretation and communication, Maps/Routes supports operational movement, and Cloud Run plus Firestore provide a credible deployment path.
### Recommended stack
| Layer | Choice | Why it helps judging |
|---|---|---|
| Front end | React/Next.js, Google Maps JavaScript API | Fast to build; clear spatial storytelling |
| API | FastAPI on Cloud Run | Simple Python integration and scalable stateless deployment |
| Geospatial | Google Earth Engine Python API | Mandatory track technology; server-side planetary-scale raster operations |
| AI | Gemini 3.7 Flash through Vertex AI or Gemini API | Required multimodal reasoning, structured output and multilingual advisory generation |
| Storage | Firestore for MVP; BigQuery as scale path | Fast prototype plus credible national analytics architecture |
| Routing | Google Routes API | Calculates directions and travel-time information; the API also supports route matrices.[^5][^6] |
| Hosting | Firebase Hosting or Cloud Run | Produces the mandatory live link |
| Scheduled ingestion | Cloud Scheduler → Cloud Run; optional Pub/Sub | Shows how feeds can update without manual action |

Gemini 3.7 Flash is a natively multimodal reasoning model, and its current API model ID is `gemini-3.7-flash`.[^7][^8] Use that exact model only if it is enabled for the team’s account; otherwise document the available Gemini model and ask the event support channel whether substitution is accepted.
## Data plan
### Minimum viable sources
| Need | Primary source | Use in product |
|---|---|---|
| Current cyclone track/wind/cone | IMD Cyclone Track, Cyclone Wind Warning and Cone of Uncertainty APIs | Current operational scenario; IMD publishes dedicated endpoints for all three.[^9] |
| Historical tracks | `NOAA/IBTrACS/v4` in Earth Engine | Historical replay and basic backtesting; IBTrACS provides global cyclone position and intensity, usually at three-hour intervals.[^10] |
| Rainfall | `NASA/GPM_L3/IMERG_V07` | Rain accumulation and rainfall hazard; IMERG supplies half-hourly global estimates, with quality fields.[^11] |
| Elevation | `USGS/SRTMGL1_003` or NASADEM | Low-elevation and drainage susceptibility; both provide approximately 30 m elevation.[^12][^13] |
| Land cover | `GOOGLE/DYNAMICWORLD/V1` | Built-up, water and flooded-vegetation context; Dynamic World is a near-real-time 10 m land-cover product.[^14] |
| Historic water | `JRC/GSW1_4/GlobalSurfaceWater` | Persistent-water mask and historical flood context.[^15] |
| Population | `WorldPop/GP/100m/pop` | Estimate people in each risk zone; the catalog supplies approximately 100 m population grids.[^16] |
| Roads and facilities | OpenStreetMap/verified open government data or Google Places for discovery | Infrastructure exposure and routing; preserve source and licence metadata |
| Warnings | IMD district warnings and state/district rainfall forecast | Ground truth for current advisories and model context.[^9] |

IMD asks API users to provide attribution and use client-side caching during peak weather demand.[^17] Every dataset should have a short data card in the repository containing source URL, licence, spatial/temporal resolution, update frequency, transformations and known limitations.
### Demo geography
Use **Puri–Khurda–Jagatsinghpur, Odisha**, with a historical replay of Cyclone Fani. Limit raster processing to a coastal area of interest so the application is responsive. Show state switching in the interface, but fully validate only this demo region and say so explicitly.
### Infrastructure data
For the deadline build, prioritize:

- Hospitals and cyclone shelters.
- Primary arterial roads and bridges.
- Power substations or power plants only when a reliable open source is available.
- Population grids and administrative boundaries.

Each asset needs `id`, `type`, `name`, `latitude`, `longitude`, `source`, `source_updated_at`, `criticality`, and `verification_status`. Never quietly invent infrastructure coordinates. If a source lacks reliable power-grid data, label that layer “demonstration dataset” or omit it from the main claim.
## Risk methodology
### Honest hybrid model
Use a transparent **decision-support screening model**, not an unsupported black box. For each grid cell or administrative unit:

```text
Hazard = weighted(wind hazard, rainfall hazard, coastal-inundation scenario)
Exposure = weighted(population, critical assets, road importance)
Vulnerability = weighted(low elevation, flood history, land cover, route redundancy)
Risk score = normalized(Hazard × Exposure × Vulnerability)
```

Weights must be configuration values visible in the repository, not hidden constants. The dashboard should expose the components behind every red zone: for example, “High risk because base-scenario inundation intersects a hospital, road redundancy is low, and the surrounding population estimate is high.”
### Surge component
A defensible hackathon implementation is a **three-scenario coastal-inundation screening layer**:

1. Accept an official or user-selected surge/water-level scenario.
2. Combine it with 30 m elevation.
3. Retain only low-elevation cells hydraulically connected to the coast.
4. Remove persistent water using the JRC water mask.
5. Create low/base/high extents and clearly display the assumed water level.

Call this **“scenario-based inundation screening,” not an operational hydrodynamic surge forecast**. Even NOAA’s operational SLOSH approach has explicit limitations: it does not model waves, astronomical tide, normal river flow or rain, illustrating why uncertainty and careful labels matter.[^18][^19]
### Wind component
Generate wind-impact buffers from official track points and wind radii when available. If wind radii are absent, use a documented parametric approximation as a fallback and label the result lower confidence. Rank assets by maximum expected wind category and distance to the forecast track; do not ask Gemini to calculate these values.
### Rainfall component
For the historical replay, aggregate GPM IMERG over 6, 12 and 24 hours, then compare with a local historical percentile baseline. For a current event, use official IMD rainfall forecasts and district warnings where available; GPM is an observation product, not a future forecast. The output should distinguish “observed rainfall,” “official forecast/warning,” and “model-derived risk.”
### Exposure and disruption
For every infrastructure feature, compute:

- Maximum hazard score intersecting the asset.
- Population within a chosen service radius.
- Whether its access road crosses a high-risk area.
- Nearest alternative facility and estimated route.
- Direct risk versus indirect service-access risk.

Research on cyclone infrastructure impacts emphasizes both direct asset damage and indirect loss of healthcare access, so route/network disruption is a strong differentiator from simple flood maps.[^20]
### Confidence
Every output should include:

- Scenario: low, base or high.
- Data freshness.
- Confidence: high, medium or low.
- Missing inputs.
- Short reason for uncertainty.
- “Decision support only; confirm with IMD/SDMA instructions.”

This is both responsible and technically impressive. It prevents judges from dismissing the system as an ungrounded AI map.
## Meaningful Gemini usage
Gemini must do work that is visible, useful and difficult to replace with a template—but it must remain grounded in computed data.
### Input packet
Send Gemini a compact evidence packet containing:

- Official bulletin text or image.
- Structured cyclone state: time, location, wind, pressure and cone.
- Computed district risk summary.
- Top exposed assets and blocked routes.
- Data timestamp and model confidence.
- Approved response-policy rules.
### Structured output
Require JSON output such as:

```json
{
  "situation_summary": "...",
  "priority_actions": [
    {"asset_id": "HOSP_014", "action": "...", "evidence_ids": ["RISK_72", "ROUTE_9"]}
  ],
  "public_alerts": {
    "en": "...",
    "hi": "...",
    "or": "..."
  },
  "uncertainties": ["..."],
  "approval_required": true
}
```

Validate this with a JSON schema. Reject output that cites unknown evidence IDs, contains unsupported numbers, omits uncertainty or uses panic-inducing wording.
### Multimodal moment
For the demo, upload an IMD bulletin image or a satellite/rainfall map. Gemini should extract the stated forecast, compare it with the structured analysis, and generate a concise official brief. The interface should show **“AI extracted”** versus **“system computed”** fields so the judge can see where reasoning occurs.
### Safety controls
- Retrieval-ground Gemini only on supplied evidence.
- No autonomous public dispatch.
- Human approval and editable message.
- Full prompt, model, evidence IDs, output and approval audit log.
- Temperature kept low for advisories.
- Official-source link attached to every alert.
## Interface blueprint
### Operations dashboard
The opening page should communicate value within ten seconds:

- Top bar: cyclone, timestamp, data freshness and overall confidence.
- Main map: track/cone with toggles for surge, rain, wind, population and assets.
- Right panel: high-risk districts and top five infrastructure threats.
- Bottom panel: scenario slider and time scrubber.
- Primary CTA: **Generate Action Brief**.
### Asset panel
When a hospital or shelter is selected, show:

- Hazard components.
- Estimated population served.
- Access-road status.
- Nearest lower-risk alternative.
- Recommended action.
- Evidence and data timestamps.
### Advisory screen
Show English, Hindi and Odia tabs, text-to-speech, a short low-bandwidth SMS version, an officer approval button and a mock dispatch receipt. NDMA’s alerting system is based on the Common Alerting Protocol and focuses on automated, last-mile dissemination; aligning the data structure to CAP makes the deployment story more credible.[^21]
### Accessibility
Use color plus icons/patterns rather than red–green alone, keyboard navigation, readable contrast, screen-reader labels, local-language text, audio playback and a low-bandwidth list view. Although accessibility is not a separate line in the current five-part rubric, it strengthens reach and impact.
## Rubric strategy
| Criterion | Weight | What judges should see | Evidence to include |
|---|---:|---|---|
| Problem–Solution Fit | 20% | Complete pre-landfall workflow for authorities, not a generic weather app | One-slide problem traceability matrix and hero demo |
| AI/Technical Execution | 25% | Real GEE analysis, risk engine, Gemini multimodal reasoning, validated structured output | Architecture diagram, live layer toggles, evidence-grounded advisory, tests |
| Depth & Reach Across India | 20% | Config-driven states/languages/datasets, administrative aggregation and scalable cloud design | Odisha demo plus second-state configuration, data adapters, cost/scaling plan |
| Impact Potential | 15% | Population and assets exposed are computed, not guessed; actions are measurable | Impact dashboard generated from WorldPop and infrastructure intersections |
| Deployability & Scalability | 20% | Live URL, reproducible deployment, cached APIs, human approval, audit trail, monitoring | Cloud Run/Firebase deployment, Dockerfile, setup guide, system-health page |
### Score-maximizing details
- Put a **rubric-to-evidence table** in both README and deck.
- Display the Google services in the live product’s “System evidence” panel.
- Add a `/health` endpoint that shows each data adapter, last update and latency.
- Cache IMD responses and the most recent successful result for graceful degradation.
- Include a one-command local setup and one-click deployment path.
- Show one real backtest instead of claiming broad accuracy.
- Use screenshots only as backup; judges need the live end-to-end flow.
## Validation plan
### Minimum validation
Replay Cyclone Fani and compare:

- Parsed track against IBTrACS points.
- Rainfall hotspots against GPM accumulation.
- Inundation-sensitive areas against low elevation, historical water or a post-event Sentinel-1 flood layer where available.
- Highest-risk infrastructure against documented affected locations or manually reviewed map evidence.

Record all validation outputs in `docs/validation.md`. If a reliable observed flood mask cannot be completed, state that limitation and validate pipeline correctness plus risk ranking; never invent IoU, F1 or accuracy values.
### Useful metrics
| Layer | Metric |
|---|---|
| Data ingestion | Freshness, API success rate, missing-field rate |
| Track | Position/time parsing consistency |
| Rain | Spatial correlation or hit rate against observed heavy-rain areas |
| Flood/inundation | Precision, recall, F1 and IoU where a trusted observed mask exists |
| Asset prioritization | Top-k expert/manual agreement |
| Advisory | Unsupported-claim rate, schema-valid rate, language review |
| System | End-to-end latency and cached fallback success |

Include a tiny model card: intended use, non-intended use, training/calibration events, inputs, output definition, known failure cases and operator responsibilities.
## 48-hour build plan
### First 4 hours
- Freeze the golden path and Odisha area of interest.
- Create repository, issue board and branch rules.
- Deploy a blank front end and API immediately so live-link risk is removed.
- Verify Earth Engine, Gemini, Maps and Cloud credentials.
- Download/cache one historical event’s track and rainfall metadata.
### Hours 4–14
- Build IMD/IBTrACS adapters with cached JSON fixtures.
- Implement GEE elevation, population, land-cover and rainfall queries.
- Create low/base/high inundation layers.
- Load a small, verified infrastructure GeoJSON.
- Return one `/analysis/run` JSON containing districts, assets and risk components.
### Hours 14–24
- Build the map, layer toggles, scenario selector and asset panel.
- Implement risk ranking and explanations.
- Add routes to alternative hospital/shelter.
- Ensure the complete workflow works without Gemini first.
### Hours 24–32
- Add Gemini evidence packet, structured JSON response and schema validator.
- Add English/Hindi/Odia advisory views, TTS if stable, approval and mock dispatch log.
- Add data freshness, confidence and limitations throughout the UI.
### Hours 32–40
- Test deployed build from a clean device.
- Add cached fallback mode, loading states and error handling.
- Complete README, architecture, data cards, model card and validation page.
- Capture screenshots and record a backup demo.
### Hours 40–48
- Create the 10–12 slide deck and 3–5 minute video.
- Run a rubric-based internal judging session.
- Remove broken features and placeholder claims.
- Check all links, repository access, licences, attribution, video permissions and submission fields.
- Submit early enough to recover from portal/upload failures.
## Team allocation
| Role | Primary ownership | Secondary ownership |
|---|---|---|
| Member 1 | GEE/data pipeline and risk engine | Validation and data cards |
| Member 2 | Front end, Maps and UX | Accessibility and demo reliability |
| Member 3 | Gemini, advisory schema and backend | Cloud deployment and observability |
| Member 4 | Product, research, pitch and video | QA, README and rubric evidence |

For a solo or two-person team, drop TTS, real messaging and complex routing before sacrificing the core map-to-advisory flow.
## Repository structure
```text
sagarrakshak-ai/
├── apps/web/
├── services/api/
├── services/gee/
├── packages/schemas/
├── data/fixtures/
├── docs/
│   ├── architecture.md
│   ├── validation.md
│   ├── model-card.md
│   ├── data-cards.md
│   ├── responsible-ai.md
│   └── judging-evidence.md
├── tests/
├── .env.example
├── Dockerfile
├── LICENSE
└── README.md
```

The README’s first screen should contain the one-line value proposition, live demo, demo video, architecture image, Google technologies, local setup and judging-evidence table. Then document datasets/licences, limitations, deployment steps, team contributions and commit history.
## Pitch deck
Use 11 slides:

1. **Title:** SagarRakshak AI and one-sentence outcome.
2. **Problem:** fragmented hazard data creates slow, reactive decisions.
3. **User story:** district officer 24 hours before landfall.
4. **Solution:** track-to-action workflow in one diagram.
5. **Live evidence:** map screenshots and Fani replay.
6. **AI depth:** GEE computation + risk engine + grounded Gemini.
7. **Infrastructure disruption:** direct exposure and route/service loss.
8. **India scale:** state adapters, languages, administrative hierarchy and cloud architecture.
9. **Impact:** computed people/assets/roads in demo, clearly timestamped.
10. **Deployment and responsibility:** Cloud Run, caching, human approval, uncertainty and CAP alignment.
11. **Roadmap/ask:** pilot with one coastal district, validate with SDMA, then expand.

Do not use market-size filler. Every slide should answer one rubric question.
## Demo script
### 0:00–0:25 — Stakes
“Cyclone warnings tell authorities where a storm may go. SagarRakshak converts that warning into a local action map: which communities, hospitals, shelters and roads face the greatest risk, and what should happen next.”
### 0:25–1:10 — Data and hazard
Select the Fani replay, show source timestamps, then run analysis. Toggle official track, rainfall, coastal inundation and population while explaining that the system separates observed data, official warnings and model-derived screening.
### 1:10–2:05 — Infrastructure
Open the highest-risk hospital or shelter. Show why it ranks high, the population it serves, affected access roads and an alternative facility/route. Change from base to high scenario to demonstrate uncertainty.
### 2:05–3:00 — Gemini
Upload/open the official bulletin, click **Generate Action Brief**, and show the evidence-linked priorities plus English, Hindi and Odia alerts. Edit one line, approve it and show the audit entry; emphasize that AI does not dispatch autonomously.
### 3:00–3:40 — Scale
Show architecture, cached fallback, health panel and state/language configuration. Explain that Earth Engine performs scalable geospatial analysis and Cloud Run executes stateless jobs.
### 3:40–4:00 — Close
“SagarRakshak does not replace IMD or disaster authorities. It turns their trusted data into transparent, local, pre-landfall decisions—so scarce time and resources reach the most vulnerable places first.”
## Submission copy
### Two-line description
**SagarRakshak AI is a Google Earth Engine and Gemini-powered cyclone decision-support platform that converts official storm tracks, satellite rainfall and geospatial exposure data into local infrastructure-risk maps. It ranks threatened hospitals, shelters, roads and communities, recommends safer actions, and generates evidence-grounded multilingual advisories with human approval.**
### One-line differentiator
**Not another weather map: it connects cyclone hazard to infrastructure disruption, route access and an auditable action brief.**
## Final checklist
- [ ] Live URL works in incognito without developer intervention.
- [ ] GitHub repository is public/access-granted and has a complete README.
- [ ] Google AI integration is visible and meaningful.
- [ ] Earth Engine layer is visible in the demo.
- [ ] One scenario runs end-to-end in under roughly one minute or uses a transparent precomputed cache.
- [ ] All numbers shown are calculated from cited data.
- [ ] Historical replay and current feed are clearly distinguished.
- [ ] Surge layer is labelled scenario screening, with assumptions.
- [ ] Confidence and timestamps appear on every output.
- [ ] Advisory requires human approval.
- [ ] Dataset licences and attributions are documented.
- [ ] 3–5 minute demo video has readable text and voice-over.
- [ ] Deck has 10–12 slides and maps directly to the rubric.
- [ ] Repository contains data cards, model card, validation and responsible-AI notes.
- [ ] Submission description, live link, repository, video and deck permissions are tested.
- [ ] Final submission is completed before the portal deadline, with proof/screenshots saved.
## Best fallback order
If time runs short, preserve features in this order:

1. Working historical replay with real track/rain/elevation/population.
2. Infrastructure exposure ranking with explanations.
3. Grounded Gemini advisory with multilingual output and approval.
4. Deployed link, polished README, short video and deck.
5. Route disruption.
6. Current IMD live feed.
7. Voice/TTS and real message sending.

The first four items create a complete, judgeable product. Everything after them is enhancement.

---

## References

1. [Code for Communities](https://hack2skill.com/event/codeforcommunities2) - No information is available for this page.

2. [Build with AI   Code For Communities   Explainer Session](https://www.youtube.com/watch?v=3XP6d07YMRs)

3. [[Hackathon] Build with AI Code for Communities 2026 - LinkedIn](https://www.linkedin.com/pulse/hackathon-build-ai-code-communities-2026-resquare-gxbrc) - Apply here: Code for Communities | Deadline: 8 July 2026 Build with AI: Code for Communities 2026: S...

4. [gdg.community.dev › events › detailsSee Build with AI: Code for Communities 2.0 Workshops | GDG ...](https://gdg.community.dev/events/details/google-gdg-cloud-rajkot-presents-build-with-ai-code-for-communities-20-workshops-gdg-cloud-rajkot/) - In-person Event - Join GDG Cloud Rajkot on September 27 for a workshop to prepare for the Code for C...

5. [Google Maps Platform Documentation | Routes API](https://developers.google.com/maps/documentation/routes) - Calculate travel times and distances for a matrix of routes between different origin and destination...

6. [Get a route | Routes API](https://developers.google.com/maps/documentation/routes/compute_route_directions) - You can get a route using the Routes API Compute Routes by sending an HTTP POST request to the compu...

7. [Gemini 3.7 Flash | Gemini API - Google AI for Developers](https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash) - Gemini 3.7 Flash is the next iteration in the Gemini 3 series of highly-capable, natively multimodal...

8. [Release notes | Gemini API - Google AI for Developers](https://ai.google.dev/gemini-api/docs/changelog) - Keep track of updates to the Gemini API

9. [IMD API Reference](https://api.imd.gov.in/public/api_reference.html)

10. [International Best Track Archive for Climate Stewardship ...](https://developers.google.com/earth-engine/datasets/catalog/NOAA_IBTrACS_v4) - The International Best Track Archive for Climate Stewardship (IBTrACS) provides location and intensi...

11. [Global Precipitation Measurement (GPM) Release 07](https://developers.google.com/earth-engine/datasets/catalog/NASA_GPM_L3_IMERG_V07) - The GPM IMERG dataset provides half-hourly rainfall estimates globally by combining data from variou...

12. [NASA SRTM Digital Elevation 30m | Earth Engine Data ...](https://developers.google.com/earth-engine/datasets/catalog/USGS_SRTMGL1_003) - The USGS SRTMGL1_003 dataset provides digital elevation models globally at a 30m resolution from the...

13. [NASADEM: NASA 30m Digital Elevation Model](https://developers.google.com/earth-engine/datasets/catalog/NASA_NASADEM_HGT_001) - NASADEM is a reprocessing of SRTM data, NASA 30m Digital Elevation Model. Pixel size: 30 meters (all...

14. [Dynamic World V1 | Earth Engine Data Catalog](https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_DYNAMICWORLD_V1) - Dynamic World is a 10m near-real-time (NRT) Land Use/Land Cover (LULC) dataset that includes class p...

15. [JRC Global Surface Water Mapping Layers, v1.4](https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_4_GlobalSurfaceWater) - This dataset maps the location and temporal distribution of surface water globally from 1984 to 2021...

16. [WorldPop Global Project Population Data](https://developers.google.com/earth-engine/datasets/catalog/WorldPop_GP_100m_pop) - Page Summary · The WorldPop project provides high-resolution, open access population distribution da...

17. [IMD APIs | India Meteorological Department](https://mausam.imd.gov.in/responsive/apis.php)

18. [FAQ - MDL - Virtual Lab](https://vlab.noaa.gov/web/mdl/faq-storm-surge) - What are some of the limitations associated with the SLOSH model? Does not model the impacts from wa...

19. [SLOSH - MDL - Virtual Lab](https://vlab.noaa.gov/web/mdl/slosh) - Thus SLOSH is considered a "diagnostic" model, as it doesn't forecast a storm's evolution, but rathe...

20. [From Hazard to Disruption: Forecasting Direct and Indirect Tropical ...](https://www.frontiersin.org/journals/climate/articles/10.3389/fclim.2025.1666586/full) - Critical infrastructure (CI), such as healthcare facilities, schools, and the road network, plays a ...

21. [Schemes | NDM India - Disaster Management Division](https://ndmindia.mha.gov.in/ndmi/programs)

