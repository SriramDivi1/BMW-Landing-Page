# BMW M Landing Page — Asset Audit

## Overview

This document inventories all 3D assets available for the BMW M landing page and maps them to their respective exhibit sections.

---

## Asset Inventory

| Model | File Name | File Size | Location |
|-------|-----------|-----------|----------|
| BMW M2 | `2023_bmw_m2_coupe.glb` | 16 MB | `assets/BMW3DHero/` |
| BMW M4 | `bmw_m4_widebody__www.vecarz.com.glb` | 21 MB | `assets/BMW3DHero/` |
| BMW M5 | `2018_bmw_m5.glb` | 5.1 MB | `assets/BMW3DHero/` |
| BMW M8 | `2020_bmw_m8_coupe.glb` | 15 MB | `assets/BMW3DHero/` |

**Total asset size:** ~57 MB (uncompressed)

---

## Asset-to-Section Mapping

### Hero Exhibit (Landing)
- **Default model:** BMW M2 (2023_bmw_m2_coupe.glb)
- **Rationale:** The M2 is the entry point to the M lineup — compact, approachable, yet unmistakably M. Sets the tone for the gallery journey.

### Exhibit Room 1 — M2
- **File:** `2023_bmw_m2_coupe.glb`
- **Year:** 2023
- **Character:** The purist's choice. Compact performance.
- **Notes:** Clean, modern geometry. Good for close-up detail shots.

### Exhibit Room 2 — M4
- **File:** `bmw_m4_widebody__www.vecarz.com.glb`
- **Year:** Contemporary (widebody variant)
- **Character:** Aggressive presence. Statement design.
- **Notes:** Largest file (21 MB). Consider Draco compression. Widebody styling provides dramatic silhouette.

### Exhibit Room 3 — M5
- **File:** `2018_bmw_m5.glb`
- **Year:** 2018
- **Character:** The executive athlete. Power meets refinement.
- **Notes:** Smallest file (5.1 MB). Loads fastest — good candidate for prefetch/eager load.

### Exhibit Room 4 — M8
- **File:** `2020_bmw_m8_coupe.glb`
- **Year:** 2020
- **Character:** Grand touring pinnacle. Flagship presence.
- **Notes:** Coupe body style. Elegant lines suit the "museum finale" position.

---

## Performance Recommendations

### Compression Strategy
| Model | Current Size | Target (Draco) | Priority |
|-------|--------------|----------------|----------|
| M4 | 21 MB | ~5-7 MB | High |
| M2 | 16 MB | ~4-5 MB | High |
| M8 | 15 MB | ~4-5 MB | Medium |
| M5 | 5.1 MB | ~1.5-2 MB | Low (already small) |

### Loading Strategy
1. **Immediate:** Load M2 (hero) on page load with poster fallback
2. **Eager prefetch:** M5 (smallest, loads fast)
3. **Lazy:** M4 and M8 as user scrolls toward their sections
4. **Progressive:** Show low-poly placeholder → swap to full model

### File Naming Convention (Recommended)
For cleaner imports and consistency, consider renaming:

| Current | Recommended |
|---------|-------------|
| `2023_bmw_m2_coupe.glb` | `bmw-m2.glb` |
| `bmw_m4_widebody__www.vecarz.com.glb` | `bmw-m4.glb` |
| `2018_bmw_m5.glb` | `bmw-m5.glb` |
| `2020_bmw_m8_coupe.glb` | `bmw-m8.glb` |

---

## Missing Assets (Future Consideration)

- **Poster images:** Static renders for loading states (1920×1080, WebP)
- **Environment map:** HDRI for realistic reflections (studio lighting)
- **Thumbnail sprites:** For model picker UI (400×300)
- **Video loops:** Optional ambient background (if BMWHerovid folder is utilized)

---

## Technical Notes

- All models are in `.glb` format (binary glTF) — compatible with Three.js / React Three Fiber
- Models appear to include materials/textures embedded
- No separate texture files detected — simplifies loading pipeline
- File sizes suggest high-poly models — may need LOD variants for mobile

---

*Last updated: January 2026*
