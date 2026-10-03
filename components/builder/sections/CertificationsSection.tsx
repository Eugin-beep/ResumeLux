'use client';

import React from 'react';
import { CertificationEntry } from '@/types/resume';
import { Plus, Trash2, Award } from 'lucide-react';

interface CertificationsSectionProps {
  entries: CertificationEntry[];
  onChange: (entries: CertificationEntry[]) => void;
}

export function CertificationsSection({ entries, onChange }: CertificationsSectionProps) {
  const addEntry = () => {
    const newCert: CertificationEntry = {
      id: 'cert_' + Math.random().toString(36).substring(2, 9),
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      credentialUrl: ''
    };
    onChange([...entries, newCert]);
  };

  const updateEntry = (id: string, field: keyof CertificationEntry, value: any) => {
    onChange(
      entries.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeEntry = (id: string) => {
    onChange(entries.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Certifications &amp; Accreditations ({entries.length})
        </label>
        <button
          type="button"
          onClick={addEntry}
          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certificate</span>
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-white/10 text-center text-xs text-zinc-500 bg-[#121212]">
          No certifications listed yet. Click &quot;Add Certificate&quot; to showcase your accreditations.
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white">
                    {cert.name || 'New Certification'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeEntry(cert.id)}
                  className="p-1 text-zinc-500 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Certificate Name *</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateEntry(cert.id, 'name', e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect - Professional"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Issuing Organization *</label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateEntry(cert.id, 'issuer', e.target.value)}
                    placeholder="e.g. Amazon Web Services, CNCF, Google"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => updateEntry(cert.id, 'date', e.target.value)}
                    placeholder="e.g. 2023 or Nov 2023"
                    className="w-full bg-[#181818] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Credential ID (Optional)</label>
                  <input
                    type="text"
                    value={cert.credentialId || ''}
                    onChange={(e) => updateEntry(cert.id, 'credentialId', e.target.value)}
                    placeholder="e.g. AWS-SAP-892401"
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
