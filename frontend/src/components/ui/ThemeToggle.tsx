import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-elevated border border-transparent hover:border-border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-45 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 hover:-rotate-12 text-slate-700" />
      )}
    </button>
  );
};

