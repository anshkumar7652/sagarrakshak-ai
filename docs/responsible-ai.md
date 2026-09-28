# SagarRakshak AI — Responsible AI & Safety Framework

Emergency and disaster scenarios require strict ethical boundaries. SagarRakshak AI incorporates explicit guardrails to prevent misinformation, panic, or unverified automated actions.

---

## 1. Strict Evidence Grounding
- **Anti-Hallucination Directives:** Gemini is provided with an isolated, validated Evidence Packet containing computed metrics, storm coordinates, and official bulletin extracts.
- **Evidence Citation Requirement:** Every priority action recommended by the AI must cite explicit token identifiers (e.g. `[ELEV_7.5M]`, `[WIND_215KMH]`, `[BHARGAVI_BRIDGE]`).
- **Data Absence Handling:** When input data is missing or incomplete, the system labels outputs with explicit uncertainty qualifiers rather than attempting to interpolate or guess.

## 2. Mandatory Human-In-The-Loop (HITL)
- **No Autonomous Dispatch:** SagarRakshak AI never transmits alerts directly to sirens, cell-broadcast towers, or radio transmitters autonomously.
- **Officer Review & Edit:** The DEOC officer must review, modify if necessary, and approve the text in English, Hindi, and Odia.
- **Cryptographic Audit Log:** Each approved dispatch generates a SHA-256 cryptographic audit receipt recording the officer's ID, timestamp, approved text, and the evidence trail used.

## 3. Anti-Panic & Objective Language
- The AI system prompt forbids inflammatory, catastrophic, or speculative rhetoric.
- Phrasing conforms to official National Disaster Management Authority (NDMA) and Odisha State Disaster Management Authority (OSDMA) communication standards.

## 4. Accessibility & Linguistic Inclusivity
- Provides alerts in local languages (**Odia** for coastal Odisha communities, **Hindi** for inter-state coordinators, and **English** for administrative briefs).
- Supports text-to-speech audio synthesis and a low-bandwidth 160-character SMS format for areas with compromised cellular connectivity.
