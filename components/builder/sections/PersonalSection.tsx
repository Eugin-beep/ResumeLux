'use client';

import React from 'react';
import { PersonalInfo } from '@/types/resume';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Link2, Code, Plus, Trash2 } from 'lucide-react';

interface PersonalSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalSection({ data, onChange }: PersonalSectionProps) {
  const updateField = (field: keyof PersonalInfo, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const addCustomField = () => {
    const fields = data.customFields || [];
    onChange({
      ...data,
      customFields: [
        ...fields,
        { id: Math.random().toString(), label: 'Custom Link', value: '' }
      ]
    });
  };

  const updateCustomField = (id: string, label: string, value: string) => {
    const fields = data.customFields || [];
    onChange({
      ...data,
      customFields: fields.map((f) => (f.id === id ? { ...f, label, value } : f))
    });
  };

  const removeCustomField = (id: string) => {
    const fields = data.customFields || [];
    onChange({
      ...data,
      customFields: fields.filter((f) => f.id !== id)
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              value={data.fullName || ''}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="e.g. Alexander Vance"
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Professional Title *
          </label>
          <div className="relative">
            <Briefcase className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="e.g. Principal Systems Architect"
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="alex@resumelux.io"
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              value={data.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+1 (555) 789-0123"
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Location / City, Country
          </label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              value={data.location || ''}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Portfolio / Website
          </label>
          <div className="relative">
            <Globe className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              value={data.website || ''}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="alexandervance.dev"
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            LinkedIn Profile
          </label>
          <div className="relative">
            <Link2 className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              value={data.linkedin || ''}
              onChange={(e) => updateField('linkedin', e.target.value)}
              placeholder="linkedin.com/in/alexandervance"
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            GitHub / Repositories
          </label>
          <div className="relative">
            <Code className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              value={data.github || ''}
              onChange={(e) => updateField('github', e.target.value)}
              placeholder="github.com/alexvance"
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
          Profile Photo URL (Optional)
        </label>
        <input
          type="url"
          value={data.avatarUrl || ''}
          onChange={(e) => updateField('avatarUrl', e.target.value)}
          placeholder="https://images.unsplash.com/photo-..."
          className="w-full bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
        />
        <p className="text-[11px] text-zinc-500 mt-1">Rendered on templates with avatar headshots (e.g., Creative layout).</p>
      </div>

      {/* Custom Fields */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Custom Header Fields
          </span>
          <button
            type="button"
            onClick={addCustomField}
            className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
          >
            <Plus className="w-3 h-3" />
            <span>Add Custom Field</span>
          </button>
        </div>

        {data.customFields && data.customFields.length > 0 && (
          <div className="space-y-2">
            {data.customFields.map((cf) => (
              <div key={cf.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={cf.label}
                  onChange={(e) => updateCustomField(cf.id, e.target.value, cf.value)}
                  placeholder="Label (e.g. Portfolio)"
                  className="w-1/3 bg-[#181818] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  value={cf.value}
                  onChange={(e) => updateCustomField(cf.id, cf.label, e.target.value)}
                  placeholder="Value / Link"
                  className="flex-1 bg-[#181818] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => removeCustomField(cf.id)}
                  className="p-1.5 text-zinc-500 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
