import React from 'react';
import { ResumeTemplateProps } from './types';

export function TemplateTech({ resume }: ResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resume;

  return (
    <div className="resume-document bg-white text-zinc-900 font-sans p-8 sm:p-10 text-xs max-w-[210mm] mx-auto min-h-[297mm] shadow-lg">
      {/* Modern Tech Header */}
      <header className="border-b-2 border-zinc-900 pb-5 mb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-block px-2 py-0.5 rounded bg-zinc-900 text-white font-mono text-[10px] uppercase font-bold tracking-widest mb-1.5">
            Production Build // 2026
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 uppercase font-mono">
            {personal.fullName || 'Engineering Lead'}
          </h1>
          <p className="text-zinc-600 font-semibold text-xs mt-0.5">
            {personal.title || 'Systems Engineer & Architect'}
          </p>
        </div>

        <div className="flex flex-col gap-1 text-[11px] font-mono text-zinc-600 md:text-right">
          {personal.email && <div><span className="text-zinc-400">email &rarr; </span>{personal.email}</div>}
          {personal.phone && <div><span className="text-zinc-400">phone &rarr; </span>{personal.phone}</div>}
          {personal.location && <div><span className="text-zinc-400">loc &rarr; </span>{personal.location}</div>}
          {personal.github && <div className="text-emerald-700 font-bold"><span className="text-zinc-400">git &rarr; </span>{personal.github}</div>}
          {personal.linkedin && <div className="text-blue-700"><span className="text-zinc-400">in &rarr; </span>{personal.linkedin}</div>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5 bg-zinc-50 border border-zinc-200 p-3 rounded">
          <span className="font-mono text-[10px] text-zinc-400 uppercase font-bold block mb-1">
            Summary.md
          </span>
          <p className="text-zinc-700 leading-relaxed font-sans">{summary}</p>
        </section>
      )}

      {/* Technical Stack Tags Grid */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            // Core Architecture &amp; Technology Stack
          </h2>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {skills.map((cat) => (
              <div key={cat.id} className="p-2 rounded bg-zinc-50 border border-zinc-200">
                <div className="font-mono text-[10px] font-bold text-zinc-600 uppercase mb-1">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-white border border-zinc-300 text-zinc-800 text-[10px] font-mono font-medium shadow-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-3">
            // Deployment History &amp; Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-3 border-l-2 border-zinc-900">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-bold text-zinc-950 text-xs sm:text-[13px]">
                    {exp.jobTitle}
                  </span>
                  <span className="text-[10px] font-mono bg-zinc-900 text-white px-2 py-0.5 rounded">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-800 mb-1">
                  {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                </div>
                {exp.description && (
                  <div className="text-zinc-700 whitespace-pre-line space-y-1">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5">
            // Systems &amp; High-Impact Projects
          </h2>
          <div className="grid gap-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="p-2.5 rounded bg-zinc-50 border border-zinc-200">
                <div className="flex justify-between items-baseline font-bold text-zinc-900">
                  <span className="font-mono text-xs">{proj.title}</span>
                  {proj.url && (
                    <span className="text-[10px] font-mono text-blue-700 font-normal underline">{proj.url}</span>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                    stack: {proj.technologies.join(' / ')}
                  </div>
                )}
                {proj.description && <p className="text-zinc-700 mt-1">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certs */}
      {((education && education.length > 0) || (certifications && certifications.length > 0)) && (
        <section className="grid sm:grid-cols-2 gap-4 mb-4">
          {education && education.length > 0 && (
            <div>
              <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                // Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-zinc-900">{edu.degree}</div>
                    <div className="text-zinc-600">{edu.institution}</div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                      <span>{edu.startDate} – {edu.endDate}</span>
                      {edu.score && <span className="text-emerald-700 font-bold">{edu.score}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                // Cloud &amp; Security Certifications
              </h2>
              <div className="space-y-1.5">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <div className="font-medium text-zinc-900">{c.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">{c.issuer} ({c.date})</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Achievements & Languages */}
      {((achievements && achievements.length > 0) || (languages && languages.length > 0)) && (
        <section className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200">
          {achievements && achievements.length > 0 && (
            <div>
              <h3 className="font-mono font-bold uppercase text-[10px] text-zinc-600 mb-1">Honors &amp; Patents</h3>
              <div className="space-y-1 text-zinc-700">
                {achievements.map((a) => (
                  <div key={a.id}>
                    <span className="font-medium text-zinc-900">{a.title}</span>
                    <span className="text-[10px] text-zinc-500 block">{a.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h3 className="font-mono font-bold uppercase text-[10px] text-zinc-600 mb-1">Languages</h3>
              <div className="flex flex-wrap gap-2 text-zinc-700 font-mono">
                {languages.map((l) => (
                  <span key={l.id} className="bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                    {l.language}: {l.proficiency}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map((sec) => (
        <section key={sec.id} className="mt-4">
          <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            // {sec.title}
          </h2>
          <div className="space-y-2 text-zinc-700">
            {sec.items.map((item) => (
              <div key={item.id}>
                <div className="font-bold text-zinc-900 flex justify-between">
                  <span>{item.title}</span>
                  {item.date && <span className="font-mono text-zinc-500 font-normal">{item.date}</span>}
                </div>
                {item.subtitle && <div className="italic text-zinc-600 font-mono text-[10px]">{item.subtitle}</div>}
                {item.description && <p className="mt-0.5">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
