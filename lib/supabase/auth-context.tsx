'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase } from './client';
import { isSupabaseConfigured } from './config';
import { UserProfile } from '@/types/user';
import { resumeService } from './service';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  const loadUserProfile = async (userId: string, email?: string) => {
    try {
      const prof = await resumeService.getProfile(userId);
      if (prof) {
        setProfile(prof);
      } else {
        setProfile({
          id: userId,
          email: email || '',
          full_name: 'Member',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  useEffect(() => {
    const supabase = getSupabase();

    if (!supabase || !isConfigured) {
      // Local session mode when Supabase is not configured yet
      try {
        const localSession = localStorage.getItem('resumelux_local_user');
        if (localSession) {
          const parsed = JSON.parse(localSession);
          setUser(parsed.user);
          setProfile(parsed.profile);
        }
      } catch {
        // ignore
      }
      setLoading(false);
      return;
    }

    // Get current session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id, session.user.email);
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadUserProfile(session.user.id, session.user.email);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase || !isConfigured) {
      // Offline local mode simulation if no Supabase credentials yet
      const dummyUser = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email,
        app_metadata: {},
        user_metadata: { full_name: email.split('@')[0] },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as unknown as User;
      const dummyProfile: UserProfile = {
        id: dummyUser.id,
        email,
        full_name: email.split('@')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('resumelux_local_user', JSON.stringify({ user: dummyUser, profile: dummyProfile }));
      setUser(dummyUser);
      setProfile(dummyProfile);
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) return { error };

      if (data.user) {
        setUser(data.user);
        await loadUserProfile(data.user.id, data.user.email);
      }

      return { error: null };
    } catch (err: unknown) {
      return { error: err as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const supabase = getSupabase();
    if (!supabase || !isConfigured) {
      const dummyUser = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email,
        app_metadata: {},
        user_metadata: { full_name: fullName },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as unknown as User;
      const dummyProfile: UserProfile = {
        id: dummyUser.id,
        email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('resumelux_local_user', JSON.stringify({ user: dummyUser, profile: dummyProfile }));
      setUser(dummyUser);
      setProfile(dummyProfile);
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) return { error };

      if (data.user) {
        setUser(data.user);
        // Create initial profile record directly as fallback if trigger is not ready
        await resumeService.updateProfile(data.user.id, {
          id: data.user.id,
          email,
          full_name: fullName
        });
        await loadUserProfile(data.user.id, email);
      }

      return { error: null };
    } catch (err: unknown) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (supabase && isConfigured) {
      await supabase.auth.signOut();
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('resumelux_local_user');
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id, user.email);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isConfigured,
        signIn,
        signUp,
        signOut,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
