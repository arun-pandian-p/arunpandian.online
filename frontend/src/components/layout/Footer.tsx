import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { navItems, socialLinks } from '../../data/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#08090B] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 font-bold text-white group">
              <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-white/10 border border-white/15 shadow-xs group-hover:border-primary/60 transition-colors">
                <img
                  src="/logo.png"
                  alt="Arun Pandian Logo"
                  className="w-full h-full object-contain p-1 invert transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-0.5 text-lg">
                <span className="font-extrabold tracking-tighter text-white">AP</span>
                <span className="font-semibold text-slate-200">andian</span>
                <span className="text-primary font-black">.</span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Full-Stack Software Engineer building reliable web applications with React, TypeScript,
              Java 21, Spring Boot, REST APIs, and PostgreSQL.
            </p>

            {/* Always-Dark Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                aria-label="Email Arun Pandian"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 ml-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {socialLinks.location}
              </span>
            </div>
          </div>

          {/* Site Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Details */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider font-semibold text-white mb-4">
              Architecture
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Frontend deployed on Vercel. Stateless backend in Java 21 Spring Boot connected to
              PostgreSQL. Zero external tracking or bloated CMS overhead.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                React 19
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                Spring Boot 3
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                PostgreSQL
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Arun Pandian. Built with clean code and verifiable engineering.</p>
          <p className="font-mono text-[11px] text-slate-400">arunpandian.online</p>
        </div>
      </div>
    </footer>
  );
};
