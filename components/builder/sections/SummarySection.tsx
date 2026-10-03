'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

interface SummarySectionProps {
  summary: string;
  onChange: (summary: string) => void;
}

export function SummarySection({ summary, onChange }: SummarySectionProps) {
  const charCount = summary ? summary.length : 0;
  const wordCount = summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Professional Executive Summary
        </label>
        <span className="text-[11px] text-zinc-500 font-mono">
          {charCount} chars • {wordCount} words
        </span>
      </div>

      <div className="p-3 rounded-xl bg-[#141414] border border-[#D4AF37]/20 flex items-start gap-2.5 text-xs text-zinc-300">
        <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Luxury Tip:</strong> Write 2–4 concise sentences describing your professional background, signature strengths, and overarching career impact. Avoid filler words and emphasize quantified value.
        </p>
      </div>

      <textarea
        rows={6}
        value={summary || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Distinguished Software Architect with 10+ years of expertise in designing hyper-scalable distributed cloud systems, modern web platforms, and mission-critical microservices..."
        className="w-full bg-[#161616] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] leading-relaxed resize-y"
      />
    </div>
  );
}
