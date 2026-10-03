'use client';

import React, { useState } from 'react';
import { TEMPLATES } from '@/components/resume-templates/registry';
import { TemplateMetadata } from '@/types/template';
import { X, Check, Sparkles, Search } from 'lucide-react';

interface TemplateSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateSwitcherModal({
  isOpen,
  onClose,
  currentTemplateId,
  onSelectTemplate
}: TemplateSwitcherModalProps) {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#0e0e0e]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-white">Switch Resume Template</h3>
              <p className="text-[11px] text-zinc-400">All your resume data is preserved 100% across all templates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/5 bg-[#141414]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates (e.g. ATS, Executive, Modern, Developer)..."
              className="w-full bg-[#181818] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Template List Grid */}
        <div className="p-5 overflow-y-auto grid sm:grid-cols-2 gap-3.5 flex-1">
          {filtered.map((t) => {
            const isCurrent = t.id === currentTemplateId;
            return (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTemplate(t.id);
                  onClose();
                }}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#181818] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                    : 'bg-[#151515] border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-white">{t.name}</span>
                    {isCurrent ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-zinc-950 font-bold text-[10px] flex items-center gap-1">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#D4AF37] uppercase font-semibold">{t.category}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
                  <span>Level: {t.level}</span>
                  <span className="text-zinc-400 font-mono">100% Data Preserved</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
