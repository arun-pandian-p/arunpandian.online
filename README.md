<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06B6D4,100:8B5CF6&height=220&section=header&text=ARUN%20PANDIAN&fontSize=65&fontAlignY=35&desc=Data%20Analyst%20%7C%20Full-Stack%20Portfolio%20%7C%203D%20Web%20Experience&descAlignY=55&descSize=18&fontColor=ffffff&animation=fadeIn" width="100%" />

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=06B6D4&center=true&vCenter=true&width=600&lines=Awwwards-style+3D+Portfolio+Experience;Built+with+React+19+%2B+TypeScript+%2B+Vite;Powered+by+Three.js+%26+GSAP+Animations" alt="Typing SVG" />

<br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/arunpandianp-dataanalyst)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-06B6D4?style=for-the-badge&logo=vercel&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge)](#)

<br/>

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=flat-square&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=flat-square&logo=greensock&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white)

<br/>

<p>
  <a href="#-key-features"><b>Features</b></a> ·
  <a href="#-tech-stack"><b>Tech Stack</b></a> ·
  <a href="#-project-architecture"><b>Architecture</b></a> ·
  <a href="#-local-development"><b>Development</b></a> ·
  <a href="#-deployment"><b>Deployment</b></a>
</p>

</div>

<br/>

> [!NOTE]
> This project has been fully migrated from its original Next.js/MERN architecture to a highly optimized, strictly typed single-page application (SPA). It features an Awwwards-style 3D interactive hero section powered by Three.js & Framer Motion, buttery-smooth scrolling courtesy of Lenis, and a centralized data architecture for effortless resume updates.

<br/>

## ✨ Key Features

<table>
<tr>
<td width="50%" valign="top">

### ⚡ Lightning Fast
Powered by Vite & React 19 for instantaneous HMR and highly optimized production builds.

### 🧊 Immersive 3D
Custom Three.js scenes rendered declaratively via `@react-three/fiber` and `@react-three/drei`, no imperative WebGL boilerplate.

</td>
<td width="50%" valign="top">

### 🎨 Awwwards-Style UI
Fluid GSAP & Framer Motion animations, parallax scrolling, and a dark/light minimalist aesthetic.

### 🧩 Centralized Content
A strict data model (`resumeData.ts`) drives the entire site — update once, reflect everywhere.

</td>
</tr>
</table>

<div align="center">

| Capability | Description |
|:--|:--|
| 🖱️ **Smooth Scroll** | Lenis-powered inertia scrolling for a native app-like feel |
| 🌗 **Theme Aware** | Dark/light mode with zero flash-of-unstyled-content |
| 📱 **Fully Responsive** | Fluid layouts from mobile to ultrawide |
| 🔒 **Strictly Typed** | End-to-end TypeScript contracts across components |
| 🚀 **Edge Deployed** | Zero-config Vercel deployment with automatic previews |

</div>

<br/>

## 🛠️ Tech Stack

<div align="center">

```mermaid
graph LR
    A[React 19] --> D[Vite Build System]
    B[TypeScript] --> D
    C[TailwindCSS v4] --> D
    D --> E[Three.js / R3F]
    D --> F[GSAP + Framer Motion]
    D --> G[Lenis Smooth Scroll]
    E --> H((Production SPA))
    F --> H
    G --> H
    H --> I[Vercel Edge Network]
```

</div>

<br/>

## 📂 Project Architecture

<details open>
<summary><b>Click to expand / collapse directory tree</b></summary>

```text
/
├── public/                 # Static assets (favicons, PDFs, legacy media)
│   ├── legacy/              # Archived media files from prior builds
│   └── resume.pdf           # Linked résumé file
│
├── src/
│   ├── App.tsx              # Root router and global Lenis scroll wrapper
│   ├── main.tsx              # React DOM rendering entry point
│   │
│   ├── assets/               # Bundled media files (images, vectors)
│   │
│   ├── components/           # Modular UI Architecture
│   │   ├── common/             # Global utilities (e.g., Welcome intro screen)
│   │   ├── layout/              # Structural wrappers (Navbar)
│   │   ├── sections/            # Core page segments (Hero, About, Contact)
│   │   └── ui/                   # Reusable interactive micro-components
│   │
│   ├── data/                  # Centralized content store
│   │   └── resumeData.ts        # ALL portfolio text, links, and experience data
│   │
│   ├── pages/                 # Route views
│   │   └── HomePage.tsx          # Assembles the section components
│   │
│   ├── styles/                # Global CSS and Tailwind tokens
│   │
│   └── types/                 # TypeScript interface contracts
│
├── vite.config.ts           # Vite build and plugin configuration
└── package.json              # Dependencies and npm scripts
```

</details>

<br/>

## 🧠 Data Management & Customization

The site operates as a statically built portfolio — no external CMS or database required.

**To update content, edit a single typed object:**

```ts
// src/data/resumeData.ts
export const resumeData = {
  personalInfo: { ... },
  skills: { ... },
  experience: [ ... ],
  projects: [ ... ]
}
```

All UI components strictly adhere to the interfaces in **`src/types/index.ts`** and instantly reflect changes from this single source of truth — no hunting through JSX to update your résumé.

<br/>

## 💻 Local Development

<details open>
<summary><b>Get started in 3 steps</b></summary>

<br/>

**1. Install dependencies**
```bash
npm install
```

**2. Start the development server**
```bash
npm run dev
```
> Site available at `http://localhost:5173` with instant HMR.

**3. Build for production**
```bash
npm run build
```

</details>

<br/>

## 🌍 Deployment

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](#)

</div>

This project is configured out-of-the-box for **Vercel**, with the `vercel` CLI tracked as a dependency.

1. Link Vercel to the repository.
2. Push to `main` — Vercel auto-detects Vite and serves the `dist/` folder via its standard Node.js pipeline.
3. Every PR gets an automatic preview deployment.

<br/>

## 🗺️ Roadmap

- [x] Migrate from Next.js/MERN to Vite SPA
- [x] Integrate Three.js hero scene
- [x] Centralize resume data model
- [ ] Add CMS-lite (JSON-driven) content editing
- [ ] Add case-study detail pages per project
- [ ] Lighthouse 100/100 across all categories

<br/>

<div align="center">

### 📬 Let's Connect

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/arunpandianp-dataanalyst)

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:8B5CF6,100:06B6D4&height=120&section=footer" width="100%"/>

<sub>Built with ❤️ by <a href="https://linkedin.com/in/arunpandianp-dataanalyst"><b>Arun Pandian</b></a></sub>

</div>
