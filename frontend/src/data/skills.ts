import { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend Engineering',
    description: 'Building accessible, fast, and responsive user interfaces with modern component architectures.',
    skills: [
      { name: 'React', level: 'Proficient', usedInProjects: true },
      { name: 'TypeScript', level: 'Proficient', usedInProjects: true },
      { name: 'JavaScript (ES6+)', level: 'Proficient', usedInProjects: true },
      { name: 'Tailwind CSS', level: 'Proficient', usedInProjects: true },
      { name: 'HTML5', level: 'Proficient', usedInProjects: true },
      { name: 'CSS3', level: 'Proficient', usedInProjects: true },
    ],
  },
  {
    category: 'Backend Engineering',
    description: 'Constructing robust server applications, transactional business logic, and secured RESTful APIs.',
    skills: [
      { name: 'Java 21', level: 'Proficient', usedInProjects: true },
      { name: 'Spring Boot 3.x', level: 'Proficient', usedInProjects: true },
      { name: 'REST APIs', level: 'Proficient', usedInProjects: true },
      { name: 'Spring Data JPA', level: 'Proficient', usedInProjects: true },
      { name: 'Spring Security', level: 'Familiar', usedInProjects: true },
      { name: 'JDBC', level: 'Proficient', usedInProjects: true },
    ],
  },
  {
    category: 'Database Architecture',
    description: 'Relational data modeling, schema migrations, query optimization, and transaction management.',
    skills: [
      { name: 'PostgreSQL', level: 'Proficient', usedInProjects: true },
      { name: 'SQL', level: 'Proficient', usedInProjects: true },
      { name: 'SQLite', level: 'Proficient', usedInProjects: true },
      { name: 'Flyway Migrations', level: 'Familiar', usedInProjects: true },
    ],
  },
  {
    category: 'Developer Tools & DevOps',
    description: 'Version control, development environments, containerization, and API verification tooling.',
    skills: [
      { name: 'Git', level: 'Proficient', usedInProjects: true },
      { name: 'GitHub', level: 'Proficient', usedInProjects: true },
      { name: 'IntelliJ IDEA', level: 'Proficient', usedInProjects: true },
      { name: 'VS Code', level: 'Proficient', usedInProjects: true },
      { name: 'Postman', level: 'Proficient', usedInProjects: true },
      { name: 'Docker', level: 'Familiar', usedInProjects: true },
    ],
  },
  {
    category: 'Additional & Foundations',
    description: 'Academic background in AI & Data Science and modern computational tools.',
    skills: [
      { name: 'Python', level: 'Proficient', usedInProjects: true },
      { name: 'Data Analysis', level: 'Proficient', usedInProjects: true },
      { name: 'Machine Learning', level: 'Familiar', usedInProjects: false },
      { name: 'Generative AI', level: 'Familiar', usedInProjects: true },
    ],
  },
];

