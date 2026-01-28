import { useEffect, useRef, useState, memo } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import { BMWModel } from '../../data/models'
import { ModelViewer } from '../canvas/ModelViewer'

interface CarSectionProps {
  model: BMWModel
  index: number
  isDarkMode?: boolean
}

export const CarSection = memo(function CarSection({ model, index, isDarkMode = false }: CarSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [shouldLoadModel, setShouldLoadModel] = useState(false)
  
  // Use once: true for model loading to prevent re-loading
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })
  const isContentInView = useInView(contentRef, { once: true, margin: "-10%" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Smooth spring animations - lighter spring for better performance
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })

  // FIXED: Removed aggressive Y parallax - models stay in place, only subtle scale/opacity
  const modelScale = useTransform(smoothProgress, [0, 0.3, 0.5, 0.7, 1], [0.85, 0.95, 1, 0.95, 0.85])
  const modelOpacity = useTransform(smoothProgress, [0, 0.15, 0.5, 0.85, 1], [0, 1, 1, 1, 0])
  
  // Background text parallax - reduced movement
  const bgTextX = useTransform(smoothProgress, [0, 1], [50, -50])
  const bgTextOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.3, 0])
  
  // Content parallax - reduced movement for stability
  const contentY = useTransform(smoothProgress, [0, 0.5, 1], [30, 0, -30])
  const contentOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    if (isInView) {
      setShouldLoadModel(true)
    }
  }, [isInView])

  const isEven = index % 2 === 0

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  return (
    <section
      ref={sectionRef}
      id={`section-${model.id}`}
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-gallery-bg'
      }`}
    >
      {/* Large background text with parallax */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ opacity: bgTextOpacity, willChange: 'opacity' }}
      >
        <motion.span 
          className={`text-[25vw] sm:text-[22vw] md:text-[20vw] lg:text-[18vw] font-display font-bold select-none whitespace-nowrap transition-colors ${
            isDarkMode ? 'text-white/[0.03]' : 'text-gallery-text/[0.03]'
          }`}
          style={{ x: bgTextX, willChange: 'transform' }}
        >
          {model.name}
        </motion.span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-24 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[80vh] sm:min-h-[85vh]`}>
          
          {/* 3D Model - stable position, subtle scale animation only */}
          <motion.div 
            className={`h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[70vh] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
            style={{ 
              scale: modelScale, 
              opacity: modelOpacity,
              willChange: 'transform, opacity'
            }}
          >
            <motion.div 
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {shouldLoadModel && (
                <ModelViewer 
                  modelPath={model.modelPath}
                  className="w-full h-full"
                  autoRotate={true}
                  isDarkMode={isDarkMode}
                />
              )}
            </motion.div>
          </motion.div>

          {/* Content with staggered animations */}
          <motion.div 
            ref={contentRef}
            className={`${isEven ? 'lg:order-2' : 'lg:order-1'} px-2 sm:px-0`}
            style={{ y: contentY, opacity: contentOpacity, willChange: 'transform, opacity' }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isContentInView ? "visible" : "hidden"}
            >
              {/* Section number */}
              <motion.div variants={itemVariants} className="mb-2 sm:mb-4 relative">
                <span className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-light transition-colors ${
                  isDarkMode ? 'text-white/10' : 'text-gallery-text/10'
                }`}>
                  0{index + 1}
                </span>
              </motion.div>

              {/* Character badge */}
              <motion.div variants={itemVariants}>
                <motion.span 
                  className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4 ${
                    isDarkMode 
                      ? 'text-gallery-accent' 
                      : 'text-gallery-accent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {model.character}
                </motion.span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                variants={itemVariants}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-light mb-2 sm:mb-3 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gallery-text'
                }`}
              >
                {model.headline}
              </motion.h2>

              {/* Model name */}
              <motion.p
                variants={itemVariants}
                className={`text-base sm:text-lg md:text-xl mb-4 sm:mb-6 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gallery-text-secondary'
                }`}
              >
                {model.fullName}
              </motion.p>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className={`text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gallery-text-secondary'
                }`}
              >
                {model.placard}
              </motion.p>

              {/* Specs Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8"
              >
                <SpecCard label="Power" value={model.specs.power} isDarkMode={isDarkMode} />
                <SpecCard label="0-60" value={model.specs.acceleration} isDarkMode={isDarkMode} />
                <SpecCard label="Drive" value={model.specs.drivetrain} isDarkMode={isDarkMode} />
              </motion.div>

              {/* Curator's Note */}
              <motion.div
                variants={itemVariants}
                className="relative pl-3 sm:pl-4 max-w-md"
              >
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-gallery-accent"
                  initial={{ scaleY: 0 }}
                  animate={isContentInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  style={{ originY: 0 }}
                />
                <p className={`text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1 transition-colors ${
                  isDarkMode ? 'text-gray-500' : 'text-gallery-text-secondary'
                }`}>
                  Curator's Note
                </p>
                <p className={`text-xs sm:text-sm italic leading-relaxed transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gallery-text-secondary'
                }`}>
                  "{model.curatorNote}"
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

// Memoized SpecCard for better performance
const SpecCard = memo(function SpecCard({ label, value, isDarkMode }: { label: string; value: string; isDarkMode: boolean }) {
  return (
    <motion.div 
      className="text-center"
      whileHover={{ scale: 1.05, y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <p 
        className={`text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider mb-0.5 sm:mb-1 transition-colors ${
          isDarkMode ? 'text-gray-500' : 'text-gallery-text-secondary'
        }`}
      >
        {label}
      </p>
      <p 
        className={`text-base sm:text-lg md:text-xl lg:text-2xl font-display transition-colors ${
          isDarkMode ? 'text-white' : 'text-gallery-text'
        }`}
      >
        {value}
      </p>
    </motion.div>
  )
})
