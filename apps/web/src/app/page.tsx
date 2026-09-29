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
import { ScrollReveal } from '../components/landing/ScrollReveal';

export default function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* 1. Sticky Navigation with Theme Toggle & Command Center Link */}
      <LandingNav />

      {/* 2. High-Impact Hero with Tactical Preview & Live Telemetry Card */}
      <ScrollReveal variant="blur-in" duration={900} threshold={0.1}>
        <HeroSection />
      </ScrollReveal>

      {/* 3. Authoritative Metric / Stats Counter Row */}
      <ScrollReveal variant="fade-up" duration={650} threshold={0.2}>
        <StatsBar />
      </ScrollReveal>

      {/* 4. 6 Core Operational Services & Capabilities Grid */}
      <ScrollReveal variant="fade-up" duration={750} threshold={0.1}>
        <FeaturesGrid />
      </ScrollReveal>

      {/* 5. 4-Stage Rapid Execution Pipeline */}
      <ScrollReveal variant="slide-up-spring" duration={800} threshold={0.15}>
        <ProcessSteps />
      </ScrollReveal>

      {/* 6. Regional Coastal Coverage & Readiness Guarantee */}
      <ScrollReveal variant="fade-left" duration={750} threshold={0.12}>
        <CoverageSection />
      </ScrollReveal>

      {/* 7. Technical Differentiators & Live Action Brief Sample */}
      <ScrollReveal variant="zoom-in" duration={700} threshold={0.12}>
        <DifferentiatorsSection />
      </ScrollReveal>

      {/* 8. Emergency Commander Endorsements & Social Proof */}
      <ScrollReveal variant="fade-up" duration={700} delay={100} threshold={0.15}>
        <TestimonialsSection />
      </ScrollReveal>

      {/* 9. High-Contrast Conversion CTA Block */}
      <ScrollReveal variant="scale-rotate" duration={750} threshold={0.2}>
        <CTABanner />
      </ScrollReveal>

      {/* 10. Comprehensive Multi-Column Footer */}
      <ScrollReveal variant="fade-up" duration={600} threshold={0.1}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}
