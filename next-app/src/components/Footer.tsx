'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [showGDPR, setShowGDPR] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined' && !document.cookie.includes('cookieConsentAct=true')) {
      setShowGDPR(true);
    }
  }, []);

  const acceptCookies = () => {
    document.cookie = "cookieConsentAct=true; max-age=31536000; path=/";
    setShowGDPR(false);
  };

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLang = 'en'; // Mock current lang

  return (
    <>
      <div className="design-footer">
        <div className="flex gap-[15px] items-center flex-wrap">
          <Link href="https://welrent.com" target="_blank" className="text-inherit no-underline">
            Welrent Europa B.V.
          </Link>
          <div className="flex gap-[6px] items-center flex-wrap">
            {languages.map((lang) => (
              <button
                key={lang.code}
                title={lang.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: currentLang === lang.code ? '1px solid #DDD5F3' : '1px solid transparent',
                  backgroundColor: currentLang === lang.code ? '#EEE9F8' : 'transparent',
                  color: currentLang === lang.code ? '#2F214B' : '#B0AABF',
                  fontSize: '13px',
                  fontWeight: currentLang === lang.code ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  lineHeight: 1,
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: 1 }}>{lang.flag}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.3px', textTransform: 'uppercase' }}>{lang.code}</span>
              </button>
            ))}
          </div>
        </div>
        <div>© {new Date().getFullYear()}</div>
      </div>

      {showGDPR && (
        <div 
          id="gdpr-cookie-banner" 
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#2A303C',
            color: '#C0BDC8',
            padding: '20px',
            zIndex: 9999,
            boxShadow: '0 -10px 30px rgba(0,0,0,0.5)',
            borderTop: '1px solid #8EB9FF',
            fontFamily: '-apple-system, BlinkMacSystemFont, Arial, sans-serif'
          }}
        >
          <div style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ flex: 1, minWidth: '300px', fontSize: '14px', lineHeight: 1.6 }}>
              <strong style={{ color: '#FFF', fontSize: '16px' }}>We value your privacy.</strong><br />
              Our infrastructure uses tracking cookies to structurally enhance your browsing layout patterns and optimize backend tracking parameters. Clicking "Yes, Accept" confirms your alignment.
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={acceptCookies}
                style={{
                  backgroundColor: '#8EB9FF',
                  color: '#2F214B',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '15px',
                  boxShadow: '0 4px 10px rgba(142,185,255,0.2)'
                }}
              >
                Yes, Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
