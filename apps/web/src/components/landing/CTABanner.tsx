'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Waves, PhoneCall } from 'lucide-react';

export function CTABanner() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, var(--accent-cta) 0%, #047857 100%)',
        padding: '72px 0',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient rings */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-60%',
          left: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none',
        }}
      />

      <div className="landing-container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.76rem',
            fontWeight: 700,
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.04em',
            marginBottom: '20px',
          }}
        >
          <Waves size={16} />
          <span>NATIONAL MARITIME READINESS</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
            marginBottom: '18px',
            color: '#ffffff',
          }}
        >
          Ready to Protect Your Coastal Sector?
        </h2>

        <p
          style={{
            fontSize: '1.15rem',
            maxWidth: '650px',
            margin: '0 auto 36px',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.6,
          }}
        >
          Equip your District Emergency Operations Centre with real-time Earth Engine risk screening and multi-lingual CAP 1.2 broadcasts today.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '24px',
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#060913',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              fontFamily: 'Outfit, sans-serif',
              padding: '14px 30px',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span>Launch Command Center</span>
            <ArrowRight size={18} />
          </Link>

          <a
            href="tel:+911800114000"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              fontFamily: 'Outfit, sans-serif',
              padding: '13px 26px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
            }}
          >
            <PhoneCall size={18} />
            <span>Emergency Hotline: 1070 / 1077</span>
          </a>
        </div>

        <div
          style={{
            fontSize: '0.76rem',
            fontFamily: 'JetBrains Mono, monospace',
            color: 'rgba(255, 255, 255, 0.75)',
            letterSpacing: '0.04em',
          }}
        >
          24/7 IMD SYNCHRONIZED · ZERO INSTALLATION REQUIRED · COMPLIANT WITH NDMA PROTOCOLS
        </div>
      </div>
    </section>
  );
}
