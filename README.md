# Ankit Baghel — Personal 3D Portfolio

A personal single-page portfolio website for **Ankit Baghel** featuring real-time interactive 3D WebGL geometry, glassmorphism, responsive mobile layouts, and modern web aesthetics.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18 or later recommended)
- npm or pnpm

### 2. Development Server
Run the local development server:
```bash
npm run dev
```
Open your browser to the local URL (typically `http://localhost:3000`).

### 3. Production Build
Compile and bundle the production assets:
```bash
npm run build
```
Preview the built production bundle locally:
```bash
npm run preview
```

---

## 📁 Project Structure & Customization

- `src/components/ThreeCanvas.tsx` — Real-time interactive Three.js 3D background with floating geometric objects, glass-like spheres, cybernetic particle field, mouse/touch parallax, and graceful CSS fallback.
- `src/components/Navbar.tsx` — Sticky glassmorphic navigation bar with scroll detection, active section spy, and mobile drawer.
- `src/components/HeroSection.tsx` — Fullscreen hero banner with headline typography, intro kicker, and primary CTA buttons.
- `src/components/AboutSection.tsx` — Two-column layout with personal bio and 3 interactive 3D tilt cards (*Continuous Learning*, *Creative Thinking*, *Technology & Innovation*).
- `src/components/SkillsSection.tsx` — Interactive skills & learning interests grid with category filter tabs. Update the `SKILLS_DATA` array to easily add or modify technologies.
- `src/components/ProjectsSection.tsx` — Project showcase featuring concept cards (*AI Assistant Website*, *Video Downloader Interface*, *Smart Food Label Scanner*).
- `src/components/ConceptModal.tsx` — Interactive preview modal for reviewing concept architecture, mockup details, and testing interactive prototype simulations.
- `src/components/ContactSection.tsx` — Direct email integration (`ab40510245@gmail.com`), one-click email copying, and validated contact form with mailto dispatch.
- `src/components/Footer.tsx` — Minimalist footer with dynamic copyright year and back-to-top button.
- `index.html` — SEO title, meta descriptions, OpenGraph tags, and custom SVG monogram favicon.

---

## 🌐 Publishing Online

This portfolio is built as a standard client-side React SPA and can be deployed anywhere with zero configuration:
- **Vercel**: Import repository and hit deploy (framework preset: Vite).
- **GitHub Pages**: Build with `npm run build` and deploy the `dist/` directory.
- **Netlify**: Connect your GitHub repository and set the build command to `npm run build` and publish directory to `dist`.
- **Cloudflare Pages**: Connect Git repo and select Vite framework preset.
