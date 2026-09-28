'use client';

import React from 'react';
import {
  Waves,
  ShieldAlert,
  SlidersHorizontal,
  Activity,
  Sparkles,
  RefreshCw,
  Compass
} from 'lucide-react';

interface NavbarProps {
  scenarioId: string;
  onScenarioChange: (id: string) => void;
  inundationScenario: 'low' | 'base' | 'high';
  onInundationChange: (level: 'low' | 'base' | 'high') => void;
  onOpenAdvisory: () => void;
  onOpenHealth: () => void;
  dataFreshness: string;
  cycloneWind: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  scenarioId,
  onScenarioChange,
  inundationScenario,
  onInundationChange,
  onOpenAdvisory,
  onOpenHealth,
  dataFreshness,
  cycloneWind,
}) => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      background: 'rgba(6, 9, 19, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative',
      zIndex: 1000,
    }}>
      {/* Brand & Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(0, 240, 255, 0.4)',
        }}>
          <Waves size={24} color="#060913" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #ffffff, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'var(--font-heading)',
            }}>
              SagarRakshak AI
            </h1>
            <span className="badge badge-critical" style={{ fontSize: '0.65rem' }}>
              DEOC COMMAND
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            From cyclone track to local infrastructure action in minutes
          </p>
        </div>
      </div>

      {/* Central Controls: Scenario & Inundation Mode */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Scenario Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(15, 23, 42, 0.7)',
          padding: '6px 12px',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
        }}>
          <Compass size={16} color="var(--accent-cyan)" />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Scenario:</span>
          <select
            value={scenarioId}
            onChange={(e) => onScenarioChange(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
              fontFamily: 'var(--font-body)',
            }}
          >
            <option value="fani_historical" style={{ background: '#0c1222' }}>
              Cyclone Fani (May 2019 Replay — Landfall)
            </option>
            <option value="imd_live_feed" style={{ background: '#0c1222' }}>
              IMD Live Cyclone Feed Simulation
            </option>
          </select>
        </div>

        {/* Surge Inundation Scenario Pill Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(15, 23, 42, 0.7)',
          padding: '4px 6px',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
        }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', paddingLeft: '6px' }}>
            Surge Screening:
          </span>
          {(['low', 'base', 'high'] as const).map((level) => {
            const isSelected = inundationScenario === level;
            const labels = { low: 'Low (+1.5m)', base: 'Base (+3.0m)', high: 'High (+5.0m)' };
            return (
              <button
                key={level}
                onClick={() => onInundationChange(level)}
                style={{
                  background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
                  color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {labels[level]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Controls: Health & Advisory CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Cyclone Wind Live Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          padding: '6px 12px',
          borderRadius: '8px',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} className="pulse-indicator" />
          <span style={{ fontSize: '0.78rem', color: '#fca5a5', fontWeight: 600 }}>
            Peak Winds: {cycloneWind} km/h
          </span>
        </div>

        {/* System Health */}
        <button
          onClick={onOpenHealth}
          className="btn-secondary"
          title="Inspect data adapter health and latency"
        >
          <Activity size={15} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.78rem' }}>Health</span>
        </button>

        {/* Primary CTA: Generate Action Brief */}
        <button
          onClick={onOpenAdvisory}
          className="btn-primary"
          style={{ padding: '8px 18px' }}
        >
          <Sparkles size={16} />
          <span>Generate Action Brief</span>
        </button>
      </div>
    </header>
  );
};
