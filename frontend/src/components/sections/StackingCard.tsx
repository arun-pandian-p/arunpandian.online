import React from 'react';
import { Terminal, Github, ExternalLink } from 'lucide-react';
import { FeaturedProjectCard } from '../../data/featuredProjects';

interface StackingCardProps {
  project: FeaturedProjectCard;
  index: number;
  totalCards: number;
}

export const StackingCard: React.FC<StackingCardProps> = ({ project, index }) => {
  return (
    <li
      id={`card_${index + 1}`}
      className="card"
      style={{
        '--index': index + 1,
        '--index0': index,
      } as React.CSSProperties}
    >
      <div
        className="card__content w-full rounded-2xl sm:rounded-3xl bg-surface dark:bg-[#0f1523] border border-border/90 dark:border-white/10 shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-200"
        style={{
          zIndex: index + 1,
        }}
      >
        <div className="p-6 sm:p-10 lg:p-12">
          {/* Top Header Row */}
          <div className="flex items-center justify-between border-b border-border/80 dark:border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-4">
              {/* Oversized Numbering */}
              <span className={`text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tighter ${project.accentColor}`}>
                {project.number}
              </span>

              {/* Category Label */}
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase">
                  Featured Project
                </span>
                <span className={`text-xs sm:text-sm font-mono font-bold tracking-wider ${project.accentColor}`}>
                  // {project.category}
                </span>
              </div>
            </div>

            {/* Direct GitHub Link */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-elevated border border-border dark:border-white/10 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all group"
              title={`View ${project.title} on GitHub`}
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Repository</span>
              <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Card Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-mono font-semibold text-primary mb-1">
                  {project.tagline}
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Architectural Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-3 rounded-xl bg-surface-elevated/70 border border-border/70 dark:border-white/5"
                  >
                    <span className="block text-[11px] font-mono text-muted-foreground uppercase truncate">
                      {metric.label}
                    </span>
                    <span className="block text-sm sm:text-base font-bold text-foreground mt-0.5">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technology Tags */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Technologies &amp; Architecture
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-md bg-surface-elevated border border-border/80 dark:border-white/10 text-foreground font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary-hover shadow-xs transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Source Code</span>
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-elevated border border-border text-foreground text-xs sm:text-sm font-medium hover:border-primary/50 transition-colors"
                  >
                    <span>Architecture Docs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Architectural Code Preview Column */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden bg-[#070b14] border border-white/10 shadow-lg text-slate-300 font-mono text-xs">
                {/* Code Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] text-slate-400 font-medium">
                      {project.codePreview.filename}
                    </span>
                  </div>
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                </div>

                {/* Code Window Content */}
                <pre className="p-4 overflow-x-auto text-[11.5px] leading-relaxed text-slate-300 bg-[#060911]/90">
                  <code>{project.codePreview.snippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
