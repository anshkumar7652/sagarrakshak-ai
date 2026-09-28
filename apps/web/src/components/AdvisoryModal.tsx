'use client';

import React, { useState } from 'react';
import { GroundedAdvisory, DispatchReceipt } from '../types';
import { approveAdvisory } from '../lib/api';
import {
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  VolumeX,
  FileCheck,
  Copy,
  Send,
  MessageSquare,
  AlertCircle,
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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(3, 7, 18, 0.82)',
      backdropFilter: 'blur(16px)',
      zIndex: 1200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: '840px',
        maxHeight: '92vh',
        background: 'rgba(12, 18, 34, 0.98)',
        border: '1px solid var(--border-glow)',
        borderRadius: '16px',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(0, 240, 255, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.12) 0%, transparent 100%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Sparkles size={20} color="var(--accent-cyan)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  DEOC Action Brief & Citizen Advisory
                </h2>
                <span className="badge badge-critical" style={{ fontSize: '0.65rem' }}>
                  GROUNDED GEMINI REASONING
                </span>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Evidence ID: {advisory.advisory_id} • Target: Puri Coast Landfall • CAP Protocol v1.2
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Situation Summary */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '14px 18px',
          }}>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
              DEOC SITUATION SUMMARY (GROUNDED IN GEE & IMD DATA)
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {advisory.situation_summary}
            </p>
          </div>

          {/* Priority Actions with Evidence Citations */}
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', textTransform: 'uppercase' }}>
              Actionable Pre-Landfall Directives
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {advisory.priority_actions.map((action, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {action.target_name}
                      </span>
                      <span className="badge badge-critical" style={{ fontSize: '0.62rem' }}>
                        {action.urgency}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {action.action}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end', flexShrink: 0 }}>
                    {action.evidence_ids.map((ev, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.64rem',
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(56, 189, 248, 0.12)',
                          color: '#7dd3fc',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                        }}
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
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '10px',
            padding: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={16} color="var(--accent-cyan)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                  Public Early-Warning Dissemination
                </span>
              </div>

              {/* Text-to-Speech simulation button */}
              <button
                onClick={handleToggleAudio}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: isPlayingAudio ? 'rgba(239, 68, 68, 0.25)' : 'rgba(56, 189, 248, 0.15)',
                  border: isPlayingAudio ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
                  color: isPlayingAudio ? '#fca5a5' : 'var(--accent-cyan)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {isPlayingAudio ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isPlayingAudio ? 'Stop Audio Broadcast' : 'Audio Readout (TTS)'}</span>
              </button>
            </div>

            {/* Language Tabs */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
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
                    style={{
                      background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                      border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                      color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
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
                background: 'rgba(6, 9, 19, 0.85)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.86rem',
                lineHeight: 1.5,
                outline: 'none',
                resize: 'vertical',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>* Human Officer in-the-loop: Edit content as required prior to dispatch.</span>
              <span>Char Count: {editedAlertText[activeLangTab].length}</span>
            </div>
          </div>

          {/* Human-in-the-Loop Approval & Dispatch Section */}
          {!dispatchReceipt ? (
            <div style={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '10px',
              padding: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6ee7b7', fontSize: '0.82rem', fontWeight: 700, marginBottom: '10px' }}>
                <Lock size={15} />
                <span>OFFICER AUTHENTICATION & DISPATCH GATEWAY</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>
                    Authorizing DEOC Officer
                  </label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(6, 9, 19, 0.7)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>
                    Officer Credentials / Station Token
                  </label>
                  <input
                    type="text"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(6, 9, 19, 0.7)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <button
                onClick={handleApprove}
                disabled={isDispatching}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: isDispatching ? 'wait' : 'pointer',
                  boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)',
                }}
              >
                <Send size={16} />
                <span>{isDispatching ? 'Encrypting & Dispatching to CAP Servers...' : 'Approve & Dispatch Public Alert (CAP Protocol)'}</span>
              </button>
            </div>
          ) : (
            /* Dispatch Receipt Banner */
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10b981',
              borderRadius: '10px',
              padding: '16px',
              animation: 'fadeIn 0.3s ease-in',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6ee7b7', fontWeight: 700, fontSize: '0.92rem', marginBottom: '8px' }}>
                <CheckCircle2 size={20} />
                <span>OFFICIAL DISPATCH CONFIRMATION RECEIPT</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <div>Receipt ID: <b style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{dispatchReceipt.receipt_id}</b></div>
                <div>Status: <span className="badge badge-safe">DISPATCHED TO NETWORKS</span></div>
                <div>Authorized By: <b style={{ color: 'var(--text-primary)' }}>{dispatchReceipt.approved_by}</b></div>
                <div>Timestamp: <span style={{ fontFamily: 'var(--font-mono)' }}>{dispatchReceipt.dispatched_at_utc}</span></div>
              </div>

              <div style={{ marginTop: '10px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <div><b>Target Gateways:</b> {dispatchReceipt.dispatch_channels.join(', ')}</div>
                <div style={{ marginTop: '4px' }}>
                  <b>Cryptographic Audit Hash (SHA-256):</b>
                  <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', wordBreak: 'break-all', marginTop: '2px' }}>
                    {dispatchReceipt.audit_hash}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
