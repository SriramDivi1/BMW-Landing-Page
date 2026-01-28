import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ModelViewer } from './components/canvas/ModelViewer'
import { CarToggle } from './components/ui/CarToggle'
import { DarkModeToggle } from './components/ui/DarkModeToggle'
import { CarSection } from './components/ui/CarSection'
import { CompareWall } from './components/ui/CompareWall'
import { Footer } from './components/ui/Footer'
import { models } from './data/models'
import { useDarkMode } from './hooks/useDarkMode'

function App() {
  const [currentModelId, setCurrentModelId] = useState(models[0].id)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1) // 1 = default, range 0.5 to 1.5
  const currentModel = models.find(m => m.id === currentModelId) || models[0]
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const handleZoomIn = useCallback(() => setZoomLevel(prev => Math.min(prev + 0.1, 1.5)), [])
  const handleZoomOut = useCallback(() => setZoomLevel(prev => Math.max(prev - 0.1, 0.5)), [])

  // Scroll-based animations for hero
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9])
  const heroY = useTransform(scrollY, [0, 400], [0, -50])

  const handleModelSelect = useCallback((modelId: string) => {
    setCurrentModelId(modelId)
  }, [])

  const scrollToSections = useCallback(() => {
    const element = document.getElementById('car-sections')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const currentIndex = models.findIndex(m => m.id === currentModelId)
        let newIndex: number
        
        if (e.key === 'ArrowRight') {
          newIndex = (currentIndex + 1) % models.length
        } else {
          newIndex = currentIndex === 0 ? models.length - 1 : currentIndex - 1
        }
        
        setCurrentModelId(models[newIndex].id)
      }
      // Toggle dark mode with 'D' key
      if (e.key === 'd' || e.key === 'D') {
        toggleDarkMode()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentModelId, toggleDarkMode])

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-gallery-bg'}`}>
      {/* Animated Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-gallery-accent via-blue-400 to-gallery-accent z-[60]"
        style={{ width: `${scrollProgress}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      />

      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header - Responsive */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-black/80 border-white/10' 
            : 'bg-gallery-bg/80 border-gallery-border'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
          <motion.h1 
            className={`text-xl sm:text-2xl font-semibold tracking-widest cursor-pointer transition-colors ${
              isDarkMode ? 'text-white' : 'text-gallery-text'
            }`}
            style={{ fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy", letterSpacing: '0.2em' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            BMW
          </motion.h1>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
            <motion.a 
              href="#compare" 
              className={`text-xs sm:text-sm transition-colors ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gallery-text-secondary hover:text-gallery-text'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Compare
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main id="main-content">
        {/* Hero Section - Responsive */}
        <section className={`h-screen flex flex-col relative overflow-hidden pt-12 sm:pt-14 ${isDarkMode ? 'bg-black' : 'bg-gallery-bg'}`}>
          {/* Animated background lines - CSS animation for better performance - Hidden on mobile */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`absolute h-px ${isDarkMode ? 'bg-white/5' : 'bg-gallery-text/5'} animate-slide-line`}
                style={{
                  width: '100%',
                  top: `${25 + i * 20}%`,
                  animationDuration: `${25 + i * 8}s`,
                  animationDelay: `${i * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Left side scrolling text - Desktop only */}
          <motion.div 
            className="absolute left-4 xl:left-6 top-1/3 z-20 hidden xl:block pointer-events-none"
            style={{ opacity: heroOpacity }}
          >
            <div className={`writing-vertical text-xs tracking-[0.3em] uppercase animate-scroll-up transition-colors ${
              isDarkMode ? 'text-white/10' : 'text-gallery-text-secondary/30'
            }`}>
              Performance · Precision · Power · Excellence
            </div>
          </motion.div>

          {/* Right side scrolling text - Desktop only */}
          <motion.div 
            className="absolute right-4 xl:right-6 top-1/3 z-20 hidden xl:block pointer-events-none"
            style={{ opacity: heroOpacity }}
          >
            <div className={`writing-vertical text-xs tracking-[0.3em] uppercase animate-scroll-down transition-colors ${
              isDarkMode ? 'text-white/10' : 'text-gallery-text-secondary/30'
            }`}>
              M Power · Racing DNA · Track Ready
            </div>
          </motion.div>

          {/* Car Toggle at the top - Responsive */}
          <motion.div 
            className="absolute top-16 sm:top-20 left-0 right-0 z-30 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              {/* Current model info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentModel.id}
                  className="text-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[10px] sm:text-xs text-gallery-accent tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-0.5 sm:mb-1">
                    {currentModel.character}
                  </p>
                  <h2 className={`text-lg sm:text-2xl md:text-3xl font-display font-light transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gallery-text'
                  }`}>
                    {currentModel.fullName}
                  </h2>
                </motion.div>
              </AnimatePresence>

              {/* Car Toggle */}
              <motion.div 
                className="mt-1 sm:mt-2 w-full flex justify-center overflow-x-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <CarToggle 
                  currentModelId={currentModelId}
                  onSelect={handleModelSelect}
                  isDarkMode={isDarkMode}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Model Viewer - Full width */}
          <motion.div 
            className="flex-1 w-full h-full absolute inset-0 top-12 sm:top-14" 
            style={{ 
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentModel.id}
                className="w-full h-full"
                initial={{ opacity: 0, x: 150 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -150 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <ModelViewer 
                  modelPath={currentModel.modelPath}
                  className="w-full h-full"
                  autoRotate={true}
                  isHero={true}
                  isDarkMode={isDarkMode}
                  zoomLevel={zoomLevel}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Zoom Controls - Responsive positioning */}
          <motion.div 
            className="absolute right-4 sm:right-8 md:right-16 lg:right-20 bottom-16 sm:bottom-20 z-30 flex flex-col gap-1.5 sm:gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={handleZoomIn}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                  : 'bg-gallery-text/5 hover:bg-gallery-text/10 text-gallery-text border border-gallery-border'
              } ${zoomLevel >= 1.5 ? 'opacity-30 cursor-not-allowed' : ''}`}
              whileHover={{ scale: zoomLevel < 1.5 ? 1.1 : 1 }}
              whileTap={{ scale: zoomLevel < 1.5 ? 0.9 : 1 }}
              disabled={zoomLevel >= 1.5}
              aria-label="Zoom in"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
              </svg>
            </motion.button>

            <motion.button
              onClick={handleZoomOut}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' 
                  : 'bg-gallery-text/5 hover:bg-gallery-text/10 text-gallery-text border border-gallery-border'
              } ${zoomLevel <= 0.5 ? 'opacity-30 cursor-not-allowed' : ''}`}
              whileHover={{ scale: zoomLevel > 0.5 ? 1.1 : 1 }}
              whileTap={{ scale: zoomLevel > 0.5 ? 0.9 : 1 }}
              disabled={zoomLevel <= 0.5}
              aria-label="Zoom out"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Explore button at the very bottom - Responsive */}
          <motion.div 
            className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={scrollToSections}
              className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-colors group ${
                isDarkMode 
                  ? 'text-gray-500 hover:text-white' 
                  : 'text-gallery-text-secondary hover:text-gallery-text'
              }`}
              aria-label="Scroll to explore each model"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span className="text-[10px] sm:text-xs tracking-widest uppercase">
                Explore
              </motion.span>
              <motion.svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.button>
          </motion.div>
        </section>

        {/* Individual Car Sections */}
        <div id="car-sections">
          {models.map((model, index) => (
            <CarSection 
              key={model.id}
              model={model}
              index={index}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {/* Compare Wall */}
        <CompareWall isDarkMode={isDarkMode} />
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />

      {/* Screen reader announcement */}
      <div role="status" aria-live="polite" className="sr-only">
        Now viewing {currentModel.fullName}
      </div>
    </div>
  )
}

export default App
