'use client';

import React from 'react';
import {
  AssetRiskAssessment,
  DistrictRiskSummary,
} from '../types';
import {
  AlertTriangle,
  Building2,
  Users,
  MapPin,
  ChevronRight,
  ShieldAlert,
  Route,
  Activity,
} from 'lucide-react';

interface RiskSidebarProps {
  districts: DistrictRiskSummary[];
  topAssets: AssetRiskAssessment[];
  selectedAsset: AssetRiskAssessment | null;
  onSelectAsset: (asset: AssetRiskAssessment) => void;
  showSafeRoute: boolean;
  onToggleSafeRoute: () => void;
  totalPopulation: number;
}

export const RiskSidebar: React.FC<RiskSidebarProps> = ({
  districts,
  topAssets,
  selectedAsset,
  onSelectAsset,
  showSafeRoute,
  onToggleSafeRoute,
  totalPopulation,
}) => {
  return (
    <aside
      className="glass-panel"
      style={{
        width: '390px',
        height: '100%',
        borderRadius: 0,
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 900,
        overflow: 'hidden',
        background: 'var(--bg-surface)',
      }}
    >
      {/* Overview Stat Header - Bento Style */}
      <div
        style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'linear-gradient(180deg, var(--bg-badge) 0%, transparent 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={14} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              OPERATIONAL SITUATION
            </span>
          </div>
          <span className="badge badge-critical">PRE-LANDFALL T-0</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div
            className="interactive-card"
            style={{
              padding: '12px 14px',
              borderLeft: '3px solid var(--accent-red)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-red)', fontSize: '0.72rem', fontWeight: 600 }}>
              <Users size={14} />
              <span>Exposed Pop.</span>
            </div>
            <div
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginTop: '4px',
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.1,
              }}
            >
              {(((totalPopulation || 0) / 1000000) || 1.37).toFixed(2)}M
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              WorldPop 100m Grid
            </div>
          </div>

          <div
            className="interactive-card"
            style={{
              padding: '12px 14px',
              borderLeft: '3px solid var(--accent-amber)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-amber)', fontSize: '0.72rem', fontWeight: 600 }}>
              <ShieldAlert size={14} />
              <span>Critical Assets</span>
            </div>
            <div
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginTop: '4px',
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.1,
              }}
            >
              {topAssets.length} At Risk
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Tier-1 Inundation
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* District Risk Summary Cards */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Outfit', sans-serif" }}>
              <AlertTriangle size={15} color="var(--accent-amber)" />
              <span>District Vulnerability Index</span>
            </h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>3 Monitored</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {districts.map((dist) => {
              const pct = Math.round(dist.composite_risk_score * 100);
              const isPuri = dist.district_name === 'Puri';
              return (
                <div
                  key={dist.district_id}
                  className="interactive-card"
                  style={{
                    padding: '12px 14px',
                    borderColor: isPuri ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} color={isPuri ? 'var(--accent-red)' : 'var(--accent-primary)'} />
                      <span style={{ fontWeight: 700, fontSize: '0.88rem', fontFamily: "'Outfit', sans-serif" }}>{dist.district_name}</span>
                    </div>
                    <span className={pct > 85 ? 'badge badge-critical' : 'badge badge-high'}>
                      {pct}% Risk
                    </span>
                  </div>

                  <div style={{ marginTop: '6px', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Primary Threat:</strong> {dist.primary_threat}
                  </div>

                  {/* Risk Progress Bar */}
                  <div style={{ width: '100%', height: '5px', background: 'var(--bg-surface-elevated)', borderRadius: '3px', marginTop: '8px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        background: pct > 85 ? 'linear-gradient(90deg, var(--accent-amber), var(--accent-red))' : 'linear-gradient(90deg, var(--accent-primary), var(--accent-amber))',
                        borderRadius: '3px',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 5 Critical Infrastructure Threats */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Outfit', sans-serif" }}>
              <Building2 size={15} color="var(--accent-primary)" />
              <span>Prioritized Infrastructure Threats</span>
            </h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
              Ranked by Risk
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {topAssets.map((asset) => {
              const isSelected = selectedAsset?.asset_id === asset.asset_id;
              const riskPct = Math.round(asset.composite_risk_score * 100);

              let typeIcon = '🏥';
              if (asset.type === 'shelter') typeIcon = '🛡️';
              else if (asset.type === 'power_substation') typeIcon = '⚡';
              else if (asset.type === 'arterial_road') typeIcon = '🛣️';

              return (
                <div
                  key={asset.asset_id}
                  onClick={() => onSelectAsset(asset)}
                  className="interactive-card glass-panel-hover"
                  style={{
                    padding: '12px 14px',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--bg-badge)' : 'var(--bg-card)',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem', marginTop: '1px' }}>{typeIcon}</span>
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                          {asset.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                          {asset.district} • Elev: {asset.elevation_m}m
                        </div>
                      </div>
                    </div>

                    <span className={riskPct >= 80 ? 'badge badge-critical' : 'badge badge-high'}>
                      #{asset.risk_rank} • {riskPct}%
                    </span>
                  </div>

                  <div style={{ marginTop: '8px', fontSize: '0.73rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Action:</strong> {(asset.recommended_action || 'Inspect immediate facility readiness and verify emergency power.').slice(0, 95)}...
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '8px',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.68rem',
                        color: asset.access_road_status === 'HIGH_RISK' ? 'var(--accent-red)' : 'var(--accent-emerald)',
                        fontWeight: 600,
                      }}
                    >
                      Road: {asset.access_road_status}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                      Inspect <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evacuation Routing Banner CTA */}
        <div
          className="interactive-card"
          style={{
            padding: '14px 16px',
            borderColor: showSafeRoute ? 'var(--accent-emerald)' : 'var(--border-subtle)',
            background: showSafeRoute ? 'var(--bg-badge)' : 'var(--bg-card)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Route size={18} color="var(--accent-emerald)" />
              </div>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                  Safe Evacuation Corridor
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  NH-316 High-Embankment Route
                </div>
              </div>
            </div>

            <button
              onClick={onToggleSafeRoute}
              className={showSafeRoute ? 'btn-primary' : 'btn-outline-cyan'}
              style={{
                fontSize: '0.75rem',
                padding: '7px 12px',
                flexShrink: 0,
              }}
            >
              {showSafeRoute ? 'Active on Map' : 'Show Route'}
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
};
