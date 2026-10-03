'use client';

import React from 'react';
import { ExperienceEntry } from '@/types/resume';
import { Plus, Trash2, ArrowUp, ArrowDown, Briefcase } from 'lucide-react';

interface ExperienceSectionProps {
  entries: ExperienceEntry[];
  onChange: (entries: ExperienceEntry[]) => void;
}

export function ExperienceSection({ entries, onChange }: ExperienceSectionProps) {
  const addEntry = () => {
    const newEntry: ExperienceEntry = {
      id: 'exp_' + Math.random().toString(36).substring(2, 9),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange([newEntry, ...entries]);
  };

  const updateEntry = (id: string, field: keyof ExperienceEntry, value: any) => {
    onChange(
      entries.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeEntry = (id: string) => {
    onChange(entries.filter((item) => item.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...entries];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === entries.length - 1) return;
    const next = [...entries];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Work Experience ({entries.length})
        </label>
        <button
          type="button"
          onClick={addEntry}
          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center text-xs text-zinc-500 bg-[#121212]">
          No work experience added yet. Click &quot;Add Position&quot; above to begin.
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((exp, index) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white truncate max-w-[200px]">
                    {exp.jobTitle || 'New Position'} {exp.company ? `@ ${exp.company}` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    title="Move Up"
                    className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === entries.length - 1}
                    title="Move Down"
                    className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeEntry(exp.id)}
                    title="Delete Position"
                    className="p-1 text-zinc-500 hover:text-red-400 ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Job Title *</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => updateEntry(exp.id, 'jobTitle', e.target.value)}
                    placeholder="e.g. Lead Software Architect"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateEntry(exp.id, 'company', e.target.value)}
                    placeholder="e.g. Stripe, Google, Apple"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateEntry(exp.id, 'location', e.target.value)}
                    placeholder="e.g. San Francisco, CA or Remote"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateEntry(exp.id, 'startDate', e.target.value)}
                      placeholder="2021 or Jan 2021"
                      className="w-full bg-[#181818] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? 'Present' : exp.endDate}
                      onChange={(e) => updateEntry(exp.id, 'endDate', e.target.value)}
                      placeholder="2024 or Present"
                      className="w-full bg-[#181818] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id={`current_${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => updateEntry(exp.id, 'current', e.target.checked)}
                  className="rounded border-zinc-700 bg-zinc-800 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <label htmlFor={`current_${exp.id}`} className="text-xs text-zinc-300 cursor-pointer">
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">
                  Key Responsibilities &amp; Measurable Accomplishments
                </label>
                <textarea
                  rows={4}
                  value={exp.description}
                  onChange={(e) => updateEntry(exp.id, 'description', e.target.value)}
                  placeholder="• Spearheaded architectural migration from monolithic legacy stack to event-driven microservices...&#10;• Reduced latency by 42%..."
                  className="w-full bg-[#181818] border border-white/10 rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] resize-y"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
