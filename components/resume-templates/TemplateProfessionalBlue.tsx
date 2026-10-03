import React from 'react';
import { ResumeTemplateProps } from './types';

export function TemplateProfessionalBlue({ resume }: ResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resume;

  return (
    <div className="resume-document bg-white text-slate-800 font-sans max-w-[210mm] mx-auto min-h-[297mm] shadow-lg text-xs">
      {/* Top Sapphire Accent Bar */}
      <div className="h-3 bg-blue-900 w-full"></div>

      <div className="p-8 sm:p-10 space-y-5">
        {/* Header */}
        <header className="border-b border-slate-200 pb-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-950 uppercase">
                {personal.fullName || 'Consultant Name'}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-blue-800 mt-1 tracking-wide">
                {personal.title || 'Senior Management Consultant'}
              </p>
            </div>
            <div className="text-slate-600 text-[11px] sm:text-right space-y-0.5">
              {personal.email && <div>{personal.email}</div>}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.location && <div>{personal.location}</div>}
              {personal.linkedin && <div className="text-blue-700">{personal.linkedin}</div>}
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-950 border-b-2 border-blue-900 pb-1 mb-2">
              Executive Summary
            </h2>
            <p className="text-slate-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Key Expertise / Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-950 border-b-2 border-blue-900 pb-1 mb-2.5">
              Core Competencies
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {skills.map((cat) => (
                <div key={cat.id} className="bg-slate-50 p-2 rounded border-l-2 border-blue-800">
                  <span className="font-bold text-blue-950">{cat.category}: </span>
                  <span className="text-slate-700">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {experience && experience.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-950 border-b-2 border-blue-900 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                      {exp.jobTitle}
                    </span>
                    <span className="text-[11px] font-semibold text-blue-800">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium mb-1">
                    {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <div className="text-slate-700 whitespace-pre-line pl-1 space-y-1">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Academic Background */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-950 border-b-2 border-blue-900 pb-1 mb-2.5">
              Education
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.institution}</div>
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>{edu.startDate} – {edu.endDate}</span>
                    {edu.score && <span className="font-semibold text-blue-900">{edu.score}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects / Engagements */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-950 border-b-2 border-blue-900 pb-1 mb-2">
              Key Consulting Engagements &amp; Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 border-slate-300 pl-3">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <span>{proj.title}</span>
                    {proj.url && <span className="text-[10px] text-blue-700 font-normal underline">{proj.url}</span>}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="text-[10px] text-slate-500 italic">Scope: {proj.technologies.join(', ')}</div>
                  )}
                  {proj.description && <p className="text-slate-700 mt-0.5">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages */}
        {((certifications && certifications.length > 0) || (languages && languages.length > 0) || (achievements && achievements.length > 0)) && (
          <section className="grid sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200">
            {certifications && certifications.length > 0 && (
              <div>
                <h3 className="font-bold uppercase text-[10px] text-blue-950 mb-1">Certifications</h3>
                <div className="space-y-1 text-slate-700">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <div className="font-medium text-slate-900">{c.name}</div>
                      <div className="text-[10px] text-slate-500">{c.issuer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {achievements && achievements.length > 0 && (
              <div>
                <h3 className="font-bold uppercase text-[10px] text-blue-950 mb-1">Honors &amp; Awards</h3>
                <div className="space-y-1 text-slate-700">
                  {achievements.map((a) => (
                    <div key={a.id}>
                      <div className="font-medium text-slate-900">{a.title}</div>
                      <div className="text-[10px] text-slate-500">{a.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {languages && languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase text-[10px] text-blue-950 mb-1">Languages</h3>
                <div className="space-y-0.5 text-slate-700">
                  {languages.map((l) => (
                    <div key={l.id}>
                      <span className="font-medium">{l.language}</span>: {l.proficiency}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((sec) => (
          <section key={sec.id}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-950 border-b-2 border-blue-900 pb-1 mb-2">
              {sec.title}
            </h2>
            <div className="space-y-2 text-slate-700">
              {sec.items.map((item) => (
                <div key={item.id}>
                  <div className="font-bold text-slate-900 flex justify-between">
                    <span>{item.title}</span>
                    {item.date && <span className="font-normal text-slate-500">{item.date}</span>}
                  </div>
                  {item.subtitle && <div className="italic text-slate-600">{item.subtitle}</div>}
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
