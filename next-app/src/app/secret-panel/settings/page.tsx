'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Setting {
  key: string;
  value: string;
  label: string;
}

const SETTING_ICONS: Record<string, string> = {
  COMPANY_ADDRESS: '🏢',
  EMAIL: '📧',
  CHAMBER_OF_COMMERCE_NUMBER: '🏛️',
  VAT_NUMBER: '🧾',
  PHONE_NUMBER: '📞',
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: string; message: string }>({ type: '', message: '' });

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => {
        setStatus({ type: 'error', message: 'Failed to load settings.' });
        setLoading(false);
      });
  }, []);

  function handleChange(key: string, value: string) {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
  }

  async function handleSave() {
    setSaving(true);
    setStatus({ type: 'loading', message: 'Saving settings...' });
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings.map(s => ({ key: s.key, value: s.value }))),
      });
      if (res.ok) {
        setStatus({ type: 'success', message: '✅ Settings saved! All pages will now use the updated values.' });
      } else {
        throw new Error('Failed');
      }
    } catch {
      setStatus({ type: 'error', message: '❌ Failed to save. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
        <span style={{ color: '#8C8C91' }}>Loading settings...</span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2F214B 0%, #4A3270 100%)',
        borderRadius: '16px',
        padding: '28px 32px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '1.8px', textTransform: 'uppercase' }}>Admin Panel · Global Settings</span>
        </div>
        <h1 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 800, margin: '0 0 6px 0' }}>Company Settings</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: 0 }}>
          These values replace placeholders like <code style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>[COMPANY_ADDRESS]</code> across all legal pages automatically.
        </p>
      </div>

      {/* Settings Form */}
      <div style={{
        background: '#FAFAFA',
        border: '1px solid #F0EEF6',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}>
        {settings.map((setting, idx) => (
          <div key={setting.key} style={{
            padding: '20px 24px',
            borderBottom: idx < settings.length - 1 ? '1px solid #F0EEF6' : 'none',
          }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2F214B' }}>
                {SETTING_ICONS[setting.key] || '⚙️'} {setting.label}
              </span>
              <span style={{
                display: 'inline-block',
                marginLeft: '8px',
                fontSize: '10px',
                fontWeight: 700,
                color: '#8C8C91',
                background: '#F4F5F6',
                padding: '2px 8px',
                borderRadius: '10px',
                fontFamily: 'monospace',
                letterSpacing: '0.3px',
              }}>
                [{setting.key}]
              </span>
            </label>
            <input
              type="text"
              value={setting.value}
              onChange={e => handleChange(setting.key, e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                border: '1px solid #E8E4F2',
                borderRadius: '8px',
                background: '#FFFFFF',
                color: '#2F214B',
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#9B7FD4'}
              onBlur={e => e.target.style.borderColor = '#E8E4F2'}
              placeholder={`Enter ${setting.label.toLowerCase()}...`}
            />
          </div>
        ))}
      </div>

      {/* Info box */}
      <div style={{
        background: '#EEE9F8',
        border: '1px solid #DDD5F3',
        borderRadius: '12px',
        padding: '14px 18px',
        marginBottom: '16px',
        fontSize: '13px',
        color: '#2F214B',
        lineHeight: 1.6,
      }}>
        <strong>💡 How it works:</strong> When a visitor opens a legal page (e.g. Car Rental Agreement), the system automatically replaces all placeholders with the values you set here. No manual editing of each page required.
      </div>

      {/* Status */}
      {status.message && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '13px',
          fontWeight: 500,
          background: status.type === 'success' ? 'rgba(34,197,94,0.08)' : status.type === 'error' ? 'rgba(239,68,68,0.08)' : '#F9FAFB',
          color: status.type === 'success' ? '#16a34a' : status.type === 'error' ? '#dc2626' : '#8C8C91',
          border: `1px solid ${status.type === 'success' ? 'rgba(34,197,94,0.2)' : status.type === 'error' ? 'rgba(239,68,68,0.2)' : '#EAECF0'}`,
        }}>
          {status.message}
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          width: '100%',
          padding: '14px',
          background: saving ? '#C4B8DE' : 'linear-gradient(135deg, #2F214B, #4A3270)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '10px',
          fontSize: '15px',
          fontWeight: 700,
          cursor: saving ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          letterSpacing: '0.2px',
        }}
      >
        {saving ? 'Saving...' : '💾 Save Settings'}
      </button>

      {/* Back link */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Link href="/secret-panel" style={{ fontSize: '13px', color: '#8C8C91', textDecoration: 'none' }}>
          ← Back to Control Panel
        </Link>
      </div>
    </div>
  );
}
