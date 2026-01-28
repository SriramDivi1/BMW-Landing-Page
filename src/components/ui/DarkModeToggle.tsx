import { motion } from 'framer-motion'

interface DarkModeToggleProps {
  isDarkMode: boolean
  onToggle: () => void
}

export function DarkModeToggle({ isDarkMode, onToggle }: DarkModeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border transition-all duration-300 ${
        isDarkMode 
          ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white' 
          : 'bg-gallery-text/5 border-gallery-border hover:bg-gallery-text/10 text-gallery-text'
      }`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDarkMode ? 180 : 0,
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? (
          // Sun icon for switching to light mode
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        ) : (
          // Moon icon for switching to dark mode
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  )
}
