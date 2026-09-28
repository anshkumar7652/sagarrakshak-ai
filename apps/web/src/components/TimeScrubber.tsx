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
    <div style={{
      padding: '10px 24px',
      background: 'rgba(6, 9, 19, 0.94)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      zIndex: 1000,
    }}>
      {/* Playback Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px',
            color: currentIndex === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: currentIndex === 0 ? 'default' : 'pointer',
          }}
        >
          <SkipBack size={15} />
        </button>

        <button
          onClick={onTogglePlay}
          style={{
            background: 'var(--accent-cyan)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#060913',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          <span style={{ fontSize: '0.75rem' }}>{isPlaying ? 'Pause' : 'Simulate'}</span>
        </button>

        <button
          onClick={() => onSelectIndex(Math.min(trackPoints.length - 1, currentIndex + 1))}
          disabled={currentIndex === trackPoints.length - 1}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px',
            color: currentIndex === trackPoints.length - 1 ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: currentIndex === trackPoints.length - 1 ? 'default' : 'pointer',
          }}
        >
          <SkipForward size={15} />
        </button>
      </div>

      {/* Current Step Readout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '220px' }}>
        <Clock size={16} color="var(--accent-cyan)" />
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {current.stage}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {new Date(current.timestamp).toUTCString().slice(0, 22)} UTC
          </div>
        </div>
      </div>

      {/* Timeline Slider / Progress */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <input
          type="range"
          min={0}
          max={trackPoints.length - 1}
          value={currentIndex}
          onChange={(e) => onSelectIndex(Number(e.target.value))}
          style={{
            width: '100%',
            cursor: 'pointer',
            accentColor: 'var(--accent-cyan)',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.66rem', color: 'var(--text-muted)' }}>
          {trackPoints.map((pt, i) => (
            <span
              key={i}
              onClick={() => onSelectIndex(i)}
              style={{
                cursor: 'pointer',
                color: i === currentIndex ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: i === currentIndex ? 700 : 400,
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
