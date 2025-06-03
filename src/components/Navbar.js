'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60 }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-black/80 text-white p-4 flex justify-between items-center shadow-lg"
    >
      <div className="text-xl font-bold">My Logo</div>

      <div className="hidden md:flex gap-6 text-sm">
        <a href="#home" className="hover:text-blue-300">Home</a>
        <a href="#services" className="hover:text-blue-300">Services</a>
        <div className="relative group">
          <button className="hover:text-blue-300">Portfolio</button>
          <div className="absolute hidden group-hover:flex flex-col bg-black border rounded mt-2 p-2">
            <a href="#web" className="hover:text-blue-300">Technical Services</a>
            <a href="#gallery" className="hover:text-blue-300">Artistic Services</a>
          </div>
        </div>
        <a href="#about" className="hover:text-blue-300">About</a>
        <a href="#contact" className="hover:text-blue-300">Contact</a>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞' : '🌙'}
        </button>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black p-4 flex flex-col gap-2 md:hidden">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#web">Technical Services</a>
          <a href="#gallery">Artistic Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      )}
    </motion.nav>
  )
}
