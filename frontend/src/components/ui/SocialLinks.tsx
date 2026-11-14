import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { socialLinks } from '../../data/navigation';

interface SocialLinksProps {
  className?: string;
  showLocation?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  showLocation = false,
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-elevated border border-transparent hover:border-border transition-colors duration-200"
      >
        <Github className="w-5 h-5" />
      </a>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-elevated border border-transparent hover:border-border transition-colors duration-200"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href={`mailto:${socialLinks.email}`}
        aria-label="Email Arun Pandian"
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-elevated border border-transparent hover:border-border transition-colors duration-200"
      >
        <Mail className="w-5 h-5" />
      </a>
      {showLocation && (
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground ml-2">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          {socialLinks.location}
        </span>
      )}
    </div>
  );
};

