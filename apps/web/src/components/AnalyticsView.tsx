'use client';

import React, { useState, useEffect } from 'react';
import { CycloneComparisonItem, DistrictRiskProfile } from '../types';
import { fetchCycloneBenchmarks, fetchDistrictRiskMatrix } from '../lib/api';

export function AnalyticsView() {
  const [benchmarks, setBenchmarks] = useState<CycloneComparisonItem[]>([]);
  const [districts, setDistricts] = useState<DistrictRiskProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const [bData, dData] = await Promise.all([
        fetchCycloneBenchmarks(),
        fetchDistrictRiskMatrix(),
      ]);
      setBenchmarks(bData);
      setDistricts(dData);
      setIsLoading(false);
    }
    load();
  }, []);

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
        gap: '28px',
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ fontSize: '1.4rem' }}>📊</span>
          <h1
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Historical Cyclone Impact Analytics & Benchmark Matrix
          </h1>
          <span className="badge badge-safe">Comparative Intelligence</span>
        </div>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
          Benchmark current cyclonic events against historic North Indian Ocean storms (Fani, Amphan, Phailin, Hudhud, Dana) to calibrate shelter mobilization and grid hardening.
        </p>
      </div>

      {/* Historical Comparison Table */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
            🌀 Major Cyclones: Severity & Mitigation Comparison
          </h3>
          <span className="badge badge-medium">NOAA IBTrACS + OSDMA Archive</span>
        </div>

        <div style={{ overflowX: 'auto', borderRadius: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Cyclone & Year</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Peak Winds</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Storm Surge</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Landfall Region</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Evacuated</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Grid Outage</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Zero-Casualty Score</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map((c) => (
                <tr key={c.cyclone_name} style={{ borderBottom: '1px solid var(--border-subtle)' }} className="glass-panel-hover">
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 800, color: 'var(--accent-primary)', fontFamily: "'Outfit', sans-serif" }}>{c.cyclone_name} ({c.year})</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.category}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: c.peak_wind_kmh >= 200 ? 'var(--accent-red)' : 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                    {c.peak_wind_kmh} km/h
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: c.storm_surge_m >= 3.5 ? 'var(--accent-red)' : 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                    +{c.storm_surge_m}m
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-primary)' }}>
                    {c.landfall_region}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                    {(c.people_evacuated / 100000).toFixed(1)} Lakhs
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                    ~{c.grid_restoration_days} days
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="badge badge-safe" style={{ fontSize: '0.7rem' }}>
                      {c.human_loss_mitigation_rate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* District Multi-Hazard Exposure Bento Cards */}
      <div>
        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '14px', fontFamily: "'Outfit', sans-serif" }}>
          📍 Coastal District Baseline Vulnerability Index
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {districts.map((d) => (
            <div key={d.district} className="interactive-card" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                  {d.district} District
                </h4>
                <span className={`badge ${d.multi_hazard_vulnerability_index > 0.85 ? 'badge-critical' : 'badge-high'}`}>
                  Vulnerability: {d.multi_hazard_vulnerability_index}
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>Coastal Front: <strong style={{ color: 'var(--text-primary)' }}>{d.coastal_length_km} km</strong></div>
                <div>Median Elevation: <strong style={{ color: 'var(--text-primary)' }}>{d.elevation_median_m}m</strong></div>
                <div>Population at Risk: <strong style={{ color: 'var(--text-primary)' }}>{(d.population_at_risk / 100000).toFixed(1)}L</strong></div>
                <div>Shelters: <strong style={{ color: 'var(--text-primary)' }}>{d.cyclone_shelters_count} units</strong></div>
                <div>Hospital Beds: <strong style={{ color: 'var(--text-primary)' }}>{d.hospital_bed_capacity} beds</strong></div>
                <div>DG Power: <strong style={{ color: 'var(--text-primary)' }}>{d.backup_power_ready_pct}%</strong></div>
              </div>

              <div
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--accent-primary)',
                  background: 'var(--bg-badge)',
                  border: '1px solid var(--border-subtle)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontWeight: 600,
                }}
              >
                🛣️ Corridor: {d.primary_evacuation_corridor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
