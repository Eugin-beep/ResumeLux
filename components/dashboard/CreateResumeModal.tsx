'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Briefcase, GraduationCap, Code2, Palette, Building, HeartPulse, LineChart, Globe } from 'lucide-react';
import { TEMPLATES } from '@/components/resume-templates/registry';
import { resumeService } from '@/lib/supabase/service';
import { DEMO_RESUME_DATA, BLANK_RESUME_DATA } from '@/lib/demo-data';
import { ExperienceLevel } from '@/types/template';

interface CreateResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onCreated?: () => void;
}

export function CreateResumeModal({ isOpen, onClose, userId, onCreated }: CreateResumeModalProps) {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel>('Experienced');
  const [selectedCategory, setSelectedCategory] = useState<string>('Technology');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('luxury-gold');
  const [resumeTitle, setResumeTitle] = useState<string>('');
  const [useSampleData, setUseSampleData] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);

  if (!isOpen) return null;

  const levels: { id: ExperienceLevel; label: string; desc: string }[] = [
    { id: 'Beginner', label: 'Beginner / Entry Level', desc: '0–1 years. Highlighting coursework, internships, and core potential.' },
    { id: 'Student', label: 'Student / College', desc: 'Undergraduates & postgrads emphasizing education, projects & research.' },
    { id: 'Intermediate', label: 'Intermediate Professional', desc: '2–5 years. Established professional trajectory and demonstrable impact.' },
    { id: 'Experienced', label: 'Experienced Mid-Level', desc: '5–8 years. Proven milestones, technical mastery, and project leadership.' },
    { id: 'Senior', label: 'Senior Specialist', desc: '8+ years. Advanced architecture, strategic ownership, and mentorship.' },
    { id: 'Executive', label: 'Executive & C-Suite', desc: 'Directors, VPs, and C-level leaders driving organizational vision & P&L.' }
  ];

  const categories = [
    { id: 'Technology', label: 'Technology & Engineering', icon: Code2 },
    { id: 'Business', label: 'Business & Management', icon: Building },
    { id: 'Finance', label: 'Finance & Banking', icon: LineChart },
    { id: 'Design', label: 'Design & Creative', icon: Palette },
    { id: 'Marketing', label: 'Marketing & Sales', icon: Briefcase },
    { id: 'Education', label: 'Education & Academia', icon: GraduationCap },
    { id: 'Healthcare', label: 'Healthcare & Science', icon: HeartPulse },
    { id: 'Other', label: 'General / Cross-functional', icon: Globe }
  ];

  const handleFinish = async () => {
    setCreating(true);
    try {
      const title = resumeTitle.trim() || `${selectedCategory} Resume`;
      const initialData = useSampleData ? DEMO_RESUME_DATA : BLANK_RESUME_DATA;

      const record = await resumeService.createResume(
        userId,
        title,
        selectedTemplateId,
        initialData
      );

      onCreated?.();
      onClose();
      router.push(`/builder/${record.id}`);
    } catch (err) {
      console.error('Failed to create resume:', err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white">Create New Resume</h2>
              <p className="text-xs text-zinc-400">Step {step} of 4 — {
                step === 1 ? 'Career Level' :
                step === 2 ? 'Industry Domain' :
                step === 3 ? 'Choose Template' : 'Start Studio'
              }</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Career Level */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-sm font-semibold text-white">Select Your Career Stage</h3>
                  <p className="text-xs text-zinc-400">We optimize layout recommendations and section weight according to your experience level.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {levels.map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setSelectedLevel(lvl.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedLevel === lvl.id
                          ? 'bg-[#181818] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                          : 'bg-[#151515] border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">{lvl.label}</span>
                        {selectedLevel === lvl.id && (
                          <div className="w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center text-zinc-950">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{lvl.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Choose Category */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-sm font-semibold text-white">Select Your Primary Field</h3>
                  <p className="text-xs text-zinc-400">Customize default section groupings and terminology for your target role.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-[#181818] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                            : 'bg-[#151515] border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-white/5 text-zinc-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-white">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Choose Template */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-sm font-semibold text-white">Choose Your Bespoke Template</h3>
                  <p className="text-xs text-zinc-400">You can freely switch between all 10+ templates at any time without losing edits.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {TEMPLATES.map((t) => {
                    const isSelected = selectedTemplateId === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTemplateId(t.id)}
                        className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#181818] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                            : 'bg-[#151515] border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-xs text-white">{t.name}</span>
                            {isSelected ? (
                              <div className="w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center text-zinc-950">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            ) : (
                              <span className="text-[10px] text-[#D4AF37] uppercase font-semibold">{t.category}</span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                            {t.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
                          <span>{t.level}</span>
                          <span className="text-emerald-400 font-medium">Free</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 4: Final Details & Launch */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-sm font-semibold text-white">Give Your Resume a Title</h3>
                  <p className="text-xs text-zinc-400">This helps you organize multiple resume versions in your studio dashboard.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1.5">
                    Resume Title
                  </label>
                  <input
                    type="text"
                    value={resumeTitle}
                    onChange={(e) => setResumeTitle(e.target.value)}
                    placeholder="e.g. Senior Staff Engineer 2026, FinTech Exec CV"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#161616] border border-white/5 space-y-3">
                  <div className="font-semibold text-xs text-white">Pre-fill Sample Data?</div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useSampleData}
                      onChange={(e) => setUseSampleData(e.target.checked)}
                      className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <div className="text-xs text-zinc-300">
                      <span className="font-medium text-white block">Pre-fill with sample executive data</span>
                      <span className="text-zinc-500 text-[11px]">Recommended. Starts your resume with realistic entries you can quickly replace.</span>
                    </div>
                  </label>
                </div>

                <div className="p-3 rounded-lg bg-[#0e0e0e] border border-white/5 text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>Selected Template: <strong className="text-white">{TEMPLATES.find(t => t.id === selectedTemplateId)?.name}</strong></span>
                  <span>Target Domain: <strong className="text-[#D4AF37]">{selectedCategory}</strong></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-white/5 flex items-center justify-between bg-[#0e0e0e]">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3 | 4)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:shadow-lg transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-950" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={creating}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50"
            >
              <span>{creating ? 'Creating...' : 'Start Building'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-950" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
