'use client';

import React from 'react';
import { ProjectEntry } from '@/types/resume';
import { Plus, Trash2, FolderGit2 } from 'lucide-react';

interface ProjectsSectionProps {
  entries: ProjectEntry[];
  onChange: (entries: ProjectEntry[]) => void;
}

export function ProjectsSection({ entries, onChange }: ProjectsSectionProps) {
  const addProject = () => {
    const newProj: ProjectEntry = {
      id: 'proj_' + Math.random().toString(36).substring(2, 9),
      title: '',
      description: '',
      technologies: [],
      url: '',
      github: ''
    };
    onChange([...entries, newProj]);
  };

  const updateProject = (id: string, field: keyof ProjectEntry, value: any) => {
    onChange(
      entries.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const removeProject = (id: string) => {
    onChange(entries.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Projects &amp; Open Source ({entries.length})
        </label>
        <button
          type="button"
          onClick={addProject}
          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center text-xs text-zinc-500 bg-[#121212]">
          No projects added yet. Click &quot;Add Project&quot; to showcase your works.
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white">
                    {proj.title || 'Untitled Project'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeProject(proj.id)}
                  className="p-1 text-zinc-500 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-zinc-400 mb-1">Project Name *</label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                    placeholder="e.g. KubeStream — Distributed Messaging Broker"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Live URL (Optional)</label>
                  <input
                    type="text"
                    value={proj.url || ''}
                    onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                    placeholder="https://kubestream.dev"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Repository / GitHub URL</label>
                  <input
                    type="text"
                    value={proj.github || ''}
                    onChange={(e) => updateProject(proj.id, 'github', e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-zinc-400 mb-1">
                    Technologies Used (comma separated)
                  </label>
                  <input
                    type="text"
                    value={proj.technologies ? proj.technologies.join(', ') : ''}
                    onChange={(e) =>
                      updateProject(
                        proj.id,
                        'technologies',
                        e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    placeholder="e.g. Go, Rust, Raft Consensus, Docker"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-zinc-400 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    placeholder="Brief description of the problem solved, architecture choices, and impact metrics..."
                    className="w-full bg-[#181818] border border-white/10 rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] resize-y"
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
