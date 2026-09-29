'use client';

import React, { useState, useEffect } from 'react';
import { CriticalAssetRecord, AssetStats } from '../types';
import { fetchAssets, fetchAssetStats, toggleAssetBackupPower } from '../lib/api';

interface AssetRegistryViewProps {
  onFocusAssetOnMap?: (asset: CriticalAssetRecord) => void;
}

export function AssetRegistryView({ onFocusAssetOnMap }: AssetRegistryViewProps) {
  const [assets, setAssets] = useState<CriticalAssetRecord[]>([]);
  const [stats, setStats] = useState<AssetStats | null>(null);
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedCriticality, setSelectedCriticality] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const [assetList, statsData] = await Promise.all([
      fetchAssets({
        district: selectedDistrict === 'ALL' ? undefined : selectedDistrict,
        type: selectedType === 'ALL' ? undefined : selectedType,
        criticality: selectedCriticality === 'ALL' ? undefined : selectedCriticality,
        search: search || undefined,
      }),
      fetchAssetStats(),
    ]);
    setAssets(assetList);
    setStats(statsData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [selectedDistrict, selectedType, selectedCriticality]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleBackupToggle = async (assetId: string, current: boolean) => {
    await toggleAssetBackupPower(assetId, !current);
    setAssets((prev) =>
      prev.map((a) => (a.asset_id === assetId ? { ...a, backup_power: !current } : a))
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: 'var(--bg-primary)',
        padding: '24px 32px',
        overflowY: 'auto',
        gap: '24px',
      }}
    >
      {/* Header & Stats Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.4rem' }}>🏛️</span>
            <h1
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Critical Coastal Infrastructure Registry
            </h1>
            <span className="badge badge-safe">SQLite Verified Database</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Authoritative registry of hospitals, cyclone shelters, power substations, and arterial routes mapped to GEE digital elevation models.
          </p>
        </div>

        <button
          onClick={loadData}
          className="btn-secondary"
          style={{ fontSize: '0.82rem', padding: '8px 16px' }}
        >
          🔄 Refresh Registry
        </button>
      </div>

      {/* KPI Stats Grid - Bento Style */}
      {stats && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '16px',
          }}
        >
          <div className="interactive-card" style={{ padding: '18px 20px', borderLeft: '4px solid var(--accent-primary)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              Total Monitored Assets
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '4px', fontFamily: "'Outfit', sans-serif" }}>
              {stats.total_assets}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Across Puri, Khurda, Jagatsinghpur
            </div>
          </div>

          <div className="interactive-card" style={{ padding: '18px 20px', borderLeft: '4px solid var(--accent-emerald)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              Population Served
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '4px', fontFamily: "'Outfit', sans-serif" }}>
              {(stats.total_population_served / 100000).toFixed(1)} Lakhs
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Under facility catchment
            </div>
          </div>

          <div className="interactive-card" style={{ padding: '18px 20px', borderLeft: '4px solid #0284c7' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              Total Shelter Capacity
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0284c7', marginTop: '4px', fontFamily: "'Outfit', sans-serif" }}>
              {stats.total_shelter_capacity.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Multi-purpose cyclone shelters
            </div>
          </div>

          <div className="interactive-card" style={{ padding: '18px 20px', borderLeft: '4px solid var(--accent-amber)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              Backup Diesel Power Ready
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '4px', fontFamily: "'Outfit', sans-serif" }}>
              {stats.backup_power_rate_percent}%
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Auxiliary generators verified
            </div>
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
        <form onSubmit={handleSearchSubmit} style={{ flex: '1 1 260px', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Search asset name or ID (e.g. DHH Puri, Astaranga)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              outline: 'none',
            }}
          />
          <button type="submit" className="btn-secondary" style={{ padding: '8px 16px' }}>
            🔍 Search
          </button>
        </form>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Districts</option>
            <option value="Puri">Puri</option>
            <option value="Khurda">Khurda / Bhubaneswar</option>
            <option value="Jagatsinghpur">Jagatsinghpur</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Asset Types</option>
            <option value="hospital">🏥 Hospitals & CHCs</option>
            <option value="shelter">🏢 Cyclone Shelters</option>
            <option value="power_substation">⚡ Power Grid Substations</option>
            <option value="arterial_road">🛣️ Arterial Highways</option>
          </select>

          <select
            value={selectedCriticality}
            onChange={(e) => setSelectedCriticality(e.target.value)}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL">All Criticality</option>
            <option value="CRITICAL">Critical Tier 1</option>
            <option value="HIGH">High Tier 2</option>
            <option value="MEDIUM">Medium Tier 3</option>
          </select>
        </div>
      </div>

      {/* Asset Table */}
      <div className="glass-panel" style={{ overflowX: 'auto', borderRadius: '12px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Asset ID & Facility</th>
              <th style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Type</th>
              <th style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>District / Block</th>
              <th style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Elevation (DEM)</th>
              <th style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Capacity / Coverage</th>
              <th style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Backup Power</th>
              <th style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Nearest Alternative</th>
              <th style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontWeight: 600, fontFamily: "'Outfit', sans-serif", textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Loading database records...
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No assets match current filter criteria.
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr
                  key={asset.asset_id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background 0.15s ease',
                  }}
                  className="glass-panel-hover"
                >
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>{asset.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                      {asset.asset_id} • {asset.lat.toFixed(4)}°N, {asset.lon.toFixed(4)}°E
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <span style={{ textTransform: 'capitalize' }}>
                      {asset.type === 'hospital' && '🏥 Hospital'}
                      {asset.type === 'shelter' && '🏢 Shelter'}
                      {asset.type === 'power_substation' && '⚡ Substation'}
                      {asset.type === 'arterial_road' && '🛣️ Highway'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ fontWeight: 600 }}>{asset.district}</div>
                    {asset.subdistrict && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{asset.subdistrict}</div>
                    )}
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <span style={{
                      fontWeight: 700,
                      color: asset.elevation_m < 5.0 ? 'var(--accent-red)' : asset.elevation_m < 10.0 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {asset.elevation_m}m
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
                      {asset.elevation_m < 5.0 ? '(Inundation Risk)' : '(Elevated)'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    {asset.capacity_beds && <div>🛏️ {asset.capacity_beds} Beds</div>}
                    {asset.capacity_persons && <div>👥 {asset.capacity_persons} Capacity</div>}
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Served: {asset.population_served.toLocaleString()}
                    </div>
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    <button
                      onClick={() => handleBackupToggle(asset.asset_id, asset.backup_power)}
                      className={asset.backup_power ? 'btn-outline-cyan' : 'btn-secondary'}
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {asset.backup_power ? '⚡ Online (DG)' : '❌ Inactive'}
                    </button>
                  </td>
                  <td style={{ padding: '12px 18px' }}>
                    {asset.alternative_name ? (
                      <div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{asset.alternative_name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)' }}>
                          {asset.alternative_dist_km} km away
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>None Designated</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                    <span className={`badge ${asset.criticality === 'CRITICAL' ? 'badge-critical' : asset.criticality === 'HIGH' ? 'badge-high' : 'badge-medium'}`}>
                      {asset.criticality}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
