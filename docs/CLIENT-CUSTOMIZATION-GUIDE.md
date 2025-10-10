# Client Customization Guide — Nightclub Booking System

**Purpose:** This document shows exactly what files to update when onboarding a new nightclub client. All placeholder/demo data is clearly marked.

---

## 🎯 Quick Customization Checklist (30 Minutes)

Use this checklist when a client signs up. All file paths are exact.

### ✅ **Step 1: Brand Identity (5 minutes)**

| What to Update | File Path | Line/Section | Current Value | Replace With |
|---|---|---|---|---|
| Club Name (Main Title) | `src/customerPage/components/Hero.jsx` | Line 37 | `"YOUR CLUB"` | Client's club name (UPPERCASE) |
| Club Name (Hidden H1) | `src/customerPage/components/Hero.jsx` | Line 40 | `"Your club"` | Client's club name |
| Club Name (Features) | `src/customerPage/components/Features.jsx` | Line 34 | `"Your club"` | Client's club name |
| Club Name (Footer Title) | `src/customerPage/components/Footer.jsx` | Line 11 | `"YOUR CLUB"` | Client's club name (UPPERCASE) |
| Club Name (Copyright) | `src/customerPage/components/Footer.jsx` | Line 48 | `"YOUR CLUB"` | Client's club name (UPPERCASE) |

### ✅ **Step 2: Contact Information (5 minutes)**

| What to Update | File Path | Current Placeholder | Action |
|---|---|---|---|
| **Phone Number** | `src/customerPage/components/Footer.jsx` | `+63 912 345 6789` | Line 23: Replace with client's real phone |
| **Email Address** | `src/customerPage/components/Footer.jsx` | `info@pulsecebu.com` | Line 27: Replace with client's email |
| **Physical Address** | `src/customerPage/components/Footer.jsx` | `IT Park, Lahug, Cebu City, Philippines` | Line 20: Replace with exact address |
| **Facebook URL** | `src/customerPage/components/Footer.jsx` | `href="#"` | Line 51: Add real Facebook page URL |
| **Instagram URL** | `src/customerPage/components/Footer.jsx` | `href="#"` | Line 58: Add real Instagram URL |

### ✅ **Step 3: SEO & Meta Tags (10 minutes)**

**File:** `index.html`

| Line | Current Value | Replace With |
|---|---|---|
| 11 | `<title>Your club Cebu \| VIP Table Booking...</title>` | Client's club name + location |
| 12 | `<meta name="title" content="Your club Cebu...">` | Same as title |
| 13 | `<meta name="description" content="...Your club...">` | Update with client's club name |
| 14 | `<meta name="keywords" content="...your club...">` | Add client's club name + location keywords |
| 15 | `<meta name="author" content="Your club">` | Client's club name |
| 17 | `<link rel="canonical" href="https://www.parerangers.com">` | Client's actual domain |
| 22 | Open Graph title | Update with client's name |
| 23 | Open Graph description | Update with client's name |
| 26 | `<meta property="og:site_name" content="Your club">` | Client's club name |
| 54-108 | JSON-LD structured data | See detailed instructions below ⬇️ |

**JSON-LD Structured Data Updates (Lines 54-108 in `index.html`):**
```json
{
  "name": "[Client's Full Club Name]",
  "alternateName": "[Client's Short Name]",
  "description": "[Client-specific description]",
  "url": "https://www.[clientdomain].com",
  "telephone": "[Client's phone with country code]",
  "email": "[Client's email]",
  "address": {
    "streetAddress": "[Exact street address]",
    "addressLocality": "[City]",
    "addressRegion": "[Region/Province]",
    "postalCode": "[ZIP]",
    "addressCountry": "[Country Code]"
  },
  "geo": {
    "latitude": "[Client's GPS latitude]",
    "longitude": "[Client's GPS longitude]"
  },
  "openingHoursSpecification": [
    {
      "dayOfWeek": ["[Days they're open]"],
      "opens": "[Opening time 24h format]",
      "closes": "[Closing time 24h format]"
    }
  ],
  "sameAs": [
    "[Client's Facebook URL]",
    "[Client's Instagram URL]"
  ]
}
```

