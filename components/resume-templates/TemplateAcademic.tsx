import React from 'react';
import { ResumeTemplateProps } from './types';

export function TemplateAcademic({ resume }: ResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resume;

  return (
    <div className="resume-document bg-white text-zinc-900 font-serif p-8 sm:p-12 text-sm leading-relaxed max-w-[210mm] mx-auto min-h-[297mm] shadow-lg">
      {/* Academic Header */}
      <header className="text-center pb-4 mb-6 border-b border-zinc-400">
        <h1 className="text-3xl font-bold tracking-normal uppercase text-zinc-950">
          {personal.fullName || 'Academic Scholar, Ph.D.'}
        </h1>
        {personal.title && (
          <p className="text-sm italic text-zinc-700 mt-1">{personal.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-zinc-600 font-sans mt-3">
          {personal.location && <span>{personal.location}</span>}
          {personal.email && <span>• {personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.website && <span>• {personal.website}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
        </div>
      </header>

      {/* Research Statement / Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            Research Interests &amp; Overview
          </h2>
          <p className="text-xs leading-relaxed text-zinc-800">{summary}</p>
        </section>
      )}

      {/* Education First (Standard in Academia) */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            Academic Appointments &amp; Degrees
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-zinc-950 text-xs sm:text-[13px]">{edu.degree}</span>
                  <span className="text-xs text-zinc-600 font-sans">{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="italic text-xs text-zinc-700">
                  {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                </div>
                {edu.score && <div className="text-xs font-sans text-zinc-600">{edu.score}</div>}
                {edu.description && <p className="text-xs text-zinc-700 mt-0.5">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Academic / Research Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            Research &amp; Teaching Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-zinc-950 text-xs sm:text-[13px]">{exp.jobTitle}</span>
                  <span className="text-xs text-zinc-600 font-sans">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="italic text-xs text-zinc-700 mb-1">
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                {exp.description && (
                  <div className="text-xs text-zinc-800 space-y-1 whitespace-pre-line pl-2 border-l border-zinc-300">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications / Custom Sections */}
      {customSections && customSections.map((sec) => (
        <section key={sec.id} className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            {sec.title}
          </h2>
          <div className="space-y-2.5 text-xs text-zinc-800">
            {sec.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between font-bold text-zinc-950">
                  <span>{item.title}</span>
                  {item.date && <span className="font-sans font-normal text-zinc-500">{item.date}</span>}
                </div>
                {item.subtitle && <div className="italic text-zinc-700">{item.subtitle}</div>}
                {item.description && <p className="mt-0.5">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Grants, Fellowships & Honors */}
      {achievements && achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            Fellowships, Grants &amp; Honors
          </h2>
          <div className="space-y-1.5 text-xs text-zinc-800">
            {achievements.map((a) => (
              <div key={a.id}>
                <span className="font-bold">{a.title}</span>
                {a.description && <span className="text-zinc-600 block">{a.description}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Research Methodologies */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            Methodologies, Languages &amp; Technical Tools
          </h2>
          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            {skills.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold">{cat.category}: </span>
                <span className="text-zinc-700">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages & Certifications */}
      {((languages && languages.length > 0) || (certifications && certifications.length > 0)) && (
        <section className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-300 text-xs font-sans">
          {languages && languages.length > 0 && (
            <div>
              <h3 className="font-bold uppercase text-[11px] text-zinc-900 mb-1">Languages</h3>
              <div className="space-y-0.5 text-zinc-700">
                {languages.map((l) => (
                  <div key={l.id}>
                    <span className="font-medium text-zinc-900">{l.language}</span> ({l.proficiency})
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h3 className="font-bold uppercase text-[11px] text-zinc-900 mb-1">Affiliations</h3>
              <div className="space-y-0.5 text-zinc-700">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <span className="font-medium text-zinc-900">{c.name}</span> — {c.issuer}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
