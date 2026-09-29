'use client';

import React, { useState } from 'react';
import { GroundedAdvisory, DispatchReceipt } from '../types';
import { approveAdvisory } from '../lib/api';
import {
  X,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  Send,
  Radio,
  Lock,
} from 'lucide-react';

interface AdvisoryModalProps {
  advisory: GroundedAdvisory | null;
  onClose: () => void;
  analysisId: string;
}

export const AdvisoryModal: React.FC<AdvisoryModalProps> = ({
  advisory,
  onClose,
  analysisId,
}) => {
  if (!advisory) return null;

  const [activeLangTab, setActiveLangTab] = useState<'en' | 'hi' | 'or' | 'sms'>('en');
  const [officerName, setOfficerName] = useState('Dr. S. Mohapatra, OAS');
  const [officerId, setOfficerId] = useState('DEOC-PURI-014');
  const [editedAlertText, setEditedAlertText] = useState({
    en: advisory.public_alerts.en,
    hi: advisory.public_alerts.hi,
    or: advisory.public_alerts.or,
    sms: advisory.public_alerts.sms_version,
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [dispatchReceipt, setDispatchReceipt] = useState<DispatchReceipt | null>(null);
  const [isDispatching, setIsDispatching] = useState(false);

  // Audio Playback Simulation using Web Speech API if supported
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      if ('speechSynthesis' in window) {
        const textToSpeak =
          activeLangTab === 'hi'
            ? editedAlertText.hi
            : activeLangTab === 'en'
            ? editedAlertText.en
            : editedAlertText.en;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = activeLangTab === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsPlayingAudio(false), 5000);
      }
    }
  };

  const handleApprove = async () => {
    setIsDispatching(true);
    try {
      const receipt = await approveAdvisory({
        advisory_id: advisory.advisory_id,
        officer_id: officerId,
        officer_name: officerName,
        deoc_center: 'Puri District Emergency Operations Centre (DEOC)',
        approved_text_en: editedAlertText.en,
        approved_text_hi: editedAlertText.hi,
        approved_text_or: editedAlertText.or,
        dispatch_channels: [
          'NDMA Common Alerting Protocol (CAP)',
          'OSDMA District SMS Gateway',
          'Police Coastal VHF Network',
          'All India Radio Puri FM',
        ],
      });
      setDispatchReceipt(receipt);
    } catch (err) {
      console.error('Dispatch failed:', err);
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'var(--overlay-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '860px',
          maxWidth: '100%',
          maxHeight: '92vh',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-glow)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, var(--bg-badge) 0%, transparent 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'var(--bg-badge)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={20} color="var(--accent-primary)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: '-0.02em',
                  }}
                >
                  DEOC Action Brief & Citizen Advisory
                </h2>
                <span className="badge badge-critical" style={{ fontSize: '0.65rem' }}>
                  GEMINI GROUNDED
                </span>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Advisory ID: {advisory.advisory_id} • Target: Puri Coast Landfall • CAP Protocol v1.2
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{
              padding: '6px',
              borderRadius: '8px',
              lineHeight: 0,
              cursor: 'pointer',
            }}
            aria-label="Close advisory"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Situation Summary */}
          <div
            className="interactive-card"
            style={{
              padding: '16px 20px',
              borderLeft: '4px solid var(--accent-primary)',
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
              DEOC SITUATION SUMMARY (GEE & IMD SATELLITE TELEMETRY)
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
              {advisory.situation_summary}
            </p>
          </div>

          {/* Priority Actions with Evidence Citations */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: "'Outfit', sans-serif" }}>
              Actionable Pre-Landfall Directives
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {advisory.priority_actions.map((action, idx) => (
                <div
                  key={idx}
                  className="interactive-card"
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    borderRadius: '10px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                        {action.target_name}
                      </span>
                      <span className="badge badge-critical" style={{ fontSize: '0.62rem' }}>
                        {action.urgency}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      {action.action}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end', flexShrink: 0 }}>
                    {action.evidence_ids.map((ev, i) => (
                      <span
                        key={i}
                        className="badge badge-tag"
                        style={{ fontSize: '0.65rem' }}
                      >
                        [{ev}]
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multilingual Public Broadcast Alert Area */}
          <div
            className="glass-panel"
            style={{
              padding: '18px 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Radio size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                  Public Early-Warning Dissemination
                </span>
              </div>

              {/* Text-to-Speech simulation button */}
              <button
                onClick={handleToggleAudio}
                className={isPlayingAudio ? 'btn-primary' : 'btn-outline-cyan'}
                style={{
                  padding: '5px 12px',
                  fontSize: '0.74rem',
                  gap: '6px',
                }}
              >
                {isPlayingAudio ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isPlayingAudio ? 'Stop Audio' : 'Audio TTS Preview'}</span>
              </button>
            </div>

            {/* Language Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              {[
                { id: 'en', label: 'English (Official)' },
                { id: 'hi', label: 'हिन्दी (Hindi)' },
                { id: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
                { id: 'sms', label: 'SMS Gateway (160 Chars)' },
              ].map((tab) => {
                const isSelected = activeLangTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveLangTab(tab.id as any)}
                    className={isSelected ? 'btn-outline-cyan' : 'btn-secondary'}
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.78rem',
                      background: isSelected ? 'var(--bg-badge)' : undefined,
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Editable Advisory Textarea */}
            <textarea
              value={editedAlertText[activeLangTab]}
              onChange={(e) =>
                setEditedAlertText({ ...editedAlertText, [activeLangTab]: e.target.value })
              }
              rows={4}
              style={{
                width: '100%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '12px 14px',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '0.88rem',
                lineHeight: 1.5,
                outline: 'none',
                resize: 'vertical',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              <span>* Human-in-the-loop: Verify or edit message text prior to CAP broadcast.</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>Char Count: {editedAlertText[activeLangTab].length}</span>
            </div>
          </div>

          {/* Human-in-the-Loop Officer Credentials Section */}
          {!dispatchReceipt && (
            <div
              className="interactive-card"
              style={{
                padding: '18px 20px',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '12px', fontFamily: "'Outfit', sans-serif" }}>
                <Lock size={15} />
                <span>OFFICER AUTHENTICATION & JURISDICTION</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Authorizing DEOC Officer
                  </label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.82rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                    Officer Station Token / ID
                  </label>
                  <input
                    type="text"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'var(--accent-primary)',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Dispatch Receipt Banner if approved */}
          {dispatchReceipt && (
            <div
              className="interactive-card"
              style={{
                background: 'var(--bg-badge)',
                border: '1px solid var(--accent-emerald)',
                padding: '20px',
                animation: 'fadeIn 0.3s ease-in',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontWeight: 800, fontSize: '0.96rem', marginBottom: '10px', fontFamily: "'Outfit', sans-serif" }}>
                <CheckCircle2 size={22} />
                <span>OFFICIAL DISPATCH CONFIRMATION RECEIPT</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <div>Receipt ID: <b style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{dispatchReceipt.receipt_id}</b></div>
                <div>Status: <span className="badge badge-safe">DISPATCHED TO NETWORKS</span></div>
                <div>Authorized By: <b style={{ color: 'var(--text-primary)' }}>{dispatchReceipt.approved_by}</b></div>
                <div>Timestamp: <span style={{ fontFamily: 'var(--font-mono)' }}>{dispatchReceipt.dispatched_at_utc}</span></div>
              </div>

              <div style={{ marginTop: '12px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                <div><strong>Target Gateways:</strong> {dispatchReceipt.dispatch_channels.join(', ')}</div>
                <div style={{ marginTop: '6px' }}>
                  <strong>Cryptographic Audit Hash (SHA-256):</strong>
                  <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', wordBreak: 'break-all', marginTop: '3px', background: 'var(--bg-card)', padding: '6px 10px', borderRadius: '6px' }}>
                    {dispatchReceipt.audit_hash}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Standard Modal Sticky Footer with Primary Actions */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            {dispatchReceipt ? 'Close Window' : 'Cancel'}
          </button>

          {!dispatchReceipt && (
            <button
              onClick={handleApprove}
              disabled={isDispatching}
              className="btn-primary"
              style={{
                padding: '10px 24px',
                fontSize: '0.88rem',
              }}
            >
              <Send size={16} />
              <span>{isDispatching ? 'Cryptographically Sealing & Dispatching...' : 'Approve & Dispatch Public Alert (CAP Protocol)'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
