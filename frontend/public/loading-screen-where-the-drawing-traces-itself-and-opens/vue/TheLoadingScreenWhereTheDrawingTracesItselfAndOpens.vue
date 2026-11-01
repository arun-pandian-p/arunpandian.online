<!--
  "The loading screen where the drawing traces itself and opens" from Animorio · https://animorio.com
  License: free on your own sites and your clients’ sites, paid work included.
  Not for resale, redistribution, templates or code collections · https://animorio.com/en/license/
-->
<script setup>
/* The loading screen where the drawing traces itself and opens, as a Vue 3 component. Made by Animorio from the demo's own code.
   npm install gsap @fontsource-variable/mona-sans @fontsource-variable/geist-mono
   A few lookups still use document: with two copies of this component on one page, scope them to the container. */

import { ref, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import '@fontsource-variable/mona-sans';
import '@fontsource-variable/geist-mono';

gsap.registerPlugin(CustomEase);

const container = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const cleanups = [];
    let mounted = true;
    const addPageListener = (target, ...args) => { target.addEventListener(...args); cleanups.push(() => target.removeEventListener(...args)); };
    const pageFontsReady = new Promise((resolve) => document.fonts.ready.then(() => mounted && resolve()));

    /* The loading screen where the drawing traces itself and opens
       The loading screen of an invented AI agent for architects. The elevation of a house draws itself line by line while
       a thin orange line grows under it with the percentage at its tip, and a small card lights up its start-up list one
       line at a time. At 100 the line splits in two: one half runs up, the other down, they turn grey and become the edges
       of the sheet, and between them the full drawing opens, with its concrete, glass and hatched shadows. Then the title
       rises word by word in the place of the card. After a while it plays again. */

    /* ---- valori da cambiare ---- */
    const DRAW = 1.3;             /* seconds each line of the drawing takes to draw itself */
    const DRAW_SPREAD = 3;        /* seconds between the first line starting and the last one */
    const LOAD_FIRST = 3;         /* seconds the loading takes to reach 60 percent */
    const LOAD_SECOND = 2.5;      /* seconds from 60 to 100 percent */
    const SPLIT = 0.8;            /* seconds the line takes to split and open the drawing */
    const BOOT_STAGGER = 0.3;     /* seconds between two lines of the start-up list */
    const HOLD = 4.5;             /* seconds the open drawing stays before it plays again */
    const ACCENT = '#f15534';     /* the loading line, the corners and the marks */
    const SPEED = 1;              /* 2 = twice as fast, 0.5 = half as fast */

    const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (s) => document.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const NS = 'http://www.w3.org/2000/svg';

    gsap.registerPlugin(CustomEase);
    /* the curve of the split, the same cubic-bezier(1, 0, 0.44, 1) as the site it comes from */
    CustomEase.create('scatto', 'M0,0 C1,0 0.44,1 1,1');
    gsap.globalTimeline.timeScale(SPEED);
    document.documentElement.style.setProperty('--accento', ACCENT);

    /* ------------------------------------------------------------ the drawing: one list of lines for both layers */
    const LINEE = [
      'M30 340 H770',
      'M196 122 H574 V130 H196 Z',
      'M210 130 H560 V230 H210 Z',
      'M210 138 H560',
      'M226 146 H418 V214 H226 Z',
      'M274 146 V214 M322 146 V214 M370 146 V214',
      'M226 196 H418',
      'M226 180 H274',
      'M440 150 H544 V214 H440 Z',
      'M492 150 V214',
      'M436 145 H548',
      'M236 230 H624 V238 H236 Z',
      'M250 238 V340 M610 238 V340',
      'M222 238 V340 M228 238 V340',
      'M276 252 H392 V340 M276 252 V340',
      'M286 248 H354',
      'M300 270 H340 V340 M300 270 V340',
      'M334 302 V312',
      'M296 340 V344 H344 V340',
      'M420 254 H596 V318 H420 Z',
      'M464 254 V318 M508 254 V318 M552 254 V318',
      'M414 322 H602',
      'M250 290 H276 M392 290 H420 M596 290 H610',
      'M606 138 V230',
      'M560 176 H604 V230',
      'M560 200 H604',
      'M572 176 V200 M584 176 V200 M594 176 V200',
      'M196 122 V104 H360 V122',
      'M232 104 V122 M268 104 V122 M304 104 V122 M340 104 V122',
      'M420 122 V96 H520 V122',
      'M436 96 V122 M504 96 V122',
      'M150 340 V330 H170 V320 H190 V310 H210 V300 H222',
      'M150 340 L222 300',
      'M624 300 H712 V340 M624 300 V340',
      'M620 296 H716 V300 H620 Z',
      'M640 340 V328 H690 V340',
      'M650 328 C652 316 662 314 664 326 C668 314 680 316 680 328',
      'M40 348 H130 M600 348 H760',
      'M110 340 C112 300 108 270 112 230',
      'M111 292 C96 278 86 264 80 246',
      'M112 270 C126 256 136 244 140 226',
      'M112 252 C104 240 100 224 94 208',
      'M111 238 C118 224 120 208 126 196',
      'M86 260 L72 254 M134 240 L148 236 M98 224 L88 214',
      'M80 246 L72 236 M140 226 L146 214 M126 196 L124 184',
      'M730 340 C728 304 732 276 728 238',
      'M729 296 C744 282 754 268 760 250',
      'M728 276 C714 262 704 250 700 232',
      'M729 258 C736 246 740 230 746 216',
      'M728 244 C722 230 720 216 714 204',
      'M754 262 L768 256 M706 246 L692 242 M742 228 L752 220',
      'M760 250 L768 240 M700 232 L694 220 M714 204 L716 192'
    ];

    /* the full drawing: concrete, glass, interiors and hatched shadows under the same lines */
    const PIENI = [
      ['rect', { x: 196, y: 122, width: 378, height: 8, fill: '#cfcdc4' }],
      ['rect', { x: 210, y: 130, width: 350, height: 100, fill: 'url(#cemento)' }],
      ['rect', { x: 226, y: 146, width: 192, height: 68, fill: 'url(#vetro)' }],
      ['rect', { x: 440, y: 150, width: 104, height: 64, fill: 'url(#vetro)' }],
      ['rect', { x: 236, y: 230, width: 388, height: 8, fill: '#cfcdc4' }],
      ['rect', { x: 250, y: 238, width: 360, height: 102, fill: '#e6e4dc' }],
      ['rect', { x: 210, y: 238, width: 40, height: 102, fill: 'url(#tratteggio)' }],
      ['rect', { x: 250, y: 238, width: 360, height: 12, fill: 'rgba(40,40,40,.13)' }],
      ['rect', { x: 276, y: 252, width: 116, height: 88, fill: 'url(#dentro)' }],
      ['rect', { x: 300, y: 270, width: 40, height: 70, fill: '#5d605d' }],
      ['rect', { x: 420, y: 254, width: 176, height: 64, fill: 'url(#vetro)' }],
      ['rect', { x: 420, y: 254, width: 176, height: 10, fill: 'rgba(40,40,40,.18)' }],
      ['rect', { x: 210, y: 130, width: 350, height: 8, fill: 'rgba(40,40,40,.1)' }],
      ['rect', { x: 624, y: 300, width: 88, height: 40, fill: '#d8d6ce' }],
      ['rect', { x: 620, y: 296, width: 96, height: 4, fill: '#c5c3ba' }],
      ['rect', { x: 420, y: 96, width: 100, height: 26, fill: '#dcdad2' }],
      ['path', { d: 'M150 340 V330 H170 V320 H190 V310 H210 V300 H222 V340 Z', fill: 'url(#tratteggio)' }],
      ['path', { d: 'M226 214 L418 146 V214 Z', fill: 'rgba(255,255,255,.22)' }],
      ['path', { d: 'M420 318 L596 254 V318 Z', fill: 'rgba(255,255,255,.2)' }],
      ['rect', { x: 30, y: 340, width: 740, height: 10, fill: 'url(#tratteggio)', opacity: 0.5 }]
    ];

    const sheet = $('[data-sheet]');
    const linesSvg = $('[data-lines]');
    const fillsG = $('[data-fills]');
    const strokesG = $('[data-strokes]');

    const paths = LINEE.map((d) => {
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      linesSvg.appendChild(p);
      const q = document.createElementNS(NS, 'path');
      q.setAttribute('d', d);
      strokesG.appendChild(q);
      return p;
    });
    for (const [tag, attrs] of PIENI) {
      const el = document.createElementNS(NS, tag);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      fillsG.appendChild(el);
    }
    const lengths = paths.map((p) => {
      let l = 2000;
      try { l = Math.ceil(p.getTotalLength()) + 2; } catch (e) { /* not measurable yet */ }
      return l || 2000;
    });

    /* the drawing lines keep about one pixel on screen at any size (a non-scaling stroke would break the dashes) */
    function fitStroke() {
      const w = sheet.getBoundingClientRect().width || 800;
      sheet.style.setProperty('--tratto', (1.15 * 800 / w).toFixed(3));
    }
    fitStroke();
    addPageListener(window, 'resize', fitStroke);

    /* the title, split into words with a mask each */
    const title = $('[data-title]');
    const words = title.textContent.trim().split(/\s+/);
    title.setAttribute('aria-label', title.textContent.trim());
    title.innerHTML = words.map((w) => `<span class="parola" aria-hidden="true"><span class="parola__dentro">${w}</span></span>`).join(' ');
    const wordIns = $$('.parola__dentro', title);

    const pctEl = $('[data-pct]');
    const pctWrap = $('[data-pct-wrap]');
    const lineTop = $('[data-line-top]');
    const lineFill = $('[data-line-fill]');
    const lineBottom = $('[data-line-bottom]');
    const card = $('[data-card]');
    const boot = $$('[data-boot] li');
    const bootOk = $$('[data-boot] b');
    const sub = $('[data-sub]');
    const corners = $$('.angolo');
    const marks = $$('[data-marks] rect');
    const fullSvg = $('[data-full]');
    const stateIn = $('[data-state-in]');
    const replay = $('[data-replay]');

    const load = { p: 0 };
    function showLoad() {
      sheet.style.setProperty('--p', (load.p / 100).toFixed(4));
      pctEl.textContent = Math.round(load.p);
    }

    function setState(text) {
      gsap.timeline()
        .to(stateIn, { yPercent: -110, duration: 0.25, ease: 'power2.in' })
        .add(() => { stateIn.textContent = text; })
        .fromTo(stateIn, { yPercent: 110 }, { yPercent: 0, duration: 0.45, ease: 'back.out(2.2)' });
    }

    function reset() {
      load.p = 0;
      showLoad();
      gsap.set(sheet, { '--apri': 0 });
      paths.forEach((p, i) => gsap.set(p, { strokeDasharray: lengths[i], strokeDashoffset: lengths[i], stroke: '#282828' }));
      gsap.set(lineTop, { scaleY: 1, opacity: 1 });
      gsap.set(lineFill, { backgroundColor: ACCENT });
      gsap.set(lineBottom, { opacity: 0 });
      gsap.set(pctWrap, { opacity: 1, y: 0 });
      gsap.set(card, { opacity: 1, y: 0 });
      gsap.set(boot, { opacity: 0.25 });
      gsap.set(bootOk, { opacity: 0, x: -4 });
      gsap.set(wordIns, { yPercent: 105 });
      gsap.set(sub, { opacity: 0, y: 6 });
      gsap.set(corners, { opacity: 0, scale: 0.4 });
      gsap.set(marks, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(fullSvg, { opacity: 1 });
      gsap.set(replay, { autoAlpha: 0, y: 6 });
      stateIn.textContent = 'Loading';
    }

    let tl;
    function build() {
      tl = gsap.timeline({ paused: true });
      const t0 = 0.2;

      /* the drawing traces itself */
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: DRAW,
        ease: 'power1.out',
        stagger: { amount: DRAW_SPREAD, from: 'start' }
      }, t0);

      /* the loading: 0 to 60, then 60 to 100 */
      tl.to(load, { p: 60, duration: LOAD_FIRST, ease: 'power2.out', onUpdate: showLoad }, t0);
      tl.to(load, { p: 100, duration: LOAD_SECOND, ease: 'power3.out', onUpdate: showLoad }, t0 + LOAD_FIRST);

      /* the start-up list lights up line by line, and each line says ok a moment later */
      tl.to(boot, { opacity: 1, duration: 0.25, ease: 'power3.out', stagger: BOOT_STAGGER * 1.6 }, t0 + 0.5);
      tl.to(bootOk, { opacity: 1, x: 0, duration: 0.3, ease: 'power3.out', stagger: BOOT_STAGGER * 1.6 }, t0 + 0.75);

      const split = t0 + LOAD_FIRST + LOAD_SECOND;

      /* our settle: the full line thickens for a beat, as if it were taking a breath before splitting */
      tl.to(lineTop, { scaleY: 2.4, duration: 0.14, ease: 'power2.out' }, split - 0.18);
      tl.to(lineTop, { scaleY: 1, duration: 0.3, ease: 'back.out(3)' }, split - 0.04);

      /* the split: one half runs up, the other down, and the full drawing opens between them */
      tl.set(lineBottom, { opacity: 1 }, split);
      tl.to(sheet, { '--apri': 1, duration: SPLIT, ease: 'scatto' }, split);
      tl.to(lineFill, { backgroundColor: '#b3b3af', duration: SPLIT * 0.6, ease: 'power1.inOut' }, split + SPLIT * 0.2);
      tl.to(paths, { stroke: '#b3b3af', duration: 0.6, ease: 'power1.inOut' }, split + 0.2);
      tl.to([pctWrap, card], { opacity: 0, y: -4, duration: 0.4, ease: 'power2.in' }, split);
      tl.add(() => setState('Ready'), split + 0.1);

      /* the corners and the two marks of the drawing */
      tl.to(corners, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.4)', stagger: 0.06 }, split + SPLIT * 0.75);
      tl.to(marks, { scale: 1, duration: 0.45, ease: 'back.out(3)', stagger: 0.12 }, split + SPLIT + 0.2);

      /* the title rises word by word from its mask, where the card was */
      tl.to(wordIns, { yPercent: 0, duration: 0.5, ease: 'power3.out', stagger: 0.02 }, split + SPLIT * 0.7);
      tl.to(sub, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, split + SPLIT + 0.15);
      tl.to(replay, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, split + SPLIT + 0.6);

      /* hold, then everything fades back to the empty sheet and plays again */
      const end = split + SPLIT + 0.6 + HOLD;
      tl.to([fullSvg, $$('.parola', title), sub, corners, replay, lineTop, lineBottom], { opacity: 0, duration: 0.5, ease: 'power1.in' }, end);
      tl.to(paths, { opacity: 0, duration: 0.5, ease: 'power1.in' }, end);
      tl.add(() => play(), end + 0.6);
    }

    function play() {
      if (tl) tl.kill();
      gsap.set($$('.parola', title), { opacity: 1 });
      gsap.set(paths, { opacity: 1 });
      reset();
      build();
      tl.play(0);
    }

    function finalState() {
      reset();
      load.p = 100;
      showLoad();
      gsap.set(paths, { strokeDashoffset: 0, stroke: '#b3b3af' });
      gsap.set(sheet, { '--apri': 1 });
      gsap.set(lineFill, { backgroundColor: '#b3b3af' });
      gsap.set(lineBottom, { opacity: 1 });
      gsap.set([pctWrap, card], { opacity: 0 });
      gsap.set(wordIns, { yPercent: 0 });
      gsap.set([sub, corners, marks], { opacity: 1, y: 0, scale: 1 });
      gsap.set(replay, { autoAlpha: 1, y: 0 });
      stateIn.textContent = 'Ready';
    }

    if (REDUCED) {
      /* nothing moves: the open drawing and the title fade in, already in place */
      finalState();
      gsap.from(['[data-sheet]', '.coda', '.testa'], { opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power1.out' });
      replay.addEventListener('click', () => {
        gsap.fromTo(['[data-sheet]', '.coda'], { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.12 });
      });
    } else {
      replay.addEventListener('click', play);
      (document.fonts && pageFontsReady ? pageFontsReady : Promise.resolve()).then(play);
    }

    return () => {
      cleanups.forEach((undo) => undo());
      mounted = false;
    };
  }, container.value);
});

