import React from 'react';
import { ecosystemTechnologies } from '../../data/ecosystem';
import { TechnologyItem } from './TechnologyItem';

export const TechnologyMarquee: React.FC = () => {
  // Duplicate technologies array once so translateX(-50%) provides a seamless infinite loop
  const marqueeItems = [...ecosystemTechnologies, ...ecosystemTechnologies];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Left Gradient Fade Mask (White background) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Right Gradient Fade Mask (White background) */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Scrolling Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        {marqueeItems.map((tech, index) => (
          <TechnologyItem key={`${tech.id}-${index}`} tech={tech} />
        ))}
      </div>
    </div>
  );
};
