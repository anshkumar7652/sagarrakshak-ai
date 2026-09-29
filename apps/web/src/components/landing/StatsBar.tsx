'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

function useCountUp(target: number, duration: number = 1800, decimals: number = 0, isTriggered: boolean = false) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isTriggered) return;

    let startTime: number | null = null;
    let frameId: number;

    // Smooth Expo Out Easing
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);

      setVal(eased * target);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, isTriggered]);

  if (decimals > 0) {
    return val.toFixed(decimals);
  }
  return Math.round(val).toLocaleString();
}

export function StatsBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  const stat1 = useCountUp(7516, 1800, 0, inView);
  const stat2 = useCountUp(14.2, 1800, 1, inView);
  const stat3 = useCountUp(2.4, 1600, 1, inView);
  const stat4 = useCountUp(100, 1800, 0, inView);

  const stats = [
    {
      displayValue: stat1,
      unit: 'km',
      label: 'Indian Coastline Monitored',
      subtext: 'Across 9 coastal states & 4 UTs',
      badge: 'IMD SYNCHRONIZED',
    },
    {
      displayValue: `${stat2}M+`,
      unit: '',
      label: 'Vulnerable Population Screened',
      subtext: 'Grid-level demographic exposure',
      badge: 'REAL-TIME CENSUS',
    },
    {
      displayValue: `< ${stat3}s`,
      unit: '',
      label: 'Earth Engine Hydrodynamic Run',
      subtext: 'Sentinel-1 & SRTM DEM processing',
      badge: 'GEE CLOUD RUN',
    },
    {
      displayValue: `${stat4}%`,
      unit: '',
      label: 'CAP 1.2 Protocol Compliance',
      subtext: 'WMO & NDMA broadcast standard',
      badge: 'CERTIFIED XML',
    },
  ];

  return (
    <section
      ref={containerRef}
      style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '42px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="landing-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          {stats.map((stat, idx) => (
            <ScrollReveal
              key={idx}
              variant="fade-up"
              delay={idx * 120}
              duration={600}
              threshold={0.1}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px 20px',
                  borderLeft: idx > 0 ? '1px solid var(--border-subtle)' : 'none',
                  position: 'relative',
                  borderRadius: '12px',
                  transition: 'background 0.25s ease, transform 0.25s ease',
                }}
                className="stat-box hover:bg-slate-800/20"
              >
                {/* Metric Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: inView ? 'var(--accent-cta)' : 'var(--text-muted)',
                      boxShadow: inView ? '0 0 8px var(--accent-cta)' : 'none',
                      transition: 'background 0.4s ease, box-shadow 0.4s ease',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--accent-primary)',
                      letterSpacing: '0.06em',
                      fontWeight: 700,
                    }}
                  >
                    {stat.badge}
                  </span>
                </div>

                {/* Animated Value */}
                <div
                  style={{
                    fontSize: 'clamp(2.1rem, 3.6vw, 2.75rem)',
                    fontWeight: 900,
                    fontFamily: 'Outfit, sans-serif',
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '4px',
                    lineHeight: 1.1,
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {stat.displayValue}
                  </span>
                  {stat.unit && (
                    <span
                      style={{
                        fontSize: '1.25rem',
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
                    fontSize: '0.94rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {stat.label}
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.4,
                  }}
                >
                  {stat.subtext}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .stat-box {
            border-left: none !important;
            border-bottom: 1px solid var(--border-subtle);
            padding-bottom: 20px;
          }
          .stat-box:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
