'use client';

import React from 'react';
import { CustomSectionEntry, CustomSectionItem } from '@/types/resume';
import { Plus, Trash2, Bookmark } from 'lucide-react';

interface CustomSectionProps {
  sections: CustomSectionEntry[];
  onChange: (sections: CustomSectionEntry[]) => void;
}

export function CustomSection({ sections, onChange }: CustomSectionProps) {
  const addSection = () => {
    const newSec: CustomSectionEntry = {
      id: 'custom_' + Math.random().toString(36).substring(2, 9),
      title: 'Publications & Keynotes',
      items: [
        {
          id: 'item_' + Math.random().toString(36).substring(2, 9),
          title: '',
          subtitle: '',
          date: '',
          description: ''
        }
      ]
    };
    onChange([...sections, newSec]);
  };

  const updateSectionTitle = (id: string, title: string) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, title } : s)));
  };

  const removeSection = (id: string) => {
    onChange(sections.filter((s) => s.id !== id));
  };

  const addItemToSection = (sectionId: string) => {
    const newItem: CustomSectionItem = {
      id: 'item_' + Math.random().toString(36).substring(2, 9),
      title: '',
      subtitle: '',
      date: '',
      description: ''
    };
    onChange(
      sections.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
      )
    );
  };

  const updateSectionItem = (
    sectionId: string,
    itemId: string,
    field: keyof CustomSectionItem,
    value: any
  ) => {
    onChange(
      sections.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            items: s.items.map((it) => (it.id === itemId ? { ...it, [field]: value } : it))
          };
        }
        return s;
      })
    );
  };

  const removeSectionItem = (sectionId: string, itemId: string) => {
    onChange(
      sections.map((s) => {
        if (s.id === sectionId) {
          return { ...s, items: s.items.filter((it) => it.id !== itemId) };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Custom Sections ({sections.length})
        </label>
        <button
          type="button"
          onClick={addSection}
          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Section</span>
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center text-xs text-zinc-500 bg-[#121212]">
          No custom sections added yet. Click &quot;Add Custom Section&quot; to include Publications, Volunteer Work, Patents, or Leadership.
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map((sec) => (
            <div
              key={sec.id}
              className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-4"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-2.5">
                <div className="flex items-center gap-2 flex-1">
                  <Bookmark className="w-4 h-4 text-[#D4AF37]" />
                  <input
                    type="text"
                    value={sec.title}
                    onChange={(e) => updateSectionTitle(sec.id, e.target.value)}
                    placeholder="Section Title (e.g. Publications, Volunteer Work, Patents)"
                    className="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-[#D4AF37] font-bold text-xs text-white focus:outline-none px-1 py-0.5 w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSection(sec.id)}
                  className="p-1 text-zinc-500 hover:text-red-400"
                  title="Remove Section"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Items in custom section */}
              <div className="space-y-3 pl-2 border-l border-white/5">
                {sec.items.map((item) => (
                  <div key={item.id} className="p-3 bg-[#181818] rounded-lg border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-zinc-400">Section Item</span>
                      <button
                        type="button"
                        onClick={() => removeSectionItem(sec.id, item.id)}
                        className="text-zinc-500 hover:text-red-400 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            updateSectionItem(sec.id, item.id, 'title', e.target.value)
                          }
                          placeholder="Title / Role / Honor"
                          className="w-full bg-[#121212] border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={item.date || ''}
                          onChange={(e) =>
                            updateSectionItem(sec.id, item.id, 'date', e.target.value)
                          }
                          placeholder="Date / Year"
                          className="w-full bg-[#121212] border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          value={item.subtitle || ''}
                          onChange={(e) =>
                            updateSectionItem(sec.id, item.id, 'subtitle', e.target.value)
                          }
                          placeholder="Subtitle / Publisher / Organization"
                          className="w-full bg-[#121212] border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <textarea
                          rows={2}
                          value={item.description || ''}
                          onChange={(e) =>
                            updateSectionItem(sec.id, item.id, 'description', e.target.value)
                          }
                          placeholder="Brief details or impact..."
                          className="w-full bg-[#121212] border border-white/10 rounded p-2 text-xs text-white resize-y"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItemToSection(sec.id)}
                  className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-medium pt-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Item to {sec.title}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
