'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Waves,
  FileText,
  Camera,
  Database,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function FeaturesGrid() {
  const features = [
    {
      icon: <MapPin size={22} style={{ color: 'var(--accent-cta)' }} />,
      title: 'Spatial Multi-Hazard GIS',
      description:
        'Interactive real-time map displaying cyclone track cones, wind intensity contours, landfall forecasts, and calculated safe evacuation corridors.',
      badge: 'GIS TACTICAL',
      link: '/dashboard',
    },
    {
      icon: <Waves size={22} style={{ color: 'var(--accent-cta)' }} />,
      title: 'Earth Engine Hydrodynamics',
      description:
        'Cloud-native digital elevation models combined with Sentinel-1 SAR imagery to compute scenario surge inundation from +1.5m up to +5.0m.',
      badge: 'GEE ENGINE',
      link: '/dashboard',
    },
    {
      icon: <FileText size={22} style={{ color: 'var(--accent-cta)' }} />,
      title: 'CAP 1.2 Alert Studio',
      description:
        'Automated generation of WMO/NDMA compliant Common Alerting Protocol XML feeds with geographic polygons and multi-lingual translation.',
      badge: 'NDMA STANDARD',
      link: '/dashboard',
    },
    {
      icon: <Camera size={22} style={{ color: 'var(--accent-cta)' }} />,
      title: 'Multimodal IMD Vision AI',
      description:
        'Instant optical extraction from IMD satellite bulletins, Doppler radars, and storm diagrams directly into structured telemetry.',
      badge: 'GEMINI 2.5',
      link: '/dashboard',
    },
    {
      icon: <Database size={22} style={{ color: 'var(--accent-cta)' }} />,
      title: 'Critical Lifeline Registry',
      description:
        'Relational asset tracking for hospitals, power sub-stations, mobile towers, and cyclone shelters with automated vulnerability ranking.',
      badge: 'SQLITE ORM',
      link: '/dashboard',
    },
    {
      icon: <ShieldCheck size={22} style={{ color: 'var(--accent-cta)' }} />,
      title: 'Immutable Audit Ledger',
      description:
        'Cryptographically signed audit logs for every evacuation order, broadcast dispatch, and command action to ensure post-disaster accountability.',
      badge: 'SHA-256 SIGNED',
      link: '/dashboard',
    },
  ];

  return (
    <section id="capabilities" style={{ padding: '90px 0', background: 'var(--bg-primary)' }}>
      <div className="landing-container">
        {/* Section Header */}
        <div style={{ marginBottom: '48px', maxWidth: '640px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.76rem',
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              color: 'var(--accent-cta)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            SERVICES &amp; CAPABILITIES
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '16px',
            }}
          >
            Built for High-Stakes Operations.
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every module in SagarRakshak AI is engineered to turn millions of data points into decisive, zero-delay actions for disaster management commissioners and emergency responders.
          </p>
        </div>

        {/* 2x3 Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {features.map((item, idx) => (
            <ScrollReveal
              key={idx}
              variant="fade-up"
              delay={idx * 100}
              duration={600}
              threshold={0.1}
            >
            <div
              className="interactive-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'var(--bg-badge)',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '10px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div>
                <Link
                  href={item.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: 'var(--accent-cta)',
                    transition: 'gap 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = '10px')}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
                >
                  <span>Explore Module</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
