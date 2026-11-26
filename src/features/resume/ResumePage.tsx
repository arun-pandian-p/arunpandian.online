import React from 'react';
import { Download, Printer, Github, Linkedin, Mail, MapPin, ExternalLink, Calendar } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { socialLinks } from '../../data/navigation';
import { experiences } from '../../data/experience';
import { projects } from '../../data/projects';
import { skillGroups } from '../../data/skills';
import { PageTransition } from '../../components/layout/PageTransition';
import { useResume } from '../../context/ResumeContext';

export const ResumePage: React.FC = () => {
  const { resumeUrl, resumeFilename } = useResume();

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
              href={resumeUrl}
              download={resumeFilename}
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
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-primary mb-6">
              Engineering Experience
            </h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-foreground">{exp.role}</h3>
                      <p className="text-sm font-semibold text-primary">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{exp.description}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground pl-1">
                    {exp.achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Section */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-primary mb-4">
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillGroups.map((group) => (
                <div key={group.category} className="space-y-2">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">
                    {group.category}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {group.skills.map((s) => s.name).join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects Section */}
          <div>
            <h2 className="text-xs uppercase font-mono tracking-wider font-bold text-primary mb-4">
              Selected Software Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.slug} className="p-4 rounded-xl bg-surface-elevated border border-border/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">{proj.title}</h3>
                    <div className="flex items-center gap-2">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Demo <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                        >
                          Code <Github className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{proj.shortDescription}</p>
                  <p className="text-[11px] font-mono text-primary pt-1">
                    Stack: {proj.techStack.join(', ')}
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
