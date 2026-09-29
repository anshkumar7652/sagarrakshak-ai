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
  const current = trackPoints[currentIndex] || trackPoints[0];

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
          onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="btn-secondary"
          style={{
            padding: '6px 8px',
            opacity: currentIndex === 0 ? 0.4 : 1,
            cursor: currentIndex === 0 ? 'default' : 'pointer',
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
          onClick={() => onSelectIndex(Math.min(trackPoints.length - 1, currentIndex + 1))}
          disabled={currentIndex === trackPoints.length - 1}
          className="btn-secondary"
          style={{
            padding: '6px 8px',
            opacity: currentIndex === trackPoints.length - 1 ? 0.4 : 1,
            cursor: currentIndex === trackPoints.length - 1 ? 'default' : 'pointer',
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
            {current.stage}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {new Date(current.timestamp).toUTCString().slice(0, 22)} UTC
          </div>
        </div>
      </div>

      {/* Timeline Slider / Progress */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <input
          type="range"
          min={0}
          max={trackPoints.length - 1}
          value={currentIndex}
          onChange={(e) => onSelectIndex(Number(e.target.value))}
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
                color: i === currentIndex ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontWeight: i === currentIndex ? 700 : 400,
                transition: 'color 0.15s ease',
              }}
            >
              {pt.stage.split(' ')[0]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
