import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { socialLinks } from '../../data/navigation';
import '../../styles/creativeHero.css';

gsap.registerPlugin(CustomEase);

export const CreativeHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const chamberRef = useRef<HTMLDivElement>(null);
  const namePathRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const chamber = chamberRef.current;
    if (!hero || !chamber) return;

    // Check for user reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Register signature easing from Animorio reference
    try {
      CustomEase.create('scatto', 'M0,0 C1,0 0.44,1 1,1');
    } catch {
      // Fallback if already created
    }

    const techBorder = hero.querySelector('.hero-tech-border');
    const corners = hero.querySelectorAll('.hero-corner');
    const blueprintPaths = chamber.querySelectorAll<SVGGeometryElement>('.portrait-blueprint path, .portrait-blueprint circle, .portrait-blueprint line');
    const splitLineTop = chamber.querySelector('.split-line--top');
    const splitLineBottom = chamber.querySelector('.split-line--bottom');
    const splitLineFill = chamber.querySelector('.split-line-fill');
    const splitPercent = chamber.querySelector<HTMLElement>('.split-percent');
    const portraitSweep = chamber.querySelector('.portrait-sweep');

    const helloText = hero.querySelector('.hero-hello');
    const nameSvgStroke = hero.querySelector('.hero-name-stroke');
    const nameTextSolid = hero.querySelector('.hero-name-solid');
    const roleText = hero.querySelector('.hero-role');
    const descText = hero.querySelector('.hero-desc');
    const socialIcons = hero.querySelectorAll('.hero-social-icon');
    const arrowPath = hero.querySelector<SVGPathElement>('.hero-arrow-path');
    const arrowHead = hero.querySelector('.hero-arrow-head');
    const arrowCircle = hero.querySelectorAll('.hero-arrow-circle');
    const bottomStats = hero.querySelector('.hero-bottom-stats');

    // Calculate stroke lengths for blueprint lines
    const blueprintLengths: number[] = [];
    blueprintPaths.forEach((el) => {
      let len = 400;
      try {
        if ('getTotalLength' in el) {
          len = Math.ceil(el.getTotalLength()) + 2;
        }
      } catch {
        len = 400;
      }
      blueprintLengths.push(len);
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });

    // Arrow path length
    let arrowLength = 200;
    if (arrowPath) {
      try {
        arrowLength = Math.ceil(arrowPath.getTotalLength()) + 2;
      } catch {
        arrowLength = 200;
      }
      gsap.set(arrowPath, { strokeDasharray: '6 5', strokeDashoffset: arrowLength });
    }

    const load = { p: 0 };
    const updateProgress = () => {
      chamber.style.setProperty('--p', (load.p / 100).toFixed(4));
      if (splitPercent) {
        splitPercent.textContent = `${Math.round(load.p)}%`;
      }
    };

    // If reduced motion is requested, immediately set final static state
    if (prefersReducedMotion) {
      chamber.style.setProperty('--open', '1');
      chamber.style.setProperty('--p', '1');
      gsap.set(techBorder, { opacity: 1 });
      gsap.set(corners, { opacity: 1, scale: 1 });
      gsap.set([splitLineTop, splitLineBottom, splitPercent], { opacity: 0 });
      gsap.set(blueprintPaths, { strokeDashoffset: 0, opacity: 0.2 });
      gsap.set(helloText, { yPercent: 0, opacity: 1 });
      gsap.set(nameSvgStroke, { opacity: 0 });
      gsap.set(nameTextSolid, { opacity: 1, y: 0 });
      gsap.set([roleText, descText], { yPercent: 0, opacity: 1 });
      gsap.set(socialIcons, { opacity: 1, scale: 1 });
      if (arrowPath) gsap.set(arrowPath, { strokeDashoffset: 0 });
      gsap.set([arrowHead, arrowCircle], { opacity: 1 });
      gsap.set(bottomStats, { opacity: 1, y: 0 });
      return;
    }

    // Set initial animated states
    chamber.style.setProperty('--open', '0');
    chamber.style.setProperty('--p', '0');
    gsap.set(techBorder, { opacity: 0 });
    gsap.set(corners, { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' });
    gsap.set(splitLineTop, { scaleY: 1, opacity: 1 });
    gsap.set(splitLineBottom, { opacity: 0 });
    gsap.set(splitPercent, { opacity: 1 });
    gsap.set(helloText, { yPercent: 105, opacity: 0 });
    gsap.set(nameSvgStroke, { opacity: 1, strokeDashoffset: 500, strokeDasharray: 500 });
    gsap.set(nameTextSolid, { opacity: 0 });
    gsap.set(roleText, { yPercent: 105, opacity: 0 });
    gsap.set(descText, { yPercent: 105, opacity: 0 });
    gsap.set(socialIcons, { opacity: 0, scale: 0.6 });
    if (arrowPath) gsap.set(arrowPath, { strokeDashoffset: arrowLength });
    gsap.set(arrowHead, { opacity: 0, scale: 0 });
    gsap.set(arrowCircle, { opacity: 0, scale: 0 });
    gsap.set(bottomStats, { opacity: 0, y: 15 });

    // Master Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Phase 1: Architectural Frame & Blueprint Tracing (0.0s – 1.4s)
    tl.to(techBorder, { opacity: 1, duration: 0.6 }, 0.1);
    tl.to(corners, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2.5)' }, 0.2);

    // Wireframe Blueprint Traces itself
    tl.to(blueprintPaths, {
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: { amount: 0.7, from: 'center' },
      ease: 'power1.out',
    }, 0.25);

    // Hairline Accent Line Tracing with Percentage HUD (0% -> 60% -> 100%)
    tl.to(load, { p: 65, duration: 0.85, ease: 'power2.out', onUpdate: updateProgress }, 0.2);
    tl.to(load, { p: 100, duration: 0.65, ease: 'power3.out', onUpdate: updateProgress }, 1.05);

    // Phase 2: Portrait Split Reveal (1.7s)
    // Breathe before splitting: hairline thickens slightly
    tl.to(splitLineTop, { scaleY: 2.2, duration: 0.14, ease: 'power2.out' }, 1.62);
    tl.to(splitLineTop, { scaleY: 1, duration: 0.18, ease: 'back.out(3)' }, 1.76);

    // Split: Top half runs up, bottom half runs down with signature 'scatto' cubic-bezier
    tl.set(splitLineBottom, { opacity: 1 }, 1.8);
    tl.to(chamber, { '--open': 1, duration: 0.85, ease: 'scatto' }, 1.8);

    // Fade percentage HUD and turn split lines into subtle borders
    tl.to(splitPercent, { opacity: 0, y: -6, duration: 0.25 }, 1.85);
    tl.to(splitLineFill, { opacity: 0.4, duration: 0.6 }, 2.0);
    tl.to(blueprintPaths, { opacity: 0.12, duration: 0.6 }, 2.0);

    // Specular Highlight Sweep over photograph on reveal
    tl.to(portraitSweep, { x: '100%', duration: 0.7, ease: 'power2.inOut' }, 2.15);
    tl.to([splitLineTop, splitLineBottom], { opacity: 0, duration: 0.4 }, 2.5);

    // Phase 3: Typographic Drawing & Content Reveal (1.9s – 2.8s)
    // 1. "HELLO! I'M" rises from mask
    tl.to(helloText, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 1.9);

    // 2. "Arun Pandian." stroked outline draws itself, then fills with solid vibrant amber
    tl.to(nameSvgStroke, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 2.05);
    tl.to(nameTextSolid, { opacity: 1, duration: 0.4, ease: 'power1.in' }, 2.45);
    tl.to(nameSvgStroke, { opacity: 0, duration: 0.3 }, 2.6);

    // 3. "Full-Stack Software Engineer" reveals smoothly
    tl.to(roleText, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 2.5);

    // 4. Description reveals line by line
    tl.to(descText, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 2.65);

    // 5. Social icons pop in with stagger
    tl.to(socialIcons, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      stagger: 0.08,
      ease: 'back.out(2)',
    }, 2.8);

    // Phase 4: S-Curved Arrow Tracing & Settling (2.9s – 3.4s)
    tl.to(arrowCircle, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(2)' }, 2.85);
    if (arrowPath) {
      tl.to(arrowPath, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, 2.95);
    }
    tl.to(arrowHead, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2.5)' }, 3.35);

    // Bottom statistics & signature settle in
    tl.to(bottomStats, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 3.1);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-frame-container relative w-full overflow-hidden bg-background pt-4 sm:pt-8 pb-12 sm:pb-16 transition-colors duration-200"
    >
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-amber-400/5 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-primary/5 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Maximum-Width Takeover Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between min-h-[640px] lg:min-h-[700px] relative">
        {/* Architectural Technical Frame & Corner Registration Crosses */}
        <div className="hero-tech-border" aria-hidden="true" />
        <svg className="hero-corner hero-corner--tl" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0v12M0 6h12" /></svg>
        <svg className="hero-corner hero-corner--tr" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0v12M0 6h12" /></svg>
        <svg className="hero-corner hero-corner--bl" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0v12M0 6h12" /></svg>
        <svg className="hero-corner hero-corner--br" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0v12M0 6h12" /></svg>

        {/* Top Statement Row */}
        <div className="w-full flex justify-end pt-3 pb-4">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground max-w-sm text-right leading-relaxed select-none">
            I build reliable software from interface to infrastructure, and I care deeply about craft.
          </p>
        </div>

        {/* Main Two-Column Desktop Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6">
          {/* Left Column: Typographic Illustration (~45%) */}
          <div className="lg:col-span-5 space-y-4 relative z-10">
            {/* 1. HELLO! I'M (Masked Reveal) */}
            <div className="text-mask-wrapper">
              <p className="hero-hello text-mask-content text-lg sm:text-xl font-bold font-mono tracking-widest text-muted-foreground uppercase">
                HELLO! I&apos;M
              </p>
            </div>

            {/* 2. Arun Pandian. (Custom Drawn Stroke + Solid Amber Fill) */}
            <div className="relative">
              {/* Animated SVG Stroke Outline */}
              <svg
                className="hero-name-stroke absolute inset-0 w-full h-[60px] sm:h-[72px] lg:h-[76px] pointer-events-none overflow-visible"
                viewBox="0 0 540 80"
                fill="none"
                aria-hidden="true"
              >
                <text
                  ref={namePathRef}
                  x="0"
                  y="62"
                  className="font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl tracking-tight"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ fontFamily: 'inherit', fontWeight: 900 }}
                >
                  Arun Pandian.
                </text>
              </svg>

              {/* Solid Final Typography */}
              <h1 className="hero-name-solid text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-amber-500 dark:text-amber-400 leading-none whitespace-normal xl:whitespace-nowrap">
                Arun Pandian.
              </h1>
            </div>

            {/* 3. Full-Stack Software Engineer (Masked Reveal) */}
            <div className="text-mask-wrapper">
              <p className="hero-role text-mask-content text-lg sm:text-xl font-semibold text-primary dark:text-[#38bdf8] tracking-wide">
                Full-Stack Software Engineer
              </p>
            </div>

            {/* 4. Description (Masked Reveal) */}
            <div className="text-mask-wrapper pt-1">
              <p className="hero-desc text-mask-content text-sm sm:text-base text-foreground/80 dark:text-slate-300 leading-relaxed max-w-md">
                I build thoughtful digital experiences and reliable software, from responsive
                interfaces to robust Java backend systems.
              </p>
            </div>

            {/* 5. Social Links (Staggered Pop-In) */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hero-social-icon w-10 h-10 rounded-full bg-surface hover:bg-primary hover:text-primary-foreground border border-border text-foreground flex items-center justify-center transition-all shadow-xs group"
              >
                <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hero-social-icon w-10 h-10 rounded-full bg-surface hover:bg-primary hover:text-primary-foreground border border-border text-foreground flex items-center justify-center transition-all shadow-xs group"
              >
                <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                aria-label="Email Arun Pandian"
                className="hero-social-icon w-10 h-10 rounded-full bg-surface hover:bg-primary hover:text-primary-foreground border border-border text-foreground flex items-center justify-center transition-all shadow-xs group"
              >
                <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Desktop Curved Dotted Arrow */}
          <div className="hidden lg:block absolute left-[38%] xl:left-[39%] top-[38%] w-48 h-28 pointer-events-none z-20 overflow-visible">
            <svg
              viewBox="0 0 180 100"
              fill="none"
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <circle cx="12" cy="72" r="5" className="hero-arrow-circle fill-amber-500 dark:fill-amber-400" />
              <circle cx="12" cy="72" r="9" className="hero-arrow-circle fill-amber-500/30 dark:fill-amber-400/30" />

              {/* S-Curve Dashed Path */}
              <path
                d="M 22 70 C 60 92, 100 78, 128 46 C 144 26, 158 24, 168 26"
                className="hero-arrow-path stroke-primary dark:stroke-[#38bdf8]"
                strokeWidth="2.75"
                strokeLinecap="round"
              />

              {/* Arrowhead */}
              <polygon
                points="176,27 163,18 165,34"
                className="hero-arrow-head fill-primary dark:fill-[#38bdf8]"
              />
            </svg>
          </div>

          {/* Mobile / Tablet Downward Curved Dotted Arrow */}
          <div className="block lg:hidden w-32 h-16 mx-auto my-1 pointer-events-none opacity-80">
            <svg viewBox="0 0 120 60" fill="none" className="w-full h-full overflow-visible" aria-hidden="true">
              <circle cx="60" cy="6" r="4" className="fill-amber-500 dark:fill-amber-400" />
              <path
                d="M 60 12 C 60 30, 56 38, 60 46"
                className="stroke-primary dark:stroke-[#38bdf8]"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />
              <polygon points="60,54 54,44 66,44" className="fill-primary dark:fill-[#38bdf8]" />
            </svg>
          </div>

          {/* Right Column: Architectural Drawing & Split-Opening Portrait (~55%) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end items-center relative py-4 lg:py-0 z-10">
            <div ref={chamberRef} className="portrait-chamber relative">
              {/* Layer 1: Underneath Architectural Blueprint Wireframe */}
              <svg
                className="portrait-blueprint"
                viewBox="0 0 380 380"
                aria-hidden="true"
              >
                {/* Concentric Guide Rings */}
                <circle cx="190" cy="190" r="185" strokeDasharray="3 4" />
                <circle cx="190" cy="190" r="172" strokeWidth="1.5" />
                <circle cx="190" cy="190" r="125" strokeDasharray="6 6" />
                <circle cx="190" cy="190" r="75" strokeWidth="1" />
                <circle cx="190" cy="190" r="18" strokeWidth="1.2" />

                {/* Axial Crosshairs */}
                <line x1="190" y1="5" x2="190" y2="375" strokeDasharray="5 5" />
                <line x1="5" y1="190" x2="375" y2="190" strokeDasharray="5 5" />

                {/* Diagonal Coordinates */}
                <line x1="60" y1="60" x2="320" y2="320" strokeDasharray="2 4" opacity="0.6" />
                <line x1="320" y1="60" x2="60" y2="320" strokeDasharray="2 4" opacity="0.6" />

                {/* Technical Calibration Notches */}
                <path d="M 190 10 L 190 24 M 190 356 L 190 370 M 10 190 L 24 190 M 356 190 L 370 190" strokeWidth="2" />
                <path d="M 63 63 L 73 73 M 317 317 L 307 307 M 317 63 L 307 73 M 63 317 L 73 307" strokeWidth="1.5" />

                {/* Architectural Coordinate Labels */}
                <text x="195" y="45" fill="#f59e0b" fontSize="9" fontFamily="monospace" letterSpacing="0.1em" opacity="0.8">00° // NOR</text>
                <text x="310" y="185" fill="#f59e0b" fontSize="9" fontFamily="monospace" letterSpacing="0.1em" opacity="0.8">90° // EST</text>
                <text x="195" y="348" fill="#f59e0b" fontSize="9" fontFamily="monospace" letterSpacing="0.1em" opacity="0.8">180° // SUD</text>
                <text x="25" y="185" fill="#f59e0b" fontSize="9" fontFamily="monospace" letterSpacing="0.1em" opacity="0.8">270° // OVR</text>
                <text x="75" y="235" fill="#f59e0b" fontSize="8" fontFamily="monospace" letterSpacing="0.15em" opacity="0.65">AP-2026 // SDE.SPEC</text>
              </svg>

              {/* Layer 2: Full Portrait with Animorio Split Mask */}
              <div className="portrait-revealed">
                {/* Ambient Glow */}
                <div className="absolute -inset-4 rounded-full bg-amber-400/20 dark:bg-[#38bdf8]/20 blur-2xl opacity-60" />

                {/* Circular Portrait with Golden / Sky Accent Border */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-[5px] border-amber-400/90 dark:border-[#38bdf8] shadow-2xl bg-surface-elevated">
                  <img
                    src="/arun-pandian.png"
                    alt="Arun Pandian – Full-Stack Software Engineer"
                    className="w-full h-full object-cover object-top"
                    width="380"
                    height="380"
                    loading="eager"
                  />
                  {/* Finishing Light Sweep */}
                  <div className="portrait-sweep" aria-hidden="true" />
                </div>
              </div>

              {/* Layer 3: Splitting Horizontal Hairlines */}
              <div className="split-line split-line--top" aria-hidden="true">
                <div className="split-line-fill" />
              </div>
              <div className="split-line split-line--bottom" aria-hidden="true" />

              {/* HUD Percentage Label running at hairline tip */}
              <div className="split-percent" aria-hidden="true">
                0%
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Information Row inside Hero */}
        <div className="hero-bottom-stats pt-8 mt-6 border-t border-border/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Verified Statistics */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {/* Stat 1: 2026 */}
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black text-amber-500 dark:text-amber-400 font-mono tracking-tight">
                2026
              </span>
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground leading-tight">
                <span className="block font-bold text-foreground">AI &amp; Data Science</span>
                <span>Graduate Candidate</span>
              </div>
            </div>

            <div className="h-8 w-px bg-border hidden sm:block" />

            {/* Stat 2: 03 Months */}
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black text-primary dark:text-[#38bdf8] font-mono tracking-tight">
                03
              </span>
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground leading-tight">
                <span className="block font-bold text-foreground">Months</span>
                <span>Industry Internship</span>
              </div>
            </div>
          </div>

          {/* Right: Signature & Role Title */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <span className="font-script text-2xl sm:text-3xl text-amber-500 dark:text-amber-400 font-bold tracking-wide">
              Building with purpose.
            </span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
              Full-Stack Software Engineer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
