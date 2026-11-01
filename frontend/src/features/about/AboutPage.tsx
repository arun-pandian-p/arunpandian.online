import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { SocialLinks } from '../../components/ui/SocialLinks';
import { PageTransition } from '../../components/layout/PageTransition';
import { Terminal, Database, Code2, Compass, GraduationCap, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
        {/* Page Header with Avatar Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-8 rounded-2xl bg-surface border border-border">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/30 shadow-md">
              <img
                src="/arun-pandian.png"
                alt="Arun Pandian"
                className="w-full h-full object-cover"
                width="112"
                height="112"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-surface" title="Open to opportunities" />
          </div>
          <div className="space-y-2 flex-1">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              // Background & Philosophy
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">About Arun Pandian</h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Full-Stack Software Engineer based in Coimbatore, Tamil Nadu, India. Focused on
              building modern web applications using React, Java, Spring Boot, REST APIs, and PostgreSQL.
            </p>
          </div>
        </div>

        {/* Narrative / Technical Journey */}
        <div className="space-y-8 text-base text-muted-foreground leading-relaxed">
          <div className="p-6 rounded-xl bg-surface border border-border">
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" />
              The Technical Journey
            </h3>
            <p className="mb-4">
              My engineering trajectory began in the analytical domains of Artificial Intelligence
              and Data Science. Working with complex statistical algorithms, raw data flows, and
              machine learning models quickly exposed a fundamental truth: models and analyses are only as
              impactful as the software architecture supporting them.
            </p>
            <p>
              This insight drove my transition into comprehensive full-stack software development. I
              wanted to design entire product lifecycles — from responsive React user interfaces down
              to robust Java backend services, transactional relational schemas in PostgreSQL, and
              rock-solid API contracts.
            </p>
          </div>

          {/* Core Focus Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h4 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-500" />
                Frontend Engineering
              </h4>
              <p className="text-sm">
                I prioritize clean, modular component structures with React and TypeScript. I care
                about fast loading times, zero layout shifts, predictable state management, and
                keyboard accessibility.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface border border-border">
              <h4 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-500" />
                Backend Engineering
              </h4>
              <p className="text-sm">
                In Java and Spring Boot, I emphasize object-oriented design, separation of concerns,
                strict DTO validation, comprehensive exception handling, and abuse protection
                middleware.
              </p>
            </div>
          </div>

          {/* Education & Academic Rigor */}
          <div className="p-6 rounded-xl bg-surface border border-border">
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-500" />
              Education
            </h3>
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-foreground">
                Bachelor of Technology in Artificial Intelligence & Data Science
              </h4>
              <p className="text-sm text-primary font-mono">2022 – 2026 | Coimbatore, Tamil Nadu, India</p>
            </div>
            <p className="mt-3 text-sm">
              Core coursework includes Data Structures and Algorithms, Object-Oriented Programming,
              Database Management Systems, Computer Networks, Operating Systems, Machine Learning, and
              Software Engineering principles.
            </p>
          </div>

          {/* Engineering Problem-Solving Approach */}
          <div className="p-6 rounded-xl bg-surface border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-500" />
              Problem-Solving Approach
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Start with Data Models:</strong> A coherent relational schema with
                  declarative constraints prevents an enormous class of runtime defects before a
                  single line of business logic is written.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Boundaries:</strong> Decouple client components, API transport
                  DTOs, service layers, and persistence models. Avoid leaking database entities to the
                  client.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Defensive Validation:</strong> Validate on both client (for immediate user
                  feedback) and server (for uncompromised data integrity).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Career Goals & Availability */}
        <div className="p-8 rounded-xl bg-surface-elevated border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-foreground">Open to New Opportunities</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-lg">
              Seeking fresher Software Development Engineer roles and engineering internships where I
              can contribute high-quality React and Java code to production systems.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/contact">
              <Button>Get in Touch</Button>
            </Link>
            <Link to="/resume">
              <Button variant="outline">View Resume</Button>
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="pt-6 border-t border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Connect with Arun:</span>
          <SocialLinks showLocation={true} />
        </div>
      </div>
    </PageTransition>
  );
};

