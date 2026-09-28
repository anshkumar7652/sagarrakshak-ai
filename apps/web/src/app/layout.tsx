import type { Metadata } from 'next';
import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'SagarRakshak AI — Cyclone Impact & Infrastructure Vulnerability Forecaster',
  description: 'AI-powered operational decision support platform for District Emergency Operations Centres (DEOC) in India. Ingests Google Earth Engine, IMD cyclone feeds, and executes scenario-based surge, rainfall, and infrastructure risk ranking with grounded Gemini advisories.',
  keywords: [
    'Cyclone Impact Forecaster',
    'Disaster Management India',
    'Google Earth Engine',
    'Gemini AI Advisory',
    'DEOC Operations',
    'Cyclone Fani Replay',
    'Infrastructure Vulnerability'
  ],
  authors: [{ name: 'SagarRakshak AI Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