### ✅ **Step 4: Images & Branding (5 minutes)**

**Upload to `/public` folder:**

| Filename | Size | Purpose | Source |
|---|---|---|---|
| `club-hero.jpg` | 1920x1080 | Hero background | Client's best crowd photo |
| `og-image.jpg` | 1200x630 | Social media sharing | Branded image with logo |
| `twitter-image.jpg` | 1200x600 | Twitter card | Same or similar to og-image |
| `logo.png` | 512x512 | Structured data, favicon base | Client's logo |
| `favicon.ico` | 32x32 | Browser tab icon | Generated from logo |
| `apple-touch-icon.png` | 180x180 | iOS home screen | Generated from logo |

**Where these are used:**
- `club-hero.jpg` → `src/customerPage/components/Hero.jsx` (already configured!)
- `og-image.jpg` → `index.html` line 25
- `twitter-image.jpg` → `index.html` line 33
- `logo.png` → `index.html` line 57
- `favicon.ico` → `index.html` line 46
- `apple-touch-icon.png` → `index.html` line 47

### ✅ **Step 5: Domain & URLs (5 minutes)**

| File | What to Update |
|---|---|
| `public/sitemap.xml` | Line 12: Replace `https://www.parerangers.com/` with client's domain |
| `public/robots.txt` | Line 4: Replace `https://www.parerangers.com/sitemap.xml` with client's domain |
| `index.html` | Line 17: Update canonical URL |
| `index.html` | Lines 20, 29: Update og:url and twitter:url |
| `index.html` | Line 56: Update JSON-LD url property |

---

## 🎨 **Optional Customizations (Client-Specific)**

### **Hours of Operation**
**File:** `src/customerPage/components/Footer.jsx` (Lines 36-42)

Current:
```jsx
<p>Friday - Saturday</p>
<p className="text-pink-400 font-semibold">10:00 PM - 6:00 AM</p>
<p className="mt-4">Sunday - Thursday</p>
<p className="text-gray-500">Closed</p>
```

Update days and times based on client's schedule.

### **Features Section**
**File:** `src/customerPage/components/Features.jsx` (Lines 6-21)

Customize the 4 feature cards:
- World-Class DJs → Change description if they have specific DJs
- VIP Table Service → Update if offering different packages
- LED & Laser Shows → Update based on actual tech
- Open Till Late → Update hours/days

### **Table Pricing**
**File:** `src/customerPage/components/TableBooking.jsx` (Lines 17-21)

Current prices:
```jsx
{ id: 'standard', name: 'Standard Table', price: '₱5,000', capacity: '4-6 people' },
{ id: 'vip', name: 'VIP Table', price: '₱10,000', capacity: '6-8 people' },
{ id: 'premium', name: 'Premium VIP', price: '₱15,000', capacity: '8-10 people' }
```

Update based on client's actual pricing and packages.

### **Club Layout / Table Map**
**File:** `src/customerPage/components/TableBooking.jsx` (Lines 24-35)

The `clubTables` array defines table positions on the blueprint:
```jsx
{ id: 1, type: 'standard', x: 15, y: 60, booked: false }
```
- `x` and `y` are percentage positions
- Work with client to map their actual floor plan

### **Color Scheme**
If client wants different brand colors, update:

**Primary colors (pink/purple gradient):**
- `tailwind.config.js` → Extend theme with custom colors
- Common pattern: `from-pink-500 to-purple-600`

**Find and replace across files:**
- Pink: `pink-400`, `pink-500`, `pink-600`
- Purple: `purple-400`, `purple-500`, `purple-600`

---

## 📋 **Pre-Launch Validation Checklist**

Before showing the site to the client or going live:

### Brand & Content
- [ ] Club name appears correctly in all 5 locations (Hero, H1, Features, Footer title, Copyright)
- [ ] All contact info is accurate (phone, email, address)
- [ ] Social media links work (Facebook, Instagram)
- [ ] Hours of operation match client's schedule
- [ ] Table prices and packages match client's offerings

