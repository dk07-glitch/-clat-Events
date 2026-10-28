# Éclat Events — Celebration & Event Planner Assistant

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-success?style=for-the-badge)](https://www.w3.org/WAI/WCAG21/quickref/)

> *"Where Every Moment Shines ✨"*  
> A client-side web application and dynamic planning interface designed for the **PromptWars Challenge**.

---

## 1. Chosen Vertical

* **Vertical:** **Celebration & Event Planner**
* **Application / Brand Name:** **Éclat Events**
* **Target Audience:** Couples, families, corporate event managers, and individuals seeking curated, stress-free event design and execution for weddings, milestone birthdays, corporate galas, baby showers, anniversaries, and graduations.

---

## 2. Approach and Logic

### Architectural & Design Philosophy
1. **Modular, Dependency-Light Architecture:**
   * Built using semantic **HTML5**, modern **CSS3** (utilizing custom properties/tokens, flexbox, CSS grid), and vanilla **JavaScript (ES2020+)**.
   * Zero heavy JS runtime frameworks (React/Vue/Angular) to guarantee instantaneous load performance, total footprint under **100 KB** (well within the challenge's 10 MB ceiling), and zero runtime vulnerabilities.

2. **Context-Aware Dynamic Logic:**
   * **Stateful Filtering:** Live category filtering for portfolio and showcase events without full page reloads or layout shift.
   * **Multi-Factor Form Validation & Dynamic Feedback:** Live field validation, contextual error reporting (`aria-invalid`, field-specific error hints), date boundary safety (future-date validation), and simulated asynchronous dispatch with active progress states.
   * **Dynamic Metrics Display:** IntersectionObserver-based triggers that calculate ease-out cubic animation paths for organizational achievements.

3. **Accessibility First (WCAG 2.1 AA Compliant):**
   * High-contrast design tokens (deep purple `#6C3483`, gold `#D4AF37`, dark charcoal `#2C3E50`, clean white `#FFFFFF`).
   * Full keyboard navigation (focus rings, `tabindex` management, Esc-key listeners for modals/mobile nav).
   * Strict adherence to `prefers-reduced-motion` to disable particle systems and intense parallax for users with motion sensitivities.
   * Semantic ARIA attributes (`aria-expanded`, `aria-selected`, `aria-invalid`, `aria-live`).

4. **Defensive Security:**
   * Input sanitization helper preventing DOM-based Cross-Site Scripting (XSS).
   * Strict `novalidate` bypass handling via robust custom regex and date bounds checking.

---

## 3. How the Solution Works

### User Journey & Functional Flow

```
   ┌──────────────────────────────────────────────────────────────┐
   │                       Hero Section                           │
   │  • Canvas-based particle/confetti system                     │
   │  • Direct primary CTAs & Parallax scroll                    │
   └──────────────────────────────┬───────────────────────────────┘
                                  ▼
   ┌──────────────────────────────────────────────────────────────┐
   │                       Proof & Trust                          │
   │  • IntersectionObserver-driven stats counter                 │
   │  • 6 Glassmorphic service cards with hover micro-interactions│
   │  • 4-Step Interactive Process Roadmap (Consult to Celebrate) │
   └──────────────────────────────┬───────────────────────────────┘
                                  ▼
   ┌──────────────────────────────────────────────────────────────┐
   │                   Dynamic Portfolio Showcase                 │
   │  • Real-time category filtering (Weddings, Corporate, etc.)  │
   │  • Keyboard-navigable lightbox/card details                  │
   │  • Auto-advancing + manual controls testimonials slider      │
   └──────────────────────────────┬───────────────────────────────┘
                                  ▼
   ┌──────────────────────────────────────────────────────────────┐
   │                   Conversion & Booking Engine                │
   │  • 3-Tier transparent pricing models with featured tier      │
   │  • Comprehensive multi-field booking/inquiry form            │
   │  • Client-side validation & simulated async state machine    │
   └──────────────────────────────────────────────────────────────┘
```

### Key Technical Modules

* **`Confetti System (Canvas API)`**: Spawns multi-colored geometries (stars, circles, ribbons) with variable velocity, rotation, and opacity loops, with auto-pause via the Page Visibility API to save battery.
* **`Interactive Carousel`**: Accessible sliding track supporting dot selection, directional navigation buttons, keyboard navigation, and automatic timer resetting.
* **`Portfolio Filter Engine`**: Instant DOM attribute filtering using CSS transforms and display states to eliminate content reflow.
* **`Smart Validation Pipeline`**: Validates emails, required fields, and ensures event dates cannot be scheduled in the past.

---

## 4. Assumptions Made

1. **Client-Side Prototype Context:**
   * As a PromptWars prototype submission, backend API endpoints (form submission, newsletter webhook) are simulated with asynchronous JavaScript timeouts (`setTimeout`) rather than connecting to live payment gateways or live CRM servers.
2. **Modern Browser Target:**
   * Assumed modern evergreen browser support (Chrome, Edge, Firefox, Safari) capable of native CSS Grid, Flexbox, Canvas 2D, and the `IntersectionObserver` API.
3. **CDN Availability:**
   * Relies on Google Fonts (*Playfair Display*, *Poppins*) and FontAwesome CDN for typography and iconography. Graceful system font fallbacks are included in CSS declarations.
4. **Standalone Portability:**
   * Designed to execute seamlessly both directly off local file storage (`file://`) and through standard static hosts (GitHub Pages, Vercel, Netlify).

---

## 5. Repository Structure

```
eclat-events-planner/
├── index.html              # Core application entry point
├── README.md               # Solution documentation & evaluation details
├── LICENSE                 # Open-source MIT License
├── .gitignore              # Standard git exclusion configurations
├── CONTRIBUTING.md         # Contribution and coding standards
├── SECURITY.md             # Security and vulnerability handling
├── css/
│   └── styles.css          # Modular design system & styles
├── js/
│   └── app.js              # Complete interactive client logic
└── tests/
    └── validation.html     # Interactive QA & verification test suite
```

---

## 6. Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/<your-username>/eclat-events-planner.git
   cd eclat-events-planner
   ```
2. **Run Locally:**
   * Open `index.html` in any web browser. No compilation, build step, or `npm install` required!
3. **Run Test Checklist:**
   * Open `tests/validation.html` in your browser to run through the verification suite.
