'use client';

import React from 'react';

export function StatsBar() {
  const stats = [
    {
      value: '7,516',
      unit: 'km',
      label: 'Indian Coastline Monitored',
      subtext: 'Across 9 coastal states & 4 UTs',
    },
    {
      value: '14.2M+',
      unit: '',
      label: 'Vulnerable Population Screened',
      subtext: 'Grid-level demographic exposure',
    },
    {
      value: '< 2.4s',
      unit: '',
      label: 'Earth Engine Hydrodynamic Run',
      subtext: 'Sentinel-1 & SRTM DEM processing',
    },
    {
      value: '100%',
      unit: '',
      label: 'CAP 1.2 Protocol Compliance',
      subtext: 'WMO & NDMA broadcast standard',
    },
  ];

  return (
    <section
      style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '36px 0',
      }}
    >
      <div className="landing-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '12px 16px',
                borderLeft: idx > 0 ? '1px solid var(--border-subtle)' : 'none',
                transition: 'all 0.2s ease',
              }}
              className="stat-box"
            >
              <div
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
                  fontWeight: 900,
                  fontFamily: 'Outfit, sans-serif',
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                  lineHeight: 1.1,
                  marginBottom: '6px',
                }}
              >
                <span>{stat.value}</span>
                {stat.unit && (
                  <span
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--accent-cta)',
                    }}
                  >
                    {stat.unit}
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '2px',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '0.76rem',
                  color: 'var(--text-secondary)',
                }}
              >
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .stat-box {
            border-left: none !important;
            border-bottom: 1px solid var(--border-subtle);
            padding-bottom: 16px;
          }
          .stat-box:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
