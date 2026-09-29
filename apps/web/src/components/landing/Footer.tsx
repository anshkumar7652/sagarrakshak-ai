'use client';

import React from 'react';
import Link from 'next/link';
import { Waves, Phone, Mail, MapPin, Shield } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-footer)',
        color: '#f8fafc',
        borderTop: '1px solid var(--border-subtle)',
        padding: '64px 0 32px',
        fontSize: '0.88rem',
      }}
    >
      <div className="landing-container">
        {/* 4 Columns */}
        <ScrollReveal variant="fade-up" duration={600} threshold={0.06}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Col 1: Identity & Contacts */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-primary) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Waves size={20} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                SagarRakshak AI
              </span>
            </div>

            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '20px', fontSize: '0.84rem' }}>
              Autonomous Coastal Cyclone Impact &amp; Hydrodynamic Vulnerability Forecaster for District Emergency Operations Centres across India.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#94a3b8', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="var(--accent-primary)" />
                <span>DEOC Command Network, Coastal India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--accent-primary)" />
                <span>Toll-Free Control Room: 1070 / 1077</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="var(--accent-primary)" />
                <span>ops@sagarrakshak.gov.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Operational Modules */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                letterSpacing: '0.06em',
                marginBottom: '16px',
              }}
            >
              OPERATIONAL PORTALS
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#94a3b8' }}>
              <li>
                <Link href="/dashboard" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}>
                  GIS Tactical Cyclone Map
                </Link>
              </li>
              <li>
                <Link href="/dashboard" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}>
                  CAP 1.2 Broadcast Studio
                </Link>
              </li>
              <li>
                <Link href="/dashboard" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}>
                  Multimodal IMD Vision AI
                </Link>
              </li>
              <li>
                <Link href="/dashboard" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}>
                  Critical Asset Registry
                </Link>
              </li>
              <li>
                <Link href="/dashboard" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}>
                  Cryptographic Audit Ledger
                </Link>
              </li>
              <li>
                <Link href="/dashboard" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}>
                  Storm Analytics &amp; Benchmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Monitored Basins */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                letterSpacing: '0.06em',
                marginBottom: '16px',
              }}
            >
              MONITORED BASINS
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: '#94a3b8' }}>
              <li>Odisha Coast (Puri &amp; Ganjam)</li>
              <li>Andhra Pradesh (Visakhapatnam)</li>
              <li>West Bengal (Sundarbans Delta)</li>
              <li>Tamil Nadu (Chennai &amp; Coromandel)</li>
              <li>Gujarat (Gulf of Kutch &amp; Khambhat)</li>
              <li>Maharashtra (Konkan Belt)</li>
            </ul>
          </div>

          {/* Col 4: Protocols & Accreditations */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                letterSpacing: '0.06em',
                marginBottom: '16px',
              }}
            >
              TECHNICAL ACCREDITATION
            </div>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.82rem', marginBottom: '16px' }}>
              Built strictly in adherence with WMO-1028 Common Alerting Protocol standards and NDMA early-warning SOPs.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <Shield size={16} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.74rem', color: '#cbd5e1', fontWeight: 600 }}>
                SHA-256 Ledger Verified
              </span>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            color: '#64748b',
            fontSize: '0.78rem',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} SagarRakshak AI — Coastal Disaster Decision Intelligence System.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/" style={{ color: '#94a3b8' }}>Privacy Policy</Link>
            <Link href="/" style={{ color: '#94a3b8' }}>Terms of Operation</Link>
            <Link href="/" style={{ color: '#94a3b8' }}>NDMA Guidelines</Link>
            <Link href="/dashboard" style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>Open DEOC Dashboard &rarr;</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
