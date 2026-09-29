'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Play,
  ShieldCheck,
  CheckCircle2,
  Waves,
  Radio,
  Zap,
  Layers,
  MapPin,
  Clock
} from 'lucide-react';

export function HeroSection() {
  return (
    <section
      style={{
        paddingTop: '130px',
        paddingBottom: '60px',
        background: 'var(--bg-hero)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient glow circles */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          opacity: 0.12,
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-emerald) 0%, transparent 70%)',
          opacity: 0.1,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="landing-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Copy & Actions */}
          <div>
            {/* Top pill badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'var(--bg-badge)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                }}
                className="pulse-indicator"
              />
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--accent-primary)',
                  textTransform: 'uppercase',
                }}
              >
                EARTH ENGINE ACTIVE · IMD COMPLIANT · CAP 1.2 READY
              </span>
            </div>

            {/* Massive Bold Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '20px',
              }}
            >
              Predict Cyclone Threats.
              <br />
              Protect Every Coastline.
              <br />
              <span
                style={{
                  color: 'var(--accent-cta)',
                  display: 'inline-block',
                  position: 'relative',
                }}
              >
                Guaranteed.
              </span>
            </h1>

            {/* Body Description */}
            <p
              style={{
                fontSize: '1.12rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                maxWidth: '560px',
                marginBottom: '32px',
              }}
            >
              India&apos;s authoritative disaster decision-support system for District Emergency Operations Centres (DEOC). 
              Harness sub-meter spatial risk screening, hydrodynamic surge modeling, and zero-hallucination Gemini advisory generation in under 3 seconds.
            </p>

            {/* Bullet List of Key Assurances */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '36px',
              }}
            >
              {[
                'Sub-meter asset risk ranking across hospitals, power grids & bridges',
                'Cryptographically signed CAP 1.2 alerts in English, Odia, Bengali & Hindi',
                'Zero-hallucination Gemini advisories grounded in GIS evidence',
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-cta)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '36px',
              }}
            >
              <Link
                href="/dashboard"
                className="btn-primary shimmer-btn-wrapper"
                style={{
                  fontSize: '1.02rem',
                  padding: '14px 28px',
                  borderRadius: '12px',
                }}
              >
                <span>Open Command Center</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/dashboard"
                className="btn-secondary"
                style={{
                  fontSize: '1.02rem',
                  padding: '14px 24px',
                  borderRadius: '12px',
                }}
              >
                <Play size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>Replay Cyclone Fani</span>
              </Link>
            </div>

            {/* Feature Pills under CTAs (ShieldPest pattern) */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {['24/7 IMD SYNCHRONIZED', 'ZERO DATA LOSS RECORD', 'OFFICIAL DEOC PROTOCOL'].map(
                (badge, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right Column: High-Fidelity Tactical Dashboard Preview Card */}
          <div style={{ position: 'relative' }}>
            {/* Visual Glassmorphic Preview Terminal */}
            <div
              className="glass-panel float-animation pulse-glow-box"
              style={{
                padding: '28px',
                borderRadius: '24px',
                border: '1px solid var(--border-glow)',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--bg-surface)',
              }}
            >
              {/* Tactical Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '16px',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: 'var(--accent-red)',
                    }}
                    className="pulse-indicator"
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                      STORM TRACKER · CYCLONE FANI
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Landfall Target: Puri, Odisha Coast
                    </div>
                  </div>
                </div>

                <span className="badge badge-critical" style={{ fontSize: '0.7rem' }}>
                  CAT 5 EQUIVALENT
                </span>
              </div>

              {/* Gauge Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Sustained Winds
                  </div>
                  <div
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--accent-red)',
                    }}
                  >
                    215 <span style={{ fontSize: '0.8rem' }}>km/h</span>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Central Pressure
                  </div>
                  <div
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--accent-amber)',
                    }}
                  >
                    937 <span style={{ fontSize: '0.8rem' }}>hPa</span>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Max Storm Surge
                  </div>
                  <div
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--accent-primary)',
                    }}
                  >
                    +5.2 <span style={{ fontSize: '0.8rem' }}>m</span>
                  </div>
                </div>
              </div>

              {/* High-Resolution Satellite & Radar Visual Box */}
              <div
                style={{
                  height: '240px',
                  borderRadius: '14px',
                  background: '#040711',
                  border: '1px solid var(--border-glow)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8)',
                }}
              >
                <img
                  src="/images/cyclone_radar_preview.jpg"
                  alt="SagarRakshak AI Live Cyclone Radar Telemetry Feed"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.08) brightness(0.95)',
                  }}
                />

                {/* Tactical Live Overlay Scanline */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(6, 9, 19, 0.4) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Landfall Marker */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(6, 9, 19, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-glow)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--accent-red)',
                    }}
                    className="pulse-indicator"
                  />
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#f8fafc' }}>
                    Puri Coast (Landfall Confirmed)
                  </span>
                </div>

                {/* Safe Route Indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(6, 9, 19, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--accent-emerald)',
                  }}
                >
                  <CheckCircle2 size={14} color="var(--accent-emerald)" />
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    NH-316 Evacuation Route Clear
                  </span>
                </div>
              </div>

              {/* Status Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="var(--accent-primary)" />
                  <span>Earth Engine Latency: <strong>2.14s</strong></span>
                </div>
                <Link
                  href="/dashboard"
                  style={{
                    color: 'var(--accent-primary)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Enter Full Tactical View &rarr;
                </Link>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-15px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-glow)',
                borderRadius: '14px',
                padding: '12px 18px',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={20} color="var(--accent-emerald)" />
              </div>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 800 }}>NDRF & DEOC Standard</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cryptographically Signed Output</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator prompt */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '56px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight * 0.82, behavior: 'smooth' });
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '8px',
              fontWeight: 600,
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <div style={{ animation: 'bounce-subtle 2s ease-in-out infinite' }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
