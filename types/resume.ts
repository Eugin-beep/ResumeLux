export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  avatarUrl?: string;
  customFields?: Array<{
    id: string;
    label: string;
    value: string;
  }>;
}

export interface ExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  score?: string; // CGPA, percentage, or honors
  description?: string;
}

export interface SkillCategory {
  id: string;
  category: string; // e.g. "Technical Skills", "Tools", "Soft Skills", "Languages"
  skills: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface AchievementEntry {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface LanguageEntry {
  id: string;
  language: string;
  proficiency: 'Basic' | 'Intermediate' | 'Professional' | 'Native';
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface CustomSectionEntry {
  id: string;
  title: string; // e.g. "Publications", "Awards", "Volunteer Experience", "Interests"
  items: CustomSectionItem[];
}

export interface ResumeFormatting {
  primaryColor?: string;
  fontFamily?: string;
  fontSize?: 'sm' | 'base' | 'lg';
  margins?: 'compact' | 'normal' | 'relaxed';
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillCategory[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  achievements: AchievementEntry[];
  languages: LanguageEntry[];
  customSections: CustomSectionEntry[];
  formatting?: ResumeFormatting;
}
