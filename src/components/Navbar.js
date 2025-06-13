'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSun, FaMoon, FaBars, FaTimes, FaPaintBrush, FaCode,
  FaHome, FaBriefcase, FaUser, FaEnvelope,
  FaIcicles,
  FaGifts
} from 'react-icons/fa'
import { MdArrowDropDown } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false)

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

  const toggleMode = () => setDarkMode(!darkMode)

  const navItems = [
    { name: 'Home', icon: <FaHome />, href: '#home' },
    { name: 'Services', icon: <FaBriefcase />, href: '#services' },
    {
      name: 'Portfolio',
      icon: <FaPaintBrush />,
      submenu: [ 
        { name: 'Technical Services', icon: <FaCode />, href: '#web' },
        { name: 'Artistic Services', icon: <FaPaintBrush />, href: '#gallery' },
        // { name: 'Graphic Gallery'}, icon: <FaIcicles />, href: '#gallery' }
        { name: 'Graphic Gallery', icon: <FaGifts />, href: '#graphic' }
       
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
    className="fixed top-0 left-0 w-full z-50 bg-white/80 comet-border dark:bg-black/50 backdrop-blur-md border-b border-black/10 dark:border-white/10 text-black dark:text-white shadow-lg"


    >
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
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
            <span className="text-blue-300">My</span>
            <span className="dark:text-white text-black">Portfolio</span>
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center font-semibold">
          {navItems.map(({ name, icon, submenu, href }) => (
            <li key={name} className="relative group cursor-pointer transition duration-300 hover:text-blue-400">
              {submenu ? (
                <>
                  <button
                    className="flex items-center gap-1 select-none"
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
                        className="absolute top-8 left-0 bg-white dark:bg-black text-black dark:text-white rounded shadow-md py-2 w-56 z-50 overflow-hidden"
                      >
                        {submenu.map(({ name, href, icon }) => (
                          <li key={name} className="px-4 py-2  hover:bg-black/10 hover:text-blue-500 dark:hover:bg-white/10">
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
                <Link href={href} className="flex items-center gap-2 hover:underline underline-offset-4">
                  {icon} {name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleMode}
          className="transition-all duration-300 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
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
          className="md:hidden text-2xl ml-4 z-90"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 w-2/3 h-screen bg-white dark:bg-black backdrop-blur-md text-black dark:text-white p-6 z-60 md:hidden overflow-y-auto"
          >
            <ul className="flex flex-col gap-6 mt-16 text-lg font-semibold">
              {navItems.map(({ name, icon, submenu, href }) => (
                <li key={name} className="relative">
                  {submenu ? (
                    <>
                      <div
                        className="flex justify-between items-center cursor-pointer"
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
                            className="mt-2 space-y-2 pl-4 border-l border-black/10 dark:border-white/20 overflow-hidden"
                          >
                            {submenu.map(({ name, href, icon }) => (
                              <li key={name}>
                                <button
                                  className="flex items-center gap-2 hover:text-blue-400 w-full text-left"
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
                      className="flex items-center gap-2 hover:text-blue-400 w-full text-left"
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
