import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Primary links excluding resume which is placed on right as button
  const headerNavItems = navItems.filter((item) => item.path !== '/resume');

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (path === '/projects' && location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('featured-projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-surface dark:bg-[#080d1a] border-b border-border transition-all duration-200 ${
        scrolled ? 'shadow-sm' : 'shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Monogram / Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold text-xl sm:text-2xl tracking-tight text-foreground hover:opacity-90 transition-opacity focus:outline-none group"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-surface border border-border shadow-xs group-hover:border-primary/50 transition-colors">
            <img
              src="/logo.png"
              alt="Arun Pandian Monogram Logo"
              className="w-full h-full object-contain p-1 dark:invert transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex items-center gap-0.5">
            <span className="font-extrabold tracking-tighter">AP</span>
            <span className="font-semibold text-foreground/90">andian</span>
            <span className="text-primary font-black">.</span>
          </div>
        </Link>

        {/* Center Pill Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-surface/80 dark:bg-surface/50 border border-border/80 backdrop-blur-xs text-sm">
          {headerNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={(e) => handleNavClick(e, item.path)}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-full transition-all duration-150 ${
                  isActive
                    ? 'font-semibold text-primary dark:text-primary border border-primary/25 bg-primary/10 shadow-xs'
                    : 'text-muted-foreground hover:text-foreground font-medium'
                }`
              }
            >
              {({ isActive }) => (isActive ? `( ${item.label} )` : item.label)}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA Button & Theme Switcher */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download="Arun_Pandian_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-xs sm:text-sm hover:bg-primary-hover shadow-xs transition-colors"
          >
            <span>Download Resume</span>
            <Download className="w-3.5 h-3.5" />
          </a>

          <ThemeToggle />

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fade-in">
          {headerNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={(e) => handleNavClick(e, item.path)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10 font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface-elevated'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-border flex flex-col gap-3">
            <a
              href="/resume.pdf"
              download="Arun_Pandian_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm text-center shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
