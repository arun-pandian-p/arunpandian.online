import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Layers, Database, Server, Smartphone, BookOpen } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Category icon mapping
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Full Stack':
        return <Layers className="w-4 h-4 text-blue-500" />;
      case 'Backend':
        return <Server className="w-4 h-4 text-indigo-500" />;
      case 'Java':
        return <Database className="w-4 h-4 text-emerald-500" />;
      case 'AI / ML':
        return <Smartphone className="w-4 h-4 text-purple-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="group flex flex-col justify-between rounded-xl bg-surface border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Visual Header / System Blueprint */}
      <div className="relative p-6 bg-gradient-to-br from-surface to-surface-elevated border-b border-border/60">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-background border border-border text-foreground">
            {getCategoryIcon(project.category)}
            {project.category}
          </span>
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
              project.status === 'Completed'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
            }`}
          >
            {project.status}
          </span>
        </div>

        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
          <Link to={`/projects/${project.slug}`} className="hover:underline focus:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>
      </div>

      {/* Body / Tech Stack */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="block text-xs uppercase tracking-wider font-mono text-muted-foreground mb-2.5">
            Key Architecture & Stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded bg-surface-elevated text-foreground border border-border/60 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source on GitHub`}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live deployment of ${project.title}`}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover group/link"
          >
            Detailed Architecture
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

