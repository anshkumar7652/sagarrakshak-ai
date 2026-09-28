'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AssetRiskAssessment, TrackPoint } from '../types';
import { Layers, Eye, Shield, Hospital, Zap, Navigation, Info } from 'lucide-react';

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

      // CartoDB Dark Matter tile layer
      Leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        subdomains: 'abcd',
      }).addTo(map);

      // Add Zoom control at bottom right
      Leaflet.control.zoom({ position: 'bottomright' }).addTo(map);

      layerGroupsRef.current = {
        track: Leaflet.layerGroup().addTo(map),
        inundation: Leaflet.layerGroup().addTo(map),
        infrastructure: Leaflet.layerGroup().addTo(map),
        route: Leaflet.layerGroup().addTo(map),
      };

      mapInstanceRef.current = map;
    }

    return () => {
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
    if (!L || !map || !group || !currentTrackPoint) return;

    group.clearLayers();
    if (!layersVisible.track) return;

    // Track polyline
    if (allTrackPoints.length > 1) {
      const latlngs = allTrackPoints.map((p) => [p.lat, p.lon]);
      L.polyline(latlngs, {
        color: '#ef4444',
        weight: 3,
        dashArray: '6, 6',
        opacity: 0.75,
      }).addTo(group);
    }

    // Cone of Uncertainty Circle around current position
    const radiusMeters = (currentTrackPoint.cone_radius_km || 40) * 1000;
    L.circle([currentTrackPoint.lat, currentTrackPoint.lon], {
      radius: radiusMeters,
      color: '#ef4444',
      weight: 1,
      dashArray: '3, 6',
      fillColor: '#ef4444',
      fillOpacity: 0.12,
    })
      .bindTooltip(`<b>Cone of Uncertainty</b> (Radius: ${currentTrackPoint.cone_radius_km} km)`, {
        sticky: true,
      })
      .addTo(group);

    // Eye of Cyclone Pulsing Center Marker
    const cycloneHtml = `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: radial-gradient(circle, #ef4444 30%, rgba(239, 68, 68, 0.4) 70%);
        border: 2px solid #ffffff;
        box-shadow: 0 0 20px #ef4444;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 11px;
        font-weight: bold;
      ">
        🌀
      </div>
    `;

    const icon = L.divIcon({
      html: cycloneHtml,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker([currentTrackPoint.lat, currentTrackPoint.lon], { icon })
      .bindPopup(`
        <div style="padding: 4px;">
          <h4 style="color: #ef4444; margin-bottom: 4px;">🌀 Cyclone Fani (ESCS)</h4>
          <p style="font-size: 12px; margin: 2px 0;"><b>Stage:</b> ${currentTrackPoint.stage}</p>
          <p style="font-size: 12px; margin: 2px 0;"><b>Max Winds:</b> ${currentTrackPoint.wind_kmh} km/h</p>
          <p style="font-size: 12px; margin: 2px 0;"><b>Pressure:</b> ${currentTrackPoint.pressure_hpa} hPa</p>
          <p style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Timestamp: ${currentTrackPoint.timestamp}</p>
        </div>
      `)
      .addTo(group);
  }, [currentTrackPoint, allTrackPoints, layersVisible.track]);

  // Update Infrastructure Layer
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current.infrastructure;
    if (!L || !map || !group) return;

    group.clearLayers();
    if (!layersVisible.infrastructure) return;

    assets.forEach((asset) => {
      const [lon, lat] = asset.coordinates;

      // Color based on risk score
      let color = '#10b981'; // safe
      if (asset.composite_risk_score >= 0.8) color = '#ef4444'; // critical
      else if (asset.composite_risk_score >= 0.65) color = '#f59e0b'; // high
      else if (asset.composite_risk_score >= 0.45) color = '#38bdf8'; // medium

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
          background: rgba(12, 18, 34, 0.9);
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

      const marker = L.marker([lat, lon], { icon: customIcon }).addTo(group);

      marker.on('click', () => {
        onSelectAsset(asset);
      });

      marker.bindTooltip(`
        <div style="font-family: sans-serif; font-size: 11px;">
          <b>${asset.name}</b><br/>
          <span style="color: ${color}; font-weight: bold;">
            Risk: ${(asset.composite_risk_score * 100).toFixed(0)}% (${asset.criticality})
          </span><br/>
          Pop: ${asset.population_served.toLocaleString()} | Elev: ${asset.elevation_m}m
        </div>
      `, { sticky: true });
    });
  }, [assets, selectedAsset, layersVisible.infrastructure]);

  // Update Safe Route Layer
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current.route;
    if (!L || !map || !group) return;

    group.clearLayers();
    if (!showSafeRoute || !layersVisible.route) return;

    // Glowing green safe corridor coordinates (DHH Puri -> AIIMS Bhubaneswar via NH-316 high embankment)
    const routeCoords = [
      [19.8135, 85.8286],
      [19.8451, 85.8315],
      [20.0435, 85.8361],
      [20.1542, 85.8523],
      [20.2285, 85.8451],
      [20.2312, 85.7766],
    ];

    // Background glow line
    L.polyline(routeCoords, {
      color: '#10b981',
      weight: 8,
      opacity: 0.35,
    }).addTo(group);

    // Foreground dashed active corridor
    L.polyline(routeCoords, {
      color: '#34d399',
      weight: 3.5,
      dashArray: '8, 6',
      opacity: 0.95,
    })
      .bindTooltip('<b>Safe Emergency Corridor (NH-316)</b><br/>Elevated Embankment Route Bypassing Bhargavi River Spillway', {
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
          <Layers size={15} color="var(--accent-cyan)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
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
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: isAct ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                border: isAct ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: isAct ? 'var(--text-primary)' : 'var(--text-muted)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
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
          padding: '10px 14px',
          fontSize: '0.74rem',
          maxWidth: '280px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Info size={14} color="var(--accent-blue)" />
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Hazard & Risk Key</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Critical Risk Facility (&gt;80%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ color: 'var(--text-secondary)' }}>High Risk Facility (65-80%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '8px', background: 'rgba(0, 240, 255, 0.5)', border: '1px dashed #00f0ff' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Surge Screening (USGS SRTM)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '4px', background: '#34d399', borderRadius: '2px' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Safe Evacuation Corridor</span>
          </div>
        </div>
      </div>
    </div>
  );
};
