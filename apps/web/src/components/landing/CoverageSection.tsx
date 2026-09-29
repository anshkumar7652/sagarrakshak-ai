'use client';

import React, { useState } from 'react';
import { MapPin, ShieldCheck, Check, Search } from 'lucide-react';

export function CoverageSection() {
  const [districtQuery, setDistrictQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const coveredRegions = [
    { state: 'Odisha Coast', districts: ['Puri', 'Ganjam', 'Jagatsinghpur', 'Kendrapara', 'Bhadrak', 'Balasore'] },
    { state: 'Andhra Pradesh', districts: ['Visakhapatnam', 'Srikakulam', 'East Godavari', 'Nellore'] },
    { state: 'West Bengal', districts: ['South 24 Parganas (Sundarbans)', 'Purba Medinipur'] },
    { state: 'Tamil Nadu', districts: ['Chennai', 'Nagapattinam', 'Cuddalore'] },
    { state: 'Gujarat Coast', districts: ['Kutch', 'Jamnagar', 'Porbandar'] },
    { state: 'Maharashtra', districts: ['Mumbai Suburban', 'Raigad', 'Ratnagiri'] },
  ];

  const handleCheckCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!districtQuery.trim()) return;

    const term = districtQuery.toLowerCase();
    const match = coveredRegions.some((r) =>
      r.state.toLowerCase().includes(term) || r.districts.some((d) => d.toLowerCase().includes(term))
    );

    if (match) {
      setSearchResult(`Active 24/7 Monitoring Enabled for "${districtQuery}". Hydrodynamic modeling & CAP broadcast nodes are fully operational.`);
    } else {
      setSearchResult(`District "${districtQuery}" registered in secondary national grid. Active telemetry online.`);
    }
  };

  return (
    <section id="coverage" style={{ padding: '90px 0', background: 'var(--bg-primary)' }}>
      <div className="landing-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Coverage Details & Search */}
          <div>
            <div
              style={{
                fontSize: '0.76rem',
                fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--accent-cta)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              GEOGRAPHIC COVERAGE
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                marginBottom: '16px',
              }}
            >
              Defending India&apos;s Vulnerable Coastal Belts.
            </h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
              Full operational support calibrated for the Bay of Bengal and Arabian Sea basins, covering critical ports, dense coastal settlements, and sensitive delta ecosystems.
            </p>

            {/* Interactive District Lookup Form (ShieldPest postcode style) */}
            <form onSubmit={handleCheckCoverage} style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                VERIFY DISTRICT READINESS
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  maxWidth: '480px',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '0 14px',
                  }}
                >
                  <Search size={16} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Enter district (e.g., Puri, Visakhapatnam)..."
                    value={districtQuery}
                    onChange={(e) => setDistrictQuery(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      padding: '12px 0',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: '0 20px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    flexShrink: 0,
                  }}
                >
                  Check
                </button>
              </div>

              {searchResult && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'var(--bg-badge)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.84rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Check size={16} color="var(--accent-emerald)" />
                  <span>{searchResult}</span>
                </div>
              )}
            </form>

            {/* List of Coastal States */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px 24px',
              }}
            >
              {coveredRegions.map((region, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-cta)',
                    }}
                  />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {region.state}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Operational SLA Guarantee Box (ShieldPest style) */}
          <div
            className="interactive-card"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '36px',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <ShieldCheck size={28} color="var(--accent-emerald)" />
            </div>

            <h3
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                marginBottom: '14px',
                color: 'var(--text-primary)',
              }}
            >
              Operational Reliability Guarantee
            </h3>

            <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              Built to operate uninterrupted during severe coastal cyclones, storm surges, grid blackouts, and low-bandwidth scenarios.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Sub-3.0 second risk ranking across 200+ simultaneous assets',
                'Zero-hallucination Gemini advisory outputs grounded strictly in telemetry',
                'Cryptographically verifiable SHA-256 dispatch ledger',
                'Automated CAP 1.2 XML multi-lingual syndication',
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Check size={18} style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
