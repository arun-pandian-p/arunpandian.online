import React from 'react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { experiences } from '../../data/experience';
import { PageTransition } from '../../components/layout/PageTransition';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
        <div>
          <SectionHeading
            eyebrow="Industry Background"
            title="Professional Experience"
            description="Verified software engineering internship experience delivering full-stack features and relational database systems."
          />
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-border space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />

              <div className="p-6 sm:p-8 rounded-xl bg-surface border border-border hover:border-primary/40 transition-colors">
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    <Briefcase className="w-3.5 h-3.5" />
                    {exp.type}
                  </span>
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Company & Role */}
                <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                <h4 className="text-base font-semibold text-primary mb-4">{exp.company}</h4>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Verified Achievements */}
                <div className="space-y-3 mb-6">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    Verified Deliverables & Responsibilities
                  </h5>
                  <ul className="space-y-2.5 text-sm text-foreground">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h5 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2.5">
                    Technologies Applied
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded bg-surface-elevated text-foreground border border-border/80 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Context */}
        <div className="p-6 rounded-xl bg-surface-elevated border border-border text-sm text-muted-foreground">
          <p>
            <strong>Note on Experience:</strong> Arun Pandian is a final-year B.Tech undergraduate
            (Class of 2026). All listed experience represents genuine internship contributions. No
            work history is fabricated or inflated.
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

