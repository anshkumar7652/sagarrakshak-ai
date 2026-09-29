'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AssetRiskAssessment, TrackPoint } from '../types';
import { Layers, Info, Navigation, Compass, MapPin, ZoomIn, Eye } from 'lucide-react';

interface MapProps {
  currentTrackPoint: TrackPoint;
  allTrackPoints: TrackPoint[];
  assets: AssetRiskAssessment[];
  inundationScenario: 'low' | 'base' | 'high';
  selectedAsset: AssetRiskAssessment | null;
  onSelectAsset: (asset: AssetRiskAssessment) => void;
  showSafeRoute: boolean;
  isPlaying?: boolean;
}

export const MapComponent: React.FC<MapProps> = ({
  currentTrackPoint,
  allTrackPoints = [],
  assets = [],
  inundationScenario,
  selectedAsset,
  onSelectAsset,
  showSafeRoute,
  isPlaying = false,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const labelsLayerRef = useRef<any>(null);
  const initialFittedRef = useRef<boolean>(false);

  const layerGroupsRef = useRef<{
    track?: any;
    inundation?: any;
    infrastructure?: any;
    route?: any;
  }>({});

  const [isMapReady, setIsMapReady] = useState(false);
  const [cameraMode, setCameraMode] = useState<'follow' | 'overview' | 'landfall'>('follow');

  const [layersVisible, setLayersVisible] = useState({
    track: true,
    inundation: true,
    infrastructure: true,
    route: true,
  });

  const [basemapStyle, setBasemapStyle] = useState<'canvas' | 'satellite' | 'osm'>('canvas');
  const basemapStyleRef = useRef(basemapStyle);
  basemapStyleRef.current = basemapStyle;

  // Helper to load basemap layers
  const applyBasemap = useCallback((style: 'canvas' | 'satellite' | 'osm') => {
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
  }, []);

  // Initialize Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) {
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
        center: [17.8, 85.5], // Centered between Bay of Bengal approach and Odisha coast
        zoom: 7,
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
      setIsMapReady(true);
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
      setIsMapReady(false);
    };
  }, [applyBasemap]);

  // Initial bounds auto-fit to show entire Bay of Bengal track
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    if (!L || !map || !isMapReady || !allTrackPoints || allTrackPoints.length === 0 || initialFittedRef.current) return;

    try {
      const validPoints = allTrackPoints
        .filter((pt) => typeof pt?.lat === 'number' && typeof pt?.lon === 'number')
        .map((pt) => [pt.lat, pt.lon]);

      if (validPoints.length > 0) {
        const bounds = L.latLngBounds(validPoints);
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 });
        initialFittedRef.current = true;
      }
    } catch (e) {
      console.warn('Initial track fit error:', e);
    }
  }, [isMapReady, allTrackPoints]);

  // Smooth Camera Management (Follow Eye, Landfall, Overview)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = (window as any).L;
    if (!map || !L || !isMapReady) return;

    if (cameraMode === 'follow' && currentTrackPoint && typeof currentTrackPoint.lat === 'number') {
      map.panTo([currentTrackPoint.lat, currentTrackPoint.lon], { animate: true, duration: 0.6 });
    } else if (cameraMode === 'landfall') {
      map.setView([19.85, 85.85], 9, { animate: true, duration: 0.8 });
    } else if (cameraMode === 'overview' && allTrackPoints && allTrackPoints.length > 0) {
      const validPoints = allTrackPoints
        .filter((pt) => typeof pt?.lat === 'number' && typeof pt?.lon === 'number')
        .map((pt) => [pt.lat, pt.lon]);
      if (validPoints.length > 0) {
        map.fitBounds(L.latLngBounds(validPoints), { padding: [60, 60], maxZoom: 8, animate: true });
      }
    }
  }, [cameraMode, currentTrackPoint, isMapReady, allTrackPoints]);

  // Auto-follow when playing simulation
  useEffect(() => {
    if (isPlaying && cameraMode !== 'follow') {
      setCameraMode('follow');
    }
  }, [isPlaying, cameraMode]);

  // Update Inundation Layer
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current.inundation;
    if (!L || !map || !group || !isMapReady) return;

    group.clearLayers();
    if (!layersVisible.inundation) return;

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
  }, [inundationScenario, layersVisible.inundation, isMapReady]);

  // Update Cyclone Track, Path & Active Eye Layer
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current?.track;
    if (!L || !map || !group || !isMapReady || !allTrackPoints || allTrackPoints.length === 0) return;

    try {
      group.clearLayers();
      if (!layersVisible.track) return;

      const validPoints = allTrackPoints.filter(
        (pt) => typeof pt?.lat === 'number' && typeof pt?.lon === 'number'
      );
      if (validPoints.length === 0) return;

      const activePoint = currentTrackPoint || validPoints[0];
      const activeIdx = validPoints.findIndex((pt) => pt.timestamp === activePoint.timestamp);
      const safeActiveIdx = activeIdx >= 0 ? activeIdx : 0;

      // 1. FULL BACKGROUND CORRIDOR GLOW LINE (Always shows full trajectory)
      const allLatLngs = validPoints.map((pt) => [pt.lat, pt.lon]);
      L.polyline(allLatLngs, {
        color: 'rgba(56, 189, 248, 0.25)',
        weight: 8,
        opacity: 0.6,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(group);

      // 2. OBSERVED / TRAVELED PATH (From genesis up to active index)
      const pastPoints = validPoints.slice(0, safeActiveIdx + 1);
      if (pastPoints.length >= 2) {
        const pastLatLngs = pastPoints.map((pt) => [pt.lat, pt.lon]);
        L.polyline(pastLatLngs, {
          color: '#f59e0b',
          weight: 4.5,
          opacity: 0.95,
          lineCap: 'round',
        }).addTo(group);
      }

      // 3. PROJECTED / FORECAST PATH (From active index to end of track)
      const futurePoints = validPoints.slice(safeActiveIdx);
      if (futurePoints.length >= 2) {
        const futureLatLngs = futurePoints.map((pt) => [pt.lat, pt.lon]);
        L.polyline(futureLatLngs, {
          color: '#00f0ff',
          weight: 3.5,
          opacity: 0.9,
          dashArray: '8, 8',
          lineCap: 'round',
        }).addTo(group);
      }

      // 4. MILESTONE CHECKPOINTS (All Track Points)
      validPoints.forEach((pt, idx) => {
        const isPast = idx < safeActiveIdx;
        const isCurrent = idx === safeActiveIdx;
        const isLandfall = pt.stage?.toLowerCase().includes('landfall') || (pt.lat === 19.8 && pt.lon === 85.85);

        if (isCurrent) return; // Drawn separately with rich radar eye

        const radius = isLandfall ? 8 : (isPast ? 4.5 : 5);
        const color = isLandfall ? '#ef4444' : (isPast ? '#f59e0b' : '#38bdf8');
        const fillOpacity = isPast ? 0.7 : 0.4;

        const circle = L.circleMarker([pt.lat, pt.lon], {
          radius,
          color,
          fillColor: color,
          fillOpacity,
          weight: isLandfall ? 3 : 1.5,
        });

        circle.bindTooltip(`
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; padding: 2px;">
            <strong style="color: ${color};">${pt.stage || 'Track Waypoint'}</strong><br/>
            Winds: <b>${pt.wind_kmh || 0} km/h</b> • Pressure: <b>${pt.pressure_hpa || 0} hPa</b><br/>
            ${pt.category || ''}<br/>
            <span style="color: #94a3b8; font-size: 10px;">${pt.timestamp ? new Date(pt.timestamp).toUTCString().slice(0, 22) : ''}</span>
          </div>
        `, { sticky: true });

        circle.addTo(group);

        // Landfall beacon flag
        if (isLandfall) {
          const landfallIcon = L.divIcon({
            html: `
              <div style="
                background: #ef4444;
                color: #ffffff;
                font-size: 9px;
                font-weight: 800;
                padding: 2px 6px;
                border-radius: 4px;
                box-shadow: 0 0 10px rgba(239, 68, 68, 0.6);
                white-space: nowrap;
                letter-spacing: 0.5px;
                transform: translate(-50%, -24px);
              ">
                🎯 LANDFALL (PURI)
              </div>
            `,
            className: '',
            iconSize: [0, 0],
          });
          L.marker([pt.lat, pt.lon], { icon: landfallIcon }).addTo(group);
        }
      });

      // 5. UNCERTAINTY CONE AROUND ACTIVE EYE
      if (activePoint && typeof activePoint.lat === 'number' && typeof activePoint.lon === 'number') {
        const coneRadius = (activePoint.cone_radius_km || 50) * 1000;
        L.circle([activePoint.lat, activePoint.lon], {
          radius: coneRadius,
          color: '#ef4444',
          weight: 1.5,
          dashArray: '4, 6',
          fillColor: '#ef4444',
          fillOpacity: 0.08,
        })
          .bindTooltip(`<b>IMD/JTWC Uncertainty Cone</b><br/>Radius: ${activePoint.cone_radius_km || 50} km`, { sticky: true })
          .addTo(group);

        // 6. ACTIVE CYCLONE EYE (Animated Radar Marker)
        const eyeMarkerHtml = `
          <div class="cyclone-eye-marker" style="width: 54px; height: 54px;">
            <div class="cyclone-radar-ring"></div>
            <div class="cyclone-radar-ring-2"></div>
            <div style="
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: #0f172a;
              border: 2.5px solid #ef4444;
              box-shadow: 0 0 20px rgba(239, 68, 68, 0.8), inset 0 0 8px rgba(239, 68, 68, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 2;
            ">
              <span class="cyclone-spinner" style="font-size: 16px;">🌀</span>
            </div>
            <div style="
              position: absolute;
              bottom: -22px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(15, 23, 42, 0.92);
              border: 1px solid rgba(239, 68, 68, 0.6);
              color: #f8fafc;
              padding: 2px 8px;
              border-radius: 9999px;
              font-size: 10px;
              font-weight: 800;
              white-space: nowrap;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
              letter-spacing: 0.5px;
              display: flex;
              align-items: center;
              gap: 4px;
            ">
              <span style="color: #ef4444;">●</span>
              <span>${activePoint.wind_kmh || 0} km/h</span>
            </div>
          </div>
        `;

        const eyeIcon = L.divIcon({
          html: eyeMarkerHtml,
          className: '',
          iconSize: [54, 54],
          iconAnchor: [27, 27],
        });

        const eyeMarker = L.marker([activePoint.lat, activePoint.lon], { icon: eyeIcon, zIndexOffset: 1000 });

        eyeMarker.bindTooltip(`
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 180px; padding: 4px;">
            <div style="font-size: 11px; font-weight: 800; color: #ef4444; text-transform: uppercase;">
              🌀 ${activePoint.category || 'Extremely Severe Cyclonic Storm'}
            </div>
            <div style="font-size: 13px; font-weight: 800; color: var(--text-primary); margin: 3px 0;">
              ${activePoint.stage || 'Live Simulation Position'}
            </div>
            <div style="font-size: 11px; color: var(--text-secondary);">
              Winds: <b style="color: #38bdf8;">${activePoint.wind_kmh || 0} km/h</b><br/>
              Central Pressure: <b>${activePoint.pressure_hpa || 0} hPa</b><br/>
              Uncertainty Swath: <b>${activePoint.cone_radius_km || 50} km</b><br/>
              Timestamp: <b>${activePoint.timestamp ? new Date(activePoint.timestamp).toUTCString().slice(0, 22) : 'Active'}</b>
            </div>
          </div>
        `, { sticky: true });

        eyeMarker.addTo(group);
      }
    } catch (err) {
      console.warn('Track layer render error handled:', err);
    }
  }, [currentTrackPoint, allTrackPoints, layersVisible.track, isMapReady]);

  // Update Infrastructure Assets Layer
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current?.infrastructure;
    if (!L || !map || !group || !isMapReady || !assets) return;

    try {
      group.clearLayers();
      if (!layersVisible.infrastructure) return;

      assets.forEach((asset) => {
        if (!asset || !asset.coordinates || asset.coordinates.length < 2) return;
        const [lon, lat] = asset.coordinates;
        if (typeof lat !== 'number' || typeof lon !== 'number' || isNaN(lat) || isNaN(lon)) return;

        const riskScore = asset.composite_risk_score || 0;
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

        const marker = L.marker([lat, lon], { icon: customIcon });

        marker.on('click', () => {
          onSelectAsset(asset);
        });

        marker.bindPopup(`
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 220px; padding: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 10px; font-weight: 700; color: ${color}; text-transform: uppercase;">
                Rank #${asset.risk_rank || 1} • ${Math.round(riskScore * 100)}% Risk
              </span>
              <span style="font-size: 10px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 2px 6px; border-radius: 4px;">
                ${asset.criticality || 'HIGH'}
              </span>
            </div>
            <h4 style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: var(--text-primary);">${asset.name || 'Critical Asset'}</h4>
            <p style="margin: 0 0 6px 0; font-size: 11px; color: var(--text-secondary);">
              ${asset.district || 'Odisha'} • Elev: ${asset.elevation_m || 0}m above MSL
            </p>
            <div style="background: rgba(239, 68, 68, 0.1); border-left: 2px solid #ef4444; padding: 6px 8px; font-size: 11px; color: var(--text-primary); margin-bottom: 8px;">
              <strong>Action:</strong> ${asset.recommended_action || 'Inspect immediate facility readiness'}
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
    } catch (err) {
      console.warn('Assets layer render error handled:', err);
    }
  }, [assets, selectedAsset, layersVisible.infrastructure, onSelectAsset, isMapReady]);

  // Update Safe Evacuation Route Layer
  useEffect(() => {
    const L = (window as any).L;
    const map = mapInstanceRef.current;
    const group = layerGroupsRef.current.route;
    if (!L || !map || !group || !isMapReady) return;

    group.clearLayers();
    if (!showSafeRoute || !layersVisible.route) return;

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
  }, [showSafeRoute, layersVisible.route, isMapReady]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Map DOM Container */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* Floating Layer Controls Toolbar (Top Left) */}
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
          flexWrap: 'wrap',
          maxWidth: 'calc(100% - 240px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '4px' }}>
          <Layers size={14} color="var(--accent-primary)" />
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif" }}>
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
                padding: '4px 9px',
                fontSize: '0.72rem',
                gap: '5px',
                background: isAct ? 'var(--bg-badge)' : undefined,
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

        <div style={{ width: '1px', height: '16px', background: 'var(--border-subtle, rgba(255,255,255,0.15))', margin: '0 4px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '4px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif" }}>
            BASEMAP:
          </span>
        </div>

        {[
          { key: 'canvas', label: 'Tactical', icon: '🗺️' },
          { key: 'satellite', label: 'Satellite', icon: '🛰️' },
          { key: 'osm', label: 'Streets', icon: '🌐' },
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
                padding: '4px 9px',
                fontSize: '0.72rem',
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

      {/* Floating Camera Preset Controller (Top Right) */}
      <div
        className="glass-panel"
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 500,
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginRight: '4px' }}>
          <Compass size={14} color="var(--accent-primary)" />
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif" }}>
            CAMERA:
          </span>
        </div>

        <button
          onClick={() => setCameraMode('follow')}
          className={cameraMode === 'follow' ? 'btn-outline-cyan' : 'btn-secondary'}
          style={{
            padding: '4px 8px',
            fontSize: '0.72rem',
            gap: '4px',
            background: cameraMode === 'follow' ? 'var(--bg-badge)' : undefined,
          }}
          title="Keep active storm eye centered during simulation playback"
        >
          <Eye size={12} color={cameraMode === 'follow' ? '#38bdf8' : undefined} />
          <span>Follow Eye</span>
        </button>

        <button
          onClick={() => setCameraMode('overview')}
          className={cameraMode === 'overview' ? 'btn-outline-cyan' : 'btn-secondary'}
          style={{
            padding: '4px 8px',
            fontSize: '0.72rem',
            gap: '4px',
            background: cameraMode === 'overview' ? 'var(--bg-badge)' : undefined,
          }}
          title="Fit complete 900km Bay of Bengal trajectory"
        >
          <Navigation size={12} />
          <span>All Track</span>
        </button>

        <button
          onClick={() => setCameraMode('landfall')}
          className={cameraMode === 'landfall' ? 'btn-outline-cyan' : 'btn-secondary'}
          style={{
            padding: '4px 8px',
            fontSize: '0.72rem',
            gap: '4px',
            background: cameraMode === 'landfall' ? 'var(--bg-badge)' : undefined,
          }}
          title="Focus on Puri Coastline & Critical Infrastructure"
        >
          <MapPin size={12} />
          <span>Puri Coast</span>
        </button>
      </div>

      {/* Floating Tactical Legend (Bottom Left) */}
      <div
        className="glass-panel"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '16px',
          zIndex: 500,
          padding: '12px 16px',
          fontSize: '0.74rem',
          maxWidth: '290px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Info size={14} color="var(--accent-primary)" />
          <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>Tactical Path & Risk Key</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '4px', background: '#f59e0b', borderRadius: '2px' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Observed Track (Traveled)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '0px', borderTop: '2.5px dashed #00f0ff' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Projected Forecast (IMD/JTWC)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', border: '1px solid #ffffff' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Critical Risk Facility (&gt;80%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '8px', background: 'var(--bg-badge)', border: '1px dashed var(--accent-cyan)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Surge Screening (USGS SRTM)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '16px', height: '4px', background: 'var(--accent-emerald)', borderRadius: '2px' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Safe Evacuation Corridor (NH-316)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
