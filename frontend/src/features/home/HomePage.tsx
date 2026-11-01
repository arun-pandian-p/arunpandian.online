import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Server, Cpu } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { skillGroups } from '../../data/skills';
import { PageTransition } from '../../components/layout/PageTransition';
import { CreativeHero } from '../../components/home/CreativeHero';
import { TechnologyEcosystem } from '../../components/sections/TechnologyEcosystem';
import { StackingCards } from '../../components/sections/StackingCards';

export const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <div className="w-full relative">
        {/* 1. Bounded Sticky Hero Stage: Partially sticks for ~35vh, gets covered, then moves away */}
        <div className="relative w-full hero-scroll-track" style={{ minHeight: '135vh' }}>
          <div className="sticky top-20 z-10 w-full hero-sticky-container">
            <CreativeHero />
          </div>
        </div>

        {/* 2. Stacking Content Layer (Slides OVER the Sticky Hero like a Stacking Card, then hero moves) */}
        <div className="relative z-20 w-full -mt-[35vh] bg-background transition-colors duration-200">
          {/* White Card: Technology Ecosystem with Rounded Top Shoulders */}
          <TechnologyEcosystem />

          {/* 3. Scroll-Driven Stacking Cards – Featured Projects (The Single Project Section on HomePage) */}
          <StackingCards />

          {/* 4. Editorial & Technical Detail Sections */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28 pt-8 pb-20">
            {/* Technical Skills Preview */}
            <section>
              <SectionHeading
                eyebrow="Technical Stack"
                title="Technologies &amp; Tools"
                description="Production technologies applied across commercial internships and engineering repositories."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillGroups.slice(0, 3).map((group) => (
                  <div key={group.category} className="p-6 rounded-xl bg-surface border border-border">
                    <h3 className="text-base font-bold text-foreground mb-1">{group.category}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{group.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="text-xs px-2.5 py-1 rounded-md bg-surface-elevated text-foreground border border-border/80 font-mono"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/skills"
                  className="text-sm font-semibold text-primary hover:text-primary-hover inline-flex items-center gap-1"
                >
                  View detailed technical breakdown <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            {/* Education & Experience Brief */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-xl bg-surface border border-border">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-2">
                  <Cpu className="w-4 h-4" /> Academic Background
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  B.Tech Artificial Intelligence &amp; Data Science
                </h3>
                <p className="text-sm text-muted-foreground mt-1">2022 – 2026 | Coimbatore, Tamil Nadu</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Synthesizing rigorous mathematical data foundations, algorithm design, and modern
                  distributed systems engineering into practical full-stack software development.
                </p>
                <div className="mt-4">
                  <Link
                    to="/about"
                    className="text-xs font-semibold text-primary hover:text-primary-hover inline-flex items-center gap-1"
                  >
                    View full curriculum and background <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-8 rounded-xl bg-surface border border-border">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider mb-2">
                  <Server className="w-4 h-4" /> Commercial Experience
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Full Stack Developer Intern – Better Tomorrow
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Jun 2024 – Aug 2024 (3 Months)</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Engineered core platform services, designed relational PostgreSQL schemas, and implemented
                  secure RESTful APIs while collaborating with cross-functional engineering leads.
                </p>
                <div className="mt-4">
                  <Link
                    to="/experience"
                    className="text-xs font-semibold text-primary hover:text-primary-hover inline-flex items-center gap-1"
                  >
                    Read verified internship summary <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Contact CTA Banner */}
            <section className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-surface to-surface-elevated border border-border text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Interested in working together?
              </h2>
              <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                I am actively interviewing for fresher Software Development Engineer (SDE) roles and
                engineering internships.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg">Send a Message</Button>
                </Link>
                <Link to="/resume">
                  <Button variant="outline" size="lg">
                    View Full Resume
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
