import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('bmw-dark-mode')
    if (saved !== null) {
      return saved === 'true'
    }
    // Then check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Update localStorage
    localStorage.setItem('bmw-dark-mode', String(isDarkMode))
    
    // Update document class
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(prev => !prev)

  return { isDarkMode, toggleDarkMode }
}