onBeforeUnmount(() => ctx.revert());
</script>

<template>
  <div ref="container" style="display: contents">
    <div class="pagina">
      <header class="testa">
        <a class="marchio" href="#" aria-label="Egret, home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18 L11 6 L13 10 L21 4" /><path d="M11 6 L9 19" /></svg>
          <span>Egret</span>
        </a>
        <span class="stato mono" data-state aria-live="polite"><span class="stato__dentro" data-state-in>Loading</span></span>
      </header>

      <main class="palco">
        <div class="disegno" data-sheet>
          <svg class="disegno__linee" data-lines viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg>
          <svg class="disegno__pieno" data-full viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
              <linearGradient id="vetro" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#9ea2a0" />
                <stop offset=".55" stop-color="#c3c6c2" />
                <stop offset="1" stop-color="#d9dbd6" />
              </linearGradient>
              <linearGradient id="dentro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#7c7f7c" />
                <stop offset="1" stop-color="#b9bbb6" />
              </linearGradient>
              <pattern id="tratteggio" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#282828" stroke-width=".7" stroke-opacity=".55" />
              </pattern>
              <pattern id="cemento" width="14" height="14" patternUnits="userSpaceOnUse">
                <rect width="14" height="14" fill="#e3e1d9" />
                <circle cx="3" cy="4" r=".6" fill="#b9b7ae" /><circle cx="10" cy="9" r=".5" fill="#c4c2b9" /><circle cx="6" cy="12" r=".4" fill="#aeaca4" />
              </pattern>
            </defs>
            <g data-fills></g>
            <g data-strokes></g>
            <g class="segni" data-marks>
              <rect x="321" y="291" width="7" height="7" />
              <rect x="563" y="193" width="7" height="7" />
            </g>
          </svg>

          <span class="filo filo--sopra" data-line-top><span class="filo__tratto" data-line-fill></span></span>
          <span class="filo filo--sotto" data-line-bottom></span>
          <span class="percento mono" data-pct-wrap><span data-pct>0</span>%</span>
          <span class="angolo angolo--a" aria-hidden="true"></span><span class="angolo angolo--b" aria-hidden="true"></span>
          <span class="angolo angolo--c" aria-hidden="true"></span><span class="angolo angolo--d" aria-hidden="true"></span>
        </div>

        <div class="coda">
          <section class="scheda mono" data-card aria-label="Loading">
            <dl class="scheda__dati">
              <dt class="scheda__titolo">Welcome to Egret</dt>
              <dt>Type</dt><dd>AI agent for architects</dd>
              <dt>Founded</dt><dd>2026</dd>
              <dt>Works in</dt><dd>Your drawing tools</dd>
            </dl>
            <ul class="scheda__avvio" data-boot>
              <li><span>Load the model</span><b>ok</b></li>
              <li><span>Read the drawings</span><b>ok</b></li>
              <li><span>Find the levels</span><b>ok</b></li>
              <li><span>Check the codes</span><b>ok</b></li>
              <li><span>Measure the stairs</span><b>ok</b></li>
              <li><span>Check the doors</span><b>ok</b></li>
              <li><span>Draft the notes</span><b>ok</b></li>
              <li><span>Start</span><b>ok</b></li>
            </ul>
          </section>

          <section class="titolo" data-title-wrap>
            <h1 class="titolo__riga" data-title>An AI agent that works inside your drawings</h1>
            <p class="titolo__sotto mono" data-sub>Egret reads your model, flags what breaks the code and fixes it once you say yes.</p>
          </section>
        </div>
      </main>

      <button class="ancora mono" type="button" data-replay aria-label="Play the loading screen again">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8a5 5 0 1 1-1.6-3.7" /><path d="M13 2.6v3.2H9.8" /></svg>
        <span>Replay</span>
      </button>
    </div>
  </div>
