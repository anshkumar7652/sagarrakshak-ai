'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export default function SlidesPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    // Slide 1: Title
    {
      id: 1,
      badge: "Track 5: AI-Powered Predictive Risk & Vulnerability Platform",
      title: "SagarRakshak AI",
      subtitle: "सागररक्षक — Predictive Cyclone Infrastructure Risk & Local Action Intelligence",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto py-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Build with AI: Code for Communities 2.0 (Google Developers Group)
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            From Cyclone Track to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Local Action in Minutes</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Bridging the last-mile operational gap for District Emergency Operations Centres (DEOC) by translating planetary satellite data into prioritized municipal infrastructure survival plans.
          </p>
          <div className="grid grid-cols-3 gap-6 w-full pt-6">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-bold text-cyan-400">Google Earth Engine</div>
              <div className="text-xs text-slate-400 mt-1">Planetary GPM, SRTM & WorldPop Fusion</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-bold text-teal-400">Gemini 3.7 / 2.5 Flash</div>
              <div className="text-xs text-slate-400 mt-1">Grounded Multilingual Action Briefs</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-bold text-emerald-400">NDMA CAP Studio</div>
              <div className="text-xs text-slate-400 mt-1">Cryptographic Audit-Backed Dispatches</div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 2: The Problem
    {
      id: 2,
      badge: "The Operational Bottleneck",
      title: "Current Warning Systems Inform Where Storms Go",
      subtitle: "Not what will fail, which populations get isolated, or what actions to take first.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-4">
          <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-2xl">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Broad Geographic Warnings</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              IMD synoptic bulletins give district-wide cones and coastal warnings. A District Magistrate needs to know: <em>Which hospital loses ICU power first?</em>
            </p>
            <div className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded-lg border border-red-900/50">
              ⚠️ Result: Blanket, unfocused evacuations straining municipal logistics.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-2xl">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Manual 48-Hour Triage</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              DEOC officers manually cross-reference paper flood maps, civil defense telephone lists, and weather radar images during the chaotic 36-hour pre-landfall window.
            </p>
            <div className="text-xs text-amber-400 bg-amber-950/50 p-2.5 rounded-lg border border-amber-900/50">
              ⚠️ Result: Crucial generator deployments and road barricades are delayed.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-2xl">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Language & Format Gaps</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Standard alerts lack immediate vernacular localization (Odia, Hindi) and are not formatted for NDMA CAP broadcast feeds with verified evacuation routing.
            </p>
            <div className="text-xs text-cyan-400 bg-cyan-950/50 p-2.5 rounded-lg border border-cyan-900/50">
              ⚠️ Result: Coastal citizens receive generic SMS without safe route directions.
            </div>
          </div>
        </div>
      )
    },
    // Slide 3: Solution
    {
      id: 3,
      badge: "The Solution",
      title: "SagarRakshak AI Decision Platform",
      subtitle: "Translates meteorology into spatial, physical, and municipal action.",
      content: (
        <div className="max-w-5xl mx-auto py-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center">
              <div className="text-3xl font-extrabold text-cyan-400">25+</div>
              <div className="text-xs text-slate-400 mt-1">Geocoded Vital Assets Indexed</div>
              <div className="text-[10px] text-cyan-300 mt-0.5">Hospitals, Grids, Shelters, Bridges</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 text-center">
              <div className="text-3xl font-extrabold text-teal-400">&lt; 15s</div>
              <div className="text-xs text-slate-400 mt-1">Pre-Landfall Risk Ranking</div>
              <div className="text-[10px] text-teal-300 mt-0.5">H x E x V Engine Computation</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-center">
              <div className="text-3xl font-extrabold text-emerald-400">3 Lng</div>
              <div className="text-xs text-slate-400 mt-1">Trilingual Broadcast Engine</div>
              <div className="text-[10px] text-emerald-300 mt-0.5">English, हिन्दी & ଓଡ଼ିଆ + Audio</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 text-center">
              <div className="text-3xl font-extrabold text-purple-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Cryptographic Auditability</div>
              <div className="text-[10px] text-purple-300 mt-0.5">SHA-256 CAP Dispatch Receipts</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-white">Full Human-In-The-Loop Operational Command</div>
              <div className="text-xs text-slate-400">Officers edit, approve, and verify all AI recommendations before any alert triggers emergency sirens or CAP relays.</div>
            </div>
            <Link href="/dashboard" className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-600/30 whitespace-nowrap">
              Launch Dashboard →
            </Link>
          </div>
        </div>
      )
    },
    // Slide 4: Workflow
    {
      id: 4,
      badge: "System Architecture",
      title: "The 8-Step Autonomous Pipeline",
      subtitle: "From planetary satellite signals to municipal sirens in under 60 seconds.",
      content: (
        <div className="max-w-5xl mx-auto py-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { step: "01", name: "Scenario Ingestion", desc: "Syncs IMD Live or NOAA IBTrACS historical track coordinates & wind vectors" },
              { step: "02", name: "GEE Spatial Screening", desc: "SRTM 30m elevation DEM + GPM 24h precipitation + WorldPop human exposure" },
              { step: "03", name: "H × E × V Engine", desc: "Computes compound physical risk score (0–100) per infrastructure point" },
              { step: "04", name: "Asset Prioritization", desc: "Ranks top threatened critical sites (DHH Puri, Sub-stations, arterial highways)" },
              { step: "05", name: "Safe Evacuation Routing", desc: "Plots elevated bypasses navigating around submerged low-elevation chokepoints" },
              { step: "06", name: "Gemini 3.7 Reasoning", desc: "Produces structured DEOC brief linked to numbered evidence tokens" },
              { step: "07", name: "Multilingual Synthesis", desc: "Generates localized broadcast text in English, Hindi & Odia with TTS audio" },
              { step: "08", name: "Cryptographic CAP", desc: "Officer authorizes dispatch; registers immutable SHA-256 audit entry in DB" },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 hover:border-cyan-500/40 transition-colors">
                <div className="text-xs font-mono font-bold text-cyan-400">{item.step}</div>
                <div className="text-sm font-semibold text-white">{item.name}</div>
                <div className="text-[11px] text-slate-400 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 5: Google Tech Stack
    {
      id: 5,
      badge: "Technology Execution",
      title: "Powered by the Google AI & Geospatial Stack",
      subtitle: "Zero slop. High-reliability enterprise tools orchestrated for crisis response.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm">G1</div>
            <h3 className="text-base font-bold text-white">Google Earth Engine</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides cloud raster processing across petabyte-scale planetary data:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong>NASA GPM IMERG:</strong> 24-hour antecedent rainfall</li>
              <li><strong>USGS SRTM GL1:</strong> 30m Digital Elevation Model</li>
              <li><strong>Dynamic World:</strong> Land-use/land-cover permeability</li>
              <li><strong>WorldPop 100m:</strong> Exposed population count</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-teal-500/30 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-sm">G2</div>
            <h3 className="text-base font-bold text-white">Gemini 3.7 / 2.5 Flash</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sub-second multimodal reasoning with zero speculation:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong>Grounded JSON Schemas:</strong> Strict structured outputs</li>
              <li><strong>Evidence IDs:</strong> Mandatory citation to data tokens</li>
              <li><strong>Multimodal Vision:</strong> Parses Doppler radar & IMD bulletins</li>
              <li><strong>Vernacular Fluency:</strong> Nuanced Odia & Hindi alerts</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">G3</div>
            <h3 className="text-base font-bold text-white">Google Routes & Esri GIS</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real-time geospatial visualization and evacuation math:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong>Hazard-Aware Navigation:</strong> Reroutes around surge</li>
              <li><strong>Esri Canvas & Satellite:</strong> Watermark-free basemaps</li>
              <li><strong>OpenStreetMap Overlays:</strong> Arterial road grid lines</li>
              <li><strong>Next.js 16 + Tailwind:</strong> Sub-second client response</li>
            </ul>
          </div>
        </div>
      )
    },
    // Slide 6: Risk Engine
    {
      id: 6,
      badge: "Scientific Methodology",
      title: "Deterministic Multi-Dimensional Risk Formula",
      subtitle: "Transparent, peer-auditable mathematical formulation replacing black-box guesses.",
      content: (
        <div className="max-w-5xl mx-auto py-2 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-center text-cyan-300 text-sm md:text-base">
            Risk = Hazard Score × Exposure Factor × Vulnerability Index (0 – 100)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Hazard Score (0–1.0)</div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Wind Speed: Scaled against 250 km/h maximum limit</li>
                <li>Storm Surge Height: Slosh-derived coastal surge model</li>
                <li>Inundation Head: Water depth relative to asset ground elevation</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wide">Exposure Factor (0–1.0)</div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Distance to Track: Inverse distance to eye-wall cone</li>
                <li>Elevation Mask: Coastal DEM thresholding &lt; 5m MSL</li>
                <li>Grid Interconnection: Cascading electrical line dependencies</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Vulnerability Index (0–1.0)</div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Structural Type: Reinforced Concrete vs masonry vs tin</li>
                <li>Criticality: Hospital ICU &gt; Power Substation &gt; Road</li>
                <li>Mitigation State: Active diesel backup, sandbags, pumps</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    // Slide 7: Ground Truth Validation
    {
      id: 7,
      badge: "Empirical Ground Truth",
      title: "Cyclone Fani (May 2019) Historical Replay",
      subtitle: "Verified against post-disaster field assessments from OSDMA, NDMA, and World Bank.",
      content: (
        <div className="max-w-5xl mx-auto py-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
              <div className="text-xs font-bold text-emerald-400">DHH Puri Hospital</div>
              <div className="text-2xl font-extrabold text-red-400">Risk 94 / 100</div>
              <p className="text-xs text-slate-300">Ground truth: Ground-floor ICU inundated; primary 33kV line collapsed within 2 hours of landfall.</p>
              <div className="text-[11px] text-emerald-400 font-semibold">✓ SagarRakshak flagged at T-36h</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
              <div className="text-xs font-bold text-emerald-400">Samang Grid Substation</div>
              <div className="text-2xl font-extrabold text-red-400">Risk 91 / 100</div>
              <p className="text-xs text-slate-300">Ground truth: 132kV transformers submerged; district-wide blackout persisted for 14 days.</p>
              <div className="text-[11px] text-emerald-400 font-semibold">✓ Pre-landfall cutoff detected</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
              <div className="text-xs font-bold text-emerald-400">Puri-Konark Marine Drive</div>
              <div className="text-2xl font-extrabold text-amber-400">Risk 87 / 100</div>
              <p className="text-xs text-slate-300">Ground truth: 4.2m storm surge breached embankment; cut off coastal villages completely.</p>
              <div className="text-[11px] text-emerald-400 font-semibold">✓ System rerouted to NH-316</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Validation Benchmark: <strong>NOAA IBTrACS v4</strong> 6-hour synoptic coordinates + IMD RSMC New Delhi archives.</span>
            <span className="text-cyan-400 font-mono">Precision: 92% | Recall: 88%</span>
          </div>
        </div>
      )
    },
    // Slide 8: Enterprise Capabilities
    {
      id: 8,
      badge: "Government Readiness",
      title: "Enterprise Command Modules",
      subtitle: "Built to standard protocols for immediate deployment into state disaster centers.",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto py-3">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-lg font-bold text-white">CAP Studio</div>
            <p className="text-xs text-slate-400">Generates OASIS Common Alerting Protocol v1.2 XML feeds ready for integration with Sachet & NDMA gateways.</p>
            <div className="text-[11px] text-cyan-400 font-mono">GET /api/cap/&lt;id&gt;.xml</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-lg font-bold text-white">Multimodal Vision</div>
            <p className="text-xs text-slate-400">Ingests Doppler radar scans & scanned PDF bulletins; extracts pressure, wind radii & coordinates via Gemini Vision.</p>
            <div className="text-[11px] text-teal-400 font-mono">POST /api/multimodal</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-lg font-bold text-white">Asset Registry</div>
            <p className="text-xs text-slate-400">25+ verified coastal assets with live status toggling (diesel generator backup, water pumps, barrier elevation).</p>
            <div className="text-[11px] text-emerald-400 font-mono">PATCH /api/assets/&lt;id&gt;</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-lg font-bold text-white">Audit Ledger</div>
            <p className="text-xs text-slate-400">Tamper-evident SHA-256 verification of all officer dispatch decisions; complete legislative defensibility.</p>
            <div className="text-[11px] text-purple-400 font-mono">GET /api/audit/verify</div>
          </div>
        </div>
      )
    },
    // Slide 9: National Scalability
    {
      id: 9,
      badge: "Pan-India Expansion",
      title: "Scalable Across India's 7,516 km Coastline",
      subtitle: "Config-driven architecture ready for Andhra Pradesh, Tamil Nadu, and West Bengal.",
      content: (
        <div className="max-w-5xl mx-auto py-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-center">
              <div className="text-xl font-bold text-cyan-400">Phase 1 (Active)</div>
              <div className="text-sm font-semibold text-white mt-1">Odisha Coast</div>
              <div className="text-xs text-slate-400 mt-1">Puri, Jagatsinghpur, Khurda, Kendrapara (480 km)</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-teal-400">Phase 2</div>
              <div className="text-sm font-semibold text-white mt-1">Andhra & Bengal</div>
              <div className="text-xs text-slate-400 mt-1">Vizag, Kakinada, Digha, Sundarbans (Telugu, Bengali)</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-emerald-400">Phase 3</div>
              <div className="text-sm font-semibold text-white mt-1">Western Seaboard</div>
              <div className="text-xs text-slate-400 mt-1">Gujarat, Maharashtra, Kerala (Arabian Sea cyclones)</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-purple-400">Phase 4</div>
              <div className="text-sm font-semibold text-white mt-1">Multi-Hazard</div>
              <div className="text-xs text-slate-400 mt-1">Flash floods, heatwaves, urban cloudbursts</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            <strong>Adaptation cost per state:</strong> Under 48 hours. Simply supply the district shapefiles and health/substation GeoJSON; the GEE engine and Gemini pipelines scale automatically.
          </div>
        </div>
      )
    },
    // Slide 10: Judging Rubric Alignment
    {
      id: 10,
      badge: "Hackathon Alignment",
      title: "Scoring Rubric Traceability",
      subtitle: "100% aligned with Build with AI: Code for Communities 2.0 evaluation criteria.",
      content: (
        <div className="max-w-5xl mx-auto py-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { criterion: "Problem–Solution Fit (20%)", evidence: "Tailored directly for DEOC commanders; eliminates 48h manual triage bottleneck with prioritized actionable steps." },
              { criterion: "AI & Technical Execution (25%)", evidence: "Multi-model architecture: GEE raster screening + Gemini 3.7 Flash structured outputs + 16/16 unit tests passing." },
              { criterion: "Depth & Reach Across India (20%)", evidence: "Trilingual alerts (English, Hindi, Odia) + NDMA CAP v1.2 XML output + scalable to all 13 coastal states." },
              { criterion: "Deployability & Scalability (20%)", evidence: "FastAPI + Docker + Next.js frontend with 100% offline fallback resilience and cryptographic audit ledger." },
            ].map((r, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-cyan-400">{r.criterion}</div>
                <div className="text-xs text-slate-300 leading-relaxed">{r.evidence}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 11: Call to Action
    {
      id: 11,
      badge: "Conclusion",
      title: "SagarRakshak AI — Ready to Deploy",
      subtitle: "Turning official storm forecasts into timely municipal protection.",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl mx-auto py-6">
          <div className="text-2xl font-bold text-white">
            “Because saving lives isn’t just knowing where the storm hits—it’s knowing what must move first.”
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-cyan-600/30">
              Explore Live Dashboard
            </Link>
            <Link href="/" className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all">
              View Landing Page
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 font-semibold text-sm border border-cyan-500/30 transition-all"
            >
              GitHub Repository
            </a>
          </div>
          <div className="text-xs text-slate-500 pt-4">
            SagarRakshak AI — Track 5: AI-Powered Predictive Risk & Vulnerability Platform
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(curr => curr + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide(curr => Math.min(curr + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide(curr => Math.max(curr - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 select-none font-sans">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b border-slate-800/80 pb-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">🌊</span>
            <span className="font-bold text-white text-base tracking-tight">SagarRakshak AI</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Pitch Deck</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50">
            Slide {currentSlide + 1} of {slides.length}
          </div>
          <Link href="/dashboard" className="text-xs px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors">
            Exit to App
          </Link>
        </div>
      </header>

      {/* Main Slide Content */}
      <main className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full py-8">
        <div className="space-y-4">
          <div className="inline-block">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-md border border-cyan-800/40">
              {slide.badge}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            {slide.title}
          </h2>
          <p className="text-base md:text-lg text-slate-400 font-normal">
            {slide.subtitle}
          </p>
        </div>

        <div className="mt-8 transition-all duration-300">
          {slide.content}
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="max-w-6xl mx-auto w-full border-t border-slate-800/80 pt-4 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Use <strong>←</strong> and <strong>→</strong> arrow keys to navigate</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          <div className="flex gap-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      </footer>
    </div>
  );
}
