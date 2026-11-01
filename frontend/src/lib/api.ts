import { Project, ContactFormData, ApiResponse } from '../types';
import { projects as fallbackProjects } from '../data/projects';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchHealth(): Promise<{ status: string; service: string }> {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (error) {
    return { status: 'OFFLINE', service: 'arunpandian-portfolio-backend' };
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to fetch projects from backend');
    return await res.json();
  } catch (err) {
    // Graceful fallback to static verified dataset
    return fallbackProjects;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE}/projects/${slug}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch project');
    }
    return await res.json();
  } catch (err) {
    const found = fallbackProjects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
    return found || null;
  }
}

export async function submitContact(data: ContactFormData): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json.message || 'Failed to submit enquiry. Please verify your input.',
        fieldErrors: json.fieldErrors,
      };
    }

    return {
      success: true,
      message: json.message || 'Thank you for reaching out! Your message was received successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message:
        'Unable to reach the backend server at this moment. You can also contact Arun directly via email or LinkedIn.',
    };
  }
}