</template>

<!-- not scoped: the script builds part of the markup itself, and those elements would miss Vue's scoped attribute -->
<style>
/* The loading screen where the drawing traces itself and opens: drawing paper, one ink, warm greys, one orange. */
:root {
  --carta: #f3f2ec;          /* the paper of the page */
  --inchiostro: #282828;     /* the ink of the drawing and the type */
  --grigio: #b3b3af;         /* the lines once the drawing has opened, and the frame */
  --grigio-scuro: #72726f;   /* the secondary text */
  --accento: #f15534;        /* the loading line, the corner marks and the marks on the drawing */
  --screen: 100vh;
}
@supports (height: 100lvh) {
  :root { --screen: 100lvh; }
}

* { box-sizing: border-box; }
html,
body {
  margin: 0;
  height: 100%;
}
body {
  background: var(--carta);
  color: var(--inchiostro);
  font-family: 'Mona Sans Variable', 'Helvetica Neue', Arial, sans-serif;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
/* the grain of the paper */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.32;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .44 0 0 0 0 .4 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
}
.mono {
  font-family: 'Geist Mono Variable', ui-monospace, Menlo, monospace;
  font-size: clamp(9px, min(1.05vw, 1.9vh), 12px);
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

/* ------------------------------------------------------------ the page and its thin frame */
.pagina {
  position: relative;
  height: var(--screen);
  max-height: 100vh;
  padding: clamp(12px, 2.4vmin, 24px);
  display: grid;
  grid-template-rows: auto 1fr;
  gap: clamp(8px, 2vh, 18px);
}
.pagina::before {
  content: '';
  position: absolute;
  inset: clamp(6px, 1.2vmin, 12px);
  border: 1px solid rgba(179, 179, 175, 0.6);
  pointer-events: none;
}
.testa {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(4px, 1vw, 10px);
}
.marchio {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--inchiostro);
  text-decoration: none;
  font-weight: 640;
  font-size: clamp(13px, min(1.5vw, 2.6vh), 17px);
  letter-spacing: -0.01em;
}
.marchio svg {
  width: 1.3em;
  height: 1.3em;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.stato {
  display: inline-block;
  overflow: hidden;
  height: 1.3em;
  color: var(--grigio-scuro);
}
.stato__dentro { display: inline-block; }

/* ------------------------------------------------------------ the stage */
.palco {
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 2.4vh, 22px);
}
.disegno {
  --apri: 0;   /* 0 = closed on the loading line, 1 = the full drawing open between the two edges */
  --p: 0;      /* the loading, 0 to 1 */
  position: relative;
  width: min(100%, calc((100vh - 24vh - 120px) * 2), 980px);
  aspect-ratio: 2 / 1;
  flex: none;
}
.disegno svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.disegno__linee path {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: var(--tratto, 1.6);
  stroke-linecap: round;
  stroke-linejoin: round;
}
.disegno__pieno {
  clip-path: inset(calc(50% - 50% * var(--apri)) -2% calc(50% - 50% * var(--apri)) -2%);
}
.disegno__pieno [data-strokes] path {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 1.1;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
.segni rect { fill: var(--accento); }

/* the loading line: one hairline that grows, then splits into the two edges of the sheet */
.filo {
  position: absolute;
  left: 0;
  right: 0;
  height: 1.5px;
  margin-top: -0.75px;
  pointer-events: none;
}
.filo--sopra { top: calc(50% - 50% * var(--apri)); }
.filo--sotto {
  top: calc(50% + 50% * var(--apri));
  background: var(--grigio);
  opacity: 0;
}
.filo__tratto {
  position: absolute;
  inset: 0;
  background: var(--accento);
  transform: scaleX(var(--p));
  transform-origin: 0 50%;
}
.percento {
  position: absolute;
  top: calc(50% + 7px);
  left: calc(var(--p) * 100%);
  transform: translateX(calc(-100% * var(--p)));
  color: var(--accento);
  white-space: nowrap;
  font-variant-numeric: normal;
}

/* the orange corner marks of the sheet, as on a drawing board */
.angolo {
  position: absolute;
  width: 11px;
  height: 11px;
  opacity: 0;
}
.angolo::before,
.angolo::after {
  content: '';
  position: absolute;
  background: var(--accento);
}
.angolo::before { left: 5px; top: 0; width: 1px; height: 11px; }
.angolo::after { top: 5px; left: 0; height: 1px; width: 11px; }
.angolo--a { left: -6px; top: -6px; }
.angolo--b { right: -6px; top: -6px; }
.angolo--c { left: -6px; bottom: -6px; }
.angolo--d { right: -6px; bottom: -6px; }

/* ------------------------------------------------------------ under the drawing: the card, then the title in its place */
.coda {
  width: min(100%, calc((100vh - 24vh - 120px) * 2), 980px);
  height: clamp(104px, 20vh, 150px);
  display: grid;
  flex: none;
}
.scheda,
.titolo {
  grid-area: 1 / 1;
  min-width: 0;
}
.scheda {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
  gap: clamp(10px, 3vw, 40px);
  align-content: start;
  color: var(--inchiostro);
}
.scheda__dati {
  margin: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1.6em;
  row-gap: 0.45em;
  align-content: start;
}
.scheda__dati dt { color: var(--grigio-scuro); }
.scheda__dati dd { margin: 0; }
.scheda__titolo {
  grid-column: 1 / -1;
  color: var(--inchiostro) !important;
  padding-bottom: 0.3em;
  border-bottom: 1px solid var(--grigio);
  margin-bottom: 0.2em;
}
.scheda__avvio {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: column;
  grid-template-rows: repeat(4, auto);
  column-gap: 1.6em;
  row-gap: 0.45em;
  align-content: start;
}
.scheda__avvio li {
  display: flex;
  justify-content: space-between;
  gap: 0.8em;
  opacity: 0.25;
  white-space: nowrap;
}
.scheda__avvio li span { overflow: hidden; text-overflow: ellipsis; }
.scheda__avvio b {
  font-weight: 400;
  color: var(--accento);
  opacity: 0;
}

.titolo {
  align-self: start;
  pointer-events: none;
}
.titolo__riga {
  margin: 0;
  font-weight: 560;
  font-stretch: 112%;
  font-size: clamp(21px, min(4.2vw, 6.6vh), 54px);
  line-height: 1;
  letter-spacing: -0.025em;
  max-width: 17em;
}
.parola {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
}
.parola__dentro { display: inline-block; }
.titolo__sotto {
  margin: clamp(8px, 1.6vh, 14px) 0 0;
  color: var(--grigio-scuro);
  text-transform: none;
  max-width: 44em;
  opacity: 0;
}

/* ------------------------------------------------------------ replay */
.ancora {
  position: absolute;
  right: clamp(14px, 2.6vmin, 26px);
  bottom: clamp(14px, 2.6vmin, 26px);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 1px solid var(--grigio);
  border-radius: 2px;
  background: var(--carta);
  color: var(--inchiostro);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: border-color 0.2s, color 0.2s;
}
.ancora svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.5s cubic-bezier(0.34, 1.6, 0.5, 1);
}
.ancora:active { transform: scale(0.96); }
.ancora:focus-visible { outline: 1px solid var(--accento); outline-offset: 2px; }
@media (hover: hover) {
  .ancora:hover { border-color: var(--accento); color: var(--accento); }
  .ancora:hover svg { transform: rotate(-200deg); }
}

/* ------------------------------------------------------------ phone */
@media (max-width: 640px) {
  .scheda { grid-template-columns: 1fr; gap: 0.7em; }
  .scheda__dati dt:not(.scheda__titolo),
  .scheda__dati dd { display: none; }
  .ancora { padding: 5px 8px; }
}
@media (max-height: 360px) {
  .titolo__sotto { display: none; }
}
</style>
