'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/supabase/auth-context';
import { Sparkles, ArrowRight, Lock, Mail, User, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isConfigured } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify both fields.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setErrorMsg(error.message || 'Unable to create account. Please try again.');
      } else {
        router.push('/dashboard');
      }
    } catch {
      setErrorMsg('An unexpected registration error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col justify-center items-center p-4 selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-8 text-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#D4AF37] transition-all">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <span className="font-serif tracking-wider text-2xl font-bold text-white">
            Resume<span className="text-[#D4AF37]">Lux</span>
          </span>
        </Link>
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
          Begin Your Journey
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Create your account to design bespoke, ATS-engineered resumes
        </p>
      </div>

      {/* Card Form */}
      <div className="w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
        {errorMsg && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-800/60 flex items-center gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Eugin A"
                className="w-full bg-[#181818] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eugin@resumelux.io"
                className="w-full bg-[#181818] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#181818] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-[#181818] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] text-zinc-400 pt-1">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full cloud database synchronization</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant access to all 10+ luxury resume templates</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/5 text-center text-xs text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="text-[#D4AF37] font-semibold hover:underline">
            Sign In
          </Link>
        </div>

        {!isConfigured && (
          <div className="mt-4 p-2.5 rounded-lg bg-amber-950/20 border border-[#D4AF37]/20 text-[11px] text-amber-300 text-center">
            Supabase auth is running in offline studio mode. You can register any name/email to test!
          </div>
        )}
      </div>
    </div>
  );
}
