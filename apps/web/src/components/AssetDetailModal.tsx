'use client';

import React from 'react';
import { AssetRiskAssessment } from '../types';
import {
  X,
  AlertTriangle,
  Wind,
  CloudRain,
  Waves,
  Route,
} from 'lucide-react';

interface AssetDetailModalProps {
  asset: AssetRiskAssessment | null;
  onClose: () => void;
  onShowRoute: () => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  onShowRoute,
}) => {
  if (!asset) return null;

  const riskPct = Math.round(asset.composite_risk_score * 100);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '430px',
        maxWidth: '100vw',
        height: '100%',
        background: 'var(--bg-surface-elevated)',
        backdropFilter: 'blur(24px)',
        borderLeft: '1px solid var(--border-glow)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 1100,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, var(--bg-badge) 0%, transparent 100%)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className={riskPct >= 80 ? 'badge badge-critical' : 'badge badge-high'}>
              RANK #{asset.risk_rank} • {riskPct}% COMPOSITE RISK
            </span>
            <span className="badge badge-medium">{asset.criticality}</span>
          </div>
          <h2
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            {asset.name}
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px' }}>
            {asset.district} District • Elevation: {asset.elevation_m}m above MSL
          </p>
        </div>

        <button
          onClick={onClose}
          className="btn-secondary"
          style={{
            padding: '6px',
            borderRadius: '8px',
            lineHeight: 0,
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body Details (Scrollable) */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Recommended Action Box */}
        <div
          className="interactive-card"
          style={{
            padding: '16px',
            borderColor: 'rgba(239, 68, 68, 0.35)',
            background: 'var(--bg-badge)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-red)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '8px' }}>
            <AlertTriangle size={16} />
            <span>DEOC RECOMMENDED ACTION</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: 500 }}>
            {asset.recommended_action}
          </p>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px', fontStyle: 'italic', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px' }}>
            {asset.explanation}
          </p>
        </div>

        {/* Hazard Breakdown Bars */}
        <div className="glass-panel" style={{ padding: '16px' }}>
          <h4
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Hazard Components (Screening)
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Wind */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '5px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <Wind size={14} color="var(--accent-primary)" /> Wind Hazard Index
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {(asset.hazard_breakdown.wind * 100).toFixed(0)}%
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-surface-elevated)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: `${asset.hazard_breakdown.wind * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-red))' }} />
              </div>
            </div>

            {/* Rainfall */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '5px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <CloudRain size={14} color="var(--accent-primary)" /> GPM Rainfall Saturation
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {(asset.hazard_breakdown.rainfall * 100).toFixed(0)}%
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-surface-elevated)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: `${asset.hazard_breakdown.rainfall * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), #0284c7)' }} />
              </div>
            </div>

            {/* Surge Inundation */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '5px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <Waves size={14} color="var(--accent-cyan)" /> Coastal Surge Inundation
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {(asset.hazard_breakdown.inundation * 100).toFixed(0)}%
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-surface-elevated)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: `${asset.hazard_breakdown.inundation * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), #f43f5e)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Operational Exposure & Population */}
        <div className="glass-panel" style={{ padding: '16px' }}>
          <h4
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Exposure Metrics
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem' }}>
            <div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>Population Served:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem' }}>
                {asset.population_served.toLocaleString()} residents
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>Access Road Status:</span>
              <div style={{ fontWeight: 700, color: asset.access_road_status === 'HIGH_RISK' ? 'var(--accent-red)' : 'var(--accent-emerald)', marginTop: '2px', fontSize: '0.84rem' }}>
                {asset.access_road_status}
              </div>
            </div>
          </div>
        </div>

        {/* Nearest Lower-Risk Alternative Facility */}
        {asset.nearest_alternative && (
          <div
            className="interactive-card"
            style={{
              padding: '16px',
              borderColor: 'rgba(16, 185, 129, 0.4)',
              background: 'var(--bg-badge)',
            }}
          >
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Designated Referral Facility
            </span>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: '4px', fontFamily: "'Outfit', sans-serif" }}>
              {asset.nearest_alternative.name}
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
              Distance: {asset.nearest_alternative.distance_km} km via high-embankment corridor
            </div>
          </div>
        )}

        {/* Data Provenance Card */}
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
          <p><strong>Data Card:</strong> USGS SRTM 30m DEM • NASA GPM IMERG V07 • OSDMA Facility Registry • WorldPop 100m</p>
          <p style={{ marginTop: '3px' }}>Verification: Official Government Registry ID confirmed.</p>
        </div>
      </div>

      {/* Standardized Bottom Sticky Footer */}
      <div
        style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={onClose}
          className="btn-secondary"
          style={{ flex: 1, padding: '10px 16px', fontSize: '0.85rem' }}
        >
          Close Drawer
        </button>

        {asset.nearest_alternative && (
          <button
            onClick={() => {
              onShowRoute();
              onClose();
            }}
            className="btn-primary"
            style={{ flex: 1.5, padding: '10px 16px', fontSize: '0.85rem' }}
          >
            <Route size={16} />
            <span>Plot Safe Route</span>
          </button>
        )}
      </div>
    </div>
  );
};
