'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Waves, ArrowRight, ShieldCheck, Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.25s ease',
        background: isScrolled ? 'var(--bg-glass)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <div className="landing-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-primary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <Waves size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                SagarRakshak
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'var(--bg-badge)',
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                AI
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>
              National Coastal Decision Support
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'none', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          <a href="#capabilities" style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Capabilities
          </a>
          <a href="#how-it-works" style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            How It Works
          </a>
          <a href="#coverage" style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Coastal Zones
          </a>
          <a href="#differentiators" style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Verification
          </a>
          <a href="#testimonials" style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Operations
          </a>
        </nav>

        {/* Right CTA and Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <ThemeToggle />

          <Link
            href="/dashboard"
            className="btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '0.88rem',
              gap: '8px',
            }}
          >
            <span>Launch Command Center</span>
            <ArrowRight size={16} />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '6px',
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}
          >
            Capabilities
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}
          >
            How It Works
          </a>
          <a
            href="#coverage"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}
          >
            Coastal Zones
          </a>
          <a
            href="#differentiators"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}
          >
            Verification
          </a>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
          >
            Launch Command Center
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 859px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
