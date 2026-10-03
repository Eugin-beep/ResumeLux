import React from 'react';
import { ResumeTemplateProps } from './types';

export function TemplateLuxury({ resume }: ResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resume;

  return (
    <div className="resume-document bg-[#FAF9F6] text-zinc-900 font-sans p-8 sm:p-12 text-sm max-w-[210mm] mx-auto min-h-[297mm] shadow-xl border border-[#D4AF37]/30">
      {/* Editorial Header */}
      <header className="text-center pb-6 mb-6 border-b border-[#D4AF37]/40">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[#997D20] font-semibold mb-1">
          Curriculum Vitae
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-zinc-900 mb-2">
          {personal.fullName || 'Your Full Name'}
        </h1>
        {personal.title && (
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#997D20] font-medium">
            {personal.title}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-zinc-600 mt-4 pt-3 border-t border-[#D4AF37]/20">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
          {personal.website && <span>• {personal.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6 text-center max-w-2xl mx-auto">
          <p className="font-serif italic text-xs sm:text-sm text-zinc-700 leading-relaxed">
            "{summary}"
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#997D20]">
              Professional Experience
            </h2>
            <div className="flex-1 h-[1px] bg-[#D4AF37]/30"></div>
          </div>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-serif font-bold text-zinc-900 text-xs sm:text-[13px]">
                    {exp.jobTitle}
                  </span>
                  <span className="text-[11px] text-[#997D20] font-medium tracking-wide">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs text-zinc-600 italic mb-1">
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                {exp.description && (
                  <div className="text-xs text-zinc-700 space-y-1 whitespace-pre-line pl-2 border-l border-[#D4AF37]/30">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#997D20]">
              Academic Background
            </h2>
            <div className="flex-1 h-[1px] bg-[#D4AF37]/30"></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="font-serif font-bold text-zinc-900 text-xs">{edu.degree}</div>
                <div className="text-xs text-zinc-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</div>
                <div className="flex justify-between text-[11px] text-zinc-500 mt-0.5">
                  <span>{edu.startDate} – {edu.endDate}</span>
                  {edu.score && <span className="text-[#997D20] font-medium">{edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#997D20]">
              Expertise &amp; Proficiencies
            </h2>
            <div className="flex-1 h-[1px] bg-[#D4AF37]/30"></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            {skills.map((cat) => (
              <div key={cat.id} className="border-b border-[#D4AF37]/20 pb-1.5">
                <span className="font-serif font-bold text-zinc-900">{cat.category}: </span>
                <span className="text-zinc-700">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#997D20]">
              Distinguished Works
            </h2>
            <div className="flex-1 h-[1px] bg-[#D4AF37]/30"></div>
          </div>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline font-serif font-bold text-zinc-900">
                  <span>{proj.title}</span>
                  {proj.url && <span className="text-[11px] text-[#997D20] font-sans font-normal underline">{proj.url}</span>}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="text-[11px] text-zinc-500 italic">
                    Focus: {proj.technologies.join(', ')}
                  </div>
                )}
                {proj.description && <p className="text-zinc-700 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications, Achievements & Languages */}
      {((certifications && certifications.length > 0) || (achievements && achievements.length > 0) || (languages && languages.length > 0)) && (
        <section className="grid sm:grid-cols-3 gap-4 pt-3 border-t border-[#D4AF37]/30 text-xs">
          {certifications && certifications.length > 0 && (
            <div>
              <h3 className="font-serif font-bold uppercase text-[11px] text-[#997D20] mb-1">
                Accreditations
              </h3>
              <div className="space-y-1 text-zinc-700">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <div className="font-medium text-zinc-900">{c.name}</div>
                    <div className="text-[10px] text-zinc-500">{c.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {achievements && achievements.length > 0 && (
            <div>
              <h3 className="font-serif font-bold uppercase text-[11px] text-[#997D20] mb-1">
                Honors
              </h3>
              <div className="space-y-1 text-zinc-700">
                {achievements.map((a) => (
                  <div key={a.id}>
                    <div className="font-medium text-zinc-900">{a.title}</div>
                    <div className="text-[10px] text-zinc-500">{a.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h3 className="font-serif font-bold uppercase text-[11px] text-[#997D20] mb-1">
                Languages
              </h3>
              <div className="space-y-1 text-zinc-700">
                {languages.map((l) => (
                  <div key={l.id}>
                    <span className="font-medium text-zinc-900">{l.language}</span>: {l.proficiency}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map((sec) => (
        <section key={sec.id} className="mt-5">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#997D20]">
              {sec.title}
            </h2>
            <div className="flex-1 h-[1px] bg-[#D4AF37]/30"></div>
          </div>
          <div className="space-y-2 text-xs text-zinc-700">
            {sec.items.map((item) => (
              <div key={item.id}>
                <div className="font-serif font-bold text-zinc-900 flex justify-between">
                  <span>{item.title}</span>
                  {item.date && <span className="font-sans font-normal text-zinc-500">{item.date}</span>}
                </div>
                {item.subtitle && <div className="italic text-zinc-600">{item.subtitle}</div>}
                {item.description && <p className="mt-0.5">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
