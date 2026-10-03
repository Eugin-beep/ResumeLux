'use client';

import React, { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { PersonalSection } from './sections/PersonalSection';
import { SummarySection } from './sections/SummarySection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { LanguagesSection } from './sections/LanguagesSection';
import { CustomSection } from './sections/CustomSection';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Trophy,
  Globe,
  Bookmark
} from 'lucide-react';

interface EditorPanelProps {
  resumeData: ResumeData;
  onChange: (data: ResumeData) => void;
}

type TabType =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'achievements'
  | 'languages'
  | 'custom';

export function EditorPanel({ resumeData, onChange }: EditorPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certs', icon: Award },
    { id: 'achievements', label: 'Honors', icon: Trophy },
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'custom', label: 'Custom', icon: Bookmark }
  ];

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] text-white">
      {/* Editor Tab Navigation Ribbon */}
      <div className="flex items-center gap-1 overflow-x-auto p-3 border-b border-white/5 bg-[#111111] no-scrollbar shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#D4AF37] text-zinc-950 shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Scrollable Body */}
      <div className="p-4 sm:p-6 overflow-y-auto flex-1">
        {activeTab === 'personal' && (
          <PersonalSection
            data={resumeData.personal}
            onChange={(personal) => onChange({ ...resumeData, personal })}
          />
        )}

        {activeTab === 'summary' && (
          <SummarySection
            summary={resumeData.summary}
            onChange={(summary) => onChange({ ...resumeData, summary })}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceSection
            entries={resumeData.experience}
            onChange={(experience) => onChange({ ...resumeData, experience })}
          />
        )}

        {activeTab === 'education' && (
          <EducationSection
            entries={resumeData.education}
            onChange={(education) => onChange({ ...resumeData, education })}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsSection
            categories={resumeData.skills}
            onChange={(skills) => onChange({ ...resumeData, skills })}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsSection
            entries={resumeData.projects}
            onChange={(projects) => onChange({ ...resumeData, projects })}
          />
        )}

        {activeTab === 'certifications' && (
          <CertificationsSection
            entries={resumeData.certifications}
            onChange={(certifications) => onChange({ ...resumeData, certifications })}
          />
        )}

        {activeTab === 'achievements' && (
          <AchievementsSection
            entries={resumeData.achievements}
            onChange={(achievements) => onChange({ ...resumeData, achievements })}
          />
        )}

        {activeTab === 'languages' && (
          <LanguagesSection
            entries={resumeData.languages}
            onChange={(languages) => onChange({ ...resumeData, languages })}
          />
        )}

        {activeTab === 'custom' && (
          <CustomSection
            sections={resumeData.customSections}
            onChange={(customSections) => onChange({ ...resumeData, customSections })}
          />
        )}
      </div>
    </div>
  );
}
