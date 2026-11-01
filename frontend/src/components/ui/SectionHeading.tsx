import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  return (
    <div
      className={`mb-12 ${align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary mb-2 font-mono">
          // {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

