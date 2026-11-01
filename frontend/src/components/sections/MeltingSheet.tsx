import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/meltingSheet.css';

gsap.registerPlugin(ScrollTrigger);

export const MeltingSheet: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgClipPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;
    const cleanups: (() => void)[] = [];

    const addListener = (target: EventTarget, type: string, listener: EventListenerOrEventListenerObject) => {
      target.addEventListener(type, listener);
      cleanups.push(() => target.removeEventListener(type, listener));
    };

    /* ---- Tuning Parameters (Fine-Tuned for Progressive Scroll Melting) ---- */
    const PASSO = 14;   /* Grid cell size in px */
    const SCALA = 190;  /* Noise patch size in px */
    const BANDA = 120;  /* Band width of contour disintegration in px */
    const ONDA = 2.2;   /* Pronounced organic liquid wave displacement */
    const VITA = 0.12;  /* Autonomous drift speed per second */
    const MORSO = 2.4;  /* Cursor bite depth */
    const RAGGIO = 85;  /* Cursor bite radius in px */
    const DA = 1.04;    /* At 0% scroll: intact sheet covering full viewport */
    const A = -0.16;    /* At 100% scroll: sheet completely dissolved */

    const scena = container.matches('[data-scena]') ? container : container.querySelector<HTMLElement>('[data-scena]');
    const palco = container.querySelector<HTMLElement>('[data-palco]');
    const foglio = container.querySelector<HTMLElement>('[data-foglio]');
    const tela = container.querySelector<HTMLCanvasElement>('[data-tela]');

    if (!scena || !palco || !foglio || !tela) {
      console.warn('MeltingSheet missing elements:', { scena, palco, foglio, tela });
      return;
    }

    /* ---------------------------------------------------------------- Canvas Painting */
    function dipingi() {
      if (!tela) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const W = tela.clientWidth || window.innerWidth;
      const H = tela.clientHeight || window.innerHeight;
      if (W === 0 || H === 0) return;

      tela.width = Math.round(W * dpr);
      tela.height = Math.round(H * dpr);
      const g = tela.getContext('2d');
      if (!g) return;

      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const orizzonte = H * 0.58;

      /* Twilight Sky Gradient */
      const cielo = g.createLinearGradient(0, 0, 0, orizzonte);
      cielo.addColorStop(0, '#1c1b2e');
      cielo.addColorStop(0.35, '#2e2547');
      cielo.addColorStop(0.68, '#7A4E78');
      cielo.addColorStop(0.88, '#E0875A');
      cielo.addColorStop(1, '#F6B26B');
      g.fillStyle = cielo;
      g.fillRect(0, 0, W, orizzonte);

      /* Sun at Horizon */
      const sx = W * 0.32;
      const r = Math.min(W, H) * 0.12;
      g.fillStyle = '#FFE0A8';
      g.beginPath();
      g.arc(sx, orizzonte, r, Math.PI, 0);
      g.fill();

      /* Twilight Ocean Gradient blending into near-black footer */
      const mare = g.createLinearGradient(0, orizzonte, 0, H);
      mare.addColorStop(0, '#1a2e45');
      mare.addColorStop(0.4, '#132133');
      mare.addColorStop(1, '#08090B');
      g.fillStyle = mare;
      g.fillRect(0, orizzonte, W, H - orizzonte);

      /* Golden Ripples on Water */
      for (let k = 0; k < 28; k++) {
        const y = orizzonte + 6 + (k * k) * 0.85 + k * 3;
        if (y > H) break;
        const largo = r * (1.6 - k * 0.04) * (0.7 + ((k * 37) % 10) / 20);
        g.fillStyle = `rgba(255, 224, 168, ${Math.max(0, 0.55 - k * 0.018)})`;
        g.fillRect(sx - largo / 2 + Math.sin(k * 1.7) * r * 0.18, y, largo, 2 + k * 0.12);
      }

      /* Silhouetted Rock & Lighthouse (Right Side) */
      const fx = W * 0.8;
      g.fillStyle = '#0a0912';
      g.beginPath();
      g.moveTo(W * 0.58, H);
      g.bezierCurveTo(W * 0.64, orizzonte + H * 0.1, W * 0.7, orizzonte + H * 0.02, fx - W * 0.04, orizzonte - H * 0.02);
      g.lineTo(fx + W * 0.06, orizzonte - H * 0.03);
      g.bezierCurveTo(W * 0.9, orizzonte + H * 0.02, W * 0.96, orizzonte + H * 0.12, W, orizzonte + H * 0.1);
      g.lineTo(W, H);
      g.closePath();
      g.fill();

      /* Lighthouse Tower */
      const base = orizzonte - H * 0.02;
      const alto = H * 0.32;
      const lb = W * 0.03;
      const la = W * 0.018;
      g.beginPath();
      g.moveTo(fx - lb, base);
      g.lineTo(fx - la, base - alto);
      g.lineTo(fx + la, base - alto);
      g.lineTo(fx + lb, base);
      g.closePath();
      g.fill();
      g.fillRect(fx - la * 1.35, base - alto - H * 0.012, la * 2.7, H * 0.012);

      /* Beacon Lantern & Light Beam */
      const lx = fx;
      const ly = base - alto - H * 0.036;
      g.fillStyle = '#FFE9B0';
      g.fillRect(lx - la * 0.8, ly, la * 1.6, H * 0.026);
      g.fillStyle = '#0a0912';
      g.beginPath();
      g.moveTo(lx - la, ly);
      g.lineTo(lx, ly - H * 0.032);
      g.lineTo(lx + la, ly);
      g.closePath();
      g.fill();

      /* Atmospheric Light Beam */
      g.globalCompositeOperation = 'lighter';
      const fascio = g.createLinearGradient(lx, ly, lx - W * 0.65, ly - H * 0.05);
      fascio.addColorStop(0, 'rgba(255, 233, 176, 0.5)');
      fascio.addColorStop(1, 'rgba(255, 233, 176, 0)');
      g.fillStyle = fascio;
      g.beginPath();
      g.moveTo(lx, ly + H * 0.012);
      g.lineTo(lx - W * 0.75, ly - H * 0.16);
      g.lineTo(lx - W * 0.75, ly + H * 0.1);
      g.closePath();
      g.fill();
      g.globalCompositeOperation = 'source-over';
    }

    /* ---------------------------------------------------------------- 3D Value Noise */
    function casuale(i: number, j: number, k: number) {
      let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(k, 1274126177)) | 0;
      h = Math.imul(h ^ (h >>> 13), 1274126177);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
    }

    function valore(x: number, y: number, z: number) {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const k = Math.floor(z);
      const fx = x - i;
      const fy = y - j;
      const fz = z - k;
      const u = fx * fx * (3 - 2 * fx);
      const v = fy * fy * (3 - 2 * fy);
      const w = fz * fz * (3 - 2 * fz);
      const m = (a: number, b: number, t: number) => a + (b - a) * t;
      return m(
        m(m(casuale(i, j, k), casuale(i + 1, j, k), u), m(casuale(i, j + 1, k), casuale(i + 1, j + 1, k), u), v),
        m(m(casuale(i, j, k + 1), casuale(i + 1, j, k + 1), u), m(casuale(i, j + 1, k + 1), casuale(i + 1, j + 1, k + 1), u), v),
        w,
      );
    }

    function rumore(x: number, y: number, t: number) {
      return (
        valore(x, y, t) * 0.6 +
        valore(x * 2.1 + 5.2, y * 2.1 + 1.3, t * 1.6) * 0.28 +
        valore(x * 4.3 + 9.1, y * 4.3 + 3.7, t * 2.3) * 0.12
      ) * 2 - 1;
    }

    /* ---------------------------------------------------------------- Marching Squares Grid */
    let W = 0;
    let H = 0;
    let nx = 0;
    let ny = 0;
    let campo: Float32Array;
    let puntiX: Float32Array;
    let puntiY: Float32Array;
    let vicinoA: Int32Array;
    let vicinoB: Int32Array;
    let visto: Uint8Array;

    function misura() {
      if (!palco) return;
      W = palco.clientWidth || window.innerWidth;
      H = palco.clientHeight || window.innerHeight;
      nx = Math.ceil(W / PASSO) + 2;
      ny = Math.ceil(H / PASSO) + 2;
      const nodi = (nx + 1) * (ny + 1);
      campo = new Float32Array(nodi);
      puntiX = new Float32Array(nodi * 2);
      puntiY = new Float32Array(nodi * 2);
      vicinoA = new Int32Array(nodi * 2);
      vicinoB = new Int32Array(nodi * 2);
      visto = new Uint8Array(nodi * 2);
      dipingi();
      disegna();
    }

    let tempo = 0;
    let livello = DA;
    let morsoX = 0;
    let morsoY = 0;
    let morsoForza = 0;

    function calcolaCampo() {
      if (!campo || H === 0) return;
      const bordo = livello * H;
      const vicino = ONDA + MORSO + 0.5;
      const r2 = 2 * RAGGIO * RAGGIO;
      const lontano = RAGGIO * 3;

      for (let j = 0; j <= ny; j++) {
        const y = (j - 1) * PASSO;
        const base = (bordo - y) / BANDA;
        const riga = j * (nx + 1);
        const conRumore = Math.abs(base) < vicino || (morsoForza > 0.001 && Math.abs(y - morsoY) < lontano);

        for (let i = 0; i <= nx; i++) {
          if (i === 0 || j === 0 || i === nx || j === ny) {
            campo[riga + i] = -1;
            continue;
          }
          if (!conRumore) {
            campo[riga + i] = base;
            continue;
          }
          const x = (i - 1) * PASSO;
          let v = base + rumore(x / SCALA, y / SCALA, tempo) * ONDA;
          if (morsoForza > 0.001) {
            const dx = x - morsoX;
            const dy = y - morsoY;
            if (Math.abs(dx) < lontano && Math.abs(dy) < lontano) {
              v -= MORSO * morsoForza * Math.exp(-(dx * dx + dy * dy) / r2);
            }
          }
          campo[riga + i] = v;
        }
      }
    }

    function contorno(): string {
      if (!campo || !vicinoA) return '';
      vicinoA.fill(-1);
      vicinoB.fill(-1);
      visto.fill(0);
      const colonne = nx + 1;
      const orizzontale = (i: number, j: number) => (j * colonne + i) * 2;
      const verticale = (i: number, j: number) => (j * colonne + i) * 2 + 1;

      const punto = (chiave: number) => {
        if (vicinoA[chiave] !== -1 || vicinoB[chiave] !== -1) return;
        const n = chiave >> 1;
        const i = n % colonne;
        const j = (n - i) / colonne;
        const a = campo[n];
        if (chiave & 1) {
          const b = campo[n + colonne];
          const t = a / (a - b);
          puntiX[chiave] = (i - 1) * PASSO;
          puntiY[chiave] = (j - 1 + t) * PASSO;
        } else {
          const b = campo[n + 1];
          const t = a / (a - b);
          puntiX[chiave] = (i - 1 + t) * PASSO;
          puntiY[chiave] = (j - 1) * PASSO;
        }
      };

      const lega = (k1: number, k2: number) => {
        punto(k1);
        punto(k2);
        if (vicinoA[k1] === -1) vicinoA[k1] = k2; else vicinoB[k1] = k2;
        if (vicinoA[k2] === -1) vicinoA[k2] = k1; else vicinoB[k2] = k1;
      };

      for (let j = 0; j < ny; j++) {
        for (let i = 0; i < nx; i++) {
          const a = campo[j * colonne + i];
          const b = campo[j * colonne + i + 1];
          const c = campo[(j + 1) * colonne + i + 1];
          const d = campo[(j + 1) * colonne + i];
          const caso = (a > 0 ? 8 : 0) | (b > 0 ? 4 : 0) | (c > 0 ? 2 : 0) | (d > 0 ? 1 : 0);
          if (caso === 0 || caso === 15) continue;

          const su = orizzontale(i, j);
          const giu = orizzontale(i, j + 1);
          const sx = verticale(i, j);
          const dx = verticale(i + 1, j);
          const centro = (a + b + c + d) / 4 > 0;

          switch (caso) {
            case 1: case 14: lega(sx, giu); break;
            case 2: case 13: lega(giu, dx); break;
            case 3: case 12: lega(sx, dx); break;
            case 4: case 11: lega(su, dx); break;
            case 6: case 9: lega(su, giu); break;
            case 7: case 8: lega(sx, su); break;
            case 5:
              if (centro) { lega(sx, su); lega(giu, dx); } else { lega(su, dx); lega(sx, giu); }
              break;
            case 10:
              if (centro) { lega(su, dx); lega(sx, giu); } else { lega(sx, su); lega(giu, dx); }
              break;
            default: break;
          }
        }
      }

      const pezzi: string[] = [];
      const f = (n: number) => Math.round(n * 10) / 10;
      for (let k = 0; k < vicinoA.length; k++) {
        if (vicinoA[k] === -1 || visto[k]) continue;
        let prima = -1;
        let ora = k;
        const linea = [`M${f(puntiX[k])} ${f(puntiY[k])}`];
        let passi = 0;
        while (passi++ < 200000) {
          visto[ora] = 1;
          const dopo = vicinoA[ora] !== prima ? vicinoA[ora] : vicinoB[ora];
          if (dopo === -1 || dopo === k) break;
          linea.push(`${f(puntiX[dopo])} ${f(puntiY[dopo])}`);
          prima = ora;
          ora = dopo;
        }
        pezzi.push(`${linea.join(' L')}Z`);
      }
      return pezzi.join('');
    }

    function disegna() {
      if (!foglio) return;
      calcolaCampo();
      const d = contorno();
      if (!d) {
        foglio.style.clipPath = 'path("M0 0Z")';
        return;
      }

      /* 1. Direct SVG clipPath update (100% universal support across all browsers) */
      if (svgClipPathRef.current) {
        svgClipPathRef.current.setAttribute('d', d);
      }

      /* 2. Direct CSS clip-path with progressive enhancement */
      let applied = false;
      try {
        foglio.style.clipPath = `path(evenodd, "${d}")`;
        (foglio.style as unknown as { webkitClipPath: string }).webkitClipPath = `path(evenodd, "${d}")`;
        if (foglio.style.clipPath) applied = true;
      } catch {
        applied = false;
      }

      if (!applied) {
        try {
          foglio.style.clipPath = `path("${d}")`;
          (foglio.style as unknown as { webkitClipPath: string }).webkitClipPath = `path("${d}")`;
          if (foglio.style.clipPath) applied = true;
        } catch {
          applied = false;
        }
      }

      if (!applied) {
        foglio.style.clipPath = 'url(#melting-sheet-clip)';
        (foglio.style as unknown as { webkitClipPath: string }).webkitClipPath = 'url(#melting-sheet-clip)';
      }
    }

    /* ---------------------------------------------------------------- Interactive Scroll & Pointer Loop */
    misura();

    /* Direct viewport scroll tracking (immune to stale ScrollTrigger cache or route transitions) */
    const calcolaMeta = () => {
      const rect = scena.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return 0;
      return Math.max(0, Math.min(1, -rect.top / total));
    };

    let meta = calcolaMeta();

    const trigger = ScrollTrigger.create({
      trigger: scena,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (s) => {
        meta = Math.max(s.progress, calcolaMeta());
      },
    });
    cleanups.push(() => trigger.kill());

    /* Pointer tracking for bite indentation */
    let dentro = false;
    let mx = 0;
    let my = 0;

    const segui = (e: PointerEvent) => {
      const r = palco.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if (!dentro) {
        morsoX = mx;
        morsoY = my;
      }
      dentro = true;
    };

    palco.addEventListener('pointermove', segui, { passive: true });
    palco.addEventListener('pointerdown', segui, { passive: true });
    const onLeave = () => { dentro = false; };
    palco.addEventListener('pointerleave', onLeave);
    palco.addEventListener('pointercancel', onLeave);
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') dentro = false;
    };
    palco.addEventListener('pointerup', onUp);

    cleanups.push(() => {
      palco.removeEventListener('pointermove', segui);
      palco.removeEventListener('pointerdown', segui);
      palco.removeEventListener('pointerleave', onLeave);
      palco.removeEventListener('pointercancel', onLeave);
      palco.removeEventListener('pointerup', onUp);
    });

    const onScroll = () => {
      meta = calcolaMeta();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    /* Continuous 60fps noise wave animation loop */
    const tickerCb = (_t: number, dt: number) => {
      if (!mounted) return;
      const s = Math.min(dt, 64) / 1000;
      tempo += s * VITA;

      const progress = Math.max(meta, calcolaMeta());
      const facile = (x: number) => x * x * (3 - 2 * x);
      const voluto = DA + (A - DA) * facile(progress);

      livello += (voluto - livello) * (1 - Math.exp(-7 * s));
      morsoForza += ((dentro ? 1 : 0) - morsoForza) * (1 - Math.exp(-(dentro ? 5 : 2.2) * s));
      morsoX += (mx - morsoX) * (1 - Math.exp(-9 * s));
      morsoY += (my - morsoY) * (1 - Math.exp(-9 * s));
      disegna();
    };

    gsap.ticker.add(tickerCb);
    cleanups.push(() => gsap.ticker.remove(tickerCb));

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        misura();
        ScrollTrigger.refresh();
      }, 100);
    };
    addListener(window, 'resize', handleResize);
    cleanups.push(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
    });

    return () => {
      mounted = false;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section ref={containerRef} className="melting-scena" data-scena="" aria-label="Melting Portfolio Sheet">
      {/* Hidden Universal SVG ClipPath fallback */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="melting-sheet-clip" clipPathUnits="userSpaceOnUse">
            <path ref={svgClipPathRef} clipRule="evenodd" d="M0 0Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="melting-palco" data-palco="">
        {/* Underlying Cinematic Canvas Stage */}
        <div className="melting-fotogramma">
          <canvas className="melting-tela" data-tela="" aria-hidden="true" />
          <p className="melting-frase" aria-hidden="true">
            <span>Building with purpose</span>
            <span>Interface to Infrastructure</span>
          </p>
        </div>

        {/* Foreground Melting Sheet (Organic Marching Squares Clip Path) */}
        <div className="melting-foglio" data-foglio="">
          <p className="melting-nota" data-nota="">
            Scroll down: the sheet melts organically over the horizon. Hover or touch to bite into the paper.
          </p>

          <h2 className="melting-titolo">Arun Pandian</h2>

          <dl className="melting-crediti">
            <div className="melting-crediti-row">
              <dt className="melting-dt">Discipline</dt>
              <dd className="melting-dd">Full-Stack Architecture &amp; Distributed Systems</dd>
            </div>
            <div className="melting-crediti-row">
              <dt className="melting-dt">Core Technologies</dt>
              <dd className="melting-dd">Java 21 · Spring Boot 3 · React 19 · PostgreSQL · Docker</dd>
            </div>
            <div className="melting-crediti-row">
              <dt className="melting-dt">Background</dt>
              <dd className="melting-dd">B.Tech Artificial Intelligence &amp; Data Science (Class of 2026)</dd>
            </div>
            <div className="melting-crediti-row">
              <dt className="melting-dt">Status</dt>
              <dd className="melting-dd">Open to Full-Time SDE Opportunities &amp; Technical Collaborations</dd>
            </div>
          </dl>

          <div className="melting-azioni">
            <Link to="/contact" className="melting-tasto">
              Get in Touch
            </Link>
            <Link to="/resume" className="melting-tasto">
              View Full Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
