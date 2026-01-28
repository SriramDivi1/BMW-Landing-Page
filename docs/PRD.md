# Product Requirements Document
## BMW M Collection — Interactive Landing Page

**Version:** 1.0  
**Date:** January 2026  
**Status:** Draft  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Goals & Success Metrics](#goals--success-metrics)
3. [Target Personas](#target-personas)
4. [Information Architecture](#information-architecture)
5. [Feature Requirements](#feature-requirements)
6. [Technical Requirements](#technical-requirements)
7. [Performance Requirements](#performance-requirements)
8. [Accessibility Requirements](#accessibility-requirements)
9. [Analytics Specification](#analytics-specification)
10. [Design Requirements](#design-requirements)
11. [Risks & Mitigations](#risks--mitigations)
12. [Acceptance Criteria](#acceptance-criteria)
13. [Non-Goals (v1)](#non-goals-v1)
14. [Future Considerations](#future-considerations)
15. [Appendices](#appendices)

---

## Executive Summary

### What We're Building

An interactive, premium landing page showcasing the BMW M lineup (M2, M4, M5, M8) through real-time 3D models in a "museum gallery" experience. The page prioritizes brand experience and emotional engagement over transactional goals.

### Core Interaction Model

**Hybrid navigation:** Users experience a scroll-driven gallery (each section reveals a model with its story) combined with a persistent model picker (allowing direct access to any vehicle at any time).

### Technology Stack

- **Framework:** React + Vite
- **3D Engine:** Three.js via @react-three/fiber + @react-three/drei
- **Styling:** CSS Modules or Tailwind CSS (TBD)
- **Deployment:** Static hosting (Vercel, Netlify, or similar)

### Design Direction

Premium light theme inspired by museum galleries — ivory/off-white backgrounds, generous whitespace, typographic hierarchy, soft shadows, and restrained motion design.

---

## Goals & Success Metrics

### Primary Goal

**Brand experience / wow-factor** — Create an immersive, memorable digital experience that elevates perception of the BMW M brand.

### Secondary Goals

1. **Product education** — Communicate key differentiators between M2, M4, M5, and M8
2. **Lead capture** — Optional CTA for brochure requests or dealer contact
3. **Portfolio demonstration** — Showcase technical capability (3D web, performance optimization)

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time on page | > 90 seconds average | Analytics |
| Scroll depth | > 75% reach Compare section | Scroll tracking |
| Model interactions | > 3 orbit/rotate actions per session | Event tracking |
| Bounce rate | < 40% | Analytics |
| CTA clicks (if enabled) | > 5% of visitors | Event tracking |
| Performance score | > 80 Lighthouse | Automated testing |

---

## Target Personas

### Primary: The Enthusiast

**Demographics:** 25-45, male-skewing but not exclusive, digitally native  
**Mindset:** Passionate about automotive design and performance. Follows car content on YouTube, Instagram, enthusiast forums.  
**Behavior:** Will spend time exploring details. Appreciates craft and engineering. May not be an immediate buyer but is a brand advocate.  
**Needs:** Immersive visuals, accurate specifications, respect for their knowledge level.  
**Quote:** "I want to see every angle, every detail. Don't dumb it down for me."

### Secondary: The Aspirational Browser

**Demographics:** 20-35, early career, building toward eventual purchase  
**Mindset:** Dreams of owning an M car someday. Currently drives something more modest.  
**Behavior:** Explores premium brands for inspiration. Screenshots and shares cool experiences.  
**Needs:** Emotional connection, shareable moments, accessible (not intimidating) presentation.  
**Quote:** "One day I'll have one of these. For now, I just want to experience it."

### Tertiary: The Researcher

**Demographics:** 35-55, higher income, actively considering purchase  
**Mindset:** Methodical, comparison-focused. Wants facts to support an emotional decision.  
**Behavior:** Will compare specs, read details, potentially convert to lead.  
**Needs:** Clear information hierarchy, easy comparison, clear path to next steps.  
**Quote:** "Help me justify what my heart already wants."

---

## Information Architecture

### Site Map

```
BMW M Collection (Landing Page)
│
├── Hero Exhibit
│   └── 3D Model (M2 default)
│   └── Introduction copy
│   └── Scroll prompt
│
├── Model Picker (persistent)
│   ├── M2
│   ├── M4
│   ├── M5
│   └── M8
│
├── Exhibit: M2
│   └── 3D Model
│   └── Headline + Placard
│   └── Quick facts
│
├── Exhibit: M4
│   └── [Same structure]
│
├── Exhibit: M5
│   └── [Same structure]
│
├── Exhibit: M8
│   └── [Same structure]
│
├── Compare Wall
│   └── Specification comparison table
│
├── Craft & Engineering
│   └── Heritage narrative
│
├── CTA Section
│   └── Request Info / Brochure / Find Dealer
│
└── Footer
    └── Credits, Legal, Contact
```

### Navigation Model

```
┌─────────────────────────────────────────────────────────────┐
│                      USER ENTRY                             │
│                          │                                  │
│                          ▼                                  │
│                    ┌──────────┐                             │
│                    │   HERO   │                             │
│                    │  (M2)    │                             │
│                    └────┬─────┘                             │
│                         │                                   │
│         ┌───────────────┼───────────────┐                   │
│         │               │               │                   │
│         ▼               ▼               ▼                   │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐               │
│   │  SCROLL  │   │  PICKER  │   │   NAV    │               │
│   │ (Linear) │   │ (Direct) │   │  (Jump)  │               │
│   └────┬─────┘   └────┬─────┘   └────┬─────┘               │
│        │              │              │                      │
│        └──────────────┴──────────────┘                      │
│                       │                                     │
│                       ▼                                     │
│              ┌─────────────────┐                            │
│              │  ANY EXHIBIT    │                            │
│              │  (M2/M4/M5/M8)  │                            │
│              └────────┬────────┘                            │
│                       │                                     │
│                       ▼                                     │
│              ┌─────────────────┐                            │
│              │  COMPARE WALL   │                            │
│              └────────┬────────┘                            │
│                       │                                     │
│                       ▼                                     │
│              ┌─────────────────┐                            │
│              │      CTA        │                            │
│              └─────────────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Feature Requirements

### F1: 3D Model Viewer

**Priority:** P0 (Critical)

**Description:** Real-time 3D rendering of BMW M models in glTF/GLB format with interactive controls.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| F1.1 | Load and render .glb models | P0 |
| F1.2 | Orbit controls (mouse drag to rotate) | P0 |
| F1.3 | Zoom controls (scroll wheel) | P1 |
| F1.4 | Touch support (pinch zoom, drag rotate) | P0 |
| F1.5 | Auto-rotate when idle (subtle, slow) | P2 |
| F1.6 | Reset view button | P1 |
| F1.7 | Studio lighting setup (3-point, soft shadows) | P0 |
| F1.8 | Environment reflections (subtle, premium feel) | P1 |
| F1.9 | Loading state with poster fallback | P0 |
| F1.10 | Error state handling | P0 |

**Acceptance Criteria:**
- Model renders within 3 seconds on desktop (after download)
- Orbit controls feel smooth (60fps target)
- Touch interaction works on iOS Safari and Android Chrome
- Poster image displays immediately while model loads

---

### F2: Scroll-Driven Gallery

**Priority:** P0 (Critical)

**Description:** Vertical scroll navigation through exhibit sections with smooth transitions.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| F2.1 | Section-based scroll snapping | P1 |
| F2.2 | Progress indicator (subtle) | P2 |
| F2.3 | Model transitions on scroll | P0 |
| F2.4 | Content fade-in animations | P1 |
| F2.5 | Reduced motion mode (respects OS setting) | P0 |
| F2.6 | Keyboard navigation (arrow keys) | P1 |
| F2.7 | Scroll depth tracking for analytics | P1 |

**Acceptance Criteria:**
- Scrolling between sections feels intentional, not jarring
- Users with `prefers-reduced-motion` see instant transitions
- Keyboard users can navigate entire page without mouse

---

### F3: Model Picker

**Priority:** P0 (Critical)

**Description:** Persistent UI element allowing direct selection of any M model.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| F3.1 | Display 4 model options (M2, M4, M5, M8) | P0 |
| F3.2 | Visual indication of current selection | P0 |
| F3.3 | Click/tap to switch models | P0 |
| F3.4 | Smooth transition between models | P1 |
| F3.5 | Keyboard accessible (tab, enter) | P0 |
| F3.6 | Persist position on scroll | P0 |
| F3.7 | Collapse on mobile (hamburger or minimal) | P1 |

**Acceptance Criteria:**
- Clicking a model switches the 3D view within 500ms (perceived)
- Current model is clearly indicated
- Picker is reachable at any scroll position

---

### F4: Compare Wall

**Priority:** P1 (Important)

**Description:** Side-by-side specification comparison of all four M models.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| F4.1 | Display comparison data (power, torque, 0-60, drivetrain, etc.) | P0 |
| F4.2 | Clean typographic layout (not a cluttered table) | P0 |
| F4.3 | Highlight differences visually | P2 |
| F4.4 | Responsive layout (stack on mobile) | P0 |
| F4.5 | Data-driven (JSON source for easy updates) | P1 |

**Acceptance Criteria:**
- All four models visible simultaneously on desktop
- Mobile shows sensible stacked or swipeable layout
- Data is accurate per spec sheets

---

### F5: CTA Section

**Priority:** P2 (Nice to Have for v1)

**Description:** Call-to-action area for lead capture or external links.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| F5.1 | Request Information button (external link or form) | P2 |
| F5.2 | Download Brochure button (PDF link) | P2 |
| F5.3 | Find Dealer button (external link) | P2 |
| F5.4 | Optional email capture form | P3 |
| F5.5 | Track CTA clicks | P1 |

**Acceptance Criteria:**
- Buttons are clearly visible and tappable
- External links open in new tab
- Click events fire for analytics

---

### F6: Navigation

**Priority:** P1 (Important)

**Description:** Minimal fixed navigation header.

**Requirements:**
| ID | Requirement | Priority |
|----|-------------|----------|
| F6.1 | BMW M wordmark/logo (returns to hero) | P0 |
| F6.2 | Section links (Models, Compare, etc.) | P1 |
| F6.3 | CTA button in nav | P2 |
| F6.4 | Transparent initially, solid on scroll | P2 |
| F6.5 | Mobile hamburger menu | P1 |
| F6.6 | Skip to content link (accessibility) | P0 |

**Acceptance Criteria:**
- Navigation is usable on all screen sizes
- Logo click returns to top
- Skip link is first focusable element

---

## Technical Requirements

### Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | React 18+ | Component model, ecosystem, team familiarity |
| Build Tool | Vite | Fast dev server, optimized builds, modern defaults |
| 3D Engine | Three.js | Industry standard for WebGL |
| 3D React | @react-three/fiber | Declarative Three.js, React integration |
| 3D Helpers | @react-three/drei | Common abstractions (controls, loaders, etc.) |
| Styling | Tailwind CSS or CSS Modules | Utility-first or scoped styles (TBD) |
| Animation | Framer Motion (optional) | Smooth UI transitions |
| Analytics | Google Analytics 4 or Plausible | Event tracking, privacy-friendly option |

### Browser Support

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | Latest 2 | Full |
| Firefox | Latest 2 | Full |
| Safari | Latest 2 | Full |
| Edge | Latest 2 | Full |
| Safari iOS | Latest 2 | Full |
| Chrome Android | Latest 2 | Full |
| IE11 | N/A | Not supported |

### Device Support

| Device | Support Level | Notes |
|--------|---------------|-------|
| Desktop (1920×1080+) | Primary | Full experience |
| Laptop (1366×768+) | Primary | Full experience |
| Tablet (768×1024+) | Secondary | Simplified controls |
| Mobile (375×667+) | Secondary | Touch-optimized, reduced effects |

### Project Structure (Recommended)

```
bmw-m-landing/
├── public/
│   ├── models/          # .glb files (or loaded from CDN)
│   ├── images/          # Poster fallbacks, favicons
│   └── fonts/           # Self-hosted fonts if needed
├── src/
│   ├── components/
│   │   ├── canvas/      # 3D-specific components
│   │   │   ├── ModelViewer.tsx
│   │   │   ├── Lighting.tsx
│   │   │   └── Controls.tsx
│   │   ├── ui/          # UI components
│   │   │   ├── Navigation.tsx
│   │   │   ├── ModelPicker.tsx
│   │   │   ├── ExhibitSection.tsx
│   │   │   ├── CompareWall.tsx
│   │   │   └── Footer.tsx
│   │   └── common/      # Shared components
│   │       ├── Button.tsx
│   │       └── Loader.tsx
│   ├── data/
│   │   └── models.json  # Model specs, paths, metadata
│   ├── hooks/
│   │   ├── useModelLoader.ts
│   │   ├── useScrollSection.ts
│   │   └── useReducedMotion.ts
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── analytics.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Performance Requirements

### Load Time Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Time to Interactive (TTI) | < 3.5s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| First Input Delay (FID) | < 100ms | Lighthouse |

### 3D Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Frame rate | 60fps (desktop), 30fps (mobile) | During interaction |
| Model load time | < 5s per model | On 4G connection |
| Memory usage | < 500MB | Peak during session |
| GPU utilization | Non-blocking | No UI jank |

### Optimization Strategies

**Asset Optimization:**
- Compress .glb files with Draco or meshopt
- Generate poster images (WebP, 1920×1080) for loading states
- Lazy load models not in viewport
- Prefetch next section's model

**Code Optimization:**
- Code split by route/section
- Tree shake unused Three.js modules
- Lazy load heavy components (3D canvas)
- Use React.memo for expensive renders

**Runtime Optimization:**
- Cap pixel ratio on mobile (max 2)
- Reduce shadow map resolution on mobile
- Disable postprocessing on low-end devices
- Implement LOD (Level of Detail) if needed

---

## Accessibility Requirements

### Standards Compliance

- WCAG 2.1 Level AA minimum
- Section 508 compliant

### Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| A1 | Keyboard navigable (all interactive elements) | P0 |
| A2 | Skip to content link | P0 |
| A3 | Focus indicators visible | P0 |
| A4 | Color contrast 4.5:1 minimum (text) | P0 |
| A5 | Color contrast 3:1 minimum (UI elements) | P0 |
| A6 | Alt text for all images | P0 |
| A7 | Aria labels for 3D canvas | P0 |
| A8 | Reduced motion support | P0 |
| A9 | Screen reader announcements for model changes | P1 |
| A10 | No content conveyed by color alone | P0 |
| A11 | Touch targets minimum 44×44px | P0 |

### 3D Accessibility

The 3D canvas presents unique accessibility challenges:

1. **Canvas Description:** Provide aria-label describing the current model and available interactions
2. **Alternative Content:** Include text descriptions of each model for screen reader users
3. **Keyboard Controls:** Arrow keys for rotation, +/- for zoom, R for reset
4. **Reduced Motion:** Disable auto-rotate and damped transitions when `prefers-reduced-motion` is set

---

## Analytics Specification

### Events to Track

| Event Name | Trigger | Properties |
|------------|---------|------------|
| `page_view` | Page load | `page_title`, `page_location` |
| `model_loaded` | 3D model finishes loading | `model_name`, `load_time_ms` |
| `model_viewed` | Model enters viewport | `model_name`, `section` |
| `picker_select` | User clicks model picker | `model_name`, `previous_model` |
| `orbit_interaction` | User rotates model | `model_name`, `duration_ms` |
| `zoom_interaction` | User zooms model | `model_name`, `direction` |
| `scroll_depth` | User reaches scroll milestone | `depth_percent` (25, 50, 75, 100) |
| `compare_view` | Compare section enters viewport | — |
| `cta_click` | User clicks CTA button | `cta_type` (info, brochure, dealer) |
| `session_duration` | Page unload | `duration_seconds` |

### Custom Dimensions

| Dimension | Description |
|-----------|-------------|
| `device_type` | desktop / tablet / mobile |
| `reduced_motion` | true / false |
| `webgl_supported` | true / false |

---

## Design Requirements

### Visual Design Principles

**Museum Gallery Aesthetic:**
- Clean, uncluttered layouts
- Content breathes with generous whitespace
- Typography as primary design element
- Subtle shadows and depth (no harsh contrasts)
- Light theme: ivory/off-white (#FAFAFA to #F5F5F0 range)

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Background | #FAFAF8 | Page background |
| Surface | #FFFFFF | Cards, elevated elements |
| Text Primary | #1A1A1A | Headlines, body |
| Text Secondary | #666666 | Captions, metadata |
| Accent | #1C69D4 | BMW blue (sparingly) |
| Border | #E5E5E0 | Subtle dividers |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 (Hero) | BMW Type / Helvetica Neue | 72px | Light |
| H2 (Exhibit) | BMW Type / Helvetica Neue | 48px | Light |
| H3 (Section) | BMW Type / Helvetica Neue | 32px | Regular |
| Body | System Sans | 18px | Regular |
| Caption | System Sans | 14px | Regular |
| Placard | System Sans | 16px | Regular |

*Note: BMW Type requires licensing. Fallback to Helvetica Neue or system sans-serif.*

### Motion Design

| Animation | Duration | Easing | Reduced Motion |
|-----------|----------|--------|----------------|
| Model transition | 800ms | ease-out | Instant |
| Content fade in | 600ms | ease-out | Instant |
| Scroll snap | 400ms | ease-in-out | Instant |
| Button hover | 200ms | ease | Maintained |
| Auto-rotate | Continuous (slow) | linear | Disabled |

### Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Desktop XL | ≥1440px | Full experience |
| Desktop | ≥1024px | Full experience |
| Tablet | ≥768px | Simplified picker, stacked compare |
| Mobile | <768px | Single column, touch-optimized |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Large model files slow initial load** | High | High | Draco compression, poster fallbacks, progressive loading |
| **Mobile GPU struggles with 3D** | Medium | High | Cap DPR, reduce shadows, provide 2D fallback option |
| **Browser WebGL incompatibility** | Low | High | Feature detection, graceful fallback to static images |
| **Scroll performance issues** | Medium | Medium | Virtualize off-screen sections, optimize repaints |
| **Touch gestures conflict with scroll** | Medium | Medium | Clear interaction zones, gesture disambiguation |
| **Accessibility compliance gaps** | Medium | Medium | Early testing with screen readers, audit before launch |
| **Font licensing issues** | Low | Low | Use system fonts or licensed alternatives |

---

## Acceptance Criteria

### Launch Readiness Checklist

**Functionality:**
- [ ] All four models load and render correctly
- [ ] Orbit controls work on desktop and mobile
- [ ] Model picker switches between all models
- [ ] Scroll navigation reaches all sections
- [ ] Compare wall displays all specifications
- [ ] CTA buttons are functional (link or form)
- [ ] Navigation links work correctly

**Performance:**
- [ ] Lighthouse Performance score ≥ 80
- [ ] LCP < 2.5s on 4G connection
- [ ] No jank during scroll or interaction (60fps target)
- [ ] Models load with visible progress indication

**Accessibility:**
- [ ] Keyboard navigation works end-to-end
- [ ] Screen reader announces model changes
- [ ] Reduced motion preference respected
- [ ] Color contrast passes WCAG AA
- [ ] All interactive elements have focus styles

**Cross-Browser:**
- [ ] Tested on Chrome, Firefox, Safari, Edge
- [ ] Tested on iOS Safari, Android Chrome
- [ ] WebGL fallback works where needed

**Analytics:**
- [ ] All specified events fire correctly
- [ ] Data appears in analytics dashboard

---

## Non-Goals (v1)

The following are explicitly out of scope for version 1:

- **User authentication / accounts**
- **E-commerce / payments**
- **Real-time inventory or pricing**
- **Dealer locator with maps integration**
- **Configurator (color, options selection)**
- **AR/VR experiences**
- **Multi-language support**
- **CMS integration**
- **User-generated content**

---

## Future Considerations

Potential enhancements for future versions:

1. **Configurator:** Allow users to change colors, wheels, options
2. **AR View:** "See it in your driveway" using WebXR
3. **Sound Design:** Engine sounds, ambient audio
4. **Comparison Tool:** Select 2 models for detailed head-to-head
5. **Personalization:** Remember user's preferred model
6. **Internationalization:** Multi-language support
7. **CMS:** Content management for easy copy updates
8. **Video Integration:** Utilize BMWHerovid assets for background videos

---

## Appendices

### A: Asset Inventory

See [asset-audit.md](./asset-audit.md) for complete asset inventory and mapping.

### B: Content & Copy

See [content-copy-deck.md](./content-copy-deck.md) for complete copy deck, tone guide, and content matrix.

### C: Reference Sites

- [Porsche Experience](https://www.porsche.com/) — Premium automotive web experience
- [Apple Product Pages](https://www.apple.com/) — Scroll-driven storytelling
- [BMW Official](https://www.bmw.com/) — Brand guidelines reference

### D: Technical References

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*End of Document*
