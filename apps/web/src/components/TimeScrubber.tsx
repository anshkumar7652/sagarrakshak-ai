'use client';

import React from 'react';
import { TrackPoint } from '../types';
import { Play, Pause, SkipBack, SkipForward, Clock } from 'lucide-react';

interface TimeScrubberProps {
  trackPoints: TrackPoint[];
  currentIndex: number;
  onSelectIndex: (idx: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const TimeScrubber: React.FC<TimeScrubberProps> = ({
  trackPoints,
  currentIndex,
  onSelectIndex,
  isPlaying,
  onTogglePlay,
}) => {
  if (!trackPoints || trackPoints.length === 0) return null;
  const safeIndex = Math.max(0, Math.min(isNaN(currentIndex) ? 0 : currentIndex, trackPoints.length - 1));
  const current = trackPoints[safeIndex] || trackPoints[0];

  const formattedTime = (() => {
    try {
      if (!current?.timestamp) return 'Time Step N/A';
      const d = new Date(current.timestamp);
      return isNaN(d.getTime()) ? current.timestamp : d.toUTCString().slice(0, 22) + ' UTC';
    } catch {
      return current?.timestamp || 'UTC';
    }
  })();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      onSelectIndex(Math.max(0, Math.min(val, trackPoints.length - 1)));
    }
  };

  return (
    <div
      style={{
        padding: '12px 24px',
        background: 'var(--bg-surface)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        zIndex: 1000,
      }}
    >
      {/* Playback Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => onSelectIndex(Math.max(0, safeIndex - 1))}
          disabled={safeIndex === 0}
          className="btn-secondary"
          style={{
            padding: '6px 8px',
            opacity: safeIndex === 0 ? 0.4 : 1,
            cursor: safeIndex === 0 ? 'default' : 'pointer',
          }}
          aria-label="Previous step"
        >
          <SkipBack size={15} />
        </button>

        <button
          onClick={onTogglePlay}
          className="btn-primary"
          style={{
            padding: '6px 14px',
            fontSize: '0.8rem',
            gap: '6px',
          }}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          <span>{isPlaying ? 'Pause' : 'Simulate'}</span>
        </button>

        <button
          onClick={() => onSelectIndex(Math.min(trackPoints.length - 1, safeIndex + 1))}
          disabled={safeIndex === trackPoints.length - 1}
          className="btn-secondary"
          style={{
            padding: '6px 8px',
            opacity: safeIndex === trackPoints.length - 1 ? 0.4 : 1,
            cursor: safeIndex === trackPoints.length - 1 ? 'default' : 'pointer',
          }}
          aria-label="Next step"
        >
          <SkipForward size={15} />
        </button>
      </div>

      {/* Current Step Readout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '240px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--bg-badge)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Clock size={16} color="var(--accent-primary)" />
        </div>
        <div>
          <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
            {current?.stage || 'Simulation Phase'}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {formattedTime}
          </div>
        </div>
      </div>

      {/* Timeline Slider / Progress */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <input
          type="range"
          min={0}
          max={trackPoints.length - 1}
          value={safeIndex}
          onChange={handleSliderChange}
          style={{
            width: '100%',
            cursor: 'pointer',
            accentColor: 'var(--accent-primary)',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {trackPoints.map((pt, i) => (
            <span
              key={i}
              onClick={() => onSelectIndex(i)}
              style={{
                cursor: 'pointer',
                color: i === safeIndex ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontWeight: i === safeIndex ? 700 : 400,
                transition: 'color 0.15s ease',
              }}
            >
              {(pt.stage || '').split(' ')[0] || `T+${i}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
