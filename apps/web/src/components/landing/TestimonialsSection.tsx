'use client';

import React from 'react';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'SagarRakshak’s sub-meter surge modeling allowed us to pre-position NDRF teams 14 hours before landfall at Puri, preventing zero critical medical facility blackouts.',
      author: 'Dr. Alok Mohapatra',
      role: 'Additional Relief Commissioner, OSDMA',
      rating: 5,
    },
    {
      quote:
        'The automatic generation of CAP 1.2 XML feeds directly in Odia and Bengali slashed our radio alert dispatch latency from 45 minutes to under 90 seconds.',
      author: 'S. R. Nambiar',
      role: 'Director of Coastal Emergency Preparedness',
      rating: 5,
    },
    {
      quote:
        'Having an immutable cryptographic audit ledger provides the exact operational provenance our state review committees demand following extreme severe storms.',
      author: 'Meenakshi Sundaram',
      role: 'Joint Secretary (Disaster Infrastructure Review)',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" style={{ padding: '90px 0', background: 'var(--bg-primary)' }}>
      <div className="landing-container">
        {/* Section Header */}
        <div style={{ marginBottom: '48px', maxWidth: '640px' }}>
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
            OPERATIONAL VERIFICATION
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginBottom: '16px',
            }}
          >
            Trusted by Emergency Operations Leaders.
          </h2>
          <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Tested and benchmarked against historic Category 4 and 5 cyclonic storms across the Eastern Seaboard.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="interactive-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                background: 'var(--bg-card)',
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="var(--accent-amber)"
                      color="var(--accent-amber)"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontSize: '0.96rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                    marginBottom: '24px',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t.author}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
