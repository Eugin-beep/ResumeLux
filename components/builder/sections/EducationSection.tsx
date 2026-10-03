'use client';

import React from 'react';
import { EducationEntry } from '@/types/resume';
import { Plus, Trash2, ArrowUp, ArrowDown, GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  entries: EducationEntry[];
  onChange: (entries: EducationEntry[]) => void;
}

export function EducationSection({ entries, onChange }: EducationSectionProps) {
  const addEntry = () => {
    const newEntry: EducationEntry = {
      id: 'edu_' + Math.random().toString(36).substring(2, 9),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      score: '',
      description: ''
    };
    onChange([...entries, newEntry]);
  };

  const updateEntry = (id: string, field: keyof EducationEntry, value: any) => {
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
          Education &amp; Credentials ({entries.length})
        </label>
        <button
          type="button"
          onClick={addEntry}
          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Degree</span>
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center text-xs text-zinc-500 bg-[#121212]">
          No education records added yet. Click &quot;Add Degree&quot; to begin.
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((edu, index) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white truncate max-w-[200px]">
                    {edu.degree || 'Degree Program'} {edu.institution ? `• ${edu.institution}` : ''}
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
                    onClick={() => removeEntry(edu.id)}
                    title="Delete Degree"
                    className="p-1 text-zinc-500 hover:text-red-400 ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Degree / Qualification *</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEntry(edu.id, 'degree', e.target.value)}
                    placeholder="e.g. Master of Science in Computer Science"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Institution / University *</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEntry(edu.id, 'institution', e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateEntry(edu.id, 'location', e.target.value)}
                    placeholder="e.g. Stanford, CA"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Start Year</label>
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => updateEntry(edu.id, 'startDate', e.target.value)}
                      placeholder="2014"
                      className="w-full bg-[#181818] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">End Year</label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateEntry(edu.id, 'endDate', e.target.value)}
                      placeholder="2016"
                      className="w-full bg-[#181818] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">GPA / Percentage / Honors</label>
                  <input
                    type="text"
                    value={edu.score || ''}
                    onChange={(e) => updateEntry(edu.id, 'score', e.target.value)}
                    placeholder="e.g. GPA 3.94 / 4.0 or Magna Cum Laude"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Notable Focus / Honors</label>
                  <input
                    type="text"
                    value={edu.description || ''}
                    onChange={(e) => updateEntry(edu.id, 'description', e.target.value)}
                    placeholder="e.g. Specialization in Artificial Intelligence"
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
