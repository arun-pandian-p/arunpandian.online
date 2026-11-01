import React from 'react';
import { Download, Printer, Github, Linkedin, Mail, MapPin, ExternalLink, Calendar } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { socialLinks } from '../../data/navigation';
import { experiences } from '../../data/experience';
import { projects } from '../../data/projects';
import { skillGroups } from '../../data/skills';
import { PageTransition } from '../../components/layout/PageTransition';

export const ResumePage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-8">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <SectionHeading
            eyebrow="Curriculum Vitae"
            title="Arun Pandian — Resume"
            description="Verified full-stack software engineer profile, academic credentials, and project history."
            className="mb-0"
          />

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-surface-elevated transition-colors"
            >
              <Printer className="w-4 h-4 text-muted-foreground" />
              <span>Print</span>
            </button>
            <a
              href="/resume.pdf"
              download="Arun_Pandian_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button icon={<Download className="w-4 h-4" />}>Download PDF</Button>
            </a>
          </div>
        </div>

        {/* Resume Sheet View */}
        <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-border shadow-sm space-y-10 print:border-none print:shadow-none print:p-0">
          {/* Header Contact Block */}
          <div className="border-b border-border pb-8">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              Arun Pandian
            </h1>
            <p className="text-base font-semibold text-primary mt-1">
              Full-Stack Software Engineer
            </p>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              Full-stack developer focused on building modern web applications using React,
              Java, Spring Boot, REST APIs, and PostgreSQL. B.Tech in Artificial Intelligence & Data
              Science (Class of 2026).
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {socialLinks.location}
              </span>
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary" />
                {socialLinks.email}
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-primary" />
                LinkedIn
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-primary" />
                GitHub
              </a>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-primary mb-4">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Bachelor of Technology — Artificial Intelligence & Data Science
                </h3>
                <p className="text-sm text-muted-foreground">Anna University Affiliated Institution</p>
              </div>
              <div className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                2022 – 2026 | Coimbatore, India
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming (Java),
              Database Management Systems (PostgreSQL/SQL), Operating Systems, Software Engineering.
            </p>
          </div>

          {/* Experience Section */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-primary mb-4">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-foreground">{exp.role}</h3>
                      <p className="text-sm font-semibold text-primary">{exp.company}</p>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period} | {exp.location}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-muted-foreground pl-1">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span className="text-foreground">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Section */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-primary mb-4">
              Featured Software Engineering Projects
            </h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.slug} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                        {proj.title}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground inline-flex items-center"
                            aria-label="GitHub link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </h3>
                      <span className="text-xs font-mono text-primary font-medium">
                        {proj.techStack.join(' • ')}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {proj.solution}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground pl-1">
                    {proj.keyFeatures.slice(0, 3).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Section */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-primary mb-4">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {skillGroups.map((group) => (
                <div key={group.category} className="space-y-1">
                  <h4 className="font-bold text-foreground font-mono">{group.category}</h4>
                  <p className="text-muted-foreground">
                    {group.skills.map((s) => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