### Images
- [ ] Hero background shows client's actual club photo
- [ ] `og-image.jpg` uploaded (test with Facebook Sharing Debugger)
- [ ] `twitter-image.jpg` uploaded (test with Twitter Card Validator)
- [ ] Favicon appears in browser tab
- [ ] Apple touch icon works on iOS

### SEO & Meta
- [ ] Page title includes client's club name + location
- [ ] Meta description is compelling and accurate
- [ ] Keywords include client's club name and location
- [ ] Canonical URL points to client's domain
- [ ] JSON-LD structured data has correct:
  - [ ] Club name
  - [ ] Address with GPS coordinates
  - [ ] Phone and email
  - [ ] Opening hours
  - [ ] Social media URLs

### Technical
- [ ] Domain configured and DNS pointing correctly
- [ ] Sitemap submitted to Google Search Console
- [ ] robots.txt accessible at `domain.com/robots.txt`
- [ ] All links work (no `href="#"` remaining)
- [ ] Mobile responsive (test on phone)
- [ ] Forms work (test booking flow with colleague's module)
- [ ] No console errors in browser dev tools

### Analytics (if applicable)
- [ ] Google Analytics installed
- [ ] Facebook Pixel installed (if running ads)
- [ ] Conversion tracking configured for table bookings

---

## 🚀 **Quick File Reference Map**

For fast navigation when customizing:

```
📁 Project Root
│
├── 📄 index.html ...................... Main SEO, meta tags, structured data
├── 📄 README.md ....................... Update project title
│
├── 📁 public/
│   ├── 📄 robots.txt .................. Update domain in sitemap URL
│   ├── 📄 sitemap.xml ................. Update all URLs to client domain
│   ├── 🖼️ club-hero.jpg ............... Client's hero background photo
│   ├── 🖼️ og-image.jpg ................ Social sharing image (1200x630)
│   ├── 🖼️ twitter-image.jpg ........... Twitter card image (1200x600)
│   ├── 🖼️ logo.png .................... Client's logo
│   ├── 🖼️ favicon.ico ................. Browser tab icon
│   └── 🖼️ apple-touch-icon.png ........ iOS home screen icon
│
├── 📁 src/customerPage/components/
│   ├── 📄 Hero.jsx .................... Club name (2 places), hero background
│   ├── 📄 Features.jsx ................ Club name, feature descriptions
│   ├── 📄 Footer.jsx .................. Club name (2x), contact info, hours, social links
│   ├── 📄 TableBooking.jsx ............ Table prices, floor plan, packages
│   └── 📄 Gallery.jsx ................. (Optional) Add real venue photos
│
└── 📁 docs/
    ├── 📄 SEO-OPTIMIZATION.md ......... Update client name in examples
    └── 📄 SEO-SUMMARY.md .............. Update client name in examples
```

---

## 💡 **Pro Tips for Client Onboarding**

### 1. **Get This Info From Client Upfront**
Create a simple form/questionnaire:
- Club name (full and short version)
- Physical address (exact, with building/floor)
- Phone number
- Email address
- Facebook and Instagram URLs
- Operating hours (days and times)
- Table packages and pricing
- 5-10 high-quality photos (crowd, DJ, VIP area, exterior)
- Logo (vector or high-res PNG)
- Brand colors (hex codes if they have specific ones)
- Domain name (if already purchased)

### 2. **Use a Checklist During Handoff**
Print this guide and check off each item as you complete it. Catches mistakes before the client sees them.

### 3. **Test Everything Twice**
Common mistakes:
- Forgot to update club name in one location
- Social links still point to `#`
- Wrong GPS coordinates in structured data
- Forgot to upload og-image (social sharing looks broken)

### 4. **Create a Staging Environment**
Before going live:
- Deploy to a subdomain like `demo.yourclub.com`
- Let client review and approve
- Catch any missed customizations

---

## 📞 **Support Contact**

If you need help during client onboarding:
- Technical questions: [Your support email]
- Customization requests: [Your dev email]
- Urgent issues: [Your phone]

---

**Last Updated:** October 10, 2025  
**Version:** 1.0  
**For:** Demo/Pitch Template → Client Customization
