'use client';

import React, { useState } from 'react';
import { Database, AlertTriangle, Copy, Check, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export function SupabaseSetupBanner() {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const configured = isSupabaseConfigured();

  if (configured) return null;

  const copyEnvSnippet = () => {
    const snippet = `NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#131105] border-b border-[#D4AF37]/30 text-xs sm:text-sm text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-amber-300">Supabase Cloud Database Not Connected</span>
            <span className="hidden md:inline text-zinc-400 ml-2">
              Add your credentials to <code className="text-amber-200 bg-amber-950/60 px-1.5 py-0.5 rounded font-mono">.env.local</code> for production persistence.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1c1a10] border border-[#D4AF37]/30 text-amber-300 hover:bg-[#D4AF37]/20 transition-colors"
          >
            <Database className="w-3 h-3" />
            <span>Setup Guide</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto px-4 pb-4 pt-1 border-t border-[#D4AF37]/10 text-xs text-zinc-400 space-y-3">
          <p>
            ResumeLux is pre-configured for Supabase PostgreSQL and Supabase Authentication. Follow these simple steps:
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="p-3 rounded bg-[#0a0a0a] border border-zinc-800">
              <div className="font-semibold text-zinc-200 mb-1">1. Create Supabase Project</div>
              <p className="text-zinc-400 mb-2">Visit supabase.com and create a new project in your free tier organization.</p>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline"
              >
                Open Supabase <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-3 rounded bg-[#0a0a0a] border border-zinc-800">
              <div className="font-semibold text-zinc-200 mb-1">2. Run SQL Migration</div>
              <p className="text-zinc-400 mb-1">Open SQL Editor in Supabase and run the migration in:</p>
              <code className="text-[11px] text-amber-300 block bg-zinc-900 p-1.5 rounded font-mono">
                supabase/migrations/20261002000000_init_resumelux.sql
              </code>
            </div>

            <div className="p-3 rounded bg-[#0a0a0a] border border-zinc-800">
              <div className="font-semibold text-zinc-200 mb-1 flex items-center justify-between">
                <span>3. Add to .env.local</span>
                <button
                  onClick={copyEnvSnippet}
                  className="flex items-center gap-1 text-[#D4AF37] hover:text-amber-200"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-zinc-400 mb-1">Paste your Project URL & Anon Public Key into <code className="text-zinc-300">.env.local</code> and restart the server.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
