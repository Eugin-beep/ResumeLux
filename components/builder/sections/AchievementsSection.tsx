'use client';

import React from 'react';
import { AchievementEntry } from '@/types/resume';
import { Plus, Trash2, Trophy } from 'lucide-react';

interface AchievementsSectionProps {
  entries: AchievementEntry[];
  onChange: (entries: AchievementEntry[]) => void;
}

export function AchievementsSection({ entries, onChange }: AchievementsSectionProps) {
  const addEntry = () => {
    const newAch: AchievementEntry = {
      id: 'ach_' + Math.random().toString(36).substring(2, 9),
      title: '',
      description: '',
      date: ''
    };
    onChange([...entries, newAch]);
  };

  const updateEntry = (id: string, field: keyof AchievementEntry, value: any) => {
    onChange(
      entries.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const removeEntry = (id: string) => {
    onChange(entries.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Achievements &amp; Honors ({entries.length})
        </label>
        <button
          type="button"
          onClick={addEntry}
          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Achievement</span>
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center text-xs text-zinc-500 bg-[#121212]">
          No achievements listed yet. Click &quot;Add Achievement&quot; to highlight awards, patents, and honors.
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((ach) => (
            <div
              key={ach.id}
              className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white">
                    {ach.title || 'New Achievement'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeEntry(ach.id)}
                  className="p-1 text-zinc-500 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-zinc-400 mb-1">Title / Recognition *</label>
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) => updateEntry(ach.id, 'title', e.target.value)}
                    placeholder="e.g. Top 1% Global Engineering Innovation Award"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Year / Date</label>
                  <input
                    type="text"
                    value={ach.date || ''}
                    onChange={(e) => updateEntry(ach.id, 'date', e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] text-zinc-400 mb-1">Description</label>
                  <input
                    type="text"
                    value={ach.description}
                    onChange={(e) => updateEntry(ach.id, 'description', e.target.value)}
                    placeholder="e.g. Recognized for breakthrough architectural work leading to $40M ARR growth."
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
