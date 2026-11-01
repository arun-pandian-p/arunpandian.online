export type Theme = 'light' | 'dark';

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Java' | 'AI / ML';
  status: 'Completed' | 'Active Development' | 'Prototype';
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  problemStatement: string;
  solution: string;
  architecture: string;
  frontendDetails: string;
  backendDetails: string;
  databaseDetails: string;
  keyFeatures: string[];
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  level: 'Proficient' | 'Familiar' | 'Learning';
  usedInProjects: boolean;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  fieldErrors?: Record<string, string>;
}

