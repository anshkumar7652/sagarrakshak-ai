'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`theme-toggle-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: 0,
      }}
    >
      {theme === 'dark' ? (
        <Sun size={18} style={{ color: 'var(--accent-amber)', transition: 'transform 0.3s ease' }} />
      ) : (
        <Moon size={18} style={{ color: 'var(--accent-primary)', transition: 'transform 0.3s ease' }} />
      )}
    </button>
  );
}
