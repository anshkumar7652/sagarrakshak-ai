'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Shield, Layers, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function DifferentiatorsSection() {
  const highlights = [
    {
      icon: <Layers size={22} color="var(--accent-cta)" />,
      title: 'Sub-Meter Lifeline Granularity',
      desc: 'Pinpoints high-risk transformers, hospital generators, and evacuation choke-points with satellite accuracy.',
    },
    {
      icon: <Shield size={22} color="var(--accent-cta)" />,
      title: 'Zero-Hallucination Grounding',
      desc: 'All AI advisories are programmatically tied to real-time Doppler telemetry and hydraulic surge models.',
    },
    {
      icon: <FileCode size={22} color="var(--accent-cta)" />,
      title: 'Multi-Lingual CAP 1.2 Feeds',
      desc: 'Dispatches machine-readable XML feeds with auto-translated text in English, Odia, Bengali, and Hindi.',
    },
    {
      icon: <CheckCircle2 size={22} color="var(--accent-cta)" />,
      title: 'Cryptographic Audit Trail',
      desc: 'Immutable SHA-256 ledger recording exact timestamps, scenario variables, and authorized officer signatures.',
    },
  ];

  return (
    <section id="differentiators" style={{ padding: '90px 0', background: 'var(--bg-surface)' }}>
      <div className="landing-container">
        {/* Top 4 Pill Highlights */}
        <div style={{ marginBottom: '64px' }}>
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
            THE SAGARRAKSHAK STANDARD
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '40px',
            }}
          >
            What Makes Our Intelligence Different.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {highlights.map((item, idx) => (
              <ScrollReveal
                key={idx}
                variant="zoom-in"
                delay={idx * 120}
                duration={600}
                threshold={0.1}
              >
              <div
                className="interactive-card"
                style={{
                  background: 'var(--bg-card)',
                  padding: '24px',
                  borderRadius: '16px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--bg-surface-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Bottom Split: Clear Findings & Sample Advisory Table */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          <ScrollReveal variant="fade-left" duration={650} threshold={0.08}>
          <div>
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              Clear findings.
              <br />
              Zero ambiguity.
            </h3>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
              In the critical 12 hours before landfall, emergency operations centres do not need raw data overload. 
              SagarRakshak outputs ranked action directives prioritized by human life and lifeline vulnerability.
            </p>

            <Link href="/dashboard" className="btn-primary" style={{ padding: '12px 24px' }}>
              <span>View Sample Action Brief</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          </ScrollReveal>

          {/* Sample Table Card */}
          <ScrollReveal variant="fade-right" duration={650} delay={100} threshold={0.08}>
          <div
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '18px',
              border: '1px solid var(--border-glow)',
              background: 'var(--bg-card)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '14px',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '16px',
              }}
            >
              <div style={{ fontSize: '0.84rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>
                PRIORITY LIFELINE THREAT RANKING
              </div>
              <span className="badge badge-critical" style={{ fontSize: '0.64rem' }}>
                LIVE DEOC FEED
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'District Hospital, Puri', risk: '98%', status: 'HIGH RISK', eta: 'T-3h Surge Breach' },
                { name: 'Puri 220kV Grid Substation', risk: '92%', status: 'CRITICAL', eta: 'T-2.5h Inundation' },
                { name: 'Mithila Bridge NH-316', risk: '84%', status: 'EVAC ROUTE', eta: 'Water level +1.2m' },
                { name: 'Cyclone Shelter #14 Brahmagiri', risk: '22%', status: 'SAFE OPERATIONAL', eta: 'Capacity 1,400' },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{row.eta}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontWeight: 800,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: i < 2 ? 'var(--accent-red)' : i === 2 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                      }}
                    >
                      {row.risk}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>{row.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
