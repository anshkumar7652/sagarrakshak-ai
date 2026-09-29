'use client';

import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export function ProcessSteps() {
  const steps = [
    {
      num: '01',
      title: 'Ingest Multi-Source Feeds',
      description:
        'Continuous ingestion of IMD track coordinates, central pressure telemetry, Doppler radar imagery, and GEE Sentinel elevation baselines.',
      tag: 'INGESTION',
    },
    {
      num: '02',
      title: 'Calculate Spatial Exposure',
      description:
        'Hydrodynamic surge scenarios (+1.5m to +5.0m) intersecting sub-meter asset layers to rank hospitals, shelters, and electrical substations by vulnerability.',
      tag: 'HYDRODYNAMICS',
    },
    {
      num: '03',
      title: 'Synthesize Grounded Advisories',
      description:
        'Gemini 2.5 evaluates real-time telemetry to produce rigorous, zero-hallucination operational orders with explicit mitigation steps.',
      tag: 'AI REASONING',
    },
    {
      num: '04',
      title: 'Dispatch Signed Broadcasts',
      description:
        'Instant multi-lingual CAP 1.2 XML transmission to NDMA gateways, district wireless repeaters, and emergency broadcast receivers.',
      tag: 'DISTRIBUTION',
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: '100px 0',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="landing-container">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={600} threshold={0.1}>
          <div style={{ marginBottom: '56px' }}>
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
              EXECUTION PIPELINE
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                marginBottom: '16px',
              }}
            >
              Simple. Rapid. Authoritative.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '640px' }}>
              From raw storm telemetry to multi-lingual public emergency broadcasts in under 180 seconds.
            </p>
          </div>
        </ScrollReveal>

        {/* Animated Connected Pipeline Track (Desktop) */}
        <div
          className="pipeline-energy-line"
          style={{
            height: '3px',
            borderRadius: '9999px',
            marginBottom: '40px',
            boxShadow: '0 0 14px rgba(16, 185, 129, 0.4)',
            opacity: 0.85,
          }}
        />

        {/* 4 Steps Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
            position: 'relative',
          }}
        >
          {steps.map((step, idx) => (
            <ScrollReveal
              key={idx}
              variant="slide-up-spring"
              delay={idx * 140}
              duration={700}
              threshold={0.08}
            >
              <div
                className="interactive-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  height: '100%',
                  padding: '28px 24px',
                }}
              >
                {/* Stage Tag */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--accent-primary)',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    STAGE {step.num}
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {step.tag}
                  </span>
                </div>

                {/* Step Number in Massive Outfit Font */}
                <div
                  style={{
                    fontSize: 'clamp(2.8rem, 4vw, 3.6rem)',
                    fontWeight: 900,
                    fontFamily: 'Outfit, sans-serif',
                    color: 'var(--accent-cta)',
                    lineHeight: 1,
                    marginBottom: '16px',
                    letterSpacing: '-0.04em',
                    opacity: 0.9,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {step.num}
                </div>

                <h3
                  style={{
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    marginBottom: '10px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
