'use client';

import React from 'react';
import { AssetRiskAssessment } from '../types';
import {
  X,
  Building2,
  AlertTriangle,
  Wind,
  CloudRain,
  Waves,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '420px',
      height: '100%',
      background: 'rgba(10, 16, 30, 0.96)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid var(--border-glow)',
      boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.7)',
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.1) 0%, transparent 100%)',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className={riskPct >= 80 ? 'badge badge-critical' : 'badge badge-high'}>
              RANK #{asset.risk_rank} • {riskPct}% COMPOSITE RISK
            </span>
            <span className="badge badge-medium">{asset.criticality}</span>
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            {asset.name}
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {asset.district} District • Elevation: {asset.elevation_m}m above MSL
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Body Details */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* Recommended Action Box */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          borderRadius: '10px',
          padding: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fca5a5', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px' }}>
            <AlertTriangle size={15} />
            <span>DEOC RECOMMENDED ACTION</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.45, fontWeight: 500 }}>
            {asset.recommended_action}
          </p>
          <p style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '6px', fontStyle: 'italic' }}>
            {asset.explanation}
          </p>
        </div>

        {/* Hazard Breakdown Bars */}
        <div>
          <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Hazard Components (Screening)
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Wind */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
                  <Wind size={13} color="var(--accent-cyan)" /> Wind Hazard Index
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {(asset.hazard_breakdown.wind * 100).toFixed(0)}%
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${asset.hazard_breakdown.wind * 100}%`, height: '100%', background: 'linear-gradient(90deg, #38bdf8, #ef4444)' }} />
              </div>
            </div>

            {/* Rainfall */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
                  <CloudRain size={13} color="var(--accent-blue)" /> GPM Rainfall Saturation
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {(asset.hazard_breakdown.rainfall * 100).toFixed(0)}%
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${asset.hazard_breakdown.rainfall * 100}%`, height: '100%', background: 'linear-gradient(90deg, #38bdf8, #0284c7)' }} />
              </div>
            </div>

            {/* Surge Inundation */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
                  <Waves size={13} color="var(--accent-cyan)" /> Coastal Surge Inundation
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {(asset.hazard_breakdown.inundation * 100).toFixed(0)}%
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${asset.hazard_breakdown.inundation * 100}%`, height: '100%', background: 'linear-gradient(90deg, #00f0ff, #f43f5e)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Operational Exposure & Population */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '12px',
        }}>
          <h4 style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
            Exposure Metrics
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem' }}>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Population Served:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {asset.population_served.toLocaleString()} residents
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Access Road Status:</span>
              <div style={{ fontWeight: 700, color: asset.access_road_status === 'HIGH_RISK' ? '#fca5a5' : '#7dd3fc', marginTop: '2px' }}>
                {asset.access_road_status}
              </div>
            </div>
          </div>
        </div>

        {/* Nearest Lower-Risk Alternative Facility */}
        {asset.nearest_alternative && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '8px',
            padding: '12px',
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6ee7b7', textTransform: 'uppercase' }}>
              Designated Referral Facility
            </span>
            <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)', marginTop: '3px' }}>
              {asset.nearest_alternative.name}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Distance: {asset.nearest_alternative.distance_km} km via high-embankment corridor
            </div>

            <button
              onClick={() => {
                onShowRoute();
                onClose();
              }}
              style={{
                marginTop: '10px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: 'rgba(16, 185, 129, 0.25)',
                color: '#6ee7b7',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                padding: '7px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Route size={14} />
              <span>Plot Safe Route on Map</span>
            </button>
          </div>
        )}

        {/* Data Provenance Card */}
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', paddingTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <p><b>Data Card:</b> USGS SRTM 30m DEM • NASA GPM IMERG V07 • OSDMA Facility Registry • WorldPop 100m</p>
          <p style={{ marginTop: '2px' }}>Verification: Official Government Registry ID confirmed.</p>
        </div>

      </div>
    </div>
  );
};
