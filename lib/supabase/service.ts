import { getSupabase } from './client';
import { isSupabaseConfigured } from './config';
import { ResumeRecord, UserProfile } from '@/types/user';
import { ResumeData } from '@/types/resume';
import { DEMO_RESUME_DATA } from '@/lib/demo-data';

const LOCAL_STORAGE_RESUMES_KEY = 'resumelux_resumes_local';
const LOCAL_STORAGE_PROFILE_KEY = 'resumelux_profile_local';

// Helper for local mock storage when Supabase is not yet connected
const getLocalResumes = (): ResumeRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RESUMES_KEY);
    if (!raw) {
      // Seed with initial demo resume
      const defaultRecord: ResumeRecord = {
        id: 'demo-resume-1',
        user_id: 'local-user',
        title: 'Executive Software Architect',
        template_id: 'luxury-gold',
        resume_data: DEMO_RESUME_DATA,
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem(LOCAL_STORAGE_RESUMES_KEY, JSON.stringify([defaultRecord]));
      return [defaultRecord];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveLocalResumes = (resumes: ResumeRecord[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_RESUMES_KEY, JSON.stringify(resumes));
  } catch (err) {
    console.error('Failed to write to local storage', err);
  }
};

export const resumeService = {
  // Fetch all resumes for current user
  async getResumes(userId: string): Promise<ResumeRecord[]> {
    const supabase = getSupabase();
    if (!supabase || !isSupabaseConfigured()) {
      return getLocalResumes();
    }

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching resumes from Supabase:', error);
      throw error;
    }

    return (data as ResumeRecord[]) || [];
  },

  // Fetch a single resume by ID
  async getResume(id: string): Promise<ResumeRecord | null> {
    const supabase = getSupabase();
    if (!supabase || !isSupabaseConfigured()) {
      const list = getLocalResumes();
      return list.find((r) => r.id === id) || null;
    }

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching resume ${id}:`, error);
      return null;
    }

    return data as ResumeRecord;
  },

  // Create a new resume
  async createResume(
    userId: string,
    title: string,
    templateId: string,
    initialData: ResumeData
  ): Promise<ResumeRecord> {
    const supabase = getSupabase();
    if (!supabase || !isSupabaseConfigured()) {
      const list = getLocalResumes();
      const newResume: ResumeRecord = {
        id: 'res_' + Math.random().toString(36).substring(2, 9),
        user_id: userId || 'local-user',
        title: title || 'Untitled Resume',
        template_id: templateId || 'minimal-ats',
        resume_data: initialData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      list.unshift(newResume);
      saveLocalResumes(list);
      return newResume;
    }

    const { data, error } = await supabase
      .from('resumes')
      .insert({
        user_id: userId,
        title: title || 'Untitled Resume',
        template_id: templateId || 'minimal-ats',
        resume_data: initialData
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating resume in Supabase:', error);
      throw error;
    }

    return data as ResumeRecord;
  },

  // Update resume content, title, or template
  async updateResume(
    id: string,
    updates: {
      title?: string;
      template_id?: string;
      resume_data?: ResumeData;
    }
  ): Promise<ResumeRecord> {
    const supabase = getSupabase();
    if (!supabase || !isSupabaseConfigured()) {
      const list = getLocalResumes();
      const index = list.findIndex((r) => r.id === id);
      if (index === -1) {
        throw new Error('Resume not found');
      }
      const updated: ResumeRecord = {
        ...list[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
      list[index] = updated;
      saveLocalResumes(list);
      return updated;
    }

    const { data, error } = await supabase
      .from('resumes')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating resume ${id}:`, error);
      throw error;
    }

    return data as ResumeRecord;
  },

  // Duplicate an existing resume
  async duplicateResume(id: string, userId: string): Promise<ResumeRecord> {
    const original = await this.getResume(id);
    if (!original) throw new Error('Original resume not found');

    const duplicateTitle = `${original.title} (Copy)`;
    return this.createResume(
      userId,
      duplicateTitle,
      original.template_id,
      original.resume_data
    );
  },

  // Delete a resume
  async deleteResume(id: string): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase || !isSupabaseConfigured()) {
      const list = getLocalResumes();
      const filtered = list.filter((r) => r.id !== id);
      saveLocalResumes(filtered);
      return true;
    }

    const { error } = await supabase.from('resumes').delete().eq('id', id);
    if (error) {
      console.error(`Error deleting resume ${id}:`, error);
      throw error;
    }
    return true;
  },

  // Fetch or update user profile
  async getProfile(userId: string): Promise<UserProfile | null> {
    const supabase = getSupabase();
    if (!supabase || !isSupabaseConfigured()) {
      if (typeof window === 'undefined') return null;
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
        if (stored) return JSON.parse(stored);
        return {
          id: userId || 'local-user',
          email: 'user@resumelux.io',
          full_name: 'Distinguished Member',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      } catch {
        return null;
      }
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data as UserProfile;
  },

  async updateProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): Promise<UserProfile> {
    const supabase = getSupabase();
    if (!supabase || !isSupabaseConfigured()) {
      const current = (await this.getProfile(userId)) || {
        id: userId,
        email: 'user@resumelux.io',
        full_name: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      const merged = { ...current, ...updates, updated_at: new Date().toISOString() };
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(merged));
      }
      return merged;
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }

    return data as UserProfile;
  }
};
