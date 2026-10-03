'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { Sparkles, ArrowLeft, Mail, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email) {
      setErrorMsg('Please enter your account email.');
      return;
    }

    setLoading(true);
    try {
      const supabase = getSupabase();
      if (supabase && isSupabaseConfigured()) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login`
        });
        if (error) {
          setErrorMsg(error.message);
          return;
        }
      }
      setSuccess(true);
    } catch {
      setErrorMsg('Unable to send password reset link. Please try again.');
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
          Reset Your Credentials
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          We&apos;ll send a secure password reset link to your registered email
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

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-white text-lg">Check Your Inbox</h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
              If an account exists for <strong className="text-zinc-200">{email}</strong>, you will receive password reset instructions shortly.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="alex.vance@resumelux.io"
                  className="w-full bg-[#181818] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                  <span>Sending Link...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>

            <div className="text-center pt-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
