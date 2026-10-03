import React from 'react';
import { ResumeTemplateProps } from './types';

export function TemplateMinimal({ resume }: ResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resume;

  return (
    <div className="resume-document bg-white text-zinc-900 font-sans p-8 sm:p-12 text-sm leading-relaxed max-w-[210mm] mx-auto min-h-[297mm]">
      {/* Header */}
      <header className="border-b-2 border-zinc-900 pb-4 mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 uppercase">
          {personal.fullName || 'Your Full Name'}
        </h1>
        {personal.title && (
          <p className="text-zinc-600 font-medium tracking-wide mt-1 text-sm sm:text-base">
            {personal.title}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-600 mt-3">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
          {personal.website && <span>• {personal.website}</span>}
          {personal.github && <span>• {personal.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-[13px] text-zinc-700 leading-normal">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-bold text-zinc-900 text-xs sm:text-[13px]">
                    {exp.jobTitle}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-zinc-600 italic mb-1.5">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                {exp.description && (
                  <div className="text-xs text-zinc-700 space-y-1 whitespace-pre-line pl-1">
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
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-bold text-zinc-900 text-xs sm:text-[13px]">
                    {edu.degree}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-zinc-600">
                  <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                  {edu.score && <span className="font-medium text-zinc-700">{edu.score}</span>}
                </div>
                {edu.description && (
                  <p className="text-xs text-zinc-600 mt-0.5">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            Skills
          </h2>
          <div className="space-y-1.5 text-xs text-zinc-800">
            {skills.map((cat) => (
              <div key={cat.id} className="flex flex-wrap gap-1">
                <span className="font-semibold text-zinc-900">{cat.category}:</span>
                <span>{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between flex-wrap gap-1">
                  <span className="font-bold text-zinc-900 text-xs sm:text-[13px]">
                    {proj.title}
                  </span>
                  {proj.url && (
                    <span className="text-[11px] text-zinc-500 underline">{proj.url}</span>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="text-[11px] text-zinc-600 italic">
                    Technologies: {proj.technologies.join(', ')}
                  </div>
                )}
                {proj.description && (
                  <p className="text-xs text-zinc-700 mt-1">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements */}
      {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
        <section className="mb-5 grid sm:grid-cols-2 gap-4">
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                Certifications
              </h2>
              <div className="space-y-1.5 text-xs text-zinc-700">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <span className="font-medium text-zinc-900">{c.name}</span>
                    <span className="text-zinc-500 block text-[11px]">{c.issuer} ({c.date})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {achievements && achievements.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                Honors & Achievements
              </h2>
              <div className="space-y-1.5 text-xs text-zinc-700">
                {achievements.map((ach) => (
                  <div key={ach.id}>
                    <span className="font-medium text-zinc-900">{ach.title}</span>
                    <span className="text-zinc-600 block text-[11px]">{ach.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5">
            Languages
          </h2>
          <div className="flex flex-wrap gap-4 text-xs text-zinc-700">
            {languages.map((l) => (
              <span key={l.id}>
                <strong>{l.language}:</strong> {l.proficiency}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map((sec) => (
        <section key={sec.id} className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            {sec.title}
          </h2>
          <div className="space-y-2">
            {sec.items.map((item) => (
              <div key={item.id} className="text-xs text-zinc-700">
                <div className="flex justify-between font-semibold text-zinc-900">
                  <span>{item.title}</span>
                  {item.date && <span className="text-zinc-500 font-normal">{item.date}</span>}
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
