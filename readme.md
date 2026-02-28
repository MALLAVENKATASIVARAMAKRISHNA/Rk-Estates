# 🏢 RK Estates — 3D Real Estate Platform

> Browse premium plots. Visualize in 3D. Buy with confidence.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Pages & Sections](#pages--sections)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [3D Viewer Guide](#3d-viewer-guide)
- [Customization](#customization)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)

---

## Project Overview

**RK Estates** is a digital-first real estate platform that allows buyers, investors, and agents to:

1. Browse multiple real estate projects from a single dashboard
2. Explore individual plots on an interactive map (with filters)
3. Visualize any plot in a real-time interactive **3D viewer**
4. Submit enquiries directly tied to a specific plot

The MVP (`rk-estates.html`) is a fully self-contained single-page prototype with working Canvas-based 3D animations, a login/register modal, plot selection panel, and enquiry form — no build step required.

---

## Features

| Feature | Status | Notes |
|---|---|---|
| Hero section with animated 3D plot grid | ✅ Done | Canvas-based, auto-rotating |
| Login / Register modal | ✅ Done | Tab-switch UI, form validation ready |
| Project listing cards | ✅ Done | 4 projects with status badges |
| Interactive 3D plot viewer | ✅ Done | Orbit animation, plot selection |
| 2D map toggle | ✅ Done | Compass, plot labels, color coding |
| Plot detail panel | ✅ Done | Price, area, facing, block info |
| Mini plot grid selector | ✅ Done | Click to switch selected plot |
| Enquiry form (main) | ✅ Done | Full form with project selector |
| Testimonials | ✅ Done | 3 buyer testimonials |
| Toast notifications | ✅ Done | Appears on form submit / login |
| Scroll-reveal animations | ✅ Done | IntersectionObserver based |
| Responsive navigation | ✅ Done | Sticky with scroll shadow |
| Footer with links | ✅ Done | RERA registration placeholder |
| Backend API | 🔲 Phase 2 | Node.js + PostgreSQL |
| Real 3D models (GLTF) | 🔲 Phase 2 | Three.js / Babylon.js |
| User auth (JWT) | 🔲 Phase 2 | — |
| Admin panel | 🔲 Phase 2 | — |
| CRM integration | 🔲 Phase 3 | Zoho / Salesforce webhook |

---

## Tech Stack

### Current (Prototype / MVP)
- **HTML5** — single file, no dependencies
- **CSS3** — custom properties, grid, flexbox, animations
- **Vanilla JavaScript** — Canvas API for 3D rendering
- **Google Fonts** — Playfair Display (headings) + DM Sans (body)

### Planned (Full Stack)
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **3D Engine:** Three.js (GLTF/GLB models via Draco compression)
- **State:** Zustand
- **Backend:** Node.js + Express / Next.js API routes
- **Database:** PostgreSQL + Redis (sessions)
- **Auth:** JWT + bcrypt + OAuth2 (Google)
- **Storage:** AWS S3 / Cloudflare R2 (3D assets, images)
- **Hosting:** Vercel (frontend) + Railway or AWS EC2 (backend)

---

## Pages & Sections

The current `rk-estates.html` is a single-page app with the following sections:

```
/ (root)
├── <nav>           Fixed top nav with logo, links, Login CTA
├── #hero           Two-column hero: copy + animated 3D canvas
├── #how-it-works   4-step process with numbered steps
├── #projects       Project cards grid (4 projects)
├── #viewer         Interactive 3D + 2D plot viewer demo
├── #testimonials   3 buyer testimonials
├── #enquiry        Split enquiry section with contact + form
└── <footer>        Links, RERA info, copyright
```

**Modal overlay:**
- Login / Register tabs
- Dismissible via overlay click or × button

---

## File Structure

```
rk-estates/
├── rk-estates.html        ← Complete MVP (open in browser)
├── README.md              ← This file
│
├── src/                   ← (Phase 2: React app)
│   ├── components/
│   │   ├── PlotViewer3D.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── PlotPanel.tsx
│   │   ├── AuthModal.tsx
│   │   └── MiniPlotGrid.tsx
│   ├── pages/
│   │   ├── index.tsx      ← Landing page
│   │   ├── projects/
│   │   │   └── [id].tsx   ← Project detail + plot browser
│   │   └── plot/
│   │       └── [id].tsx   ← Full 3D viewer page
│   └── lib/
│       ├── api.ts
│       └── three-setup.ts
│
├── public/
│   └── models/            ← GLTF project 3D models (Phase 2)
│       ├── greenfield.glb
│       ├── skyline.glb
│       └── sunrise.glb
│
└── server/                ← (Phase 2: Node.js backend)
    ├── routes/
    │   ├── auth.ts
    │   ├── projects.ts
    │   └── plots.ts
    └── db/
        └── schema.sql
```

---

## Getting Started

### Option 1 — Open the Prototype (no setup needed)

```bash
# Just open the file in your browser
open rk-estates.html
# or
double-click rk-estates.html
```

No server, no npm, no dependencies. Works offline.

---

### Option 2 — Serve Locally

```bash
# Using Python
python3 -m http.server 3000

# Using Node
npx serve .

# Then visit
open http://localhost:3000/rk-estates.html
```

---

### Option 3 — Full Stack (Phase 2)

```bash
# Clone the repo
git clone https://github.com/rkestates/platform.git
cd platform

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../server && npm install

# Set up environment variables (see below)
cp .env.example .env

# Start database
docker-compose up -d postgres redis

# Run migrations
npm run db:migrate

# Start dev servers
npm run dev         # frontend: localhost:3000
npm run dev:server  # backend: localhost:4000
```

---

## 3D Viewer Guide

The interactive viewer in `#viewer` section works as follows:

### Controls (current prototype)
| Action | Result |
|---|---|
| Auto-rotate | Camera orbits continuously around the plot grid |
| Click a mini-plot | Switches the selected (highlighted gold) plot |
| **3D View** button | Shows isometric 3D block visualization |
| **2D View** button | Shows top-down map with plot labels |
| **Reset** button | Resets camera to default angle |

### How Plot Colors Work
| Color | Meaning |
|---|---|
| 🟢 Green | Available — can enquire |
| 🔴 Red | Sold — not available |
| 🟡 Yellow | Reserved — pending confirmation |
| 🟨 Gold | Currently selected plot |

### Phase 2: Real 3D (Three.js)

In Phase 2, the Canvas mock will be replaced with a Three.js viewer:

```javascript
// Example: Loading project GLTF model
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const loader = new GLTFLoader();
const draco = new DRACOLoader();
draco.setDecoderPath('/draco/');
loader.setDRACOLoader(draco);

loader.load('/models/greenfield.glb', (gltf) => {
  scene.add(gltf.scene);
  // Highlight selected plot by name
  const plotMesh = gltf.scene.getObjectByName('plot_G14');
  plotMesh.material.color.set(0xc8952a);
});
```

---

## Customization

### Change Brand Colors

Edit CSS variables at the top of `rk-estates.html`:

```css
:root {
  --ink: #0f0e0c;        /* Main dark color */
  --cream: #f5f0e8;      /* Background */
  --gold: #c8952a;       /* Accent / CTA */
  --gold-light: #e8b84b; /* Hover gold */
  --muted: #8a7f6e;      /* Secondary text */
}
```

### Add a New Project Card

In the `.projects-grid` section, copy a `.project-card` block and update:
- `bg-*` gradient in `style="background: ..."` 
- `project-tag` text and class (`available` / `sold` / `coming`)
- Project name, location, plot count, price

### Add Plot Data

In the JavaScript section, update the `plotData` array:

```javascript
const plotData = [
  { id:'G-11', status:'sold', price:'₹48L', area:'1,100 sq.ft', dim:'28×40 ft', facing:'North' },
  { id:'G-12', status:'avail', price:'₹50L', area:'1,150 sq.ft', dim:'29×40 ft', facing:'East' },
  // ... add more plots
];
```

Status values: `'avail'` | `'sold'` | `'reserved'`

---

## Deployment

### Netlify (recommended for prototype)

```bash
# Drag and drop rk-estates.html to netlify.com/drop
# Live in 10 seconds
```

### Vercel

```bash
npm i -g vercel
vercel deploy
```

### GitHub Pages

```bash
git init
git add rk-estates.html README.md
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/YOUR_ORG/rk-estates.git
git push -u origin main
# Enable GitHub Pages in repo settings → Pages → Deploy from main branch
```

---

## Environment Variables

For Phase 2 full-stack setup, create a `.env` file:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/rkestates
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=another_secret_here

# Storage (AWS S3 or Cloudflare R2)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_BUCKET_NAME=rk-estates-assets
AWS_REGION=ap-south-1

# Email (for OTP / notifications)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key

# CRM (Phase 3)
ZOHO_API_KEY=your_zoho_key
ZOHO_ORG_ID=your_org_id

# App
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## Roadmap

### ✅ Phase 1 — Prototype (Current)
- Single-file HTML/CSS/JS implementation
- Canvas-based 3D animation
- Project cards, plot panel, modal, forms
- Responsive layout + scroll animations

### 🔲 Phase 2 — MVP (8 weeks)
- React + TypeScript codebase
- Real Three.js 3D viewer with GLTF models
- Node.js backend + PostgreSQL database
- JWT authentication (login/register/OTP)
- Admin panel to add projects and upload 3D models
- Plot status managed via database
- Wishlist / favourites

### 🔲 Phase 3 — Scale (16 weeks)
- Comparison tool (up to 3 plots side-by-side)
- CRM integration (Zoho / Salesforce)
- Analytics dashboard (heatmaps, view counts)
- Multi-language support (Hindi, Tamil)
- Virtual site tour (auto-rotating walkthrough)
- Online booking + payment gateway (Razorpay)
- Mobile app (React Native)

---

## License

Internal use only. © 2026 RK Estates. All rights reserved.

---

*Built with ♥ in India. RERA Registration: RERA/KA/PROJ/2025/001234*
