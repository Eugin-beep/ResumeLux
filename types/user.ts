import { ResumeData } from './resume';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ResumeRecord {
  id: string;
  user_id: string;
  title: string;
  template_id: string;
  resume_data: ResumeData;
  created_at: string;
  updated_at: string;
}
