/*
  "The melting sheet" from Animorio · https://animorio.com
  License: free on your own sites and your clients’ sites, paid work included.
  Not for resale, redistribution, templates or code collections · https://animorio.com/en/license/
*/
/* La carta che si scioglie
   Un foglio color pietra copre il fotogramma di un film. Il suo bordo non è una riga: è la linea di livello di
   un campo di rumore che cambia piano nel tempo. Dove il campo sta sopra lo zero c'è carta, dove sta sotto si
   vede il fotogramma. Scorrendo il livello del foglio sale e il bordo si sfalda in chiazze e isole; il puntatore
   scava nel campo una buca morbida, così dove passi la carta si scioglie prima. Il contorno si ricalcola a ogni
   fotogramma con i quadrati in marcia (marching squares) e diventa un clip-path: path(evenodd, …). */

/* ---- valori da cambiare ---- */
const PASSO = 14;        /* il lato di una cella della griglia, in px: più piccolo, bordo più fine e più conti */
const SCALA = 190;       /* quanto sono grandi le chiazze del rumore, in px */
const BANDA = 105;       /* quanto è larga la fascia in cui il bordo si sfalda, in px */
const ONDA = 1.7;        /* quanto il rumore sposta il bordo, in fasce */
const VITA = 0.12;       /* quanto in fretta il bordo cambia da solo, al secondo */
const MORSO = 2.4;       /* quanto è profondo il morso del puntatore, in fasce */
const RAGGIO = 80;       /* quanto è largo il morso, in px */
const DA = 0.8;          /* dove sta il bordo all'inizio dello scorrimento, in parte dell'altezza */
const A = -0.4;          /* e dove arriva alla fine: sotto zero il foglio se n'è andato del tutto */

const RIDOTTO = matchMedia('(prefers-reduced-motion: reduce)').matches;
gsap.registerPlugin(ScrollTrigger);
const scena = document.querySelector('[data-scena]');
const palco = document.querySelector('[data-palco]');
const foglio = document.querySelector('[data-foglio]');
const tela = document.querySelector('[data-tela]');
if (matchMedia('(hover: none)').matches) {
  document.querySelector('[data-nota]').textContent = 'Scorri: il foglio grigio si scioglie a chiazze sull’immagine che c’è sotto. Tieni il dito sul foglio per morderne il bordo.';
}

