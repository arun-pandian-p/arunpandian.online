import React, { useState } from 'react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { projects } from '../../data/projects';
import { PageTransition } from '../../components/layout/PageTransition';

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

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

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
                cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
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

