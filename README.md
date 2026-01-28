# BMW M Landing Page v1.0

A premium, interactive landing page showcasing BMW M Series vehicles (M2, M4, M5, M8) with immersive 3D models and smooth animations.

![BMW M Landing Page](https://img.shields.io/badge/version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18-61DAFB) ![Three.js](https://img.shields.io/badge/Three.js-3D-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

## Features

- **Interactive 3D Models** - Explore BMW M2, M4, M5, and M8 with fully interactive 3D viewers
- **Model Preloading** - All models preload in the background for instant car switching
- **Dark/Light Mode** - Toggle between elegant light museum theme and dramatic dark studio lighting
- **Responsive Design** - Optimized for mobile, tablet, and desktop viewing
- **Smooth Animations** - Scroll-triggered animations powered by Framer Motion
- **Studio Lighting** - Professional lighting setup with environment reflections
- **Performance Optimized** - React.memo, CSS animations, and GPU-accelerated transforms

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Three.js / React Three Fiber** - 3D rendering
- **@react-three/drei** - 3D helpers and utilities
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SriramDivi1/BMW-Landing-Page.git

# Navigate to project directory
cd BMW-Landing-Page

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
BMW-Landing-Page/
├── public/
│   └── assets/
│       └── BMW3DHero/          # 3D model files (.glb)
├── src/
│   ├── components/
│   │   ├── canvas/             # 3D components
│   │   │   ├── Lighting.tsx
│   │   │   └── ModelViewer.tsx
│   │   └── ui/                 # UI components
│   │       ├── CarSection.tsx
│   │       ├── CarToggle.tsx
│   │       ├── CompareWall.tsx
│   │       ├── DarkModeToggle.tsx
│   │       ├── Footer.tsx
│   │       └── Loader.tsx
│   ├── data/
│   │   └── models.ts           # Car data and specs
│   ├── hooks/
│   │   ├── useDarkMode.ts
│   │   └── useReducedMotion.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── PRD.md
│   ├── asset-audit.md
│   └── content-copy-deck.md
└── package.json
```

## Controls

- **Arrow Keys** - Switch between car models
- **D Key** - Toggle dark/light mode
- **Mouse Drag** - Rotate 3D models
- **+/- Buttons** - Zoom in/out on hero model
- **Scroll** - Navigate through sections

## Screenshots

### Light Mode
Premium museum gallery aesthetic with clean white backgrounds and soft studio lighting.

### Dark Mode
Dramatic studio environment with colored accent lighting and pure black backgrounds.

## Performance

- Model preloading for instant switching
- Lazy loading for off-screen sections
- GPU-accelerated CSS animations
- React.memo for optimized re-renders
- Reduced motion support for accessibility

## License

This project is for educational and demonstration purposes.

## Author

**Sriram Divi**

---

*Built with React, Three.js, and Framer Motion*
