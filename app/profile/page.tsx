'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { useAuth } from '@/lib/supabase/auth-context';
import { resumeService } from '@/lib/supabase/service';
import { User, Mail, Sparkles, Check, ArrowLeft, Loader2, Camera, Shield } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (profile) {
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [user, profile, authLoading, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setSuccessMsg(false);
    try {
      await resumeService.updateProfile(user.id, {
        full_name: fullName,
        avatar_url: avatarUrl
      });
      await refreshProfile();
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation breadcrumb */}
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
          <h1 className="text-3xl font-serif font-bold text-white">Member Profile</h1>
          <p className="text-xs text-zinc-400">
            Manage your authenticated personal identity and resume author details
          </p>
        </div>

        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          {successMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-2 text-xs text-emerald-300">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Profile updated successfully. Changes reflected across all resumes.</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5">
              <div className="relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName || 'Avatar'}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#181818] border-2 border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-2xl font-bold font-serif">
                    {fullName ? fullName[0]?.toUpperCase() : 'U'}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#D4AF37] text-zinc-950 flex items-center justify-center shadow-md">
                  <Camera className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex-1 w-full space-y-1.5">
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                />
                <p className="text-[11px] text-zinc-500">Provide an image URL to appear on templates that feature headshots.</p>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1.5">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alexander Vance"
                  className="w-full bg-[#181818] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Email Address (read only from auth) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Authenticated Email
                </label>
                <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  Verified by Supabase Auth
                </span>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full bg-[#141414] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <span>Save Profile</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
