'use client'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'


export default function Page() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <main className="bg-gradient-to-b from-sky-100 to-blue-200 dark:from-blue-800 dark:to-black text-black dark:text-white transition-colors duration-500">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    
    </main>
  )
}
