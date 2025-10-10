# Copilot Instructions — Club Showcase Booking System

## Architecture Overview

Single-page React + Vite app for a nightclub landing page with interactive table booking.

**Component flow:** `src/main.jsx` → `App.jsx` → `customerPage/CustomerLandingPage.jsx` → reusable UI components in `customerPage/components/*`

**Key files:**

- `CustomerLandingPage.jsx` — manages `showBooking` state and renders `Hero`, `Features`, `Gallery`, `Footer`, and conditional `TableBooking` modal
- `TableBooking.jsx` — interactive club layout blueprint with mock table data (`clubTables` array), form handling, and visual table selection
- `Hero.jsx`, `MagneticButton.jsx`, `AnimatedText.jsx`, `CursorFollower.jsx` — reusable UI components with custom interactions

## Development Workflow

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint (see eslint.config.js)
```

## Project-Specific Patterns

### Component Communication

- Use local `useState` + callback props (no global state).
- Example: `Hero` accepts `onBookNow` prop → `CustomerLandingPage` toggles `showBooking` → conditionally renders `TableBooking` with `onClose` callback.

### Styling Conventions

- **Tailwind-first:** Use utility classes. Custom CSS in `index.css` is minimal (scrollbar styles, base resets).
- **Gradient patterns:** `bg-gradient-to-r from-pink-500 to-purple-600` and similar variants are used throughout. Match existing color palette.
- **Animations:** Use Tailwind's `transition-all duration-300`, custom keyframes defined in `tailwind.config.js` (`fadeIn`).

### Interactive UI Patterns

- **IntersectionObserver animations:** See `AnimatedText.jsx` — text reveals on scroll with staggered character animations.
- **Mouse interactions:** `MagneticButton.jsx` uses `onMouseMove` + `transform: translate()` for magnetic effect; `CursorFollower.jsx` tracks cursor globally.
- **Modal pattern:** Full-screen overlay with `fixed inset-0 bg-black/80 backdrop-blur-sm z-50`. Close via `X` button or `onClose` callback.

### Mock Data Structure

`TableBooking.jsx` has hardcoded club layout data:

```js
const clubTables = [
  { id: 1, type: "standard", x: 15, y: 60, booked: false },
  // ...positioned by x/y percentages, rendered absolutely
];
```

Preserve this for demos. If adding real API, update README with backend integration steps.

### Form Handling

Forms use controlled components with `onChange={handleChange}`, basic `required` attributes, and `alert()` for validation feedback. If improving UX, prefer inline validation messages.

## What to Avoid

- Don't add global state (Redux, Context) unless explicitly requested.
- Don't remove mock data in `TableBooking.jsx` without replacing with real API + updating docs.
- Don't introduce new CSS files—extend `index.css` or `tailwind.config.js`.

## Debugging Checklist

1. Check Vite terminal output for build errors.
2. Browser console for runtime errors.
3. If Tailwind classes don't apply, verify `content` globs in `tailwind.config.js` match your file paths.

## Common Tasks

- **Add new UI component:** Create in `customerPage/components/`, import in `CustomerLandingPage.jsx`, follow existing Tailwind + interaction patterns.
- **Fix layout issues:** Adjust Tailwind classes (prefer flexbox/grid utilities).
- **Improve form validation:** Add inline error states in `TableBooking.jsx` instead of `alert()`.

## Questions for the User

- Package manager preference (npm/pnpm/yarn)?
- Should demo data be replaced with real API endpoints?
- Brand color palette specifics for new features?

## SEO Best Practices for This Project

### Meta Tags & Structured Data

- **index.html** contains comprehensive meta tags (Open Graph, Twitter Cards, geo tags)
- **JSON-LD structured data** for NightClub schema (Schema.org) is embedded in `<head>`
- Update `index.html` meta tags when adding new pages or changing content
- Keep `public/sitemap.xml` updated when adding routes

### Semantic HTML

- Use semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Example: `Hero.jsx` uses `<header>`, `Features.jsx` and `Gallery.jsx` use `<section>`
- Add `aria-label` and `aria-labelledby` to sections for screen readers
- Use `aria-hidden="true"` for decorative icons

### Accessibility & SEO

- All images/image placeholders need descriptive `alt` text or `aria-label`
- Buttons should have `aria-label` when text isn't descriptive enough
- Use `<h1>` once per page (currently in `Hero.jsx` with `.sr-only` for SEO)
- Heading hierarchy: h1 → h2 → h3 (don't skip levels)

### Files to Update for SEO

- `public/sitemap.xml` — add new routes as they're created
- `public/robots.txt` — already configured to allow all crawlers
- `index.html` — update title, description, and structured data when content changes
