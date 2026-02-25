'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSun, FaMoon, FaBars, FaTimes, FaPaintBrush, FaCode,
  FaHome, FaBriefcase, FaUser, FaEnvelope, FaGifts,
  FaBook
} from 'react-icons/fa'
import { MdArrowDropDown } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false)
  
  const { darkMode, toggleTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
  }, [menuOpen])

  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpen(false)
      setMobilePortfolioOpen(false)
    }
    router.events?.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  const navItems = [
    { name: 'Home', icon: <FaHome />, href: '#home' },
    { name: 'Services', icon: <FaBriefcase />, href: '#services' },
    {
      name: 'Portfolio',
      icon: <FaPaintBrush />,
      submenu: [
        { name: 'Technical Services', icon: <FaCode />, href: '#web' },
        { name: 'Artistic Services', icon: <FaPaintBrush />, href: '#art' },
        { name: 'Graphic Gallery', icon: <FaGifts />, href: '#graphic' },
          { name: 'Educational Services', icon: <FaBook />, href: '#ep' },
        
      ],
    },
    { name: 'About', icon: <FaUser />, href: '#about' },
    { name: 'Contact', icon: <FaEnvelope />, href: '#contact' },
  ]

  // Comet animation component
  const CometBorder = () => (
    <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 dark:via-blue-300/50 to-transparent"></div>
      <motion.div
        className="absolute bottom-0 h-[2px] w-24 bg-gradient-to-r from-transparent via-white dark:via-blue-300 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '400%' }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
          delay: Math.random() * 1
        }}
      />
      <motion.div
        className="absolute bottom-0 h-[2px] w-16 bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-400 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '400%' }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "linear",
          delay: 1 + Math.random() * 2
        }}
      />
    </div>
  )

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
      className="fixed top-0 left-0 w-full backdrop-blur-lg  z-50 overflow-visible"
    >
      {/* Comet border container */}
       <div className="relative">
        <div className={`relative  shadow-2xl ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-950/25 from-10% via-blue-900/35 via-40% to-blue-950/25 to-90% border-b border-blue-800/60 text-white shadow-2xl  shadow-blue-900/20' 
            : 'bg-gradient-to-r from-blue-200/30 from-10% via-blue-100/40 via-40% to-blue-50/40 to-90% border-b border-blue-500/70 text-black shadow-2xl shadow-blue-400/20'
        }`}>
          {/* Comet animation layer */}
          <div className="absolute inset-0 overflow-hidden">
            <CometBorder />
          </div>
          
          <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full object-contain"
                priority
              />
              <span className="text-xl font-bold">
                <span className="text-blue-600 dark:text-blue-300">My</span>
                <span className="text-gray-800 dark:text-white">Portfolio</span>
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8 items-center font-semibold">
              {navItems.map(({ name, icon, submenu, href }) => (
                <li key={name} className="relative group cursor-pointer  transition duration-300 hover:text-blue-600 dark:hover:text-blue-400">
                  {submenu ? (
                    <>
                      <button
                        className="flex items-center gap-1 select-none "
                        onClick={() => setPortfolioOpen(!portfolioOpen)}
                        onBlur={() => setTimeout(() => setPortfolioOpen(false), 150)}
                      >
                        {name}
                        <MdArrowDropDown className={`transition-transform ${portfolioOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {portfolioOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`absolute top-8 left-0 rounded-lg shadow-xl py-2 w-56 z-50 overflow-hidden backdrop-blur-xl ${
                              darkMode 
                                ? 'bg-blue-900/80 border border-blue-800/50 text-white' 
                                : 'bg-white/90 border border-blue-200/40 text-gray-800'
                            }`}
                          >
                            {submenu.map(({ name, href, icon }) => (
                              <li key={name} className="px-4 py-2 hover:bg-blue-50/50 dark:hover:bg-blue-800/50 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
                                <Link href={href} className="flex items-center gap-2" onClick={() => setPortfolioOpen(false)}>
                                  {icon} {name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={href} className="flex items-center gap-2 hover:underline underline-offset-4 decoration-blue-500 dark:decoration-blue-400">
                      {icon} {name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Dark Mode Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`transition-all duration-300 p-2 rounded-full ${
                  darkMode 
                    ? 'hover:bg-blue-800/30 text-white' 
                    : 'hover:bg-blue-100 text-blue-600'
                }`}
                aria-label="Toggle Dark Mode"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <FaMoon />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <FaSun />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen)
                  setMobilePortfolioOpen(false)
                }}
                className="md:hidden text-2xl z-90 text-blue-600 dark:text-white"
                aria-label="Toggle Menu"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className={`fixed top-0 right-0 w-2/3 h-screen  backdrop-blur-xl shadow-2xl p-6 z-60 md:hidden overflow-y-auto ${
              darkMode 
                ? 'bg-gradient-to-b from-blue-900/30 from-10% via-blue-800/50 via-30% to-blue-900/30 to-90% border-l border-blue-800/30 text-white' 
                : 'bg-gradient-to-b from-blue-100/40 from-10% via-blue-100/500 via-30% to-blue-100/10 to-90% border-l border-blue-500/40 text-gray-800'
            }`}
          >
            {/* Comet border for mobile */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
              <CometBorder />
            </div>
            
            <ul className="flex flex-col  gap-6 mt-16 text-lg font-semibold">
              {navItems.map(({ name, icon, submenu, href }) => (
                <li key={name} className="relative">
                  {submenu ? (
                    <>
                      <div
                        className="flex justify-between items-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={() => setMobilePortfolioOpen(!mobilePortfolioOpen)}
                      >
                        <div className="flex items-center gap-2">{icon} {name}</div>
                        <MdArrowDropDown className={`transition-transform ${mobilePortfolioOpen ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {mobilePortfolioOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`mt-2 space-y-2 pl-4 border-l overflow-hidden ${
                              darkMode 
                                ? 'border-blue-800/40' 
                                : 'border-blue-200/40'
                            }`}
                          >
                            {submenu.map(({ name, href, icon }) => (
                              <li key={name}>
                                <button
                                  className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 w-full text-left transition-colors"
                                  onClick={() => {
                                    router.push(href)
                                    setMenuOpen(false)
                                    setMobilePortfolioOpen(false)
                                  }}
                                >
                                  {icon} {name}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 w-full text-left transition-colors"
                      onClick={() => {
                        router.push(href)
                        setMenuOpen(false)
                      }}
                    >
                      {icon} {name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}