/* ---------------------------------------------------------------- il fotogramma, disegnato una volta */
function dipingi() {
  const dpr = Math.min(2, devicePixelRatio || 1);
  const W = tela.clientWidth;
  const H = tela.clientHeight;
  tela.width = Math.round(W * dpr);
  tela.height = Math.round(H * dpr);
  const g = tela.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const orizzonte = H * 0.6;
  /* il cielo al tramonto */
  const cielo = g.createLinearGradient(0, 0, 0, orizzonte);
  cielo.addColorStop(0, '#2B2745');
  cielo.addColorStop(0.55, '#7A4E78');
  cielo.addColorStop(0.85, '#E0875A');
  cielo.addColorStop(1, '#F6B26B');
  g.fillStyle = cielo;
  g.fillRect(0, 0, W, orizzonte);
  /* il sole che tocca l'acqua */
  const sx = W * 0.34;
  const r = Math.min(W, H) * 0.13;
  g.fillStyle = '#FFE0A8';
  g.beginPath();
  g.arc(sx, orizzonte, r, Math.PI, 0);
  g.fill();
  /* il mare, con i riflessi del sole in righe orizzontali */
  const mare = g.createLinearGradient(0, orizzonte, 0, H);
  mare.addColorStop(0, '#27415A');
  mare.addColorStop(1, '#0B1622');
  g.fillStyle = mare;
  g.fillRect(0, orizzonte, W, H - orizzonte);
  for (let k = 0; k < 26; k++) {
    const y = orizzonte + 6 + (k * k) * 0.9 + k * 3;
    if (y > H) break;
    const largo = r * (1.6 - k * 0.045) * (0.7 + ((k * 37) % 10) / 20);
    g.fillStyle = `rgba(255, 214, 160, ${0.55 - k * 0.018})`;
    g.fillRect(sx - largo / 2 + Math.sin(k * 1.7) * r * 0.2, y, largo, 2 + k * 0.12);
  }
  /* lo scoglio e il faro, in controluce sulla destra */
  const fx = W * 0.76;
  g.fillStyle = '#121019';
  g.beginPath();
  g.moveTo(W * 0.56, H);
  g.bezierCurveTo(W * 0.6, orizzonte + H * 0.1, W * 0.66, orizzonte + H * 0.02, fx - W * 0.04, orizzonte - H * 0.02);
  g.lineTo(fx + W * 0.06, orizzonte - H * 0.03);
  g.bezierCurveTo(W * 0.9, orizzonte + H * 0.02, W * 0.96, orizzonte + H * 0.12, W, orizzonte + H * 0.1);
  g.lineTo(W, H);
  g.closePath();
  g.fill();
  const base = orizzonte - H * 0.02;
  const alto = H * 0.34;
  const lb = W * 0.034;
  const la = W * 0.022;
  g.beginPath();
  g.moveTo(fx - lb, base);
  g.lineTo(fx - la, base - alto);
  g.lineTo(fx + la, base - alto);
  g.lineTo(fx + lb, base);
  g.closePath();
  g.fill();
  g.fillRect(fx - la * 1.35, base - alto - H * 0.012, la * 2.7, H * 0.012);
  /* la lanterna accesa e il suo fascio */
  const lx = fx;
  const ly = base - alto - H * 0.04;
  g.fillStyle = '#FFE9B0';
  g.fillRect(lx - la * 0.8, ly, la * 1.6, H * 0.028);
  g.fillStyle = '#121019';
  g.beginPath();
  g.moveTo(lx - la, ly);
  g.lineTo(lx, ly - H * 0.035);
  g.lineTo(lx + la, ly);
  g.closePath();
  g.fill();
  g.globalCompositeOperation = 'lighter';
  const fascio = g.createLinearGradient(lx, ly, lx - W * 0.6, ly - H * 0.05);
  fascio.addColorStop(0, 'rgba(255, 233, 176, 0.55)');
  fascio.addColorStop(1, 'rgba(255, 233, 176, 0)');
  g.fillStyle = fascio;
  g.beginPath();
  g.moveTo(lx, ly + H * 0.014);
  g.lineTo(lx - W * 0.7, ly - H * 0.16);
  g.lineTo(lx - W * 0.7, ly + H * 0.1);
  g.closePath();
  g.fill();
  g.globalCompositeOperation = 'source-over';
}

/* ---------------------------------------------------------------- il rumore */
/* rumore a valori in tre dimensioni (x, y e il tempo): un numero a caso su ogni nodo di una griglia intera,
   mescolato con la curva morbida 3f² − 2f³ */
function casuale(i, j, k) {
  let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(k, 1274126177)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function valore(x, y, z) {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const k = Math.floor(z);
  const fx = x - i;
  const fy = y - j;
  const fz = z - k;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const w = fz * fz * (3 - 2 * fz);
  const m = (a, b, t) => a + (b - a) * t;
  return m(
    m(m(casuale(i, j, k), casuale(i + 1, j, k), u), m(casuale(i, j + 1, k), casuale(i + 1, j + 1, k), u), v),
    m(m(casuale(i, j, k + 1), casuale(i + 1, j, k + 1), u), m(casuale(i, j + 1, k + 1), casuale(i + 1, j + 1, k + 1), u), v),
    w,
  );
}
/* tre ottave, fra −1 e 1: la prima fa le chiazze, le altre sfrangiano il bordo */
function rumore(x, y, t) {
  return (valore(x, y, t) * 0.6 + valore(x * 2.1 + 5.2, y * 2.1 + 1.3, t * 1.6) * 0.28 + valore(x * 4.3 + 9.1, y * 4.3 + 3.7, t * 2.3) * 0.12) * 2 - 1;
}

/* ---------------------------------------------------------------- il contorno */
let W = 0;
let H = 0;
let nx = 0;
let ny = 0;
let campo = null;
let puntiX = null;
let puntiY = null;
let vicinoA = null;
let vicinoB = null;
let visto = null;

function misura() {
  W = palco.clientWidth;
  H = palco.clientHeight;
  /* la griglia sborda di una cella per parte: l'anello di fuori è sempre "senza carta", così ogni contorno si chiude */
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
}

let tempo = 0;
let livello = DA;
let morsoX = 0;
let morsoY = 0;
let morsoForza = 0;

function calcolaCampo() {
  const bordo = livello * H;
  const vicino = ONDA + MORSO + 0.5;
  const r2 = 2 * RAGGIO * RAGGIO;
  const lontano = RAGGIO * 3;
  for (let j = 0; j <= ny; j++) {
    const y = (j - 1) * PASSO;
    const base = (bordo - y) / BANDA;
    const riga = j * (nx + 1);
    /* lontano dalla fascia il segno lo decide solo il livello: niente rumore da calcolare */
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
        if (Math.abs(dx) < lontano && Math.abs(dy) < lontano) v -= MORSO * morsoForza * Math.exp(-(dx * dx + dy * dy) / r2);
      }
      campo[riga + i] = v;
    }
  }
}

