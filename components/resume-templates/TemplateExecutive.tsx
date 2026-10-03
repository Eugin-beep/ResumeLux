import React from 'react';
import { ResumeTemplateProps } from './types';

export function TemplateExecutive({ resume }: ResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resume;

  return (
    <div className="resume-document bg-white text-zinc-900 font-sans max-w-[210mm] mx-auto min-h-[297mm] shadow-lg">
      {/* Executive Header Banner */}
      <header className="bg-zinc-950 text-white p-8 sm:p-10 border-b-4 border-zinc-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif tracking-wide text-zinc-100 uppercase">
              {personal.fullName || 'Your Full Name'}
            </h1>
            <p className="text-zinc-400 font-medium tracking-widest uppercase text-xs sm:text-sm mt-1.5">
              {personal.title || 'Executive Leadership'}
            </p>
          </div>
          <div className="text-xs text-zinc-400 space-y-0.5 text-left md:text-right">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="p-8 sm:p-10 text-sm leading-relaxed space-y-6">
        {/* Executive Summary */}
        {summary && (
          <section className="bg-zinc-50 border-l-4 border-zinc-900 p-4">
            <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-zinc-900 mb-1.5">
              Executive Profile
            </h2>
            <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed italic">{summary}</p>
          </section>
        )}

        {/* Core Competencies & Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 mb-3">
              Core Competencies & Strategic Capabilities
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              {skills.map((cat) => (
                <div key={cat.id} className="bg-zinc-50 p-2.5 rounded border border-zinc-200">
                  <div className="font-bold text-zinc-900 uppercase text-[11px] mb-1">
                    {cat.category}
                  </div>
                  <div className="text-zinc-700">{cat.skills.join(' • ')}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 mb-4">
              Executive Career History
            </h2>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l border-zinc-300">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-900 border-2 border-white" />
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <span className="font-serif font-bold text-zinc-950 text-sm">
                      {exp.jobTitle}
                    </span>
                    <span className="text-xs text-zinc-600 font-semibold uppercase">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-zinc-700 mb-2">
                    {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div className="text-xs text-zinc-700 space-y-1 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Credentials */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 mb-3">
              Education & Academic Credentials
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-b border-zinc-200 pb-2">
                  <div className="font-serif font-bold text-zinc-900 text-xs">
                    {edu.degree}
                  </div>
                  <div className="text-xs text-zinc-600">
                    {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                    <span>{edu.startDate} – {edu.endDate}</span>
                    {edu.score && <span className="font-medium text-zinc-800">{edu.score}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects / Ventures */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 mb-3">
              Strategic Initiatives & Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-zinc-900">
                    <span>{proj.title}</span>
                    {proj.url && <span className="text-[11px] text-zinc-500 font-normal">{proj.url}</span>}
                  </div>
                  {proj.description && <p className="text-zinc-700 mt-0.5">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages */}
        {((certifications && certifications.length > 0) || (languages && languages.length > 0) || (achievements && achievements.length > 0)) && (
          <div className="grid sm:grid-cols-3 gap-4 pt-2 border-t border-zinc-200 text-xs">
            {certifications && certifications.length > 0 && (
              <div>
                <h3 className="font-serif font-bold text-zinc-900 uppercase text-[11px] mb-1">
                  Certifications
                </h3>
                <div className="space-y-1 text-zinc-700">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-medium">{c.name}</span>
                      <span className="text-zinc-500 text-[10px] block">{c.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {achievements && achievements.length > 0 && (
              <div>
                <h3 className="font-serif font-bold text-zinc-900 uppercase text-[11px] mb-1">
                  Key Honors
                </h3>
                <div className="space-y-1 text-zinc-700">
                  {achievements.map((a) => (
                    <div key={a.id}>
                      <span className="font-medium">{a.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {languages && languages.length > 0 && (
              <div>
                <h3 className="font-serif font-bold text-zinc-900 uppercase text-[11px] mb-1">
                  Languages
                </h3>
                <div className="space-y-0.5 text-zinc-700">
                  {languages.map((l) => (
                    <div key={l.id}>
                      <span className="font-medium">{l.language}</span>: {l.proficiency}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((sec) => (
          <section key={sec.id}>
            <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 mb-2">
              {sec.title}
            </h2>
            <div className="space-y-2 text-xs text-zinc-700">
              {sec.items.map((item) => (
                <div key={item.id}>
                  <div className="font-bold text-zinc-900 flex justify-between">
                    <span>{item.title}</span>
                    {item.date && <span className="font-normal text-zinc-500">{item.date}</span>}
                  </div>
                  {item.subtitle && <div className="italic text-zinc-600">{item.subtitle}</div>}
                  {item.description && <p className="mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
