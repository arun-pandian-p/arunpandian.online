import { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'zappy',
    title: 'Zappy – Restaurant SaaS Platform',
    shortDescription:
      'Multi-tenant restaurant ordering platform featuring QR-code digital menus, kitchen order dispatching, role-based access control, and PostgreSQL backend architecture.',
    category: 'Full Stack',
    status: 'Active Development',
    techStack: ['React 19', 'TypeScript', 'Java 21', 'Spring Boot 3', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    githubUrl: 'https://github.com/arun-pandian-p/Zappy',
    liveUrl: 'https://github.com/arun-pandian-p/Zappy',
    problemStatement:
      'Traditional dining spots struggle with slow ordering turnover, paper menu overhead, and fragmented billing systems that fail during peak hours.',
    solution:
      'Engineered a multi-tenant SaaS application that enables diners to scan table-specific dynamic QR codes, browse real-time inventory, place customized kitchen orders, and track preparation statuses seamlessly.',
    architecture:
      'Separation of concerns between high-throughput customer menu queries and mission-critical transactional order flows. Multi-tenant database partitioning on PostgreSQL with tenant-isolated schemas and role-based permissions.',
    frontendDetails:
      'Built with React 19, TypeScript, and Tailwind CSS. Features dynamic QR code generation, responsive table view, offline cart caching, and live order status tickers.',
    backendDetails:
      'RESTful API design powering tenant resolution, kitchen order ticket (KOT) generation, and transactional status transitions with strict data isolation.',
    databaseDetails:
      'PostgreSQL relational schema modeling tenants, stores, menu categories, modifiers, tables, orders, and item statuses with foreign keys and compound indices on tenant_id.',
    keyFeatures: [
      'Dynamic QR-based menu access with instant table binding',
      'Multi-tenant architecture isolating restaurant catalogs and bills',
      'Role-Based Access Control (RBAC) for Super Admin, Store Manager, and Waitstaff',
      'Interactive Kitchen Display System (KDS) order dispatching',
      'Real-time order state machine (Placed -> Preparing -> Served -> Settled)',
    ],
    featured: true,
  },
  {
    slug: 'it-helpdesk',
    title: 'IT Helpdesk & Incident Management System',
    shortDescription:
      'ITIL-inspired enterprise incident management system with automated SLA evaluation, role-based ticket assignment engines, audit logging, and full containerized deployment.',
    category: 'Full Stack',
    status: 'Completed',
    techStack: ['Java 21', 'TypeScript', 'React 19', 'Spring Boot', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/arun-pandian-p/IT-Helpdesk-and-incident-Management-System',
    liveUrl: 'https://github.com/arun-pandian-p/IT-Helpdesk-and-incident-Management-System',
    problemStatement:
      'Enterprise support teams lose track of critical issues without automated SLA timers, role-based routing, and transparent audit trails.',
    solution:
      'Built an ITIL-aligned service management system that automates ticket classification, assigns priority escalations, and manages incident lifecycles.',
    architecture:
      'Robust backend architecture with stateless authentication, role-based permissions, transactional ticket lifecycle state machines, and relational PostgreSQL persistence.',
    frontendDetails:
      'React 19 single-page dashboard with real-time ticket queues, SLA violation countdowns, and rich markdown communication logs.',
    backendDetails:
      'RESTful endpoints with Spring Boot / FastAPI handling ticket state transitions, automated SLA escalation policies, and audit logging.',
    databaseDetails:
      'Relational PostgreSQL schema with foreign-key constraints on users, tickets, comments, SLA policies, and transition logs.',
    keyFeatures: [
      'Automated SLA monitoring and escalation workflows',
      'Role-Based Access Control (Agent, Lead, Admin, Requester)',
      'Immutable audit trail for ticket state transitions',
      'Full-text search across historical resolution logs',
      'Containerized multi-service deployment with Docker',
    ],
    featured: true,
  },
  {
    slug: 'ap-desktop',
    title: 'Ap Desktop – Placement Preparation Platform',
    shortDescription:
      'Offline-first desktop application engineered for computer science students to practice coding patterns, system design, and technical interview roadmaps.',
    category: 'Java',
    status: 'Completed',
    techStack: ['Electron', 'React 19', 'TypeScript', 'SQLite', 'Tailwind CSS', 'Java Runtime'],
    githubUrl: 'https://github.com/arun-pandian-p/Ap-Desktop',
    liveUrl: 'https://github.com/arun-pandian-p/Ap-Desktop',
    problemStatement:
      'Students preparing for software engineering placement drives often face distracting online platforms, unstable campus internet, and disorganized study resources.',
    solution:
      'Architected an offline-first desktop environment packaging curated DSA problem classifications, company-specific preparation roadmaps, and a local code runner.',
    architecture:
      'Hybrid architecture pairing an Electron/React front interface with a lightweight embedded SQLite database and a local Java runtime integration for syntax verification.',
    frontendDetails:
      'Clean desktop UI with dark mode ergonomics, multi-tab pattern roadmaps, bookmarking, and distraction-free problem reading views.',
    backendDetails:
      'Local IPC bridge facilitating safe file-system access, state backups, and local problem progress tracking.',
    databaseDetails:
      'Embedded SQLite database with full-text search indexing over hundreds of coding interview concepts and DSA problem patterns.',
    keyFeatures: [
      'Completely offline-first operation requiring zero internet connectivity',
      'Structured Data Structures & Algorithms (DSA) level-wise pattern guides',
      'Integrated progress tracking with spaced-repetition reminders',
      'Full-text searchable interview question database with code snippets',
      'Local backup and JSON export capabilities for student study notes',
    ],
    featured: true,
  },
  {
    slug: 'xai-seizure-prediction',
    title: 'Explainable AI Seizure Prediction Dashboard',
    shortDescription:
      'Clinical deep learning pipeline analyzing multi-channel EEG biosignals for pre-ictal seizure prediction, paired with SHAP/LIME attribution heatmaps for verifiable medical interpretability.',
    category: 'AI / ML',
    status: 'Completed',
    techStack: ['Python 3.11', 'PyTorch', 'FastAPI', 'SHAP', 'MNE-Python', 'React 19', 'Docker'],
    githubUrl: 'https://github.com/arun-pandian-p/xai-seizure-prediction-dashboard',
    liveUrl: 'https://github.com/arun-pandian-p/xai-seizure-prediction-dashboard',
    problemStatement:
      'Black-box neural network models for EEG analysis lack the clinical explainability required for doctors to trust and act on automated seizure forecasts.',
    solution:
      'Engineered an interpretable deep learning pipeline with SHAP and LIME feature attribution, highlighting frequency band contributions and spatial sensor triggers.',
    architecture:
      'PyTorch deep learning model exposed via FastAPI microservices, serving real-time risk scores and attribution arrays to a React frontend.',
    frontendDetails:
      'Interactive neuro-monitoring dashboard displaying multi-channel EEG waveforms, probability gauges, and SHAP attribution heatmaps.',
    backendDetails:
      'FastAPI asynchronous server executing preprocessing pipelines (bandpass filtering, artifact removal) and PyTorch inference.',
    databaseDetails:
      'Structured patient test session storage with serialized EEG channel arrays and confidence scores.',
    keyFeatures: [
      'Deep learning pre-ictal seizure prediction from multi-channel EEG',
      'Interpretable SHAP attribution heatmaps for clinical validation',
      'Signal preprocessing pipeline with digital bandpass filters',
      'FastAPI asynchronous inference engine with sub-120ms response times',
      'Interactive doctor-facing dashboard for real-time risk inspection',
    ],
    featured: true,
  },
  {
    slug: 'ashnora',
    title: 'Ashnora – Restaurant Management System',
    shortDescription:
      'All-in-one restaurant operational system integrating Point of Sale (POS), Kitchen Display Systems, real-time inventory tracking, and floor management.',
    category: 'Full Stack',
    status: 'Completed',
    techStack: ['React', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Tailwind CSS', 'Chart.js'],
    githubUrl: 'https://github.com/arun-pandian-p/ash',
    liveUrl: 'https://github.com/arun-pandian-p/ash',
    problemStatement:
      'Stand-alone cash registers and disconnected kitchen printers cause inventory discrepancies, missed modifier requests, and delayed customer billing.',
    solution:
      'Developed an integrated restaurant management platform unifying dining room floor plans, POS cashier stations, kitchen queue displays, and ingredient-level inventory replenishment alerts.',
    architecture:
      'Event-driven architecture where billing events trigger atomic inventory decrement queries and update kitchen display boards concurrently.',
    frontendDetails:
      'Designed with quick-touch tablet POS views, rapid order entry grids, modifier selector dialogs, and interactive dining floor maps.',
    backendDetails:
      'High-reliability REST endpoints with transactional safety ensuring inventory counts update atomically upon order fulfillment.',
    databaseDetails:
      'Normalized PostgreSQL relational schema tracking ingredient recipes, stock levels, table layouts, employee shifts, and hourly sales breakdowns.',
    keyFeatures: [
      'Touch-optimized Point of Sale (POS) checkout interface',
      'Interactive visual table floor map with seated timer indicators',
      'Kitchen Display System (KDS) prioritizing overdue orders',
      'Ingredient-level recipe costing and low-stock replenishment alerts',
      'End-of-day sales auditing, discount tracking, and cashier reconciliations',
    ],
    featured: false,
  },
  {
    slug: 'blog-platform',
    title: 'Technical Engineering Publishing Platform',
    shortDescription:
      'High-performance personal publishing engine built with Java Spring Boot and React, delivering Markdown rendering, syntax highlighting, and database-backed article management.',
    category: 'Backend',
    status: 'Completed',
    techStack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Hibernate', 'Docker'],
    githubUrl: 'https://github.com/arun-pandian-p/blog.arunpandian.online',
    liveUrl: 'https://github.com/arun-pandian-p/blog.arunpandian.online',
    problemStatement:
      'Commercial blogging platforms introduce bloated trackers, slow loading speeds, paywalls, and proprietary content formats that restrict ownership.',
    solution:
      'Built a self-hosted developer publication system with instant static-like reader rendering, database-driven tag filtering, and clean API endpoints.',
    architecture:
      'Stateless Spring Boot 3 REST API backend serving sanitized article payloads, connected to a PostgreSQL database with JPA / Hibernate caching.',
    frontendDetails:
      'Minimalist reader UI with typography optimization, code block syntax highlighting, reading time calculation, and reactive search.',
    backendDetails:
      'Spring Boot 3 REST controllers, JPA Criteria API for dynamic tag/category filtering, and structured exception handling.',
    databaseDetails:
      'PostgreSQL schema with indexes on publish dates and slugs, enforcing unique constraints and referential integrity for tags and categories.',
    keyFeatures: [
      'Fast Markdown to HTML conversion with code block syntax highlighting',
      'Faceted search across technical tags, categories, and publication dates',
      'Database-backed article metadata with reading time estimation',
      'Clean REST API with comprehensive input validation and error handling',
      'Zero external tracking scripts or telemetry overhead',
    ],
    featured: false,
  },
];
