'use client';

import React, { useEffect, useState } from 'react';

/**
 * Top Scroll Progress Bar
 * Tracks the user's scroll progress (0-100%) through the page and renders
 * a glowing, high-tech gradient beam across the top edge of the window.
 * Gives immediate and tangible visual feedback that the page responds to scrolling.
 */
export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3.5px',
        zIndex: 9999,
        background: 'rgba(255, 255, 255, 0.05)',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #00f0ff, #38bdf8 50%, #10b981 100%)',
          boxShadow: '0 0 12px rgba(0, 240, 255, 0.8), 0 0 20px rgba(16, 185, 129, 0.5)',
          transition: 'width 75ms linear',
          position: 'relative',
        }}
      >
        {/* Leading edge glow bead */}
        <div
          style={{
            position: 'absolute',
            right: '-4px',
            top: '-2px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 10px #00f0ff, 0 0 16px #10b981',
            opacity: scrollProgress > 1 ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
