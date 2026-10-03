'use client';

import React from 'react';
import { LanguageEntry } from '@/types/resume';
import { Plus, Trash2, Globe } from 'lucide-react';

interface LanguagesSectionProps {
  entries: LanguageEntry[];
  onChange: (entries: LanguageEntry[]) => void;
}

export function LanguagesSection({ entries, onChange }: LanguagesSectionProps) {
  const addLanguage = () => {
    const newLang: LanguageEntry = {
      id: 'lang_' + Math.random().toString(36).substring(2, 9),
      language: '',
      proficiency: 'Professional'
    };
    onChange([...entries, newLang]);
  };

  const updateEntry = (id: string, field: keyof LanguageEntry, value: any) => {
    onChange(
      entries.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const removeLanguage = (id: string) => {
    onChange(entries.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Languages ({entries.length})
        </label>
        <button
          type="button"
          onClick={addLanguage}
          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Language</span>
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center text-xs text-zinc-500 bg-[#121212]">
          No languages added yet. Click &quot;Add Language&quot; to specify spoken or written proficiencies.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {entries.map((l) => (
            <div
              key={l.id}
              className="p-3 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 flex-1">
                <Globe className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <input
                  type="text"
                  value={l.language}
                  onChange={(e) => updateEntry(l.id, 'language', e.target.value)}
                  placeholder="e.g. English, French, Mandarin"
                  className="bg-[#181818] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] w-full"
                />
              </div>

              <select
                value={l.proficiency}
                onChange={(e) => updateEntry(l.id, 'proficiency', e.target.value)}
                className="bg-[#181818] border border-white/10 rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Professional">Professional</option>
                <option value="Native">Native</option>
              </select>

              <button
                type="button"
                onClick={() => removeLanguage(l.id)}
                className="p-1 text-zinc-500 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
