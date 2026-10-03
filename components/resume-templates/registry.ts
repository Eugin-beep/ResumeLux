import React from 'react';
import { TemplateMetadata } from '@/types/template';
import { ResumeTemplateProps } from './types';

import { TemplateMinimal } from './TemplateMinimal';
import { TemplateExecutive } from './TemplateExecutive';
import { TemplateModernDeveloper } from './TemplateModernDeveloper';
import { TemplateLuxury } from './TemplateLuxury';
import { TemplateCorporate } from './TemplateCorporate';
import { TemplateCreative } from './TemplateCreative';
import { TemplateAcademic } from './TemplateAcademic';
import { TemplateTech } from './TemplateTech';
import { TemplateProfessionalBlue } from './TemplateProfessionalBlue';
import { TemplateElegantSerif } from './TemplateElegantSerif';

export const TEMPLATES: TemplateMetadata[] = [
  {
    id: 'minimal-ats',
    name: 'Minimal ATS',
    description: 'Clean single-column ATS-friendly resume optimized for applicant tracking algorithms with guaranteed text parsing.',
    category: 'ATS',
    level: 'Beginner',
    isFree: true,
    tags: ['ATS-Friendly', 'Single Column', 'Clean', 'Universal'],
    bestFor: 'Entry-level through Senior roles applying via corporate online portals and ATS systems.',
    featured: true
  },
  {
    id: 'executive-black',
    name: 'Executive Black',
    description: 'Authoritative executive design featuring deep charcoal accents, leadership timeline, and refined divider rules.',
    category: 'Executive',
    level: 'Executive',
    isFree: true,
    tags: ['Executive', 'Leadership', 'High Impact', 'C-Suite'],
    bestFor: 'Directors, VPs, Executives, and C-Suite leaders highlighting strategic milestones.',
    featured: true
  },
  {
    id: 'modern-developer',
    name: 'Modern Developer',
    description: 'Technical layout with code-inspired styling, GitHub link highlights, and dual-column tech matrix.',
    category: 'Technology',
    level: 'Intermediate',
    isFree: true,
    tags: ['Developer', 'Software Engineering', 'GitHub', 'Tech Stack'],
    bestFor: 'Software Engineers, Full-Stack Developers, Cloud Architects, and DevOps Engineers.',
    featured: true
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    description: 'Sophisticated luxury aesthetic with subtle gold accents, editorial typography, and refined hairline borders.',
    category: 'Creative',
    level: 'Experienced',
    isFree: true,
    tags: ['Luxury', 'Editorial', 'High-End', 'Gold Accent'],
    bestFor: 'Creative Directors, Luxury Brand Managers, Fashion, and Architecture leaders.',
    featured: true
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Traditional professional business layout with balanced two-column header and structured career timeline.',
    category: 'Business',
    level: 'Experienced',
    isFree: true,
    tags: ['Corporate', 'Business', 'Finance', 'Traditional'],
    bestFor: 'Corporate Strategists, Operations Managers, Accountants, and Financial Analysts.',
    featured: false
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern asymmetric two-column design with distinct sidebar highlights for portfolio-driven careers.',
    category: 'Creative',
    level: 'Intermediate',
    isFree: true,
    tags: ['Creative', 'Design', 'Portfolio', 'Modern Sidebar'],
    bestFor: 'UI/UX Designers, Art Directors, Copywriters, and Multimedia Producers.',
    featured: false
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Education and research-focused layout for scholars, PhD candidates, professors, and researchers.',
    category: 'Academic',
    level: 'Senior',
    isFree: true,
    tags: ['Academic', 'Research', 'CV', 'Publications', 'PhD'],
    bestFor: 'University Faculty, Postdoctoral Scholars, Research Scientists, and Educators.',
    featured: false
  },
  {
    id: 'tech',
    name: 'Tech Modern',
    description: 'High-density tech layout featuring skill badges, project architecture tags, and impact metrics.',
    category: 'Technology',
    level: 'Experienced',
    isFree: true,
    tags: ['Tech', 'Data Science', 'Machine Learning', 'Systems'],
    bestFor: 'Data Scientists, Systems Engineers, AI Researchers, and Engineering Managers.',
    featured: false
  },
  {
    id: 'professional-blue',
    name: 'Professional Blue',
    description: 'Corporate consulting style with modern navy/sapphire accents, sharp hierarchy, and consulting scope blocks.',
    category: 'Business',
    level: 'Senior',
    isFree: true,
    tags: ['Consulting', 'Sapphire', 'Corporate', 'Professional'],
    bestFor: 'Management Consultants, Strategy Leads, and Business Development Executives.',
    featured: false
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    description: 'Editorial luxury styling featuring Playfair Display typography, generous letter-spacing, and timeless magazine appeal.',
    category: 'Executive',
    level: 'Senior',
    isFree: true,
    tags: ['Editorial', 'Playfair', 'Timeless', 'Bookish Elegance'],
    bestFor: 'Publishing Executives, Legal Counsel, Authors, and Senior Advisors.',
    featured: false
  }
];

const COMPONENT_MAP: Record<string, React.ComponentType<ResumeTemplateProps>> = {
  'minimal-ats': TemplateMinimal,
  'executive-black': TemplateExecutive,
  'modern-developer': TemplateModernDeveloper,
  'luxury-gold': TemplateLuxury,
  'corporate': TemplateCorporate,
  'creative': TemplateCreative,
  'academic': TemplateAcademic,
  'tech': TemplateTech,
  'professional-blue': TemplateProfessionalBlue,
  'elegant-serif': TemplateElegantSerif
};

export function getTemplate(id: string): TemplateMetadata {
  const found = TEMPLATES.find((t) => t.id === id);
  return found || TEMPLATES[0];
}

export function getTemplateComponent(id: string): React.ComponentType<ResumeTemplateProps> {
  return COMPONENT_MAP[id] || TemplateMinimal;
}
