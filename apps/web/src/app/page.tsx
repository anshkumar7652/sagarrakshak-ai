'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  AnalysisRunResponse,
  CycloneTrack,
  AssetRiskAssessment,
  GroundedAdvisory,
} from '../types';
import {
  runAnalysis,
  fetchFaniTrack,
  generateAdvisory,
} from '../lib/api';
import { Navbar } from '../components/Navbar';
import { RiskSidebar } from '../components/RiskSidebar';
import { AssetDetailModal } from '../components/AssetDetailModal';
import { AdvisoryModal } from '../components/AdvisoryModal';
import { HealthModal } from '../components/HealthModal';
import { TimeScrubber } from '../components/TimeScrubber';

// Dynamic import of Map to disable SSR for Leaflet
const MapComponent = dynamic(
  () => import('../components/Map').then((mod) => mod.MapComponent),
  { ssr: false }
);

export default function DashboardPage() {
  const [scenarioId, setScenarioId] = useState<string>('fani_historical');
  const [inundationScenario, setInundationScenario] = useState<'low' | 'base' | 'high'>('base');
  const [timeStepIndex, setTimeStepIndex] = useState<number>(5); // Landfall peak
  const [analysisData, setAnalysisData] = useState<AnalysisRunResponse | null>(null);
  const [cycloneTrack, setCycloneTrack] = useState<CycloneTrack | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetRiskAssessment | null>(null);
  const [showSafeRoute, setShowSafeRoute] = useState<boolean>(false);
  const [isAdvisoryOpen, setIsAdvisoryOpen] = useState<boolean>(false);
  const [isHealthOpen, setIsHealthOpen] = useState<boolean>(false);
  const [advisoryData, setAdvisoryData] = useState<GroundedAdvisory | null>(null);
  const [isPlayingTime, setIsPlayingTime] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial Load: Track & Initial Risk Analysis
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const [track, analysis] = await Promise.all([
        fetchFaniTrack(),
        runAnalysis(scenarioId, inundationScenario, timeStepIndex),
      ]);
      setCycloneTrack(track);
      setAnalysisData(analysis);
      setIsLoading(false);
    }
    init();
  }, []);

  // Reactive Re-run when scenario, inundation, or time step changes
  useEffect(() => {
    async function updateAnalysis() {
      const analysis = await runAnalysis(scenarioId, inundationScenario, timeStepIndex);
      setAnalysisData(analysis);
    }
    updateAnalysis();
  }, [scenarioId, inundationScenario, timeStepIndex]);

  // Timeline auto-play simulation timer
  useEffect(() => {
    let timer: any;
    if (isPlayingTime && cycloneTrack) {
      timer = setInterval(() => {
        setTimeStepIndex((prev) => {
          if (prev >= cycloneTrack.track_points.length - 1) {
            setIsPlayingTime(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlayingTime, cycloneTrack]);

  // Handle Generate Advisory
  const handleOpenAdvisory = async () => {
    if (!analysisData) return;
    setIsAdvisoryOpen(true);
    if (!advisoryData) {
      const adv = await generateAdvisory({
        analysis_id: analysisData.analysis_id,
        cyclone_name: analysisData.cyclone_name,
        category: analysisData.cyclone_state.category,
        max_winds_kmh: analysisData.cyclone_state.wind_kmh,
        landfall_target: 'Puri, Odisha',
        inundation_scenario: inundationScenario,
        high_risk_districts: analysisData.district_summaries.map((d) => d.district_name),
        top_threats: analysisData.top_threatened_assets.slice(0, 4),
        data_timestamp: analysisData.data_freshness_utc,
      });
      setAdvisoryData(adv);
    }
  };

  const currentTrackPoint =
    cycloneTrack?.track_points[timeStepIndex] ||
    cycloneTrack?.track_points[0] || {
      timestamp: '2019-05-03T03:30:00Z',
      lat: 19.8,
      lon: 85.85,
      wind_kmh: 215,
      pressure_hpa: 937,
      category: 'Extremely Severe Cyclonic Storm',
      cone_radius_km: 35,
      stage: 'Landfall (Puri Coast)',
    };

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      background: 'var(--bg-primary)',
      overflow: 'hidden',
    }}>
      {/* Top Navbar */}
      <Navbar
        scenarioId={scenarioId}
        onScenarioChange={setScenarioId}
        inundationScenario={inundationScenario}
        onInundationChange={setInundationScenario}
        onOpenAdvisory={handleOpenAdvisory}
        onOpenHealth={() => setIsHealthOpen(true)}
        dataFreshness={analysisData?.data_freshness_utc || 'Live'}
        cycloneWind={currentTrackPoint.wind_kmh}
      />

      {/* Main Body: Sidebar + Map */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        {/* Left Operations Panel */}
        {analysisData && (
          <RiskSidebar
            districts={analysisData.district_summaries}
            topAssets={analysisData.top_threatened_assets}
            selectedAsset={selectedAsset}
            onSelectAsset={setSelectedAsset}
            showSafeRoute={showSafeRoute}
            onToggleSafeRoute={() => setShowSafeRoute((prev) => !prev)}
            totalPopulation={analysisData.total_population_at_risk}
          />
        )}

        {/* Center Interactive Map View */}
        <div style={{ flex: 1, position: 'relative', height: '100%' }}>
          <MapComponent
            currentTrackPoint={currentTrackPoint}
            allTrackPoints={cycloneTrack?.track_points || []}
            assets={analysisData?.top_threatened_assets || []}
            inundationScenario={inundationScenario}
            selectedAsset={selectedAsset}
            onSelectAsset={setSelectedAsset}
            showSafeRoute={showSafeRoute}
          />

          {/* Loading Indicator */}
          {isLoading && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(6, 9, 19, 0.85)',
              backdropFilter: 'blur(12px)',
              padding: '16px 28px',
              borderRadius: '12px',
              border: '1px solid var(--border-glow)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 1000,
            }}>
              <span className="pulse-indicator" style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
              <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>Executing Earth Engine Risk Screening...</span>
            </div>
          )}
        </div>

        {/* Asset Detail Slide-in Drawer */}
        <AssetDetailModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onShowRoute={() => setShowSafeRoute(true)}
        />
      </div>

      {/* Bottom Temporal Timeline Scrubber */}
      {cycloneTrack && (
        <TimeScrubber
          trackPoints={cycloneTrack.track_points}
          currentIndex={timeStepIndex}
          onSelectIndex={setTimeStepIndex}
          isPlaying={isPlayingTime}
          onTogglePlay={() => setIsPlayingTime((prev) => !prev)}
        />
      )}

      {/* Advisory Modal */}
      {isAdvisoryOpen && (
        <AdvisoryModal
          advisory={advisoryData}
          onClose={() => setIsAdvisoryOpen(false)}
          analysisId={analysisData?.analysis_id || 'ANALYSIS_DEMO'}
        />
      )}

      {/* System Health Modal */}
      {isHealthOpen && (
        <HealthModal onClose={() => setIsHealthOpen(false)} />
      )}
    </main>
  );
}