/* i quadrati in marcia: in ogni cella, dove il segno cambia, un segmento fra due lati; i punti stanno sui lati,
   dove l'interpolazione lineare dice che il campo vale zero. Ogni punto sta su un lato condiviso da due celle,
   quindi ha esattamente due vicini: seguendo i vicini si chiude ogni contorno */
function contorno() {
  vicinoA.fill(-1);
  vicinoB.fill(-1);
  visto.fill(0);
  const colonne = nx + 1;
  const orizzontale = (i, j) => (j * colonne + i) * 2;
  const verticale = (i, j) => (j * colonne + i) * 2 + 1;
  const punto = (chiave) => {
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
  const lega = (k1, k2) => {
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
  /* si seguono i vicini e si scrive il percorso */
  const pezzi = [];
  const f = (n) => Math.round(n * 10) / 10;
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
  calcolaCampo();
  const d = contorno();
  foglio.style.clipPath = d ? `path(evenodd, "${d}")` : 'path("M0 0Z")';
}

/* ---------------------------------------------------------------- lo scorrimento, il puntatore, il tempo */
function avvia() {
  misura();
  let meta = 0;
  ScrollTrigger.create({
    trigger: scena,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (s) => { meta = s.progress; },
  });
  let dentro = false;
  let mx = 0;
  let my = 0;
  const segui = (e) => {
    const r = palco.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
    if (!dentro) { morsoX = mx; morsoY = my; }
    dentro = true;
  };
  palco.addEventListener('pointermove', segui);
  palco.addEventListener('pointerdown', segui);
  palco.addEventListener('pointerleave', () => { dentro = false; });
  palco.addEventListener('pointercancel', () => { dentro = false; });
  palco.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') dentro = false; });

  let visibile = true;
  new IntersectionObserver((v) => { visibile = v[0].isIntersecting; }).observe(scena);
  /* all'arrivo il bordo sale un poco da solo, poi lo porta lo scorrimento */
  const arrivo = { v: 0.14 };
  gsap.to(arrivo, { v: 0, duration: 1.6, ease: 'power3.out', delay: 0.2 });
  gsap.ticker.add((t, dt) => {
    if (!visibile) return;
    const s = Math.min(dt, 64) / 1000;
    tempo += s * VITA;
    const facile = (x) => x * x * (3 - 2 * x);
    const voluto = DA + (A - DA) * facile(meta) + arrivo.v;
    livello += (voluto - livello) * (1 - Math.exp(-7 * s));
    morsoForza += ((dentro ? 1 : 0) - morsoForza) * (1 - Math.exp(-(dentro ? 5 : 2.2) * s));
    morsoX += (mx - morsoX) * (1 - Math.exp(-9 * s));
    morsoY += (my - morsoY) * (1 - Math.exp(-9 * s));
    disegna();
  });
  let rinvio = null;
  addEventListener('resize', () => {
    clearTimeout(rinvio);
    rinvio = setTimeout(misura, 120);
  });
}

if (RIDOTTO) {
  /* niente scioglimento: il foglio sta sopra e il fotogramma sotto, fermi */
  requestAnimationFrame(dipingi);
  addEventListener('resize', () => requestAnimationFrame(dipingi));
} else {
  avvia();
}
