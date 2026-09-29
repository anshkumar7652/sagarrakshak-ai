'use client';

import React from 'react';
import { LandingNav } from '../components/landing/LandingNav';
import { HeroSection } from '../components/landing/HeroSection';
import { StatsBar } from '../components/landing/StatsBar';
import { FeaturesGrid } from '../components/landing/FeaturesGrid';
import { ProcessSteps } from '../components/landing/ProcessSteps';
import { CoverageSection } from '../components/landing/CoverageSection';
import { DifferentiatorsSection } from '../components/landing/DifferentiatorsSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { CTABanner } from '../components/landing/CTABanner';
import { Footer } from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* 1. Sticky Navigation with Theme Toggle & Command Center Link */}
      <LandingNav />

      {/* 2. High-Impact Hero with Tactical Preview & Live Telemetry Card */}
      <HeroSection />

      {/* 3. Authoritative Metric / Stats Counter Row */}
      <StatsBar />

      {/* 4. 6 Core Operational Services & Capabilities Grid */}
      <FeaturesGrid />

      {/* 5. 4-Stage Rapid Execution Pipeline */}
      <ProcessSteps />

      {/* 6. Regional Coastal Coverage & Readiness Guarantee */}
      <CoverageSection />

      {/* 7. Technical Differentiators & Live Action Brief Sample */}
      <DifferentiatorsSection />

      {/* 8. Emergency Commander Endorsements & Social Proof */}
      <TestimonialsSection />

      {/* 9. High-Contrast Conversion CTA Block */}
      <CTABanner />

      {/* 10. Comprehensive Multi-Column Footer */}
      <Footer />
    </div>
  );
}
