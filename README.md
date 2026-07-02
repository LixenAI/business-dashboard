# LixenAI Operations Dashboard

Interactive dashboard consolidating all LixenAI company data — Brand Guide, Company Playbook, Pricing Guide, and Agency HQ Build List.

![LixenAI Dashboard](https://github.com/LixenAI/business-dashboard/raw/master/public/logo-white.svg)

## Features

| Page | Description |
|------|-------------|
| **Overview** | KPI cards (MRR, Partners, Build, Costs), revenue trend chart, partner distribution, build phase progress, activity feed |
| **Pricing Hub** | Service plan comparison, partner tiers, add-ons grid, **retail pricing calculator** with live profit analysis, payment schedule |
| **Build Tracker** | 266 tasks across 10 phases with expandable Where/Detail rows, search, status filters |
| **Financials** | Operating cost breakdown, break-even analysis, **profitability calculator** with scenario modeling |
| **CRM Pipeline** | Kanban boards (Partner 6-stage, Business 5-stage), lead cards with expandable details, lead source tracking |
| **Brand & Voice** | Click-to-copy color swatches, typography specimens, voice do/don't rules, channel-specific guidance |
| **Market Verticals** | 12 industry verticals with pain points, sales talking points, qualifying questions, and opening hooks |
| **Company Playbook** | 7-tab reference — Overview, Partner Program, Service Plans, Financial Model, Voice & Rules, Lead Flows, Verticals |

## Tech Stack

- **React 19** + TypeScript + Vite v7.2.4
- **Tailwind CSS v3.4.19** + shadcn/ui components
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Lucide React** for icons
- **React Router** for SPA navigation

## Brand System

| Token | Value | Usage |
|-------|-------|-------|
| Navy Deep | `#0C2D5A` | Primary backgrounds |
| Primary Blue | `#1A6FD4` | CTAs, links, active states |
| Soft Neon | `#5BB8FF` | Accents, highlights |
| Background | `#060E1A` | Page background |
| Surface | `#0B1D35` | Cards, panels |
| Border | `#1A3358` | Dividers |

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/LixenAI/business-dashboard.git
cd business-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # 53 shadcn/ui components
│   ├── Footer.tsx
│   ├── Layout.tsx      # App shell with sidebar nav
│   └── Navbar.tsx      # Collapsible sidebar with 8 nav items
├── hooks/              # Custom React hooks
├── lib/
│   └── utils.ts        # cn() utility
├── pages/              # Dashboard pages
│   ├── Home.tsx        # Overview dashboard
│   ├── Pricing.tsx     # Pricing hub + calculator
│   ├── BuildTracker.tsx # 266-task build tracker
│   ├── Financials.tsx  # Financial analysis
│   ├── Crm.tsx         # CRM pipeline
│   ├── Brand.tsx       # Brand & voice guidelines
│   ├── Markets.tsx     # 12 market verticals
│   └── Playbook.tsx    # Company playbook (7 tabs)
├── App.tsx             # Router setup
├── main.tsx            # Entry point
└── index.css           # Global styles + Tailwind theme
```

## Deployment

This is a static SPA (Single Page Application) that can be deployed to any static hosting service:

- **Cloudflare Pages**: Connect your GitHub repo for auto-deployments
- **Vercel**: Import project from GitHub
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions to build and deploy

Make sure to configure your hosting provider to support SPA routing (all routes should serve `index.html`).

## Links

- Website: https://lixen.ai
- Partner Program: https://salespartnerprogram.lixen.ai/
- Apply: https://lixen.ai/apply

---

Built by LixenAI. Internal use only.
