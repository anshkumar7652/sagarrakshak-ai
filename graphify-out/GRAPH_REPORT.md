# Graph Report - sagarrakshak-ai  (2026-09-29)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 243 nodes · 363 edges · 14 communities
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.9)
- Token cost: 19,841 input · 924 output

## Community Hubs (Navigation)
- Risk Dashboard
- Project Dependencies
- Configuration & Settings
- Advisory Generation
- Risk Analysis
- Cyclone Tracking
- TypeScript Configuration
- Earth Engine Data
- Evacuation Routing
- IMD Data Adapter
- Hazard Modeling

## God Nodes (most connected - your core abstractions)
1. `run_risk_analysis()` - 19 edges
2. `compilerOptions` - 16 edges
3. `generate_grounded_advisory()` - 11 edges
4. `react` - 9 edges
5. `AssetRiskAssessment` - 8 edges
6. `GEEEngine` - 8 edges
7. `lucide-react` - 8 edges
8. `load_fani_track()` - 7 edges
9. `TrackPoint` - 6 edges
10. `CycloneTrack` - 6 edges

## Surprising Connections (you probably didn't know these)
- `test_inundation_hazard_sensitivity()` --calls--> `compute_inundation_hazard()`  [INFERRED]
  tests/test_risk_engine.py → services/api/app/services/risk/hazard.py
- `test_grounded_advisory_structure()` --uses--> `GroundedAdvisory`  [INFERRED]
  tests/test_gemini_schema.py → services/api/app/models/advisory.py
- `test_risk_analysis_output_structure()` --uses--> `AnalysisRunResponse`  [INFERRED]
  tests/test_risk_engine.py → services/api/app/models/analysis.py
- `test_ibtracs_fani_parsing()` --uses--> `CycloneTrack`  [INFERRED]
  tests/test_adapters.py → services/api/app/models/cyclone.py
- `test_evidence_id_linkage()` --calls--> `generate_grounded_advisory()`  [INFERRED]
  tests/test_gemini_schema.py → services/api/app/services/gemini/advisory.py

## Import Cycles
- None detected.

## Communities (14 total, 0 thin omitted)

### Community 0 - "Risk Dashboard"
Cohesion: 0.09
Nodes (39): DashboardPage(), init(), updateAnalysis(), MapComponent, AdvisoryModal(), AdvisoryModalProps, AssetDetailModal(), AssetDetailModalProps (+31 more)

### Community 1 - "Project Dependencies"
Cohesion: 0.06
Nodes (30): nextConfig, dependencies, leaflet, lucide-react, next, react, react-dom, @types/leaflet (+22 more)

### Community 2 - "Configuration & Settings"
Cohesion: 0.09
Nodes (22): BaseModel, RiskEngineWeights, Settings, get, root(), get_system_health(), get, Returns real-time health, latency, and status for each data adapter and engine.… (+14 more)

### Community 3 - "Advisory Generation"
Cohesion: 0.11
Nodes (22): GroundedAdvisory, AdvisoryApprovalRequest, AdvisoryEvidencePacket, DispatchReceipt, GroundedAdvisory, PriorityAction, PublicAlerts, BaseModel (+14 more)

### Community 4 - "Risk Analysis"
Cohesion: 0.12
Nodes (22): AnalysisRunResponse, AnalysisRunRequest, AnalysisRunResponse, DistrictRiskSummary, BaseModel, AlternativeFacility, AssetRiskAssessment, InfrastructureAsset (+14 more)

### Community 5 - "Cyclone Tracking"
Cohesion: 0.13
Nodes (17): CycloneTrack, CycloneTrack, BaseModel, ScenarioMetadata, TrackPoint, get_historical_track(), list_available_scenarios(), get (+9 more)

### Community 6 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "Earth Engine Data"
Cohesion: 0.15
Nodes (9): FallbackSettings, GEEEngine, Any, NASA GPM_L3/IMERG_V07 half-hourly accumulated precipitation fixture., WorldPop/GP/100m/pop population density intersections., Interface for Google Earth Engine (GEE) planetary-scale data layers. Gracefully…, Fast non-blocking check to verify if Earth Engine credentials exist on disk.…, Attempts non-blocking Earth Engine initialization only if credentials exist. (+1 more)

### Community 8 - "Evacuation Routing"
Cohesion: 0.25
Nodes (6): get_safe_route(), get, Computes emergency route avoiding flood sectors and inundated bridges., compute_safe_evacuation_route(), Any, Computes emergency evacuation route bypassing low-lying coastal flood sectors.…

### Community 9 - "IMD Data Adapter"
Cohesion: 0.29
Nodes (5): fetch_imd_live_feed(), Any, Connects to IMD Cyclone Track / Wind Warning endpoint. Includes client-side…, Verify that IMD adapter caches responses and responds within SLA., test_imd_feed_caching()

### Community 10 - "Hazard Modeling"
Cohesion: 0.60
Nodes (4): HazardComponents, InundationScenarioConfig, BaseModel, RainfallHazardSummary

## Knowledge Gaps
- **50 isolated node(s):** `HealthModalProps`, `NavbarProps`, `AlternativeFacility`, `float`, `PriorityAction` (+45 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 105 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `run_risk_analysis()` connect `Risk Analysis` to `Configuration & Settings`, `Cyclone Tracking`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `load_fani_track()` connect `Cyclone Tracking` to `Risk Analysis`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `run_risk_analysis()` (e.g. with `execute_risk_analysis()` and `AnalysisRunResponse`) actually correct?**
  _`run_risk_analysis()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `generate_grounded_advisory()` (e.g. with `generate_deoc_advisory()` and `GroundedAdvisory`) actually correct?**
  _`generate_grounded_advisory()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `HealthModalProps`, `NavbarProps`, `AlternativeFacility` to the rest of the system?**
  _50 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Risk Dashboard` be split into smaller, more focused modules?**
  _Cohesion score 0.0946938775510204 - nodes in this community are weakly interconnected._
- **Should `Project Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._