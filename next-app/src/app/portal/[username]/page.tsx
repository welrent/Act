'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PortalPage() {
  const params = useParams();
  const username = (params?.username as string) ?? '';
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated WelrentAuth hydration
    // In a real migration, we would use the actual WelrentAuth SDK here
    const checkAuth = () => {
      // Mocking auth state for demonstration
      setTimeout(() => {
        setLoading(false);
        // If we want to test the signed-in state, we'd set user here
      }, 1000);
    };
    checkAuth();
  }, []);

  const splitName = (displayName: string) => {
    const parts = (displayName || '').trim().split(/\s+/);
    return {
      first: parts[0] || '—',
      last: parts.slice(1).join(' ') || '—',
    };
  };

  if (loading) {
    return (
      <div className="text-center py-[60px] text-[#C0BDC8]">
        <div className="w-11 h-11 border-[3px] border-[#F0F0F4] border-t-[#2F214B] rounded-full animate-spin inline-block mb-3"></div>
        <p className="text-sm m-0">Loading profile…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#F9FAFB] rounded-xl py-[60px] px-6 text-center border border-dashed border-[#E2E2E6]">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-11 h-11 stroke-[#C0BDC8] mx-auto mb-4">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <h2 className="text-xl font-bold text-[#2F214B] mb-2">Sign in to view your profile</h2>
        <p className="text-sm text-[#8C8C91] mb-5">This page is only visible to authenticated Welrent members.</p>
        <button className="inline-flex items-center gap-2 px-[22px] py-[10px] rounded-xl border-[1.5px] border-[#EAECF0] text-[#2F214B] font-semibold hover:bg-[#F9FAFB] hover:border-[#D0C8E0] transition-all">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
          Sign In
        </button>
      </div>
    );
  }

  const name = splitName(user.displayName);

  return (
    <div className="portal-content">
      {/* Hero */}
      <div className="portal-hero bg-gradient-to-br from-[#2F214B] to-[#1a1130] rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center md:items-center gap-5 md:gap-7 mb-8 relative overflow-hidden text-center md:text-left">
        <div className="portal-avatar-wrap shrink-0 w-20 h-20 rounded-full border-[3px] border-[#8eb9ff59] overflow-hidden bg-[#3e2d63] flex items-center justify-center text-[32px] font-extrabold text-[#8EB9FF] relative z-10">
          {user.photoUrl ? (
            <img src={user.photoUrl} alt={user.displayName} className="w-full h-full object-cover" />
          ) : (
            <span>{(user.displayName || user.email).charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="portal-hero-info relative z-10">
          <h1 className="portal-name text-[22px] md:text-[26px] font-extrabold text-white tracking-[-0.5px] mb-1">
            {user.displayName || user.email}
          </h1>
          <p className="portal-email text-sm text-[#8EB9FF] font-medium m-0">
            {user.email}
          </p>
          <div className="portal-badge inline-flex items-center gap-[5px] bg-[#8eb9ff1f] border border-[#8eb9ff33] text-[#8EB9FF] rounded-[20px] px-3 py-[3px] text-[12px] font-semibold mt-[10px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            Verified Member
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="portal-grid grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 mb-8">
        <PortalCard label="First Name" value={name.first} icon={<UserIcon />} />
        <PortalCard label="Last Name" value={name.last} icon={<UsersIcon />} />
        <PortalCard label="Email Address" value={user.email} icon={<MailIcon />} />
        <PortalCard label="Account ID" value={user.uid} icon={<GridIcon />} isId />
      </div>

      {/* Actions */}
      <div className="portal-actions flex gap-3 mt-8 flex-wrap">
        <Link href="/" className="inline-flex items-center gap-2 px-[22px] py-[10px] rounded-xl border-[1.5px] border-[#EAECF0] text-[#2F214B] font-semibold hover:bg-[#F9FAFB] hover:border-[#D0C8E0] transition-all">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><polyline points="12 19 5 12 12 5" /></svg>
          Back to Dashboard
        </Link>
        <button className="inline-flex items-center gap-2 px-[22px] py-[10px] rounded-xl bg-[#FFF5F5] text-[#EF4135] border-[1.5px] border-[#FDDCDA] font-semibold hover:bg-[#FDDCDA] transition-all">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}

function PortalCard({ label, value, icon, isId = false }: any) {
  return (
    <div className="portal-card bg-[#F9FAFB] rounded-xl p-6 border border-[#F0F0F4] hover:border-[#D0C8E0] hover:shadow-[0_4px_16px_rgba(47,33,75,0.06)] transition-all">
      <div className="portal-card-icon w-[38px] h-[38px] rounded-[10px] bg-[#EEE9F8] flex items-center justify-center mb-3">
        {icon}
      </div>
      <div className="portal-card-label text-[11px] font-bold uppercase tracking-[0.8px] text-[#C0BDC8] mb-2">{label}</div>
      <div className={`portal-card-value text-base font-semibold text-[#2F214B] break-all ${isId ? 'text-[12px] font-mono text-[#8C8C91]' : ''}`}>
        {value}
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-[#7C5DC7]">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-[#7C5DC7]">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-[#7C5DC7]">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-[#7C5DC7]">
      <rect x="2" y="4" width="8" height="4" rx="1" /><rect x="14" y="4" width="8" height="4" rx="1" /><rect x="2" y="16" width="8" height="4" rx="1" /><rect x="14" y="16" width="8" height="4" rx="1" />
    </svg>
  );
}
