import { motion } from 'framer-motion'
import { models } from '../../data/models'

interface CarToggleProps {
  currentModelId: string
  onSelect: (modelId: string) => void
  isDarkMode?: boolean
}

export function CarToggle({ currentModelId, onSelect, isDarkMode = false }: CarToggleProps) {
  return (
    <div 
      className={`relative flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 backdrop-blur-md rounded-full border shadow-lg transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-black/90 border-white/10' 
          : 'bg-gallery-surface/90 border-gallery-border'
      }`}
      role="tablist"
      aria-label="Select BMW M model"
    >
      {models.map((model) => {
        const isActive = model.id === currentModelId
        
        return (
          <button
            key={model.id}
            onClick={() => onSelect(model.id)}
            role="tab"
            aria-selected={isActive}
            aria-label={`View BMW ${model.name}`}
            className="relative px-3 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 z-10"
          >
            {/* Animated background for active state */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 rounded-full shadow-md ${
                  isDarkMode ? 'bg-gallery-accent' : 'bg-gallery-text'
                }`}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className={`relative z-10 transition-colors duration-200 whitespace-nowrap ${
              isActive 
                ? 'text-white' 
                : isDarkMode 
                  ? 'text-gray-400 hover:text-white' 
                  : 'text-gallery-text-secondary hover:text-gallery-text'
            }`}>
              {model.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
