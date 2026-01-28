import { motion } from 'framer-motion'

interface LoaderProps {
  message?: string
}

export function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated spinner */}
      <motion.div
        className="relative w-12 h-12"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-gallery-accent/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gallery-accent" />
      </motion.div>
      
      {/* Pulsing text */}
      <motion.p
        className="text-sm text-gallery-text-secondary dark:text-gray-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  )
}
