'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Eye,
  FileDown,
  Cloud,
  Copy,
  Smartphone,
  ChevronRight,
  Star
} from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { TEMPLATES } from '@/components/resume-templates/registry';
import { TemplateLuxury } from '@/components/resume-templates/TemplateLuxury';
import { DEMO_RESUME_DATA } from '@/lib/demo-data';

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Freshers',
    'Students',
    'Developers',
    'Designers',
    'Data Professionals',
    'Business',
    'Finance',
    'Marketing',
    'Academics',
    'Executives'
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Subtle Luxury Ambient Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-white/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Small Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE NEXT GENERATION RESUME BUILDER</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.1]">
                Build a Resume That{' '}
                <span className="gold-gradient-text block mt-1">Gets Remembered.</span>
              </h1>

              {/* Supporting text */}
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Create a professionally designed resume from your experience, choose a premium template, and download a polished PDF in minutes.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-zinc-950 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Create My Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/templates"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#141414] hover:bg-[#1a1a1a] text-zinc-200 border border-white/10 hover:border-white/20 transition-all"
                >
                  <span>Explore Templates</span>
                </Link>
              </div>

              {/* Trust highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/5 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-xl font-bold font-serif text-white">100%</div>
                  <div className="text-[11px] text-zinc-500 uppercase tracking-wider">ATS Compatible</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-serif text-white">A4 Spec</div>
                  <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Vector Print</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-serif text-[#D4AF37]">Zero</div>
                  <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Subscriptions</div>
                </div>
              </div>
            </motion.div>

            {/* Right Mockup: Floating Luxury Resume Preview with Framer Motion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[420px] rounded-2xl p-2 bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 z-20 bg-[#161616] border border-[#D4AF37]/50 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-xl"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                  <span className="text-[11px] font-semibold text-zinc-200">
                    Live Live Preview
                  </span>
                </motion.div>

                {/* Scaled-down miniature of the Luxury Gold template */}
                <div className="overflow-hidden rounded-xl bg-white shadow-2xl origin-top transform scale-[0.62] -mb-[42%] -mr-[42%] pointer-events-none select-none">
                  <TemplateLuxury resume={DEMO_RESUME_DATA} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted / Feature Strip */}
      <section className="border-y border-white/5 bg-[#0d0d0d] py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-lg sm:text-xl font-serif font-bold text-white">100+ Template</span>
              <span className="text-xs uppercase tracking-wider text-zinc-400">Architecture</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-lg sm:text-xl font-serif font-bold text-white">Live Resume</span>
              <span className="text-xs uppercase tracking-wider text-zinc-400">Instant Preview</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-lg sm:text-xl font-serif font-bold text-white">Professional PDF</span>
              <span className="text-xs uppercase tracking-wider text-zinc-400">Export Standard</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-lg sm:text-xl font-serif font-bold text-white">Cloud Saved</span>
              <span className="text-xs uppercase tracking-wider text-zinc-400">Database Storage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (01 to 06) */}
      <section id="features" className="py-24 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Engineered For Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Everything You Need in a Professional Studio
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Purpose-built tools designed to present your career trajectory with unmatched elegance and algorithmic readability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 01 */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <div className="text-2xl font-serif font-bold text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors mb-4">
                01
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#D4AF37] mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Premium Templates</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Handcrafted layouts from Minimal ATS to Executive Black and Luxury Gold, engineered with refined typography and balanced whitespace.
              </p>
            </div>

            {/* Feature 02 */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <div className="text-2xl font-serif font-bold text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors mb-4">
                02
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#D4AF37] mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Live Editing</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Experience real-time reactive editing. Watch your resume adapt instantly to every keystroke without lag or page reloads.
              </p>
            </div>

            {/* Feature 03 */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <div className="text-2xl font-serif font-bold text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors mb-4">
                03
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#D4AF37] mb-4">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cloud Storage</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Your resumes are securely stored in Supabase PostgreSQL with debounced autosave and strict Row Level Security isolation.
              </p>
            </div>

            {/* Feature 04 */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <div className="text-2xl font-serif font-bold text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors mb-4">
                04
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#D4AF37] mb-4">
                <FileDown className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Professional PDF</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                High-fidelity A4 PDF export adhering strictly to international dimensions (210mm × 297mm) with crisp typography and clean margins.
              </p>
            </div>

            {/* Feature 05 */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <div className="text-2xl font-serif font-bold text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors mb-4">
                05
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#D4AF37] mb-4">
                <Copy className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Multiple Resumes</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Tailor separate resumes for different industries and job applications. Duplicate, rename, and manage multiple versions with one click.
              </p>
            </div>

            {/* Feature 06 */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
              <div className="text-2xl font-serif font-bold text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors mb-4">
                06
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#D4AF37] mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Responsive Builder</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Build and tweak your CV seamlessly on desktop, laptop, iPad, or mobile phone with an intelligent adaptive studio interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (1 to 5) */}
      <section id="how-it-works" className="py-24 bg-[#0d0d0d] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              Effortless Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Five Simple Steps to Your Dream Resume
            </h2>
            <p className="text-sm text-zinc-400">
              From blank page to boardroom-ready PDF in under ten minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'Create Account', desc: 'Sign up securely with Supabase authentication in seconds.' },
              { step: '2', title: 'Enter Information', desc: 'Add your experience, skills, projects, and custom sections.' },
              { step: '3', title: 'Choose Template', desc: 'Select from our curated library of 10+ luxury designs.' },
              { step: '4', title: 'Customize Layout', desc: 'Switch templates instantly without losing any resume data.' },
              { step: '5', title: 'Download PDF', desc: 'Export high-definition A4 PDF ready for employers.' }
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#141414] border border-white/5 relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold text-xs mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1.5">{s.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1 text-[11px] text-[#D4AF37]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Step</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Showcase with Career Categories */}
      <section className="py-24 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                Template Showcase
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Tailored for Every Career Horizon
              </h2>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-amber-200 transition-colors"
            >
              <span>View All 10+ Templates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Career Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-zinc-950 font-bold shadow-md'
                    : 'bg-[#141414] text-zinc-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Template Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.slice(0, 6).map((tpl) => (
              <div
                key={tpl.id}
                className="group rounded-2xl bg-[#121212] border border-white/5 hover:border-[#D4AF37]/50 transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/20">
                      {tpl.category}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium">Free Access</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#F3E5AB] transition-colors mb-1.5">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                    {tpl.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {tpl.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-white/5 text-zinc-400 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 bg-[#0e0e0e]/50 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{tpl.level}</span>
                  <Link
                    href={`/signup?template=${tpl.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#D4AF37] transition-colors"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Value Strip */}
      <section id="pricing" className="py-20 bg-[#0d0d0d] border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
            <span>Launch Edition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
            All 10+ Templates Included Free
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-8">
            Create unlimited resumes, download high-definition PDFs, and store your work permanently with zero hidden paywalls.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-zinc-950 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all hover:scale-105"
          >
            <span>Start Building for Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-radial-at-c from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            Your next opportunity deserves a better resume.
          </h2>
          <p className="text-base text-zinc-400 max-w-xl mx-auto">
            Join discerning job seekers, engineers, and executives presenting their career with bespoke digital craftsmanship.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-zinc-950 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:scale-105"
            >
              <span>Create Your Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
