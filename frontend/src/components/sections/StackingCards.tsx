import React from 'react';
import { featuredProjectCards } from '../../data/featuredProjects';
import { StackingCard } from './StackingCard';

export const StackingCards: React.FC = () => {
  return (
    <section
      id="featured-projects"
      className="relative w-full bg-background pt-12 sm:pt-16 pb-20 transition-colors duration-200 overflow-visible scroll-mt-24"
      aria-label="Featured Projects – Stacking Cards"
    >
      {/* Anchor for nav links referencing #projects */}
      <div id="projects" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        {/* Editorial Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary tracking-widest uppercase mb-3">
            <span>// PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed italic">
            Engineering real-world products, intelligent systems, and developer tools.
          </p>
        </div>

        {/* Scroll-Driven Stacking Cards Container */}
        <ul id="cards" className="w-full">
          {featuredProjectCards.map((project, index) => (
            <StackingCard
              key={project.id}
              project={project}
              index={index}
              totalCards={featuredProjectCards.length}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
