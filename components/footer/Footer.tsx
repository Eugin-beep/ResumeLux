import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#080808] border-t border-white/5 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/5">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="font-serif tracking-wider text-lg font-bold text-white">
                Resume<span className="text-[#D4AF37]">Lux</span>
              </span>
            </Link>
            <p className="text-zinc-500 max-w-sm text-xs leading-relaxed">
              The luxury digital resume studio for high-achieving professionals, developers, students, and executives. Engineered for timeless typography and modern ATS standards.
            </p>
            <div className="text-[11px] text-zinc-600">
              © {new Date().getFullYear()} ResumeLux Studio. All rights reserved.
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="hover:text-zinc-200 transition-colors">
                  Templates Library
                </Link>
              </li>
              <li>
                <a href="/#features" className="hover:text-zinc-200 transition-colors">
                  Key Features
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-zinc-200 transition-colors">
                  Studio Dashboard
                </Link>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-zinc-200 transition-colors">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="hover:text-zinc-200 transition-colors">
                  Resume Tips
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-zinc-200 transition-colors">
                  Career Guide
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-zinc-200 transition-colors">
                  ATS Optimization
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-zinc-200 transition-colors">
                  Help &amp; Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Legal</h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-zinc-200 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-200 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-200 transition-colors cursor-pointer">
                  Security Architecture
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600">
          <div>
            Built with modern standards: Next.js, TypeScript, Tailwind CSS, and Supabase PostgreSQL.
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Cloud Persistence Active
          </div>
        </div>
      </div>
    </footer>
  );
}
