import React from 'react';

interface SkillBadgeProps {
  name: string;
  level?: 'Proficient' | 'Familiar' | 'Learning';
  usedInProjects?: boolean;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  level = 'Proficient',
  usedInProjects = true,
}) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-border text-foreground hover:border-primary/50 transition-colors duration-150 text-sm shadow-sm group">
      <span
        className={`w-2 h-2 rounded-full ${
          level === 'Proficient'
            ? 'bg-blue-500'
            : level === 'Familiar'
            ? 'bg-indigo-400'
            : 'bg-emerald-400'
        }`}
        title={`Status: ${level}`}
      />
      <span className="font-medium text-foreground">{name}</span>
      {usedInProjects && (
        <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider ml-1 bg-surface-elevated px-1.5 py-0.5 rounded border border-border/50">
          PROJ
        </span>
      )}
    </div>
  );
};

