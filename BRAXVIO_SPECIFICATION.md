# BRAXVIO — Global Technology Company & Product Ecosystem Specification
**Document Version:** 1.0.0  
**Status:** Canonical Design & Architecture Blueprint  
**Company:** Braxvio Technologies  
**Mission:** Technology with purpose, designed for real life.

---

## 01 — Core Objective & Positioning

Braxvio is a technology company building digital products, platforms, and infrastructure designed to solve meaningful problems and improve how people interact with technology.

- **NOT** a software agency or dev shop.
- **NOT** a freelance studio or client services firm.
- **NOT** a generic startup landing page or Web3/crypto project.
- **IS** the **parent technology company** behind an evolving ecosystem of digital products, platforms, and infrastructure.

### The Product Ecosystem
- **Kampus:** University and higher education digital ecosystem.
- **Pharmora:** Healthcare commerce and pharmacy marketplace.
- **Ecolift:** Sustainable logistics and technology-enabled waste collection.
- **DevPay Africa:** African digital work and freelance infrastructure.
- **Future Ecosystem Nodes:** Continuous research and development in everyday systems.

**Core User takeaway:**  
> *“Braxvio builds technology products for important parts of everyday life.”*  
> The site must feel ambitious, credible, sophisticated, calm, and internationally competitive — the Digital Headquarters of Braxvio.

---

## 02 — Visual Identity & Tonal Pillars

- **Visual Tone:** Premium, Precise, Visionary, Human, Technological, Calm, Confident, Intelligent, Global, African-Born, Future-Focused.
- **What to avoid:**
  - ❌ AI-generated gradient soup or generic template styling
  - ❌ Loud crypto/Web3 neon glowing artifacts
  - ❌ Clichéd card grids everywhere
  - ❌ Clichéd "connecting lines over African continent" tropes
  - ❌ Stock photos of people pointing at laptops or corporate handshakes
  - ❌ Fake user numbers, exaggerated funding, or unverified claims
- **Compositional Rhythm:**
  - Asymmetric, editorial pacing with generous vertical whitespace (120px–200px desktop).
  - Varied section treatments: edge-to-edge cinematic, typography-first, dark immersive, and pristine light surfaces.

---

## 03 — Color System & Brand Tokens

| Token Name | Hex Code | Purpose / Ratio |
|---|---|---|
| **Braxvio Deep Navy** | `#002F5B` | Primary deep brand base |
| **Braxvio Navy** | `#003E72` | Gradient stop / structural darks |
| **Braxvio Blue** | `#006EAA` | Intermediate brand blue |
| **Braxvio Electric Blue** | `#008FC4` | High-energy accent |
| **Braxvio Cyan** | `#11AFC1` | Active signals, focal accents |
| **Braxvio Aqua** | `#42D6C5` | Vibrant terminal accent / energy |
| **Braxvio Ice** | `#F2FAFC` | Subtle product background tint |
| **Cloud** | `#F7FAFC` | Light neutral canvas |
| **White** | `#FFFFFF` | Core light background & clean surfaces |
| **Deep Ink** | `#06131D` | High-contrast typography & dark sections |
| **Muted Slate** | `#687A86` | Secondary typography & metadata |
| **Border** | `#DDE8EC` | Subtle architectural dividers (1px) |
| **Dark Surface** | `#071C2B` | Immersive dark section background |

### Signature Brand Gradient
```css
linear-gradient(120deg, #003E72 0%, #006EAA 40%, #11AFC1 72%, #42D6C5 100%)
```

### Surface Ratio Distribution Rule
- **60%** White / pristine light surfaces (`#FFFFFF`, `#F7FAFC`, `#F2FAFC`)
- **20%** Deep Navy / dark immersive surfaces (`#071C2B`, `#06131D`, `#002F5B`)
- **15%** High-fidelity product visuals, interfaces, and editorial framing
- **5%** Selective gradient accents (CTAs, signals, nodes, micro-indicators)

---

## 04 — The Braxvio System Visual Concept

A living technological system:
- Nodes (Braxvio central parent node and product nodes: Kampus, Pharmora, Ecolift, DevPay Africa).
- Subtle 2–5% coordinate grid overlay in hero and dark technical sections.
- Thin SVG connection paths (`stroke="#11AFC1"` with opacity and signal flow dashes).
- Moving micro-signals along paths representing live data, transactions, and interactions.
- Spatial depth with subtle mouse parallax and layered geometric arcs.

---

## 05 — Typography Hierarchy

