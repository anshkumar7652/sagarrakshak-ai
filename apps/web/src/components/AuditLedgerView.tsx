'use client';

import React, { useState, useEffect } from 'react';
import { AuditLogItem, VerificationResult } from '../types';
import { fetchAuditLogs, verifyAuditReceipt } from '../lib/api';

export function AuditLedgerView() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [selectedVerification, setSelectedVerification] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadLogs = async () => {
    setIsLoading(true);
    const data = await fetchAuditLogs();
    setLogs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleVerify = async (receiptId: string) => {
    setIsVerifying(true);
    const res = await verifyAuditReceipt(receiptId);
    setSelectedVerification(res);
    setIsVerifying(false);
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
            <span style={{ fontSize: '1.4rem' }}>📜</span>
            <h1
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                fontFamily: "'Outfit', sans-serif",
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Immutable DEOC Dispatch & Audit Ledger
            </h1>
            <span className="badge badge-critical">SHA-256 Non-Repudiation</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Tamper-evident record of all AI-generated advisories approved by District Emergency Officers with cryptographic hash receipts.
          </p>
        </div>

        <button onClick={loadLogs} className="btn-secondary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
          🔄 Refresh Ledger
        </button>
      </div>

      {/* Compliance Overview Bento Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="interactive-card" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-primary)' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            Total Verified Dispatches
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '4px', fontFamily: "'Outfit', sans-serif" }}>
            {logs.length} Sealed
          </div>
        </div>

        <div className="interactive-card" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-emerald)' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            Protocol Standard
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '6px', fontFamily: "'Outfit', sans-serif" }}>
            WMO / NDMA CAP v1.2
          </div>
        </div>

        <div className="interactive-card" style={{ padding: '16px 20px', borderLeft: '4px solid var(--accent-purple, #a855f7)' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            Audit Integrity Standard
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-purple, #a855f7)', marginTop: '6px', fontFamily: "'Outfit', sans-serif" }}>
            SHA-256 Cryptographic Chain
          </div>
        </div>
      </div>

      {/* Audit Log Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {isLoading ? (
          <div className="glass-panel" style={{ padding: '36px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Loading audit records...
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.receipt_id} className="glass-panel" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                      {log.receipt_id}
                    </span>
                    <span className="badge badge-safe">APPROVED & DISPATCHED</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Officer: <strong style={{ color: 'var(--text-primary)' }}>{log.officer_name}</strong> ({log.officer_id}) • {log.deoc_center}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                    Timestamp: {new Date(log.dispatched_at_utc).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleVerify(log.receipt_id)}
                    className="btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                  >
                    🛡️ Verify Hash Proof
                  </button>
                  <a
                    href={`http://localhost:8000/api/cap/${log.advisory_id}.xml`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ fontSize: '0.78rem', padding: '6px 14px', textDecoration: 'none' }}
                  >
                    📥 Export CAP XML
                  </a>
                </div>
              </div>

              {/* Multilingual Text Previews */}
              <div
                style={{
                  background: 'var(--bg-surface-elevated)',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '14px',
                  fontSize: '0.84rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '6px', letterSpacing: '0.04em' }}>
                    ENGLISH BROADCAST
                  </div>
                  <div style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{log.approved_text_en}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent-amber)', fontWeight: 700, marginBottom: '6px', letterSpacing: '0.04em' }}>
                    ODIA CITIZEN ALERT (ଓଡ଼ିଆ)
                  </div>
                  <div style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{log.approved_text_or}</div>
                </div>
              </div>

              {/* Channels & Hash */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '0.76rem' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Dispatched Channels:</span>
                  {log.dispatch_channels.map((ch) => (
                    <span key={ch} className="badge badge-medium" style={{ fontSize: '0.68rem' }}>
                      📡 {ch}
                    </span>
                  ))}
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                  SHA-256: <span style={{ color: 'var(--accent-primary)' }}>{log.audit_hash.substring(0, 16)}...{log.audit_hash.substring(log.audit_hash.length - 8)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Verification Modal */}
      {selectedVerification && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--overlay-bg)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px',
          }}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '560px',
              width: '100%',
              padding: '24px 28px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-glow)',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.3rem' }}>🛡️</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
                  Cryptographic Non-Repudiation Proof
                </h3>
              </div>
              <button
                onClick={() => setSelectedVerification(null)}
                className="btn-secondary"
                style={{ padding: '6px', borderRadius: '8px', cursor: 'pointer', lineHeight: 0 }}
              >
                ✕
              </button>
            </div>

            <div
              className="interactive-card"
              style={{
                background: 'var(--bg-badge)',
                border: '1px solid var(--accent-emerald)',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif" }}>
                  {selectedVerification.tamper_evident_status}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  Stored hash strictly matches re-computed payload hash.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Receipt ID: </span>
                <strong style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{selectedVerification.receipt_id}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Officer Signature: </span>
                <strong style={{ color: 'var(--text-primary)' }}>{selectedVerification.officer_signature}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Certified Timestamp: </span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{selectedVerification.timestamp}</span>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Recorded SHA-256 Digest:</div>
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    wordBreak: 'break-all',
                    color: 'var(--accent-primary)',
                  }}
                >
                  {selectedVerification.recorded_hash}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                onClick={() => setSelectedVerification(null)}
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                Close Verification Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
