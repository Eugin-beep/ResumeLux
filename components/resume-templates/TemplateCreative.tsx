import React from 'react';
import { ResumeTemplateProps } from './types';

export function TemplateCreative({ resume }: ResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resume;

  return (
    <div className="resume-document bg-white text-zinc-800 font-sans max-w-[210mm] mx-auto min-h-[297mm] shadow-xl flex flex-col md:flex-row text-xs">
      {/* Creative Sidebar */}
      <aside className="w-full md:w-72 bg-gradient-to-b from-indigo-950 via-zinc-900 to-zinc-950 text-white p-6 sm:p-8 flex flex-col gap-6 shrink-0">
        <div>
          {personal.avatarUrl ? (
            <img
              src={personal.avatarUrl}
              alt={personal.fullName}
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-400 mb-4 shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300 text-2xl font-bold mb-4">
              {(personal.fullName || 'CL').slice(0, 2).toUpperCase()}
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {personal.fullName || 'Creative Lead'}
          </h1>
          <p className="text-indigo-300 font-medium text-xs mt-1">
            {personal.title || 'Product & Brand Designer'}
          </p>
        </div>

        {/* Contact info */}
        <div className="space-y-2 text-[11px] text-zinc-300 border-t border-indigo-900/60 pt-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
            Contact
          </div>
          {personal.email && <div className="break-all">{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.website && <div className="text-indigo-300 break-all">{personal.website}</div>}
          {personal.linkedin && <div className="text-indigo-300 break-all">{personal.linkedin}</div>}
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="border-t border-indigo-900/60 pt-4 space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              Expertise
            </div>
            {skills.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase">
                  {cat.category}
                </span>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-200 text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education in sidebar */}
        {education && education.length > 0 && (
          <div className="border-t border-indigo-900/60 pt-4 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              Education
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="text-[11px]">
                <div className="font-semibold text-white">{edu.degree}</div>
                <div className="text-zinc-400">{edu.institution}</div>
                <div className="text-[10px] text-zinc-500">{edu.startDate} – {edu.endDate}</div>
              </div>
            ))}
          </div>
        )}

        {/* Languages in sidebar */}
        {languages && languages.length > 0 && (
          <div className="border-t border-indigo-900/60 pt-4 space-y-1 text-[11px]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
              Languages
            </div>
            {languages.map((l) => (
              <div key={l.id} className="flex justify-between text-zinc-300">
                <span>{l.language}</span>
                <span className="text-indigo-300 text-[10px]">{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Right Content */}
      <main className="flex-1 p-6 sm:p-8 space-y-6">
        {/* Profile */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-900 border-b-2 border-indigo-100 pb-1 mb-2">
              Vision &amp; Profile
            </h2>
            <p className="text-xs text-zinc-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-900 border-b-2 border-indigo-100 pb-1">
              Career Trajectory
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <span className="font-bold text-zinc-900 text-xs sm:text-[13px]">
                      {exp.jobTitle}
                    </span>
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-zinc-500">
                    {exp.company}{exp.location ? ` | ${exp.location}` : ''}
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

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-900 border-b-2 border-indigo-100 pb-1">
              Selected Showcase &amp; Design Case Studies
            </h2>
            <div className="grid gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-zinc-50 rounded border border-zinc-200">
                  <div className="flex justify-between items-baseline font-bold text-zinc-900 text-xs mb-1">
                    <span>{proj.title}</span>
                    {proj.url && <span className="font-normal text-indigo-600 text-[10px] underline">{proj.url}</span>}
                  </div>
                  {proj.description && <p className="text-zinc-600 text-xs mb-1.5">{proj.description}</p>}
                  {proj.technologies && (
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-white border border-zinc-200 px-1.5 py-0.5 rounded text-zinc-600">
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
                <h3 className="text-xs font-bold uppercase text-indigo-900 mb-1.5">Awards &amp; Certs</h3>
                <div className="space-y-1 text-zinc-700">
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
                <h3 className="text-xs font-bold uppercase text-indigo-900 mb-1.5">Key Recognitions</h3>
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
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((sec) => (
          <section key={sec.id} className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-900 border-b-2 border-indigo-100 pb-1">
              {sec.title}
            </h2>
            <div className="space-y-2 text-zinc-700">
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
