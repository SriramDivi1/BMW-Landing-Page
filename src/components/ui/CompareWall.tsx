import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { models, comparisonSpecs } from '../../data/models'

interface CompareWallProps {
  isDarkMode?: boolean
}

export function CompareWall({ isDarkMode = false }: CompareWallProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const headerY = useTransform(scrollYProgress, [0, 0.5], [50, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="compare"
      className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 transition-colors duration-300 relative overflow-hidden ${
        isDarkMode ? 'bg-zinc-950' : 'bg-gallery-surface'
      }`}
      aria-label="Comparison of BMW M model specifications"
    >
      {/* Animated background gradient */}
      <motion.div 
        className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-black via-zinc-950 to-black' : 'bg-gradient-to-b from-gallery-bg via-gallery-surface to-gallery-bg'}`}
        animate={{
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with scroll animation */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light mb-2 sm:mb-4 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gallery-text'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Side by side.
          </motion.h2>
          <motion.p 
            className={`text-sm sm:text-base md:text-lg transition-colors ${
              isDarkMode ? 'text-gray-400' : 'text-gallery-text-secondary'
            }`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Compare all M models
          </motion.p>
        </motion.div>

        {/* Comparison Table - Desktop/Tablet */}
        <motion.div 
          className="hidden sm:block overflow-x-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <table className="w-full min-w-[500px]">
            <thead>
              <motion.tr 
                className={`border-b-2 transition-colors ${
                  isDarkMode ? 'border-white/10' : 'border-gallery-border'
                }`}
                variants={itemVariants}
              >
                <th className={`py-4 md:py-6 text-left text-xs md:text-sm font-normal tracking-wider uppercase w-24 md:w-40 transition-colors ${
                  isDarkMode ? 'text-gray-500' : 'text-gallery-text-secondary'
                }`}>
                  Spec
                </th>
                {models.map((model, i) => (
                  <motion.th
                    key={model.id}
                    className={`py-4 md:py-6 text-center font-display text-lg md:text-xl lg:text-2xl font-light transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gallery-text'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                  >
                    {model.name}
                  </motion.th>
                ))}
              </motion.tr>
            </thead>
            <tbody>
              {comparisonSpecs.map((spec, index) => (
                <motion.tr
                  key={spec.key}
                  className={`border-b transition-all duration-300 ${
                    isDarkMode 
                      ? 'border-white/5 hover:bg-white/5' 
                      : 'border-gallery-border hover:bg-gallery-bg/50'
                  }`}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.01, x: 3 }}
                >
                  <td className={`py-3 md:py-5 text-xs md:text-sm tracking-wider uppercase transition-colors ${
                    isDarkMode ? 'text-gray-500' : 'text-gallery-text-secondary'
                  }`}>
                    {spec.label}
                  </td>
                  {models.map((model, i) => (
                    <motion.td
                      key={`${model.id}-${spec.key}`}
                      className={`py-3 md:py-5 text-center text-sm md:text-base lg:text-lg font-display transition-colors ${
                        isDarkMode ? 'text-gray-200' : 'text-gallery-text'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.05 + i * 0.05 }}
                    >
                      {model.specs[spec.key]}
                    </motion.td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Comparison Cards - Mobile */}
        <motion.div 
          className="sm:hidden space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {models.map((model, modelIndex) => (
            <motion.div
              key={model.id}
              variants={itemVariants}
              className={`p-4 rounded-xl border transition-colors ${
                isDarkMode 
                  ? 'bg-black border-white/10' 
                  : 'bg-gallery-bg border-gallery-border'
              }`}
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h3 
                className={`text-xl font-display font-light mb-0.5 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gallery-text'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: modelIndex * 0.1 }}
              >
                {model.name}
              </motion.h3>
              <p className="text-xs text-gallery-accent mb-4">{model.character}</p>
              
              <dl className="space-y-2">
                {comparisonSpecs.map((spec, specIndex) => (
                  <motion.div 
                    key={spec.key} 
                    className={`flex justify-between items-center py-1.5 border-b last:border-0 transition-colors ${
                      isDarkMode ? 'border-white/5' : 'border-gallery-border'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: modelIndex * 0.1 + specIndex * 0.05 }}
                  >
                    <dt className={`text-xs uppercase tracking-wider transition-colors ${
                      isDarkMode ? 'text-gray-500' : 'text-gallery-text-secondary'
                    }`}>
                      {spec.label}
                    </dt>
                    <dd className={`text-sm font-display transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gallery-text'
                    }`}>
                      {model.specs[spec.key]}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
