# SagarRakshak AI — Risk Model Card

## 1. Model Details
- **Model Name:** SagarRakshak Multi-Hazard Risk & Vulnerability Engine (v1.0.0)
- **Model Type:** Multi-Criteria Geospatial Decision Support System (MCDSS) coupled with Gemini 3.7 / 2.5 Flash Multimodal Reasoning.
- **Intended Users:** District Emergency Operations Centre (DEOC) officers, State Disaster Management Authorities (SDMA), Municipal Commissioners, and first-responder coordinators.

## 2. Intended Use
- **Primary Use:** Pre-landfall tactical screening (T-48h to T-0) to rank hospitals, shelters, power substations, and arterial highways facing high hazard exposure.
- **Out of Scope / Non-Intended Use:** 
  - Not an autonomous numerical weather prediction (NWP) model.
  - Not an astronomical tide calculation tool.
  - Not an autonomous public warning dissemination system without human operator approval.

## 3. Mathematical Formula
$$Composite\ Risk = \text{normalize}(w_H \cdot Hazard + w_E \cdot Exposure + w_V \cdot Vulnerability)$$

- **Hazard Components:** Wind decay function + GPM IMERG 24h rainfall saturation + USGS SRTM scenario-based inundation depth.
- **Exposure Components:** WorldPop 100m population density + facility criticality multiplier + bed/shelter capacity.
- **Vulnerability Components:** Low-elevation exposure (<5m) + historical flood baseline + backup generator resilience + route redundancy.

## 4. Limitations & Disclaimers
1. Coastal inundation is derived from a hydro-connectivity elevation screening method; it does not replace 3D wave setup hydrodynamic models.
2. Gemini advisory generation is strictly grounded in computed data points; if unexpected anomalies arise, the DEOC officer has full editing and authorization authority.
