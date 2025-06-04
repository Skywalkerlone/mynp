'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSun, FaMoon, FaBars, FaTimes, FaPaintBrush, FaCode,
  FaHome, FaBriefcase, FaUser, FaEnvelope
} from 'react-icons/fa'
import { MdArrowDropDown } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false)
  const router = useRouter()

  const portfolioRef = useRef(null)
  const mobilePortfolioRef = useRef(null)
  const menuRef = useRef(null)

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
  }, [menuOpen])

  // Close menus on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpen(false)
      setMobilePortfolioOpen(false)
      setPortfolioOpen(false)
    }
    router.events?.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  // Close desktop dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (portfolioRef.current && !portfolioRef.current.contains(event.target)) {
        setPortfolioOpen(false)
      }
    }
    if (portfolioOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [portfolioOpen])

  // Close mobile dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobilePortfolioRef.current && !mobilePortfolioRef.current.contains(event.target)) {
        setMobilePortfolioOpen(false)
      }
    }
    if (mobilePortfolioOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobilePortfolioOpen])

  const toggleMode = () => setDarkMode(!darkMode)

  const navItems = [
    { name: 'Home', icon: <FaHome />, href: '#home' },
    { name: 'Services', icon: <FaBriefcase />, href: '#services' },
    {
      name: 'Portfolio',
      icon: <FaPaintBrush />,
      submenu: [
        { name: 'Artistic Services', icon: <FaPaintBrush />, href: '#gallery' },
        { name: 'Technical Services', icon: <FaCode />, href: '#web' },
      ],
    },
    { name: 'About', icon: <FaUser />, href: '#about' },
    { name: 'Contact', icon: <FaEnvelope />, href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/50 backdrop-blur-md border-b border-black/10 dark:border-white/10 text-black dark:text-white shadow-lg"
      role="navigation"
      aria-label="Primary Navigation"
    >
      <div className="flex justify-between items-center px-6 py-4  mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => router.push('#home')}
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter') router.push('#home') }}
          aria-label="Go to Home"
          role="link"
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
            <span className="text-blue-400">My</span>
            <span className="dark:text-white text-black">Portfolio</span>
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center font-semibold">
          {navItems.map(({ name, icon, submenu, href }) => (
            <li
              key={name}
              className="relative"
              ref={name === 'Portfolio' ? portfolioRef : null}
            >
              {submenu ? (
                <>
                  <button
                    aria-haspopup="true"
                    aria-expanded={portfolioOpen}
                    className="flex items-center gap-1 select-none transition-colors duration-300 hover:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    onClick={() => setPortfolioOpen(prev => !prev)}
                    onKeyDown={e => {
                      if (e.key === 'Escape') setPortfolioOpen(false)
                    }}
                  >
                    {icon}
                    <span>{name}</span>
                    <MdArrowDropDown
                      className={`transition-transform ml-1 text-lg ${portfolioOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence>
                    {portfolioOpen && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute top-full left-0 bg-white dark:bg-black text-black dark:text-white rounded shadow-md py-2 w-56 z-50 overflow-hidden"
                        role="menu"
                        aria-label="Portfolio submenu"
                      >
                        {submenu.map(({ name, href, icon }) => (
                          <li key={name} role="none">
                            <Link
                              href={href}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus-visible:bg-black/20 dark:focus-visible:bg-white/20 rounded"
                              role="menuitem"
                              tabIndex={0}
                              onClick={() => setPortfolioOpen(false)}
                            >
                              {icon} {name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={href}
                  className="flex items-center gap-2 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  tabIndex={0}
                >
                  {icon} {name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleMode}
          className="transition-all duration-300 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
                <FaMoon aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ scale: 0 }}
              >
                <FaSun aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => {
            setMenuOpen(prev => !prev)
            setMobilePortfolioOpen(false)
          }}
          className="md:hidden text-2xl ml-4 z-[999]"
          aria-label={`${menuOpen ? 'Close' : 'Open'} Menu`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Sidebar */}
            <motion.aside
              key="sidebar"
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 right-0 w-4/5 max-w-xs h-screen bg-white dark:bg-black backdrop-blur-md text-black dark:text-white p-6 z-50 overflow-y-auto"
              role="menu"
              aria-label="Mobile menu"
              ref={menuRef}
            >
              <ul className="flex flex-col gap-6 mt-16 text-lg font-semibold">
                {navItems.map(({ name, icon, submenu, href }) => (
                  <li key={name} className="relative" ref={name === 'Portfolio' ? mobilePortfolioRef : null}>
                    {submenu ? (
                      <>
                        <button
                          className="flex justify-between items-center w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                          onClick={() => setMobilePortfolioOpen(prev => !prev)}
                          aria-haspopup="true"
                          aria-expanded={mobilePortfolioOpen}
                          aria-controls="mobile-portfolio-submenu"
                        >
                          <span className="flex items-center gap-2">
                            {icon} {name}
                          </span>
                          <MdArrowDropDown
                            className={`transition-transform text-lg ${mobilePortfolioOpen ? 'rotate-180' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence>
                          {mobilePortfolioOpen && (
                            <motion.ul
                              id="mobile-portfolio-submenu"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-2 space-y-2 pl-4 border-l border-black/10 dark:border-white/20 overflow-hidden"
                              role="menu"
                              aria-label="Mobile portfolio submenu"
                            >
                              {submenu.map(({ name, href, icon }) => (
                                <li key={name} role="none">
                                  <button
                                    className="flex items-center gap-2 hover:text-blue-500 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                    onClick={() => {
                                      router.push(href)
                                      setMenuOpen(false)
                                      setMobilePortfolioOpen(false)
                                    }}
                                    role="menuitem"
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
                        className="flex items-center gap-2 hover:text-blue-500 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                        onClick={() => {
                          router.push(href)
                          setMenuOpen(false)
                        }}
                        role="menuitem"
                      >
                        {icon} {name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