- **Primary Display & Headings:** Plus Jakarta Sans / Manrope (`font-sans` with variable weights).
- **Body & Interface:** Inter / Geist (`font-sans`, 16px–18px, line-height 1.6).
- **Vision & Editorial Statements:** Editorial serif touches / refined geometric headings.
- **Micro Typography:** Uppercase labels with letter spacing `0.08em` to `0.14em` (e.g. `01 / EDUCATION`, `SYSTEM STATUS: NORMAL`).
- **Scale:**
  - Hero Desktop: 80px–112px (`leading-[0.95] tracking-tight`)
  - Statements: 56px–84px
  - Section Titles: 40px–64px
  - Product Titles: 36px–52px
  - Body: 16px–18px

---

## 06 — Site Map & Route Architecture

1. `/` (Homepage)
   - Cinematic Braxvio Hero with living system visualization
   - Progressive Company Philosophy Statement
   - Interactive Braxvio Ecosystem Hub (`<BraxvioSystem />`)
   - Product Feature 01: **Kampus** (55% visual / 45% copy, device layers)
   - Product Feature 02: **Pharmora** (Reversed composition, healthcare commerce UI)
   - Product Feature 03: **Ecolift** (Dark immersive, sustainable logistics map/telemetry)
   - Product Feature 04: **DevPay Africa** (Light editorial, talent & contract infrastructure)
   - "What We Build" Sector Matrix (Education, Healthcare, Sustainability, Digital Economy)
   - "Built from Africa. Designed Without Borders" Global Map & Abstract Coordinates
   - Technology Philosophy & Engineering Rigor
   - Philosophy Statement: "The best technology disappears into life."
   - What's Next / R&D Horizon
   - Build with Braxvio (Strategic Partnerships)
   - Careers Spotlight (Talent Network)
   - Architectural Footer with Living System graphic
2. `/products` (The Product Directory)
   - Grid & list view of all ecosystem products with real status tags (`LIVE`, `BETA`, `IN DEVELOPMENT`)
   - Architectural filters by category
3. `/products/[slug]` (Miniature Launch Experience per product)
   - Deep dives for `/products/kampus`, `/products/pharmora`, `/products/ecolift`, `/products/devpay`
   - Hero, Problem, Braxvio Approach, Product Experience, Technology, Impact, Interactive Screens, Availability
4. `/company` (About Braxvio)
   - Bold opening statement, Why Braxvio Exists, Mission & Vision, Core Principles (01–06)
5. `/company/leadership`
   - Thoughtful leadership & governance presentation focusing on craftsmanship and stewardship
6. `/technology` (Engineering Architecture & Philosophy)
   - Product Engineering, Data Systems, Applied AI, Infrastructure, Security, Design Systems
7. `/impact` (Authentic Value Creation)
   - Impact by sector (Education, Health, Environment, Digital Opportunity) with zero fabricated metrics
8. `/insights` & `/insights/[slug]` (Braxvio Technology Publication)
   - Editorial magazine layout with long-form reader, clean typography, pull quotes, code snippets
9. `/careers` (Join the Talent Network)
   - Honest culture ("Ownership, Curiosity, Craft, Responsibility"), Talent Network submission modal/form
10. `/newsroom` (Press, Brand Assets, Media Kit)
11. `/contact` (Contextual inquiries: Partnerships, Enterprise, Press, Careers)
12. `/labs` (Explorations & Emerging Research)
13. Global Components:
    - Adaptive Floating Header with Mega Menu
    - Command Palette (`Cmd+K` / `Ctrl+K`)
    - Custom Contextual Cursor (desktop)
    - Branded 404 ("SIGNAL LOST") & Error states
    - Privacy-respecting Cookie Preference Tray

---

## 07 — Interactive Components Specification

### `<BraxvioSystem />`
- Interactive SVG / Canvas system canvas displaying central Braxvio node and orbit nodes.
- Signals animate along bezier paths.
- Hovering or tapping a node previews product status, category, and direct action.
- Fully accessible fallback and reduced motion compatibility.

### Floating Adaptive Header & Mega Menu
- Transparent over hero; morphs to frosted glass (`bg-white/85 backdrop-blur border-b border-[#DDE8EC]`) upon scrolling.
- Automatically adjusts contrast on dark sections via IntersectionObserver.
- Mega menu displaying product ecosystem on desktop with icons, metadata, and quick links.
- Fullscreen animated mobile menu with regional footer metadata.

### Global Command Palette (`Cmd+K`)
- Instant search across products, insights, technology pillars, and company pages.
- Keyboard navigation (Arrow keys, Enter, Escape).

---

## 08 — Engineering & Quality Guidelines

- **Framework:** Next.js 16 (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS v4 with custom brand tokens, utility classes, and custom animations.
- **Motion:** High performance `transform` and `opacity` transitions with `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Accessibility:** WCAG AA compliance, semantic markup, full keyboard navigation, `aria-*` attributes.
- **Performance:** Dynamic imports for interactive heavy widgets, optimized images, zero layout shift.
