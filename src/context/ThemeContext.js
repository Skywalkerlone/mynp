// context/ThemeContext.js
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load theme on first mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'dark') {
      setDarkMode(true)
    } else if (savedTheme === 'light') {
      setDarkMode(false)
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      setDarkMode(prefersDark)
    }
    
    setIsInitialized(true)
  }, [])

  // Apply theme to <html>
  useEffect(() => {
    if (!isInitialized) return;
    
    const root = document.documentElement

    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode, isInitialized])

  const toggleTheme = useCallback(() => {
    setDarkMode(prev => !prev)
  }, [])

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}