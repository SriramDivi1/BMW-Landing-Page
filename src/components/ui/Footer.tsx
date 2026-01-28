import { motion } from 'framer-motion'

interface FooterProps {
  isDarkMode?: boolean
}

export function Footer({ isDarkMode = false }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={`py-10 sm:py-12 md:py-16 px-4 sm:px-6 transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-gallery-text text-gallery-bg'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            className="text-2xl sm:text-3xl font-semibold tracking-widest hover:text-gallery-accent transition-colors"
            style={{ fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy", letterSpacing: '0.2em' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            BMW
          </motion.button>

          {/* Links */}
          <nav className="flex items-center gap-6 sm:gap-8">
            <a 
              href="#car-sections" 
              className={`text-xs sm:text-sm transition-colors ${
                isDarkMode 
                  ? 'text-gray-500 hover:text-white' 
                  : 'text-gallery-text-secondary hover:text-gallery-bg'
              }`}
            >
              Models
            </a>
            <a 
              href="#compare" 
              className={`text-xs sm:text-sm transition-colors ${
                isDarkMode 
                  ? 'text-gray-500 hover:text-white' 
                  : 'text-gallery-text-secondary hover:text-gallery-bg'
              }`}
            >
              Compare
            </a>
          </nav>
        </div>

        <div className={`mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t transition-colors ${
          isDarkMode ? 'border-white/10' : 'border-gallery-text-secondary/20'
        }`}>
          <div className="flex justify-center">
            {/* Disclaimer */}
            <p className={`text-[10px] sm:text-xs text-center max-w-md transition-colors ${
              isDarkMode ? 'text-gray-600' : 'text-gallery-text-secondary'
            }`}>
              BMW is a registered trademark of BMW AG. 
              This is a portfolio project and is not affiliated with BMW AG.
            </p>
          </div>
        </div>

        {/* Back to top button - Responsive */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-gallery-accent text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-gallery-accent/90 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </footer>
  )
}
