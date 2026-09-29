'use client';

import React, { useState } from 'react';
import { GroundedAdvisory, DispatchReceipt } from '../types';
import { approveAdvisory } from '../lib/api';

interface CapStudioViewProps {
  advisory: GroundedAdvisory | null;
  onAdvisoryUpdated?: (advisory: GroundedAdvisory) => void;
}

export function CapStudioView({ advisory }: CapStudioViewProps) {
  const [activeLang, setActiveLang] = useState<'or' | 'hi' | 'en' | 'sms'>('or');
  const [editedOdia, setEditedOdia] = useState<string>(
    advisory?.public_alerts.or ||
    'ଜରୁରୀକାଳୀନ ଜିଲ୍ଲା ବିପର୍ଯ୍ୟୟ ଚେତାବନୀ (DEOC): ଅତି ଭୀଷଣ ବାତ୍ୟା ଫନି ପୁରୀ ଉପକୂଳ ଅତିକ୍ରମ କରୁଛି। ତୁରନ୍ତ ନିକଟସ୍ଥ ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳୀକୁ ଚାଲିଯାଆନ୍ତୁ। ସାହାଯ୍ୟ ପାଇଁ କଲ୍ କରନ୍ତୁ: ୧୦୭୭।'
  );
  const [editedHindi, setEditedHindi] = useState<string>(
    advisory?.public_alerts.hi ||
    'अत्यंत आवश्यक चक्रवात चेतावनी (DEOC): चक्रवात फोनी पुरी तट से टकरा रहा है। 215 किमी/घंटा की तूफानी हवाएं। सभी नागरिक तुरंत निकटतम पक्के चक्रवात आश्रय स्थल में शरण लें। सहायता: 1077।'
  );
  const [editedEnglish, setEditedEnglish] = useState<string>(
    advisory?.public_alerts.en ||
    'URGENT DEOC ADVISORY: Cyclone Fani making landfall near Puri. Sustained winds 215 km/h. Coastal residents must immediately move to nearest Cyclone Shelter. Emergency Helpline: 1077.'
  );
  const [editedSms, setEditedSms] = useState<string>(
    advisory?.public_alerts.sms_version ||
    'DEOC ALERT: Cyclone Fani landfall imminent at Puri (215 km/h). Evacuate to nearest concrete shelter immediately. Call 1077.'
  );

  const [officerName, setOfficerName] = useState('Dr. Rajesh Behera, IAS');
  const [officerId, setOfficerId] = useState('OD-DEOC-PURI-01');
  const [deocCenter, setDeocCenter] = useState('Puri Collectorate Emergency Operations Centre');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'NDMA_SACHET_SMS',
    'COASTAL_SIRENS_ODISHA',
    'AIR_RADIO_CUTTACK',
    'WHATSAPP_DISTRICT_NETWORK',
  ]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [dispatchReceipt, setDispatchReceipt] = useState<DispatchReceipt | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleChannel = (ch: string) => {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  const handleSynthesizeTts = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      let textToRead = editedEnglish;
      let langCode = 'en-IN';
      if (activeLang === 'hi') {
        textToRead = editedHindi;
        langCode = 'hi-IN';
      } else if (activeLang === 'or') {
        textToRead = editedOdia;
        langCode = 'hi-IN'; // Fallback voice synthesizer
      } else if (activeLang === 'sms') {
        textToRead = editedSms;
      }

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = langCode;
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-Speech synthesizer not supported in this browser.');
    }
  };

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const receipt = await approveAdvisory({
        advisory_id: advisory?.advisory_id || 'ADV_LIVE_DEOC',
        officer_name: officerName,
        officer_id: officerId,
        deoc_center: deocCenter,
        approved_text_en: editedEnglish,
        approved_text_hi: editedHindi,
        approved_text_or: editedOdia,
        dispatch_channels: selectedChannels,
      });
      setDispatchReceipt(receipt);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: 'var(--bg-primary)',
        padding: '24px 32px',
        overflowY: 'auto',
        gap: '24px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.4rem' }}>📋</span>
            <h1
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              CAP Broadcast Studio & Multilingual Action Hub
            </h1>
            <span className="badge badge-critical">Human-in-the-Loop Sign-off</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Review, edit, and cryptographically seal Gemini-grounded multilingual citizen alerts for instant NDMA Sachet & coastal siren broadcast.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSynthesizeTts}
            className={isPlayingAudio ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.82rem', padding: '8px 16px' }}
          >
            {isPlayingAudio ? '⏹️ Stop Voice Preview' : '🔊 Audio TTS Broadcast Preview'}
          </button>
        </div>
      </div>

      {/* Main Studio Bento Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '20px' }}>
        {/* Left: Multilingual Editor */}
        <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
              1. Multilingual Broadcast Message Editor
            </h3>
            <span className="badge badge-safe">Gemini Grounded</span>
          </div>

          {/* Language Tabs */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px', flexWrap: 'wrap' }}>
            {[
              { id: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
              { id: 'hi', label: 'हिन्दी (Hindi)' },
              { id: 'en', label: 'English' },
              { id: 'sms', label: '📱 160-Char SMS' },
            ].map((tab) => {
              const isSelected = activeLang === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLang(tab.id as any)}
                  className={isSelected ? 'btn-outline-cyan' : 'btn-secondary'}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    background: isSelected ? 'var(--bg-badge)' : undefined,
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Editor Area */}
          <div>
            {activeLang === 'or' && (
              <textarea
                value={editedOdia}
                onChange={(e) => setEditedOdia(e.target.value)}
                rows={7}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem',
                  lineHeight: '1.5',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            )}

            {activeLang === 'hi' && (
              <textarea
                value={editedHindi}
                onChange={(e) => setEditedHindi(e.target.value)}
                rows={7}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: 'var(--text-primary)',
                  fontSize: '0.92rem',
                  lineHeight: '1.5',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            )}

            {activeLang === 'en' && (
              <textarea
                value={editedEnglish}
                onChange={(e) => setEditedEnglish(e.target.value)}
                rows={7}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  lineHeight: '1.5',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            )}

            {activeLang === 'sms' && (
              <div>
                <textarea
                  value={editedSms}
                  onChange={(e) => setEditedSms(e.target.value)}
                  rows={5}
                  maxLength={160}
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    lineHeight: '1.5',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
                <div style={{ textAlign: 'right', fontSize: '0.74rem', color: editedSms.length > 150 ? 'var(--accent-amber)' : 'var(--text-muted)', marginTop: '4px' }}>
                  {editedSms.length} / 160 Characters
                </div>
              </div>
            )}
          </div>

          {/* Channels Selection */}
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Select Dispatch Channels:
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'NDMA_SACHET_SMS', label: '📱 NDMA Sachet SMS' },
                { id: 'COASTAL_SIRENS_ODISHA', label: '🚨 Coastal Sirens (OSDMA)' },
                { id: 'AIR_RADIO_CUTTACK', label: '📻 All India Radio Cuttack' },
                { id: 'WHATSAPP_DISTRICT_NETWORK', label: '💬 WhatsApp District Bot' },
                { id: 'CAP_FEED_BROADCAST', label: '🌐 WMO CAP 1.2 Feed' },
              ].map((ch) => {
                const isSelected = selectedChannels.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    onClick={() => toggleChannel(ch.id)}
                    className={isSelected ? 'btn-outline-cyan' : 'btn-secondary'}
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.76rem',
                      background: isSelected ? 'var(--bg-badge)' : undefined,
                    }}
                  >
                    {ch.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Officer Digital Sign-off Pad */}
        <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
              2. DEOC Officer Digital Sign-off
            </h3>
            <span className="badge badge-critical">Mandatory Step</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem' }}>
            <div>
              <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                Authorized Officer Name & Title:
              </label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                Government Officer Employee ID:
              </label>
              <input
                type="text"
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'var(--accent-primary)',
                  fontSize: '0.84rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                Emergency Operations Centre Jurisdiction:
              </label>
              <input
                type="text"
                value={deocCenter}
                onChange={(e) => setDeocCenter(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div
            className="interactive-card"
            style={{
              padding: '12px 14px',
              borderColor: 'rgba(239, 68, 68, 0.35)',
              background: 'var(--bg-badge)',
              fontSize: '0.76rem',
              color: 'var(--accent-red)',
              lineHeight: '1.45',
            }}
          >
            ⚠️ <strong>Legal Non-Repudiation Notice:</strong> Authorizing this dispatch commits an unalterable SHA-256 cryptographic receipt to the government audit ledger and triggers automated CAP 1.2 XML siren feeds.
          </div>

          <button
            onClick={handleApprove}
            disabled={isSubmitting}
            className="btn-primary"
            style={{
              padding: '12px 20px',
              justifyContent: 'center',
              fontSize: '0.92rem',
              marginTop: 'auto',
            }}
          >
            {isSubmitting ? 'Sealing Cryptographic Record...' : '🔒 Authorize, Seal & Dispatch Directive'}
          </button>
        </div>
      </div>

      {/* Dispatched Receipt Banner */}
      {dispatchReceipt && (
        <div
          className="interactive-card"
          style={{
            background: 'var(--bg-badge)',
            borderColor: 'var(--accent-emerald)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.3rem' }}>🎉</span>
              <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.05rem', fontFamily: "'Outfit', sans-serif" }}>
                Directive Successfully Dispatched & Sealed in SQLite
              </strong>
            </div>
            <a
              href={`http://localhost:8000/api/cap/${dispatchReceipt.advisory_id}.xml`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '6px 14px', textDecoration: 'none' }}
            >
              📥 Download Signed CAP XML
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', fontSize: '0.8rem' }}>
            <div>Receipt ID: <strong style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{dispatchReceipt.receipt_id}</strong></div>
            <div>Approved By: <strong>{dispatchReceipt.approved_by}</strong></div>
            <div>Center: <strong>{dispatchReceipt.deoc_center}</strong></div>
            <div style={{ gridColumn: 'span 2', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              SHA-256 Digest: <span style={{ color: 'var(--accent-primary)' }}>{dispatchReceipt.audit_hash}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
