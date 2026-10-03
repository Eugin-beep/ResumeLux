'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase/auth-context';
import { Sparkles, Menu, X, ArrowRight, User, LogOut, LayoutDashboard } from 'lucide-react';

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#080808]/85 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C1C1C] to-[#121212] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#D4AF37] transition-all">
            <Sparkles className="w-5 h-5 text-[#D4AF37] transition-transform group-hover:rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-wider text-xl font-bold text-white group-hover:text-[#F3E5AB] transition-colors">
              Resume<span className="text-[#D4AF37]">Lux</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-sans -mt-0.5">
              Luxury Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <Link
            href="/templates"
            className="hover:text-white transition-colors"
          >
            Templates
          </Link>
          <a
            href="/#features"
            className="hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="/#how-it-works"
            className="hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="/#pricing"
            className="hover:text-white transition-colors"
          >
            Pricing
          </a>
        </div>

        {/* Right CTA / Auth Controls */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#151515] border border-white/10 hover:border-[#D4AF37]/50 transition-colors text-sm text-zinc-200"
              >
                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs font-bold">
                  {profile?.full_name ? profile.full_name[0].toUpperCase() : 'U'}
                </div>
                <span className="max-w-[120px] truncate font-medium">
                  {profile?.full_name || user.email?.split('@')[0]}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#121212] border border-white/10 rounded-xl shadow-2xl py-1.5 text-xs text-zinc-300 z-50">
                  <div className="px-3.5 py-2 border-b border-white/5">
                    <p className="font-semibold text-white truncate">{profile?.full_name || 'Member'}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4 text-zinc-400" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut();
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-left text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link
            href={user ? '/dashboard' : '/signup'}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#080808] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{user ? 'My Dashboard' : 'Create My Resume'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-950" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href={user ? '/dashboard' : '/signup'}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase bg-[#D4AF37] text-zinc-950"
          >
            {user ? 'Dashboard' : 'Start'}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0a0a] px-4 pt-3 pb-6 space-y-3 text-sm text-zinc-300">
          <Link
            href="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-white"
          >
            Templates
          </Link>
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-white"
          >
            Features
          </a>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-white"
          >
            How It Works
          </a>
          <a
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-white"
          >
            Pricing
          </a>

          <div className="pt-3 border-t border-white/5 space-y-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-amber-300"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="flex items-center gap-2 py-2 text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg border border-white/10 text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-[#D4AF37] text-zinc-950 font-semibold"
                >
                  Create My Resume
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
