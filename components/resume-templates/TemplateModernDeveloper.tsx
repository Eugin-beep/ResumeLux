import React from 'react';
import { ResumeTemplateProps } from './types';

export function TemplateModernDeveloper({ resume }: ResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resume;

  return (
    <div className="resume-document bg-white text-zinc-800 font-sans max-w-[210mm] mx-auto min-h-[297mm] shadow-lg flex flex-col md:flex-row text-xs">
      {/* Left Developer Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 text-zinc-300 p-6 flex flex-col gap-6 shrink-0 border-r border-zinc-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white font-mono">
            {personal.fullName || 'Developer Name'}
          </h1>
          <p className="text-emerald-400 font-mono text-[11px] mt-1 font-semibold">
            &gt; {personal.title || 'Full Stack Engineer'}
          </p>
        </div>

        {/* Contact Links */}
        <div className="space-y-2 text-[11px] font-mono border-t border-zinc-800 pt-4 text-zinc-400">
          {personal.email && (
            <div className="break-all">
              <span className="text-zinc-500">email:</span> {personal.email}
            </div>
          )}
          {personal.phone && (
            <div>
              <span className="text-zinc-500">tel:</span> {personal.phone}
            </div>
          )}
          {personal.location && (
            <div>
              <span className="text-zinc-500">loc:</span> {personal.location}
            </div>
          )}
          {personal.github && (
            <div className="break-all text-emerald-400">
              <span className="text-zinc-500">gh:</span> {personal.github}
            </div>
          )}
          {personal.linkedin && (
            <div className="break-all text-cyan-400">
              <span className="text-zinc-500">in:</span> {personal.linkedin}
            </div>
          )}
          {personal.website && (
            <div className="break-all text-amber-300">
              <span className="text-zinc-500">web:</span> {personal.website}
            </div>
          )}
        </div>

        {/* Skills Stack Matrix */}
        {skills && skills.length > 0 && (
          <div className="border-t border-zinc-800 pt-4 space-y-4">
            <h2 className="text-[11px] uppercase tracking-wider font-mono font-bold text-zinc-100 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Tech Stack
            </h2>
            {skills.map((cat) => (
              <div key={cat.id} className="space-y-1.5">
                <div className="text-[10px] font-mono text-zinc-400 font-semibold uppercase">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 text-[10px] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education in sidebar */}
        {education && education.length > 0 && (
          <div className="border-t border-zinc-800 pt-4 space-y-3">
            <h2 className="text-[11px] uppercase tracking-wider font-mono font-bold text-zinc-100 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="text-[11px]">
                <div className="font-semibold text-zinc-200">{edu.degree}</div>
                <div className="text-zinc-400">{edu.institution}</div>
                <div className="text-zinc-500 text-[10px]">{edu.startDate} – {edu.endDate}</div>
                {edu.score && <div className="text-emerald-400 text-[10px]">{edu.score}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Languages in sidebar */}
        {languages && languages.length > 0 && (
          <div className="border-t border-zinc-800 pt-4 space-y-2">
            <h2 className="text-[11px] uppercase tracking-wider font-mono font-bold text-zinc-100">
              Languages
            </h2>
            <div className="space-y-1 text-[11px] text-zinc-300">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span>{l.language}</span>
                  <span className="text-zinc-500">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 space-y-5">
        {/* Summary */}
        {summary && (
          <section className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-200">
            <div className="font-mono text-[11px] text-zinc-500 mb-1 font-semibold">
              // Professional Overview
            </div>
            <p className="text-xs text-zinc-700 leading-relaxed font-sans">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 flex items-center justify-between">
              <span>Experience &amp; Contributions</span>
              <span className="text-[10px] text-zinc-400 lowercase font-normal">git log --career</span>
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <span className="font-bold text-zinc-900 text-xs sm:text-[13px]">
                      {exp.jobTitle}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-emerald-700">
                    {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div className="text-xs text-zinc-600 whitespace-pre-line pl-1 space-y-1">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 flex items-center justify-between">
              <span>Open Source &amp; Architecture Projects</span>
              <span className="text-[10px] text-zinc-400 lowercase font-normal">git status</span>
            </h2>
            <div className="grid gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-lg border border-zinc-200 bg-white">
                  <div className="flex justify-between items-baseline flex-wrap gap-1 mb-1">
                    <span className="font-bold text-zinc-900 text-xs">{proj.title}</span>
                    <div className="flex gap-2 text-[10px] font-mono">
                      {proj.url && <a href={proj.url} className="text-blue-600 hover:underline">live demo</a>}
                      {proj.github && <a href={proj.github} className="text-zinc-600 hover:underline">source</a>}
                    </div>
                  </div>
                  {proj.description && (
                    <p className="text-xs text-zinc-600 mb-2">{proj.description}</p>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="text-[10px] font-mono bg-zinc-100 text-zinc-700 px-1.5 py-0.2 rounded border border-zinc-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Achievements */}
        {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
          <section className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200">
            {certifications && certifications.length > 0 && (
              <div>
                <h3 className="text-[11px] font-mono font-bold uppercase text-zinc-900 mb-1.5">
                  Certifications
                </h3>
                <div className="space-y-1 text-xs text-zinc-700">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-medium text-zinc-900">{c.name}</span>
                      <span className="text-[10px] text-zinc-500 block">{c.issuer} ({c.date})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {achievements && achievements.length > 0 && (
              <div>
                <h3 className="text-[11px] font-mono font-bold uppercase text-zinc-900 mb-1.5">
                  Honors &amp; Patents
                </h3>
                <div className="space-y-1 text-xs text-zinc-700">
                  {achievements.map((a) => (
                    <div key={a.id}>
                      <span className="font-medium text-zinc-900">{a.title}</span>
                      <span className="text-[10px] text-zinc-500 block">{a.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((sec) => (
          <section key={sec.id} className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
              {sec.title}
            </h2>
            <div className="space-y-2 text-xs text-zinc-700">
              {sec.items.map((item) => (
                <div key={item.id}>
                  <div className="font-bold text-zinc-900 flex justify-between">
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
      </main>
    </div>
  );
}
