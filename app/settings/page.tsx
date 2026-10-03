'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { useAuth } from '@/lib/supabase/auth-context';
import { Shield, Bell, Moon, LogOut, ArrowLeft, Check, Database, Lock } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export default function SettingsPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<'account' | 'security' | 'preferences'>('account');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [passwordSent, setPasswordSent] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio Dashboard</span>
          </Link>
        </div>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-serif font-bold text-white">Studio Settings</h1>
          <p className="text-xs text-zinc-400">
            Configure your account preferences, database security, and cloud settings
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab('account')}
            className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'account'
                ? 'border-[#D4AF37] text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'security'
                ? 'border-[#D4AF37] text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Security &amp; Cloud
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'preferences'
                ? 'border-[#D4AF37] text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Preferences
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-serif font-bold text-white">Account Details</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Your primary studio credentials</p>
              </div>

              <div className="p-4 rounded-xl bg-[#161616] border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Primary Email:</span>
                  <span className="text-white font-medium">{user?.email || 'user@resumelux.io'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Account ID:</span>
                  <span className="text-zinc-400 font-mono text-[11px]">{user?.id || 'local-demo-user'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Subscription Tier:</span>
                  <span className="text-[#D4AF37] font-semibold">Luxury Lifetime Member (Free)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">Sign Out of ResumeLux</h4>
                  <p className="text-[11px] text-zinc-400">End your active session on this browser</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-xl bg-red-600/20 border border-red-500/30 text-red-300 hover:bg-red-600 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-serif font-bold text-white">Cloud Database &amp; Security</h3>
                <p className="text-xs text-zinc-400 mt-0.5">PostgreSQL encryption and Row Level Security</p>
              </div>

              <div className="p-4 rounded-xl bg-[#161616] border border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Row Level Security (RLS)</h4>
                    <p className="text-[11px] text-zinc-400">Your resume data is strictly isolated to your authenticated user ID.</p>
                  </div>
                </div>

                <div className="text-xs text-zinc-400 pt-2 border-t border-white/5 flex justify-between">
                  <span>Supabase Status:</span>
                  <span className="font-semibold text-[#D4AF37]">
                    {isSupabaseConfigured() ? 'Connected & Enforced' : 'Offline Studio Mode'}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-3">
                <h4 className="text-xs font-semibold text-white">Password &amp; Authentication</h4>
                <p className="text-xs text-zinc-400">Request a password change link to your registered email.</p>
                {passwordSent ? (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Password reset email dispatched to {user?.email}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setPasswordSent(true)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2 border border-white/10"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Send Password Reset Email</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-serif font-bold text-white">Studio Preferences</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Tailor your builder experience</p>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 rounded-xl bg-[#161616] border border-white/5 cursor-pointer">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-white">Continuous Autosave</div>
                    <div className="text-[11px] text-zinc-400">Automatically sync changes to cloud database with 1500ms debounce</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoSaveEnabled}
                    onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-800 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl bg-[#161616] border border-white/5 cursor-pointer">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-white">Export Notifications</div>
                    <div className="text-[11px] text-zinc-400">Display instant toast confirmations when high-res PDF generation completes</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-800 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </label>

                <div className="p-4 rounded-xl bg-[#161616] border border-white/5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-white">Studio Theme</div>
                    <div className="text-[11px] text-zinc-400">ResumeLux default luxury dark interface (#080808)</div>
                  </div>
                  <span className="text-[11px] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                    Dark Luxury
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
