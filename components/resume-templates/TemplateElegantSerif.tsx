import React from 'react';
import { ResumeTemplateProps } from './types';

export function TemplateElegantSerif({ resume }: ResumeTemplateProps) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resume;

  return (
    <div className="resume-document bg-[#FCFBF9] text-stone-900 font-serif p-8 sm:p-12 text-sm leading-relaxed max-w-[210mm] mx-auto min-h-[297mm] shadow-xl">
      {/* Editorial Title Header */}
      <header className="text-center pb-6 mb-8 border-b-2 border-stone-800">
        <h1 className="text-3xl sm:text-5xl font-normal tracking-wide text-stone-950 uppercase font-serif">
          {personal.fullName || 'Editorial Director'}
        </h1>
        {personal.title && (
          <p className="text-xs sm:text-sm font-sans tracking-[0.25em] text-stone-600 uppercase mt-2 font-medium">
            {personal.title}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-sans text-stone-500 mt-4 tracking-wide">
          {personal.location && <span>{personal.location}</span>}
          {personal.email && <span>• {personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.website && <span>• {personal.website}</span>}
          {personal.linkedin && <span>• {personal.linkedin}</span>}
        </div>
      </header>

      {/* Narrative Profile */}
      {summary && (
        <section className="mb-7 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
            "{summary}"
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-7">
          <h2 className="text-center text-xs font-sans font-bold uppercase tracking-[0.3em] text-stone-900 border-b border-stone-300 pb-1.5 mb-4">
            Career Chronicle
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <span className="font-bold text-stone-950 text-sm sm:text-base">
                    {exp.jobTitle}
                  </span>
                  <span className="text-xs font-sans text-stone-500 tracking-wider">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs italic text-stone-600 mb-1.5 font-serif">
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                {exp.description && (
                  <div className="text-xs font-sans text-stone-700 whitespace-pre-line leading-relaxed pl-2 border-l border-stone-300">
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
        <section className="mb-7">
          <h2 className="text-center text-xs font-sans font-bold uppercase tracking-[0.3em] text-stone-900 border-b border-stone-300 pb-1.5 mb-3.5">
            Scholastic Pedigree
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="font-bold text-stone-950 text-sm">{edu.degree}</div>
                <div className="italic text-stone-600">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</div>
                <div className="flex justify-between font-sans text-[11px] text-stone-500 mt-1">
                  <span>{edu.startDate} – {edu.endDate}</span>
                  {edu.score && <span className="font-semibold text-stone-800">{edu.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Expertise & Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-7">
          <h2 className="text-center text-xs font-sans font-bold uppercase tracking-[0.3em] text-stone-900 border-b border-stone-300 pb-1.5 mb-3">
            Fields of Competence
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            {skills.map((cat) => (
              <div key={cat.id} className="border-b border-stone-200 pb-1.5">
                <span className="font-bold text-stone-900">{cat.category}: </span>
                <span className="font-sans text-stone-700">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Selected Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-7">
          <h2 className="text-center text-xs font-sans font-bold uppercase tracking-[0.3em] text-stone-900 border-b border-stone-300 pb-1.5 mb-3">
            Curated Works
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-stone-950 text-sm">
                  <span>{proj.title}</span>
                  {proj.url && <span className="font-sans font-normal text-[11px] text-stone-500 underline">{proj.url}</span>}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="font-sans text-[11px] text-stone-500 italic">Discipline: {proj.technologies.join(' • ')}</div>
                )}
                {proj.description && <p className="font-sans text-stone-700 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Honors */}
      {((certifications && certifications.length > 0) || (achievements && achievements.length > 0) || (languages && languages.length > 0)) && (
        <section className="grid sm:grid-cols-3 gap-4 pt-3 border-t border-stone-300 text-xs">
          {certifications && certifications.length > 0 && (
            <div>
              <h3 className="font-sans font-bold uppercase text-[10px] tracking-wider text-stone-900 mb-1">Citations</h3>
              <div className="space-y-1 text-stone-700 font-sans">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <div className="font-medium text-stone-900">{c.name}</div>
                    <div className="text-[10px] text-stone-500">{c.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {achievements && achievements.length > 0 && (
            <div>
              <h3 className="font-sans font-bold uppercase text-[10px] tracking-wider text-stone-900 mb-1">Distinctions</h3>
              <div className="space-y-1 text-stone-700 font-sans">
                {achievements.map((a) => (
                  <div key={a.id}>
                    <div className="font-medium text-stone-900">{a.title}</div>
                    <div className="text-[10px] text-stone-500">{a.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h3 className="font-sans font-bold uppercase text-[10px] tracking-wider text-stone-900 mb-1">Languages</h3>
              <div className="space-y-0.5 text-stone-700 font-sans">
                {languages.map((l) => (
                  <div key={l.id}>
                    <span className="font-medium text-stone-900">{l.language}</span>: {l.proficiency}
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
          <h2 className="text-center text-xs font-sans font-bold uppercase tracking-[0.3em] text-stone-900 border-b border-stone-300 pb-1.5 mb-3">
            {sec.title}
          </h2>
          <div className="space-y-2 text-xs">
            {sec.items.map((item) => (
              <div key={item.id}>
                <div className="font-bold text-stone-950 flex justify-between">
                  <span>{item.title}</span>
                  {item.date && <span className="font-sans font-normal text-stone-500">{item.date}</span>}
                </div>
                {item.subtitle && <div className="italic text-stone-600">{item.subtitle}</div>}
                {item.description && <p className="font-sans text-stone-700 mt-0.5">{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
