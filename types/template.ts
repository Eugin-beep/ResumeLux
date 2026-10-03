export type TemplateCategory =
  | 'All'
  | 'ATS'
  | 'Freshers'
  | 'Students'
  | 'Technology'
  | 'Business'
  | 'Creative'
  | 'Executive'
  | 'Academic';

export type ExperienceLevel =
  | 'Beginner'
  | 'Student'
  | 'Intermediate'
  | 'Experienced'
  | 'Senior'
  | 'Executive';

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  level: ExperienceLevel;
  isFree: boolean;
  previewImage?: string;
  tags: string[];
  bestFor: string;
  featured?: boolean;
}
