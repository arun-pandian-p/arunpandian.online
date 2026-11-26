import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { projects as staticProjects } from '../../data/projects';
import { PageTransition } from '../../components/layout/PageTransition';
import { getProjects, GalleryProject } from '../../lib/supabase';
import { Project } from '../../types';

type CategoryFilter = 'All' | 'Full Stack' | 'Frontend' | 'Backend' | 'Java' | 'AI / ML';

const categories: CategoryFilter[] = [
  'All',
  'Full Stack',
  'Frontend',
  'Backend',
  'Java',
  'AI / ML',
];

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [allProjects, setAllProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    async function loadDynamicProjects() {
      try {
        const dynamicData = await getProjects();
        if (dynamicData && dynamicData.length > 0) {
          // Convert any dynamic projects that don't exist in static list
          const converted: Project[] = dynamicData
            .filter((dp) => dp.published !== false)
            .map((dp: GalleryProject) => {
              const matchedStatic = staticProjects.find(
                (sp) => sp.title.toLowerCase() === dp.title.toLowerCase() || (dp.slug && sp.slug === dp.slug)
              );
              if (matchedStatic) {
                return {
                  ...matchedStatic,
                  title: dp.title || matchedStatic.title,
                  shortDescription: dp.problem || matchedStatic.shortDescription,
                  category: (dp.category as any) || matchedStatic.category,
                  techStack: dp.tags && dp.tags.length > 0 ? dp.tags : matchedStatic.techStack,
                  githubUrl: dp.github_link || matchedStatic.githubUrl,
                  liveUrl: dp.live_link || matchedStatic.liveUrl,
                  featured: dp.featured ?? matchedStatic.featured,
                };
              }
              // New project created from Admin Gallery
              return {
                slug: dp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                title: dp.title,
                shortDescription: dp.problem || dp.summary || 'Project engineered by Arun Pandian.',
                category: (dp.category as any) || 'Full Stack',
                status: 'Completed',
                techStack: dp.tags && dp.tags.length > 0 ? dp.tags : ['React', 'TypeScript', 'PostgreSQL'],
                githubUrl: dp.github_link || 'https://github.com/arun-pandian-p',
                liveUrl: dp.live_link || 'https://github.com/arun-pandian-p',
                problemStatement: dp.problem || 'Production software challenge.',
                solution: dp.solution || 'Implemented full-stack architecture.',
                architecture: dp.architecture || 'Decoupled frontend & backend persistence on PostgreSQL.',
                frontendDetails: 'Built with React 19, modern component architecture.',
                backendDetails: 'REST API endpoints and secure database persistence.',
                databaseDetails: 'PostgreSQL relational database schema.',
                keyFeatures: ['Production deployment', 'Optimized data flow'],
                featured: dp.featured ?? false,
              };
            });

          // Merge: prioritize dynamic records, then any static projects not in dynamic list
          const dynamicTitles = new Set(converted.map((p) => p.title.toLowerCase()));
          const remainingStatic = staticProjects.filter(
            (sp) => !dynamicTitles.has(sp.title.toLowerCase())
          );
          setAllProjects([...converted, ...remainingStatic]);
        }
      } catch (err) {
        console.warn('Using static projects fallback:', err);
      }
    }
    loadDynamicProjects();
  }, []);

  const filteredProjects =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
        {/* Header */}
        <div>
          <SectionHeading
            eyebrow="Engineering Showcase"
            title="Projects & Systems"
            description="Production-grade applications and platforms demonstrating full-stack architecture, relational database modeling, and performant user interfaces."
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-border pb-6">
            <span className="text-xs font-mono uppercase text-muted-foreground mr-2">
              Filter by:
            </span>
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? allProjects.length
                  : allProjects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-surface text-muted-foreground hover:text-foreground border border-border'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat
                        ? 'bg-primary-hover text-white'
                        : 'bg-surface-elevated text-muted-foreground'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-xl bg-surface border border-border">
            <p className="text-muted-foreground">
              No projects found in this category currently. Check back soon!
            </p>
          </div>
        )}

        {/* Verification Callout */}
        <div className="p-6 rounded-xl bg-surface-elevated border border-border/80 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            All projects listed represent genuine codebases and verified technical architectures.
            Detailed breakdowns explain actual implementation files and constraints.
          </p>
          <a
            href="https://github.com/arun-pandian-p"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline flex-shrink-0"
          >
            Browse GitHub Repositories →
          </a>
        </div>
      </div>
    </PageTransition>
  );
};
