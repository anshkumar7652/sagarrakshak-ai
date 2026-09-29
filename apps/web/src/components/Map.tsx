'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AssetRiskAssessment, TrackPoint } from '../types';
import { Layers, Info } from 'lucide-react';

interface MapProps {
  currentTrackPoint: TrackPoint;
  allTrackPoints: TrackPoint[];
  assets: AssetRiskAssessment[];
  inundationScenario: 'low' | 'base' | 'high';
  selectedAsset: AssetRiskAssessment | null;
  onSelectAsset: (asset: AssetRiskAssessment) => void;
  showSafeRoute: boolean;
}

export const MapComponent: React.FC<MapProps> = ({
  currentTrackPoint,
  allTrackPoints,
  assets,
  inundationScenario,
  selectedAsset,
  onSelectAsset,
  showSafeRoute,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const layerGroupsRef = useRef<{
    track?: any;
    inundation?: any;
    infrastructure?: any;
    route?: any;
  }>({});

  const [layersVisible, setLayersVisible] = useState({
    track: true,
    inundation: true,
    infrastructure: true,
    route: true,
  });

  const [basemapStyle, setBasemapStyle] = useState<'canvas' | 'satellite' | 'osm'>('canvas');
  const basemapStyleRef = useRef(basemapStyle);
  basemapStyleRef.current = basemapStyle;
  const labelsLayerRef = useRef<any>(null);

  // Helper to load basemap layers
  const applyBasemap = (style: 'canvas' | 'satellite' | 'osm') => {
    const Leaflet = (window as any).L;
    const map = mapInstanceRef.current;
    if (!Leaflet || !map) return;

    if (tileLayerRef.current) {
      try { map.removeLayer(tileLayerRef.current); } catch (_) {}
      tileLayerRef.current = null;
    }
    if (labelsLayerRef.current) {
      try { map.removeLayer(labelsLayerRef.current); } catch (_) {}
      labelsLayerRef.current = null;
    }

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    if (style === 'canvas') {
      const baseUrl = isLight
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
      const labelsUrl = isLight
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}'
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}';

      tileLayerRef.current = Leaflet.tileLayer(baseUrl, {
        maxZoom: 18,
        maxNativeZoom: 16,
      }).addTo(map);

      labelsLayerRef.current = Leaflet.tileLayer(labelsUrl, {
        maxZoom: 18,
        maxNativeZoom: 16,
      }).addTo(map);
    } else if (style === 'satellite') {
      tileLayerRef.current = Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
      }).addTo(map);

      labelsLayerRef.current = Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
      }).addTo(map);
    } else if (style === 'osm') {
      tileLayerRef.current = Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) {
      // Dynamic load fallback
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => initLeaflet();
      document.body.appendChild(script);
      return;
    }

    initLeaflet();

    function initLeaflet() {
      const Leaflet = (window as any).L;
      if (!Leaflet || !mapContainerRef.current) return;

      const map = Leaflet.map(mapContainerRef.current, {
        center: [19.88, 85.95],
        zoom: 9,
        zoomControl: false,
        attributionControl: false,
      });

      // Add Zoom control at bottom right
      Leaflet.control.zoom({ position: 'bottomright' }).addTo(map);

      layerGroupsRef.current = {
        track: Leaflet.layerGroup().addTo(map),
        inundation: Leaflet.layerGroup().addTo(map),
        infrastructure: Leaflet.layerGroup().addTo(map),
        route: Leaflet.layerGroup().addTo(map),
      };

      mapInstanceRef.current = map;
      applyBasemap(basemapStyleRef.current);
    }

    // Observer for light/dark theme change
    const observer = new MutationObserver(() => {
      if (basemapStyleRef.current === 'canvas') {
        applyBasemap('canvas');
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Inundation Layer
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current.inundation;
    if (!L || !map || !group) return;

    group.clearLayers();
    if (!layersVisible.inundation) return;

    // Surge polygons for Coastal Puri & Jagatsinghpur
    const surgeConfigs = {
      low: {
        coords: [
          [[19.68, 85.45], [19.74, 85.68], [19.77, 85.67], [19.71, 85.46]],
          [[19.79, 85.80], [19.88, 86.12], [19.91, 86.11], [19.83, 85.82]],
          [[19.96, 86.24], [20.09, 86.42], [20.13, 86.40], [20.06, 86.30]],
        ],
        color: '#00f0ff',
        fillOpacity: 0.28,
        label: 'Low Scenario (+1.5m Surge Screening)',
      },
      base: {
        coords: [
          [[19.65, 85.40], [19.78, 85.75], [19.82, 85.72], [19.72, 85.42]],
          [[19.77, 85.76], [19.92, 86.22], [20.05, 86.21], [19.88, 85.88]],
          [[19.94, 86.22], [20.25, 86.68], [20.32, 86.64], [20.11, 86.32]],
        ],
        color: '#0284c7',
        fillOpacity: 0.38,
        label: 'Base Scenario (+3.0m Surge Screening)',
      },
      high: {
        coords: [
          [[19.62, 85.35], [19.82, 85.82], [19.88, 85.78], [19.76, 85.40]],
          [[19.75, 85.72], [19.98, 86.32], [20.15, 86.25], [19.94, 85.85]],
          [[19.90, 86.18], [20.30, 86.75], [20.40, 86.71], [20.20, 86.30]],
        ],
        color: '#f43f5e',
        fillOpacity: 0.48,
        label: 'High Scenario (+5.0m Surge Screening)',
      },
    };

    const cfg = surgeConfigs[inundationScenario];
    cfg.coords.forEach((polygonCoords: any) => {
      L.polygon(polygonCoords, {
        color: cfg.color,
        weight: 1.5,
        dashArray: '4, 4',
        fillColor: cfg.color,
        fillOpacity: cfg.fillOpacity,
      })
        .bindTooltip(`<b>${cfg.label}</b><br/>USGS SRTM 30m Hydro-connectivity Screening`, {
          sticky: true,
          className: 'leaflet-tooltip-dark',
        })
        .addTo(group);
    });
  }, [inundationScenario, layersVisible.inundation]);

  // Update Cyclone Track & Cone Layer
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current.track;
    if (!L || !map || !group || !allTrackPoints || allTrackPoints.length === 0) return;

    group.clearLayers();
    if (!layersVisible.track) return;

    // Track Polyline
    const latLngs = allTrackPoints.map((pt) => [pt.lat, pt.lon]);
    L.polyline(latLngs, {
      color: '#38bdf8',
      weight: 3,
      opacity: 0.8,
      dashArray: '6, 6',
    }).addTo(group);

    // Track Points (Circles)
    allTrackPoints.forEach((pt) => {
      const isPast = new Date(pt.timestamp) <= new Date(currentTrackPoint.timestamp);
      const isCurrent = pt.timestamp === currentTrackPoint.timestamp;

      let radius = 5;
      let color = '#38bdf8';
      let fillOpacity = 0.5;

      if (isCurrent) {
        radius = 9;
        color = '#ef4444';
        fillOpacity = 1;
      } else if (isPast) {
        radius = 4;
        color = '#64748b';
        fillOpacity = 0.4;
      }

      const circle = L.circleMarker([pt.lat, pt.lon], {
        radius,
        color,
        fillColor: color,
        fillOpacity,
        weight: isCurrent ? 3 : 1,
      });

      circle.bindTooltip(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px;">
          <strong>${pt.stage}</strong><br/>
          Winds: ${pt.wind_kmh} km/h • Pressure: ${pt.pressure_hpa} hPa<br/>
          ${new Date(pt.timestamp).toUTCString()}
        </div>
      `, { sticky: true });

      circle.addTo(group);
    });

    // Uncertainty Cone around Current Point
    if (currentTrackPoint) {
      L.circle([currentTrackPoint.lat, currentTrackPoint.lon], {
        radius: (currentTrackPoint.cone_radius_km || 65) * 1000,
        color: '#f59e0b',
        weight: 1,
        dashArray: '3, 6',
        fillColor: '#f59e0b',
        fillOpacity: 0.12,
      })
        .bindTooltip('Cone of Track Uncertainty (IMD/JTWC)', { sticky: true })
        .addTo(group);
    }
  }, [currentTrackPoint, allTrackPoints, layersVisible.track]);

  // Update Infrastructure Assets Layer
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current.infrastructure;
    if (!L || !map || !group || !assets) return;

    group.clearLayers();
    if (!layersVisible.infrastructure) return;

    assets.forEach((asset) => {
      const riskScore = asset.composite_risk_score;
      let color = '#10b981';
      if (riskScore >= 0.8) color = '#ef4444';
      else if (riskScore >= 0.65) color = '#f59e0b';
      else if (riskScore >= 0.5) color = '#38bdf8';

      let iconSymbol = '🏥';
      if (asset.type === 'shelter') iconSymbol = '🛡️';
      else if (asset.type === 'power_substation') iconSymbol = '⚡';
      else if (asset.type === 'arterial_road') iconSymbol = '🛣️';

      const isSelected = selectedAsset?.asset_id === asset.asset_id;

      const markerHtml = `
        <div style="
          width: ${isSelected ? '34px' : '26px'};
          height: ${isSelected ? '34px' : '26px'};
          border-radius: 50%;
          background: var(--bg-surface-elevated, #0c1222);
          border: 2px solid ${color};
          box-shadow: 0 0 ${isSelected ? '16px' : '8px'} ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${isSelected ? '14px' : '11px'};
          cursor: pointer;
          transition: all 0.2s ease;
        ">
          ${iconSymbol}
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: '',
        iconSize: [isSelected ? 34 : 26, isSelected ? 34 : 26],
        iconAnchor: [isSelected ? 17 : 13, isSelected ? 17 : 13],
      });

      const [lon, lat] = asset.coordinates;
      const marker = L.marker([lat, lon], { icon: customIcon });

      marker.on('click', () => {
        onSelectAsset(asset);
      });

      marker.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 220px; padding: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: 700; color: ${color}; text-transform: uppercase;">
              Rank #${asset.risk_rank} • ${Math.round(asset.composite_risk_score * 100)}% Risk
            </span>
            <span style="font-size: 10px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 2px 6px; border-radius: 4px;">
              ${asset.criticality}
            </span>
          </div>
          <h4 style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: var(--text-primary);">${asset.name}</h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: var(--text-secondary);">
            ${asset.district} • Elev: ${asset.elevation_m}m above MSL
          </p>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 2px solid #ef4444; padding: 6px 8px; font-size: 11px; color: var(--text-primary); margin-bottom: 8px;">
            <strong>Action:</strong> ${asset.recommended_action}
          </div>
          <button id="btn-inspect-${asset.asset_id}" style="
            width: 100%;
            background: #0284c7;
            color: #ffffff;
            border: none;
            padding: 6px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          ">
            Open Full Decision Protocol
          </button>
        </div>
      `);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-inspect-${asset.asset_id}`);
        if (btn) {
          btn.onclick = () => onSelectAsset(asset);
        }
      });

      marker.addTo(group);
    });
  }, [assets, selectedAsset, layersVisible.infrastructure]);

  // Update Safe Evacuation Route Layer
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current.route;
    if (!L || !map || !group) return;

    group.clearLayers();
    if (!showSafeRoute || !layersVisible.route) return;

    // High embankment corridor coordinates: Puri Beach DHH -> NH-316 -> Pipili High Ground
    const routeCoords = [
      [19.799, 85.825],
      [19.815, 85.832],
      [19.835, 85.845],
      [19.880, 85.860],
      [19.920, 85.875],
      [19.980, 85.890],
      [20.050, 85.870],
      [20.120, 85.835], // Pipili Higher Ground
    ];

    L.polyline(routeCoords, {
      color: '#10b981',
      weight: 5,
      opacity: 0.9,
    })
      .bindTooltip('<b>Designated High-Embankment Corridor (NH-316)</b><br/>Zero Inundation Clearance at +3.0m Surge', {
        sticky: true,
      })
      .addTo(group);
  }, [showSafeRoute, layersVisible.route]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Map Container */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* Floating Layer Controls Toolbar */}
      <div
        className="glass-panel"
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 500,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '6px' }}>
          <Layers size={15} color="var(--accent-primary)" />
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif" }}>
            LAYERS:
          </span>
        </div>

        {[
          { key: 'track', label: 'Cyclone Track', icon: '🌀' },
          { key: 'inundation', label: 'Surge Screening', icon: '🌊' },
          { key: 'infrastructure', label: 'Critical Assets', icon: '🏥' },
          { key: 'route', label: 'Safe Corridor', icon: '🚗' },
        ].map((item) => {
          const isAct = (layersVisible as any)[item.key];
          return (
            <button
              key={item.key}
              onClick={() =>
                setLayersVisible((prev) => ({ ...prev, [item.key]: !(prev as any)[item.key] }))
              }
              className={isAct ? 'btn-outline-cyan' : 'btn-secondary'}
              style={{
                padding: '4px 10px',
                fontSize: '0.74rem',
                gap: '5px',
                background: isAct ? 'var(--bg-badge)' : undefined,
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

        <div style={{ width: '1px', height: '18px', background: 'var(--border-subtle, rgba(255,255,255,0.15))', margin: '0 4px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '4px' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif" }}>
            BASEMAP:
          </span>
        </div>

        {[
          { key: 'canvas', label: 'Tactical Canvas', icon: '🗺️' },
          { key: 'satellite', label: 'Satellite', icon: '🛰️' },
          { key: 'osm', label: 'Street Map', icon: '🌐' },
        ].map((item) => {
          const isAct = basemapStyle === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                setBasemapStyle(item.key as any);
                applyBasemap(item.key as any);
              }}
              className={isAct ? 'btn-outline-cyan' : 'btn-secondary'}
              style={{
                padding: '4px 10px',
                fontSize: '0.74rem',
                gap: '5px',
                background: isAct ? 'var(--bg-badge)' : undefined,
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Map Legend */}
      <div
        className="glass-panel"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '16px',
          zIndex: 500,
          padding: '12px 16px',
          fontSize: '0.74rem',
          maxWidth: '280px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Info size={14} color="var(--accent-primary)" />
          <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Hazard & Risk Key</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-red)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Critical Risk Facility (&gt;80%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-amber)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>High Risk Facility (65-80%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '8px', background: 'var(--bg-badge)', border: '1px dashed var(--accent-cyan)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Surge Screening (USGS SRTM)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '4px', background: 'var(--accent-emerald)', borderRadius: '2px' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Safe Evacuation Corridor</span>
          </div>
        </div>
      </div>
    </div>
  );
};
