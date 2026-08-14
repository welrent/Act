'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-[#8EB9FF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleCopyUid = () => {
    navigator.clipboard.writeText(user.uid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div>
      {/* Profile Banner */}
      <div 
        className="design-graphic" 
        style={{ 
          background: "linear-gradient(135deg, #1E1B24 0%, #2F214B 50%, #4A3270 100%)", 
          alignItems: "center", 
          justifyContent: "center", 
          flexDirection: "column", 
          textAlign: "center", 
          boxShadow: "inset 0 0 50px rgba(0,0,0,0.3)",
          display: "flex",
          height: "180px",
          borderRadius: "8px",
          marginBottom: "2rem",
          marginTop: "0",
          position: "relative"
        }}
      >
        <div style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#2F214B",
          border: "4px solid #FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          marginBottom: "10px"
        }}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: "36px", fontWeight: "bold", color: "#FFFFFF" }}>
              {(user.displayName || user.email || 'U')[0].toUpperCase()}
            </span>
          )}
        </div>
        <h1 style={{ color: "#FFF", fontSize: "24px", fontWeight: 700, margin: 0, letterSpacing: "-0.5px" }}>
          {user.displayName || 'Welrent User'}
        </h1>
      </div>

      {/* User Info Details */}
      <div className="design-message" style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ color: "#8C8C91", fontSize: "17px" }}>Email Address</strong>
          <span style={{ fontSize: "15px", color: "#2F214B", fontWeight: 500 }}>{user.email}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ color: "#8C8C91", fontSize: "17px" }}>User ID (UID)</strong>
          <div 
            onClick={handleCopyUid}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              cursor: "pointer", 
              backgroundColor: "#F4F5F6", 
              padding: "4px 10px", 
              borderRadius: "6px" 
            }}
          >
            <span style={{ fontSize: "13px", fontFamily: "monospace", color: "#8C8C91" }}>
              {user.uid}
            </span>
            <span style={{ fontSize: "12px", color: copied ? "#34A853" : "#BDBDBD", fontWeight: 600 }}>
              {copied ? "Copied!" : "Copy"}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "16px", borderTop: "1px solid #EAECF0" }}>
          <button 
            onClick={handleLogout}
            style={{ 
              backgroundColor: "transparent", 
              border: "none", 
              color: "#EF4444", 
              fontWeight: 600, 
              fontSize: "15px", 
              cursor: "pointer", 
              padding: 0 
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Contracts Section */}
      <div style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#2F214B", margin: "0 0 16px 0" }}>
          My Contracts
        </h2>
      </div>

      {/* Empty State matching design-message */}
      <div className="design-message" style={{ textAlign: "center", padding: "40px 20px" }}>
        <strong style={{ color: "#8C8C91", fontSize: "17px", display: "block", marginBottom: "8px" }}>
          No Active Contracts
        </strong>
        <span style={{ fontSize: "15px", color: "#BDBDBD", display: "block", marginBottom: "24px" }}>
          You don't have any active rental agreements at the moment. Browse our fleet and start a new reservation to see your contracts here.
        </span>
        
        <div className="rental-cards-container" style={{ justifyContent: "center", marginBottom: 0 }}>
          <Link href="/pages/car-rental-agreement" className="rental-card-pill">
            Rent a Car
          </Link>
          <Link href="/pages/boat-rental-agreement" className="rental-card-pill">
            Rent a Boat
          </Link>
        </div>
      </div>
    </div>
  );
}
