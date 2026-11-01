import React from 'react';
import { TechnologyMarquee } from './TechnologyMarquee';

export const TechnologyEcosystem: React.FC = () => {
  return (
    <section
      className="technology-ecosystem w-full !bg-white text-slate-900 relative overflow-hidden mb-0 border-t border-slate-200/90 shadow-[0_-25px_50px_rgba(0,0,0,0.08)] transition-colors duration-200"
      style={{
        borderTopLeftRadius: 'clamp(32px, 5vw, 64px)',
        borderTopRightRadius: 'clamp(32px, 5vw, 64px)',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#FFFFFF',
      }}
      aria-label="Production Stack and Technology Ecosystem"
    >
      {/* 1. Subtle Technical Dot Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* 2. Soft Ambient Lighting / Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[260px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Section Header (Centered max-w-7xl Container) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 pb-6">
          {/* Left Pill Label */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-500/30 text-emerald-700 font-mono text-xs font-semibold tracking-wider w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            PRODUCTION STACK &amp; ECOSYSTEM
          </div>

          {/* Right Monospaced Detail */}
          <div className="text-xs font-mono text-slate-500 tracking-widest uppercase flex items-center gap-2">
            <span>12+ TECHNOLOGIES</span>
            <span className="text-slate-300">·</span>
            <span>BUILT FOR MODERN SOFTWARE</span>
          </div>
        </div>
      </div>

      {/* 4. Full-Width Animated Technology Marquee */}
      <div className="relative z-10 w-full pb-10 sm:pb-14">
        <TechnologyMarquee />
      </div>

      {/* 5. Top Inner Accent Hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent pointer-events-none" />
    </section>
  );
};
