# Your club — Booking System

A modern, interactive single-page application for Cebu's premier nightclub. Built with React, Vite, and Tailwind CSS, featuring VIP table booking with an interactive club layout.

## 🚀 Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## ✨ Features

- **Interactive Table Booking** — Visual club layout with real-time table selection
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Custom Animations** — Magnetic buttons, animated text reveals, cursor follower
- **SEO Optimized** — Comprehensive meta tags, structured data, semantic HTML
- **Accessible** — ARIA labels, semantic elements, keyboard navigation

## 📁 Project Structure

```
src/
├── main.jsx                          # App entry point
├── App.jsx                           # Root component
├── index.css                         # Global styles + Tailwind
└── customerPage/
    ├── CustomerLandingPage.jsx       # Main landing page
    └── components/
        ├── Hero.jsx                  # Header with CTA
        ├── Features.jsx              # Feature cards
        ├── Gallery.jsx               # Image gallery
        ├── TableBooking.jsx          # Interactive booking modal
        ├── Footer.jsx                # Footer with contact info
        ├── AnimatedText.jsx          # Scroll-reveal animations
        ├── MagneticButton.jsx        # Hover effect button
        ├── CursorFollower.jsx        # Custom cursor
        ├── FloatingParticles.jsx     # Background particles
        └── TiltCard.jsx              # 3D tilt effect
```

## 🎨 Tech Stack

- **React 19** — UI library
- **Vite 7** — Build tool and dev server
- **Tailwind CSS 3** — Utility-first styling
- **Lucide React** — Icon library
- **ESLint** — Code linting

## 📝 SEO & Best Practices

This project includes comprehensive SEO optimization:

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social media
- ✅ Twitter Card tags
- ✅ Schema.org structured data (NightClub type)
- ✅ Semantic HTML5 elements
- ✅ Accessibility (ARIA labels, proper headings)
- ✅ Sitemap.xml and robots.txt
- ✅ Geo-targeting for Cebu, Philippines

See **[SEO-OPTIMIZATION.md](./SEO-OPTIMIZATION.md)** for detailed documentation.

## 🛠️ Development

### Code Patterns

**Component Communication:**

```jsx
// Parent manages state, child receives callbacks
const Parent = () => {
  const [showModal, setShowModal] = useState(false);
  return <Child onOpen={() => setShowModal(true)} />;
};
```

**Styling Convention:**

- Tailwind-first: Use utility classes
- Gradient palette: `from-pink-500 to-purple-600`
- Animations: `transition-all duration-300`

**Interactive UI:**

- IntersectionObserver for scroll animations (`AnimatedText.jsx`)
- Mouse tracking for magnetic effects (`MagneticButton.jsx`)
- Modal pattern: `fixed inset-0 bg-black/80 backdrop-blur-sm z-50`

### Mock Data

Table booking uses hardcoded demo data in `TableBooking.jsx`:

```js
const clubTables = [
  { id: 1, type: "standard", x: 15, y: 60, booked: false },
  // ...positioned by x/y percentages
];
```

Preserve this for demos. See [.github/copilot-instructions.md](./.github/copilot-instructions.md) for integration guidance.

## 🤖 AI Agent Instructions

For AI coding assistants (GitHub Copilot, Cursor, etc.), see:

- **[.github/copilot-instructions.md](./.github/copilot-instructions.md)** — Development patterns and best practices

## 📦 Deployment

Before deploying to production:

1. Update domain in `index.html` and `public/sitemap.xml`
2. Add real social media URLs to structured data
3. Upload `og-image.jpg` and `twitter-image.jpg` to `/public`
4. Add favicon files (`.ico`, `.png`, `apple-touch-icon.png`)
5. Configure environment variables if needed
6. Run `npm run build` and deploy the `dist/` folder

## 📄 License

This project is private and proprietary.

## 🎯 Contact

**Your club**  
IT Park, Lahug, Cebu City, Philippines  
📞 +63 912 345 6789  
📧 info@pulsecebu.com

---

Built with ❤️ in Cebu City
