'use client';

import React, { useState, useEffect } from 'react';
import { BulletinSample, BulletinExtractionResult } from '../types';
import { fetchSampleBulletins, uploadOrExtractBulletin } from '../lib/api';

export function MultimodalVisionView() {
  const [samples, setSamples] = useState<BulletinSample[]>([]);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('SAMPLE_FANI_B24');
  const [extractionResult, setExtractionResult] = useState<BulletinExtractionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await fetchSampleBulletins();
      setSamples(data);
      if (data.length > 0) {
        handleRunExtraction(data[0].sample_id);
      }
    }
    load();
  }, []);

  const handleRunExtraction = async (sampleId: string) => {
    setIsProcessing(true);
    setSelectedSampleId(sampleId);
    try {
      const res = await uploadOrExtractBulletin(sampleId);
      setExtractionResult(res);
    } catch (err) {
      console.error('Extraction error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: 'var(--bg-primary)',
        padding: '24px 32px',
        overflowY: 'auto',
        gap: '24px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.4rem' }}>📷</span>
            <h1
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              IMD Bulletin Multimodal Vision Ingestion
            </h1>
            <span className="badge badge-high">Gemini 2.5/3.7 Flash Multimodal</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Upload raw IMD warning bulletins, Doppler radar charts, or track graphics to automatically extract parameters and cross-verify with SagarRakshak GEE spatial models.
          </p>
        </div>
      </div>

      {/* Preset Selector & File Upload Box */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
          Select Official IMD Warning Bulletin for AI Vision OCR & Analysis:
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {samples.map((s) => (
            <div
              key={s.sample_id}
              onClick={() => handleRunExtraction(s.sample_id)}
              className="interactive-card"
              style={{
                background: selectedSampleId === s.sample_id ? 'var(--bg-badge)' : 'var(--bg-card)',
                borderColor: selectedSampleId === s.sample_id ? 'var(--accent-primary)' : 'var(--border-subtle)',
                padding: '14px 16px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif" }}>{s.cyclone_name}</strong>
                <span className="badge badge-medium">{s.bulletin_no}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', marginBottom: '4px', fontWeight: 600 }}>{s.title}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{s.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Extraction Results Grid */}
      {isProcessing ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
          <div className="pulse-indicator" style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent-primary)', margin: '0 auto 12px auto' }} />
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', fontFamily: "'Outfit', sans-serif" }}>
            Gemini Vision analyzing document raster & extracting telemetry...
          </div>
        </div>
      ) : extractionResult && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
          {/* AI Extracted Parameters */}
          <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>📑</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                  Vision-Extracted Telemetry
                </h3>
              </div>
              <span className="badge badge-safe">{(extractionResult.confidence_score * 100).toFixed(0)}% Confidence</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '0.8rem',
              }}
            >
              <div className="interactive-card" style={{ padding: '12px 14px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>BULLETIN NO.</div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem' }}>{extractionResult.bulletin_no}</div>
              </div>

              <div className="interactive-card" style={{ padding: '12px 14px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>CURRENT STAGE</div>
                <div style={{ fontWeight: 700, color: 'var(--accent-primary)', marginTop: '2px', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem' }}>{extractionResult.stage}</div>
              </div>

              <div className="interactive-card" style={{ padding: '12px 14px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>MAX SUSTAINED WINDS</div>
                <div style={{ fontWeight: 700, color: 'var(--accent-red)', marginTop: '2px', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem' }}>{extractionResult.max_wind_kmh} km/h</div>
              </div>

              <div className="interactive-card" style={{ padding: '12px 14px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>CENTRAL PRESSURE</div>
                <div style={{ fontWeight: 700, color: 'var(--accent-amber)', marginTop: '2px', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem' }}>{extractionResult.central_pressure_hpa} hPa</div>
              </div>

              <div className="interactive-card" style={{ padding: '12px 14px', gridColumn: 'span 2' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>LANDFALL TARGET & ETA</div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', fontFamily: "'Outfit', sans-serif" }}>{extractionResult.landfall_location}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--accent-primary)', marginTop: '2px' }}>{extractionResult.landfall_eta}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase' }}>RED ALERT DISTRICTS:</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {extractionResult.red_alert_districts.map((d) => (
                  <span key={d} className="badge badge-critical">🚨 {d}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Model Cross-Verification & Alignment Matrix */}
          <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>⚖️</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                  SagarRakshak GEE Model Cross-Check
                </h3>
              </div>
              <span className="badge badge-safe">
                {extractionResult.system_comparison.risk_alignment_score_pct}% Convergence
              </span>
            </div>

            <div
              className="interactive-card"
              style={{
                background: 'var(--bg-badge)',
                borderColor: 'var(--accent-emerald)',
                padding: '14px 16px',
                fontSize: '0.84rem',
                color: 'var(--accent-emerald)',
              }}
            >
              <strong>Cross-Validation Status:</strong> {extractionResult.system_comparison.spatial_cross_verification}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Wind Variance:</span>
                <strong style={{ color: 'var(--accent-primary)' }}>
                  ±{extractionResult.system_comparison.wind_variance_kmh} km/h ({extractionResult.system_comparison.wind_agreement})
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Storm Surge Model Variance:</span>
                <strong style={{ color: 'var(--accent-amber)' }}>
                  ±{extractionResult.system_comparison.surge_variance_m}m ({extractionResult.system_comparison.surge_agreement})
                </strong>
              </div>

              <div style={{ marginTop: '6px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', marginBottom: '4px', fontWeight: 600 }}>REASONING CONVERGENCE:</div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  {extractionResult.system_comparison.recommendation_alignment}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
