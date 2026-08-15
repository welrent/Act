'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { user, setShowLoginModal, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.length >= 2) {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`);
          const data = await res.json();
          setResults(Array.isArray(data) ? data : []);
          setShowResults(true);
        } catch (e) {
          console.error("Search failed", e);
          setResults([]);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('.search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.search-container')) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="design-header-wrapper">
      <div className="design-header-top">
        <div className="design-logo">
          <Link href="/" className="flex items-center">
            <img src="/img/WR.svg" alt="WR Logo" className="logo-img" />
          </Link>
          <span className="pipe">|</span>
          <span className="act">Act</span>
        </div>

        <div className="header-right">
          <a href="https://github.com/welrent/wr-frontend" target="_blank" rel="noreferrer" className="header-link" title="Open Welrent main rental site">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="home-icon">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="home-text">Main site</span>
          </a>

          <div className="header-user">
            {user ? (
              <Link href="/profile" className="flex items-center gap-[10px] cursor-pointer hover:opacity-80 transition-opacity" title="View Profile">
                <span className="user-name">{user.displayName || user.email?.split('@')[0] || 'User'}</span>
                <div className="user-avatar active">
                  <span className="avatar-letter">{(user.displayName || user.email || 'U')[0].toUpperCase()}</span>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-[10px] cursor-pointer" title="Click to sign in" onClick={() => { console.log('Clicking login...'); setShowLoginModal(true); }}>
                <span className="login-status hover:text-[#2F214B] transition-colors">You are not logged in</span>
                <div className="user-avatar hover:bg-[#8EB9FF] hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" className="avatar-icon">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="design-search-row">
      <div className="search-container relative mt-4">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B0AABF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="search-shortcut">
          ⌘ K
        </span>

        {showResults && (
          <div className="search-results absolute">
            {results.length > 0 ? (
              results.map((r, i) => (
                <Link
                  key={i}
                  href={r.url}
                  className="search-result-item"
                  onClick={() => setShowResults(false)}
                >
                  <strong className="block text-[#2F214B]">{r.title}</strong>
                  <span className="text-[12px] text-[#8C8C91]">{r.type}</span>
                </Link>
              ))
            ) : (
              <div className="p-2 text-[#B0AABF]">No results found.</div>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
