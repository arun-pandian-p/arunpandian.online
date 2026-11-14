import { ExperienceItem } from '../types';

export const experiences: ExperienceItem[] = [
  {
    id: 'carpe-diem',
    company: 'Carpe Diem Tech Innovations',
    role: 'Software Engineer Intern',
    period: 'January 2026 – March 2026',
    location: 'Coimbatore, Tamil Nadu, India',
    type: 'Internship',
    description:
      'Engineered full-stack features, database pipelines, and AI-assisted workflow modules in a fast-paced product development environment.',
    achievements: [
      'Developed responsive full-stack modules using Next.js, React, and TypeScript with rigorous typing and performance audits.',
      'Implemented backend REST APIs in Node.js connected to PostgreSQL, focusing on parameterized queries and data validation.',
      'Designed and optimized normalized relational database schemas with foreign keys and compound indexes.',
      'Constructed data extraction and transformation pipelines utilizing Python and SQL for analytical reporting.',
      'Integrated AI-powered workflow automations to streamline internal developer processes and content pipelines.',
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'React',
      'Node.js',
      'PostgreSQL',
      'Python',
      'SQL',
      'REST APIs',
    ],
  },
];

