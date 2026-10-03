'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { TEMPLATES, getTemplateComponent } from '@/components/resume-templates/registry';
import { TemplateCategory, ExperienceLevel, TemplateMetadata } from '@/types/template';
import { useAuth } from '@/lib/supabase/auth-context';
import { resumeService } from '@/lib/supabase/service';
import { DEMO_RESUME_DATA } from '@/lib/demo-data';
import { Search, Sparkles, Check, ArrowRight, Eye, X, Filter } from 'lucide-react';

export default function TemplatesPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'All'>('All');
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'name'>('featured');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateMetadata | null>(null);
  const [creating, setCreating] = useState(false);

  const categories: (TemplateCategory | 'All')[] = [
    'All',
    'ATS',
    'Technology',
    'Executive',
    'Business',
    'Creative',
    'Academic',
    'Freshers',
    'Students'
  ];

  const levels: (ExperienceLevel | 'All')[] = [
    'All',
    'Beginner',
    'Student',
    'Intermediate',
    'Experienced',
    'Senior',
    'Executive'
  ];

  const handleUseTemplate = async (templateId: string, templateName: string) => {
    if (!user) {
      router.push(`/signup?template=${templateId}`);
      return;
    }

    setCreating(true);
    try {
      const record = await resumeService.createResume(
        user.id,
        `${templateName} Resume`,
        templateId,
        DEMO_RESUME_DATA
      );
      router.push(`/builder/${record.id}`);
    } catch (err) {
      console.error('Error creating resume from template:', err);
    } finally {
      setCreating(false);
    }
  };

  const filtered = TEMPLATES.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' ||
      t.category === selectedCategory ||
      (selectedCategory === 'Freshers' && (t.level === 'Beginner' || t.level === 'Student')) ||
      (selectedCategory === 'Students' && t.level === 'Student');

    const matchesLevel =
      selectedLevel === 'All' || t.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-16 pb-12 border-b border-white/5 bg-[#0a0a0a] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Extensible 100+ Template Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Curated Resume Template Gallery
          </h1>

          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Choose from precision-crafted ATS layouts, high-impact executive designs, and editorial luxury portfolios. Seamlessly switch templates anytime.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#111111] p-4 rounded-2xl border border-white/5">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates by role, keyword, or design (e.g., ATS, Executive, Developer)..."
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Level Filter Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Level:</span>
            </div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as ExperienceLevel | 'All')}
              className="bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF37]"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl} className="bg-[#161616]">
                  {lvl === 'All' ? 'All Experience Levels' : lvl}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'name')}
              className="bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="featured" className="bg-[#161616]">Featured First</option>
              <option value="name" className="bg-[#161616]">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-zinc-950 font-bold'
                  : 'bg-[#141414] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-[#121212] border border-white/5 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/20">
                    {t.category}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Free Studio Access
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#F3E5AB] transition-colors mb-1.5">
                  {t.name}
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                  {t.description}
                </p>

                <div className="p-3 rounded-xl bg-[#161616] border border-white/5 mb-4 text-[11px] text-zinc-400 space-y-1">
                  <div>
                    <span className="text-zinc-500">Best For: </span>
                    <span className="text-zinc-300">{t.bestFor}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Stage: </span>
                    <span className="text-white font-medium">{t.level}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {t.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white/5 text-zinc-400 px-2 py-0.5 rounded border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-[#0e0e0e] border-t border-white/5 flex items-center justify-between gap-2">
                <button
                  onClick={() => setPreviewTemplate(t)}
                  className="py-2 px-3 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleUseTemplate(t.id, t.name)}
                  disabled={creating}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:shadow-lg transition-all"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-950" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-zinc-400">
            <p className="text-sm">No templates matched your current filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSearch('');
              }}
              className="mt-3 text-xs text-[#D4AF37] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Live Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-4xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0e0e0e]">
              <div>
                <h3 className="font-serif font-bold text-base text-white">{previewTemplate.name}</h3>
                <p className="text-xs text-zinc-400">{previewTemplate.category} • {previewTemplate.level}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUseTemplate(previewTemplate.id, previewTemplate.name)}
                  className="px-4 py-1.5 rounded-full bg-[#D4AF37] text-zinc-950 font-bold text-xs uppercase"
                >
                  Use Template
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto bg-zinc-950 flex justify-center">
              <div className="w-[210mm] max-w-full bg-white text-zinc-900 rounded-lg shadow-2xl overflow-hidden">
                {React.createElement(getTemplateComponent(previewTemplate.id), {
                  resume: DEMO_RESUME_DATA
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
