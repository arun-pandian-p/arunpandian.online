import React from 'react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { skillGroups } from '../../data/skills';
import { SkillBadge } from '../../components/ui/SkillBadge';
import { PageTransition } from '../../components/layout/PageTransition';
import { Code2, Server, Database, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend Engineering':
        return <Code2 className="w-5 h-5 text-blue-500" />;
      case 'Backend Engineering':
        return <Server className="w-5 h-5 text-indigo-500" />;
      case 'Database Architecture':
        return <Database className="w-5 h-5 text-purple-500" />;
      case 'Developer Tools & DevOps':
        return <Wrench className="w-5 h-5 text-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
        <div>
          <SectionHeading
            eyebrow="Technical Capabilities"
            title="Skills & Technologies"
            description="Verified software engineering skills categorized by domain. Every technology indicates whether it has been deployed in actual engineering projects."
          />

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-surface border border-border text-xs text-muted-foreground">
            <span className="font-semibold text-foreground uppercase font-mono tracking-wider">
              Proficiency Status:
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Proficient (Daily Production Use)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              <span>Familiar (Applied in Projects)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground uppercase font-mono px-1.5 py-0.5 rounded bg-surface-elevated border border-border">
                PROJ
              </span>
              <span>Used in Repositories</span>
            </div>
          </div>
        </div>

        {/* Skill Category Cards */}
        <div className="space-y-8">
          {skillGroups.map((group) => (
            <div key={group.category} className="p-6 sm:p-8 rounded-xl bg-surface border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-surface-elevated border border-border">
                  {getCategoryIcon(group.category)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{group.category}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{group.description}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    usedInProjects={skill.usedInProjects}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Integrity Statement */}
        <div className="p-6 rounded-xl bg-surface-elevated border border-border text-xs text-muted-foreground space-y-2">
          <h4 className="font-bold text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Engineering Transparency
          </h4>
          <p>
            This portfolio deliberately rejects arbitrary proficiency percentages (such as &quot;95% Java&quot;
            or &quot;80% React&quot;) because arbitrary numerical scores misrepresent real-world software
            engineering competence. Skills listed here are supported by tangible code in GitHub
            repositories and verified projects.
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

