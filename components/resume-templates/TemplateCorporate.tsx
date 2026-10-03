import React from 'react';
import { ResumeTemplateProps } from './types';

export function TemplateCorporate({ resume }: ResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resume;

  return (
    <div className="resume-document bg-white text-slate-800 font-sans p-8 sm:p-10 text-sm max-w-[210mm] mx-auto min-h-[297mm] shadow-lg">
      {/* Corporate Header */}
      <header className="border-b-2 border-slate-700 pb-5 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 uppercase">
              {personal.fullName || 'Full Name'}
            </h1>
            <p className="text-sm font-semibold text-slate-600 tracking-wide mt-1">
              {personal.title || 'Corporate Professional'}
            </p>
          </div>
          <div className="text-xs text-slate-600 sm:text-right space-y-0.5">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedin && <div className="text-blue-700">{personal.linkedin}</div>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 mb-2 border-l-4 border-slate-700">
            Executive Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed px-2">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 mb-3 border-l-4 border-slate-700">
            Professional Experience
          </h2>
          <div className="space-y-4 px-2">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    {exp.jobTitle}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium mb-1">
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                {exp.description && (
                  <div className="text-xs text-slate-700 space-y-1 whitespace-pre-line">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 mb-2.5 border-l-4 border-slate-700">
            Education
          </h2>
          <div className="space-y-2.5 px-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start flex-wrap gap-2 text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <div className="text-slate-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</div>
                </div>
                <div className="text-right text-slate-500">
                  <div>{edu.startDate} – {edu.endDate}</div>
                  {edu.score && <div className="font-semibold text-slate-700">{edu.score}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 mb-2 border-l-4 border-slate-700">
            Areas of Expertise
          </h2>
          <div className="grid sm:grid-cols-2 gap-2 px-2 text-xs text-slate-700">
            {skills.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold text-slate-900">{cat.category}: </span>
                <span>{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 mb-2 border-l-4 border-slate-700">
            Key Projects
          </h2>
          <div className="space-y-2.5 px-2 text-xs">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{proj.title}</span>
                  {proj.url && <span className="font-normal text-slate-500 underline">{proj.url}</span>}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="text-[11px] text-slate-500 italic">Skills: {proj.technologies.join(', ')}</div>
                )}
                {proj.description && <p className="text-slate-700 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages */}
      {((certifications && certifications.length > 0) || (languages && languages.length > 0) || (achievements && achievements.length > 0)) && (
        <section className="grid sm:grid-cols-3 gap-4 pt-3 border-t border-slate-200 text-xs px-2">
          {certifications && certifications.length > 0 && (
            <div>
              <h3 className="font-bold uppercase text-[11px] text-slate-900 mb-1">Certifications</h3>
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
              <h3 className="font-bold uppercase text-[11px] text-slate-900 mb-1">Achievements</h3>
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
              <h3 className="font-bold uppercase text-[11px] text-slate-900 mb-1">Languages</h3>
              <div className="space-y-0.5 text-slate-700">
                {languages.map((l) => (
                  <div key={l.id}>
                    <span className="font-medium text-slate-900">{l.language}</span>: {l.proficiency}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map((sec) => (
        <section key={sec.id} className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 mb-2 border-l-4 border-slate-700">
            {sec.title}
          </h2>
          <div className="space-y-2 px-2 text-xs text-slate-700">
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
  );
}
