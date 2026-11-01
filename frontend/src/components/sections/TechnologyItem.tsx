import React from 'react';
import { Technology } from '../../data/ecosystem';

interface TechnologyItemProps {
  tech: Technology;
}

export const TechnologyItem: React.FC<TechnologyItemProps> = ({ tech }) => {
  return (
    <div
      className="group flex items-center gap-3 px-6 py-4 select-none cursor-default transition-all duration-200"
      title={`${tech.name} – ${tech.category}`}
    >
      {/* Brand Icon with authentic SVG rendering */}
      <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
        <svg
          viewBox={tech.viewBox}
          className="w-full h-full transition-all duration-200"
          style={{
            fill: tech.brandColor,
            filter: `drop-shadow(0 0 6px ${tech.brandColor}33)`,
          }}
          aria-hidden="true"
        >
          <path d={tech.svgPath} />
        </svg>
      </div>

      {/* Technology Name */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-slate-800 group-hover:text-primary transition-colors whitespace-nowrap">
          {tech.name}
        </span>

        {tech.badge && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
            {tech.badge}
          </span>
        )}
      </div>

      {/* Subtle Divider Dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-3" aria-hidden="true" />
    </div>
  );
};
