import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://secxgzharggytkevlvmx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_27bNUE9GwneWMtdEseUgng_PGepTvZo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export interface ResumeConfig {
  url: string;
  filename: string;
  updatedAt: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  slug?: string | null;
  problem?: string | null;
  solution?: string | null;
  architecture?: string | null;
  tags?: string[] | null;
  github_link?: string | null;
  live_link?: string | null;
  image_url?: string | null;
  sort_order?: number | null;
  published?: boolean;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
  category?: string | null;
  summary?: string | null;
  status?: string | null;
}

// Storage bucket name for images and resumes
export const ASSETS_BUCKET = 'assets';

/**
 * Sign in admin user using Supabase Auth (no hardcoded credentials)
 */
export async function signInAdmin(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

/**
 * Sign out admin user
 */
export async function signOutAdmin() {
  return await supabase.auth.signOut();
}

/**
 * Fetch current active session
 */
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Failed to get session:', error);
    return null;
  }
  return data.session;
}

/**
 * Fetch resume configuration from site_settings table
 */
export async function getResumeConfig(): Promise<ResumeConfig> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'resume')
      .maybeSingle();

    if (error) {
      console.warn('Error reading resume from site_settings:', error.message);
    }

    if (data?.value?.url) {
      return {
        url: data.value.url,
        filename: data.value.filename || 'Arun_Pandian_Resume.pdf',
        updatedAt: data.updated_at || new Date().toISOString(),
      };
    }

    // Check navbar setting fallback
    const { data: navData } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'navbar')
      .maybeSingle();

    if (navData?.value?.ctaHref && navData.value.ctaHref.includes('.pdf')) {
      return {
        url: navData.value.ctaHref,
        filename: 'Arun_Pandian_P.pdf',
        updatedAt: navData.updated_at || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.warn('Fallback to local resume file:', err);
  }

  // Default fallback
  return {
    url: '/Arun_Pandian_P.pdf',
    filename: 'Arun_Pandian_P.pdf',
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Update resume configuration in site_settings
 */
export async function updateResumeConfig(config: { url: string; filename: string }) {
  const now = new Date().toISOString();
  // 1. Update resume key
  const { error: resumeErr } = await supabase
    .from('site_settings')
    .upsert({
      key: 'resume',
      value: {
        url: config.url,
        filename: config.filename,
        updatedAt: now,
      },
      updated_at: now,
    });

  if (resumeErr) throw resumeErr;

  // 2. Also update navbar setting ctaHref so any navbar queries remain in sync
  await supabase
    .from('site_settings')
    .upsert({
      key: 'navbar',
      value: {
        ctaHref: config.url,
        ctaLabel: 'Resume',
      },
      updated_at: now,
    });

  return true;
}

/**
 * Upload resume PDF file to Supabase storage bucket
 */
export async function uploadResumePdf(file: File): Promise<string> {
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `resume/${Date.now()}_${cleanName}`;

  const { error: uploadError } = await supabase.storage
    .from(ASSETS_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: 'application/pdf',
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: publicUrlData } = supabase.storage
    .from(ASSETS_BUCKET)
    .getPublicUrl(path);

  const publicUrl = publicUrlData.publicUrl;

  // Persist to site_settings
  await updateResumeConfig({
    url: publicUrl,
    filename: file.name,
  });

  return publicUrl;
}

/**
 * Upload an image file to Supabase storage bucket
 */
export async function uploadGalleryPhoto(file: File, folder: string = 'projects'): Promise<string> {
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${folder}/${Date.now()}_${cleanName}`;

  const { error: uploadError } = await supabase.storage
    .from(ASSETS_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type || 'image/jpeg',
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: publicUrlData } = supabase.storage
    .from(ASSETS_BUCKET)
    .getPublicUrl(path);

  return publicUrlData.publicUrl;
}

/**
 * Fetch all gallery projects from database
 */
export async function getProjects(): Promise<GalleryProject[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects from Supabase:', error);
    return [];
  }

  return (data || []) as GalleryProject[];
}

/**
 * Save or update a project
 */
export async function saveProject(project: Partial<GalleryProject> & { id?: string }): Promise<GalleryProject> {
  const now = new Date().toISOString();
  const payload = {
    ...project,
    updated_at: now,
  };

  if (!payload.id) {
    payload.created_at = now;
  }

  const { data, error } = await supabase
    .from('projects')
    .upsert(payload)
    .select('*')
    .single();

  if (error) throw error;
  return data as GalleryProject;
}

/**
 * Delete a project by ID
 */
export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
