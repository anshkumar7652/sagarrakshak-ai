'use client';

import React from 'react';
import {
  AssetRiskAssessment,
  DistrictRiskSummary,
  TrackPoint,
} from '../types';
import {
  AlertTriangle,
  Building2,
  Users,
  Compass,
  MapPin,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ShieldAlert,
  Route,
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
    <aside style={{
      width: '380px',
      height: '100%',
      background: 'rgba(10, 16, 30, 0.95)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 900,
      overflow: 'hidden',
    }}>
      {/* Overview Stat Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, transparent 100%)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            OPERATIONAL ASSESSMENT
          </span>
          <span className="badge badge-critical">PRE-LANDFALL T-0</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.25)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fca5a5', fontSize: '0.72rem' }}>
              <Users size={13} />
              <span>Pop. Exposed</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', fontFamily: 'var(--font-heading)' }}>
              {(totalPopulation / 1000000).toFixed(2)}M
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>WorldPop 100m Grid</div>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(245, 158, 11, 0.25)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fcd34d', fontSize: '0.72rem' }}>
              <ShieldAlert size={13} />
              <span>High Threats</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px', fontFamily: 'var(--font-heading)' }}>
              {topAssets.length} Critical
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Intersecting Hazard</div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* District Risk Summary Cards */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={15} color="var(--accent-amber)" />
              <span>District Vulnerability Index</span>
            </h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>3 Districts Evaluated</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {districts.map((dist) => {
              const pct = Math.round(dist.composite_risk_score * 100);
              const isPuri = dist.district_name === 'Puri';
              return (
                <div
                  key={dist.district_id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: `1px solid ${isPuri ? 'rgba(239, 68, 68, 0.35)' : 'var(--border-subtle)'}`,
                    borderRadius: '8px',
                    padding: '10px 12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} color={isPuri ? '#ef4444' : '#38bdf8'} />
                      <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{dist.district_name}</span>
                    </div>
                    <span className={pct > 85 ? 'badge badge-critical' : 'badge badge-high'}>
                      {pct}% Risk
                    </span>
                  </div>

                  <div style={{ marginTop: '6px', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    <b>Primary Threat:</b> {dist.primary_threat}
                  </div>

                  {/* Risk Progress Bar */}
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: pct > 85 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #38bdf8, #f59e0b)',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 5 Critical Infrastructure Threats */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={15} color="var(--accent-cyan)" />
              <span>Prioritized Infrastructure Threats</span>
            </h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-cyan)', cursor: 'pointer' }}>
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
                  className="glass-panel-hover"
                  style={{
                    background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(15, 23, 42, 0.65)',
                    border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem', marginTop: '2px' }}>{typeIcon}</span>
                      <div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {asset.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {asset.district} • Elev: {asset.elevation_m}m
                        </div>
                      </div>
                    </div>

                    <span className={riskPct >= 80 ? 'badge badge-critical' : 'badge badge-high'}>
                      #{asset.risk_rank} • {riskPct}%
                    </span>
                  </div>

                  <div style={{ marginTop: '8px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    <b>Action:</b> {asset.recommended_action.slice(0, 95)}...
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', paddingTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ fontSize: '0.68rem', color: asset.access_road_status === 'HIGH_RISK' ? '#fca5a5' : '#7dd3fc', fontWeight: 600 }}>
                      Road Access: {asset.access_road_status}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      Inspect <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evacuation Routing Banner CTA */}
        <div style={{
          background: showSafeRoute ? 'rgba(16, 185, 129, 0.15)' : 'rgba(15, 23, 42, 0.65)',
          border: showSafeRoute ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '12px 14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Route size={18} color="var(--accent-emerald)" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Safe Evacuation Corridor
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  NH-316 High-Embankment Route
                </div>
              </div>
            </div>

            <button
              onClick={onToggleSafeRoute}
              style={{
                background: showSafeRoute ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                color: showSafeRoute ? '#6ee7b7' : 'var(--text-secondary)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
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
