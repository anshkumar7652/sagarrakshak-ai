'use client';

import React from 'react';
import Link from 'next/link';
import {
  Waves,
  Activity,
  Sparkles,
  Compass,
  MapPin,
  FileText,
  Camera,
  Database,
  ShieldCheck,
  BarChart3,
  ArrowLeft
} from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';

export type PortalView = 'map' | 'cap' | 'vision' | 'assets' | 'audit' | 'analytics';

interface NavbarProps {
  currentView: PortalView;
  onViewChange: (view: PortalView) => void;
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
  currentView,
  onViewChange,
  scenarioId,
  onScenarioChange,
  inundationScenario,
  onInundationChange,
  onOpenAdvisory,
  onOpenHealth,
  dataFreshness,
  cycloneWind,
}) => {
  const navTabs: { id: PortalView; label: string; icon: React.ReactNode }[] = [
    { id: 'map', label: 'GIS Tactical Map', icon: <MapPin size={15} /> },
    { id: 'cap', label: 'CAP Studio & Broadcast', icon: <FileText size={15} /> },
    { id: 'vision', label: 'IMD Vision AI', icon: <Camera size={15} /> },
    { id: 'assets', label: 'Asset Registry (DB)', icon: <Database size={15} /> },
    { id: 'audit', label: 'Immutable Ledger', icon: <ShieldCheck size={15} /> },
    { id: 'analytics', label: 'Storm Analytics', icon: <BarChart3 size={15} /> },
  ];

  return (
    <header style={{
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-surface)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative',
      zIndex: 1000,
    }}>
      {/* Top Ribbon: Branding, Scenarios, and Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 24px',
        borderBottom: '1px solid var(--border-subtle)',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        {/* Brand & Identity with Home Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/"
            title="Return to Public Portal"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <ArrowLeft size={16} />
          </Link>

          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '9px',
            background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-primary) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)',
          }}>
            <Waves size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link href="/">
                <h1 style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                }}>
                  SagarRakshak AI
                </h1>
              </Link>
              <span className="badge badge-critical" style={{ fontSize: '0.62rem' }}>
                DEOC COMMAND
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Operational Multi-Hazard Risk & CAP 1.2 Broadcast System
            </p>
          </div>
        </div>

        {/* Central Controls: Scenario & Inundation Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Scenario Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface-elevated)',
            padding: '5px 10px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
          }}>
            <Compass size={14} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Event:</span>
            <select
              value={scenarioId}
              onChange={(e) => onScenarioChange(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="fani_historical" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                Cyclone Fani (Historical Replay)
              </option>
              <option value="imd_live_feed" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                IMD Live Cyclone Feed Simulation
              </option>
            </select>
          </div>

          {/* Surge Inundation Scenario Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--bg-surface-elevated)',
            padding: '3px 6px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
          }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', paddingLeft: '4px' }}>
              Surge:
            </span>
            {(['low', 'base', 'high'] as const).map((level) => {
              const isSelected = inundationScenario === level;
              const labels = { low: '+1.5m', base: '+3.0m', high: '+5.0m' };
              return (
                <button
                  key={level}
                  onClick={() => onInundationChange(level)}
                  style={{
                    background: isSelected ? 'var(--bg-badge)' : 'transparent',
                    color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    border: isSelected ? '1px solid var(--accent-primary)' : '1px solid transparent',
                    padding: '3px 8px',
                    borderRadius: '5px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {labels[level]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Controls: Peak Winds, Health, ThemeToggle & Advisory CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Peak Winds */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-badge)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            padding: '5px 10px',
            borderRadius: '6px',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-red)' }} className="pulse-indicator" />
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 600 }}>
              {cycloneWind} km/h
            </span>
          </div>

          {/* Health Inspector */}
          <button
            onClick={onOpenHealth}
            className="btn-secondary"
            title="Inspect data adapter health and latency"
            style={{ padding: '6px 10px' }}
          >
            <Activity size={14} color="var(--accent-emerald)" />
            <span style={{ fontSize: '0.75rem' }}>System</span>
          </button>

          {/* Theme Toggle in Dashboard */}
          <ThemeToggle />

          {/* Action Brief CTA */}
          <button
            onClick={onOpenAdvisory}
            className="btn-primary"
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          >
            <Sparkles size={14} />
            <span>Generate Action Brief</span>
          </button>
        </div>
      </div>

      {/* Bottom Sub-Navbar: Navigation Tabs */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '4px',
        overflowX: 'auto',
        background: 'var(--bg-surface-elevated)',
      }}>
        {navTabs.map((tab) => {
          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 16px',
                background: isActive ? 'var(--bg-badge)' : 'transparent',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                fontSize: '0.8rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
