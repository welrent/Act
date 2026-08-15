'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase/client';

interface AuthContextType {
  user: User | null;
  role: string;
  loading: boolean;
  logout: () => Promise<void>;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: 'user',
  loading: true,
  logout: async () => {},
  showLoginModal: false,
  setShowLoginModal: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>('user');
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // Local/demo mode without Firebase credentials
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken();
          const res = await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              idToken,
              email: currentUser.email,
              uid: currentUser.uid,
            }),
          });
          const data = await res.json();
          if (data.role) {
            setRole(data.role);
          }
        } catch (error) {
          console.warn('[Welrent Act] Session sync failed:', error);
        }
      } else {
        try {
          await fetch('/api/auth/session', { method: 'DELETE' });
        } catch {
          /* ignore */
        }
        setRole('user');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    if (isFirebaseConfigured) {
      await firebaseSignOut(auth);
    }
    setUser(null);
    setRole('user');
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, showLoginModal, setShowLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
