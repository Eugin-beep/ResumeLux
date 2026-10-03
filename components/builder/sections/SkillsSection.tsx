'use client';

import React, { useState } from 'react';
import { SkillCategory } from '@/types/resume';
import { Plus, Trash2, X, Wrench } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
  onChange: (categories: SkillCategory[]) => void;
}

export function SkillsSection({ categories, onChange }: SkillsSectionProps) {
  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});

  const addCategory = () => {
    const newCat: SkillCategory = {
      id: 'cat_' + Math.random().toString(36).substring(2, 9),
      category: 'Specialized Skills',
      skills: []
    };
    onChange([...categories, newCat]);
  };

  const updateCategoryName = (id: string, category: string) => {
    onChange(categories.map((c) => (c.id === id ? { ...c, category } : c)));
  };

  const removeCategory = (id: string) => {
    onChange(categories.filter((c) => c.id !== id));
  };

  const addSkillToCategory = (catId: string) => {
    const val = (newSkillInput[catId] || '').trim();
    if (!val) return;

    onChange(
      categories.map((c) => {
        if (c.id === catId && !c.skills.includes(val)) {
          return { ...c, skills: [...c.skills, val] };
        }
        return c;
      })
    );

    setNewSkillInput({ ...newSkillInput, [catId]: '' });
  };

  const removeSkillFromCategory = (catId: string, skill: string) => {
    onChange(
      categories.map((c) => {
        if (c.id === catId) {
          return { ...c, skills: c.skills.filter((s) => s !== skill) };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Skills &amp; Competencies
        </label>
        <button
          type="button"
          onClick={addCategory}
          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Skill Category</span>
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center text-xs text-zinc-500 bg-[#121212]">
          No skill categories defined. Click &quot;Add Skill Category&quot; to organize technical and soft skills.
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2 flex-1">
                  <Wrench className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                    placeholder="e.g. Technical Skills, Soft Skills, Cloud Platforms"
                    className="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-[#D4AF37] font-bold text-xs text-white focus:outline-none px-1 py-0.5 w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCategory(cat.id)}
                  className="text-zinc-500 hover:text-red-400 p-1"
                  title="Remove Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center">
                {cat.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1e1e1e] border border-white/10 text-zinc-200 text-xs"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkillFromCategory(cat.id, skill)}
                      className="text-zinc-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Skill Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newSkillInput[cat.id] || ''}
                  onChange={(e) =>
                    setNewSkillInput({ ...newSkillInput, [cat.id]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkillToCategory(cat.id);
                    }
                  }}
                  placeholder="Type a skill (e.g. React, Python, AWS) and press Enter"
                  className="flex-1 bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="button"
                  onClick={() => addSkillToCategory(cat.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
