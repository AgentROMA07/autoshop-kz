# Aqylbay auto market - Dealer Website Template

Premium, production-ready landing website template for car dealerships with bilingual (KZ/RU) support and a strict brand identity system.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1.  Clone the repository
2.  Install dependencies:

```bash
npm install
```

3.  Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for KZ version and [http://localhost:3000/ru](http://localhost:3000/ru) for Russian version.

## 🎨 Branding & Stamping (How to create a new client site)

This project is designed as a **Template Factory**. All brand-specific identity lives in the `/brand` folder. To stamp a new site for a different dealer, you ONLY need to modify files in `/brand`.

### 1. Brand Identity
Edit `/brand/brand.config.ts`:
- Dealer Name
- Contact Info (Phone, WhatsApp, Address, Map)
- Social Links
- Working Hours

### 2. Design System
Edit `/brand/theme.tokens.ts`:
- Change primary colors, radius, and fonts.
- These tokens map to Tailwind CSS variables automatically.

### 3. Content (Localization)
Edit `/brand/content/kz.json` and `/brand/content/ru.json`:
- Navigation labels
- Hero section titles
- Benefits, Services, FAQ text
- All visible text on the landing page

### 4. Assets
Replace `/brand/assets/logo.svg` with the new dealer's logo.

## 🛠 Project Structure

- `app/` - Next.js App Router (Pages & Layouts)
  - `(site)/` - KZ routes (default)
  - `ru/(site)/` - RU routes (prefixed)
- `brand/` - **The only folder you change for new clients**
- `components/` - Reusable UI components (never hardcode text here)
- `lib/` - Helpers (i18n, brand loaders)
- `styles/` - Global CSS & Tailwind setup

## 🗺 Roadmap

- **Stage 1 (Current):** Premium Landing Page, Brand System, i18n, Contact Form UI.
- **Stage 2:** Real Inventory System (Database, Filters, Car Pages).
- **Stage 3:** Admin Dashboard (Auth, CRUD, CMS).

## 📄 License

Proprietary.
