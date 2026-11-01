import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Layers,
  Database,
  Server,
  Code2,
  CheckCircle2,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { Project } from '../../types';
import { fetchProjectBySlug } from '../../lib/api';
import { projects } from '../../data/projects';
import { Button } from '../../components/ui/Button';
import { PageTransition } from '../../components/layout/PageTransition';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!slug) return;
      setLoading(true);
      const data = await fetchProjectBySlug(slug);
      setProject(data);
      setLoading(false);
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        <p className="text-sm text-muted-foreground font-mono">Loading project architecture...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Project Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The requested project slug &apos;{slug}&apos; does not exist in the verified project directory.
        </p>
        <Link to="/projects">
          <Button variant="outline" icon={<ArrowLeft className="w-4 h-4 mr-1" />}>
            Back to Projects Directory
          </Button>
        </Link>
      </div>
    );
  }

  const relatedProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-6">
        {/* Breadcrumb / Back */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-full bg-surface border border-border text-foreground">
              {project.category}
            </span>
            <span
              className={`text-xs font-mono px-2.5 py-1 rounded-full ${
                project.status === 'Completed'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
              }`}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Title Header */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" icon={<Github className="w-4 h-4" />}>
                  View Repository
                </Button>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button icon={<ExternalLink className="w-4 h-4" />}>
                  Live Deployment
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="p-5 rounded-xl bg-surface border border-border">
          <h3 className="text-xs uppercase font-mono tracking-wider text-muted-foreground mb-3">
            Technology Stack & Libraries
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-md bg-surface-elevated text-foreground border border-border font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem Statement & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-surface border border-border">
            <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-500" /> Problem Statement
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface border border-border">
            <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Engineering Solution
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* System Architecture */}
        <div className="p-6 rounded-xl bg-surface border border-border space-y-3">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            System Architecture
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.architecture}
          </p>
        </div>

        {/* Frontend, Backend & Database Implementations */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Implementation Deep Dive</h3>

          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h4 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-500" />
                Frontend Implementation
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.frontendDetails}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border">
              <h4 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                <Server className="w-4 h-4 text-indigo-500" />
                Backend Implementation
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.backendDetails}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border">
              <h4 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-500" />
                Database Design & Persistence
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.databaseDetails}
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="p-6 rounded-xl bg-surface border border-border">
          <h3 className="text-xl font-bold text-foreground mb-4">Key Verified Features</h3>
          <ul className="space-y-2.5">
            {project.keyFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Projects */}
        <div className="pt-8 border-t border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Other Engineering Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.slug}
                to={`/projects/${rel.slug}`}
                className="p-4 rounded-lg bg-surface border border-border hover:border-primary/50 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-primary uppercase">{rel.category}</span>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {rel.shortDescription}
                  </p>
                </div>
                <span className="text-xs text-primary font-semibold mt-3 inline-flex items-center gap-1">
                  View details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

