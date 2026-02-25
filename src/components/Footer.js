'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FaHeart, FaReact, FaNodeJs, FaGithub, FaCode, FaPalette, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss, SiJavascript, SiFramer } from 'react-icons/si'
import { useTheme } from '../context/ThemeContext'
import { useEffect, useRef, useState } from 'react'
import { icons } from 'lucide-react'
import { Label } from 'recharts'

export default function Footer() {
  const { darkMode } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const footerRef = useRef(null)

  // Smooth mouse follow for gooey effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 100, opacity:10 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const techStack = [
    { icon: <FaReact />, label: 'React', color: '#61dafb', href: 'https://reactjs.org/' },
    { icon: <SiNextdotjs />, label: 'Next.js', color: darkMode ? '#ffffff' : '#000000', href: 'https://nextjs.org/' },
    { icon: <SiTailwindcss />, label: 'Tailwind', color: '#06b6d4', href: 'https://tailwindcss.com/' },
    { icon: <FaNodeJs />, label: 'Node.js', color: '#68a063', href: 'https://nodejs.org/' },
    { icon: <SiJavascript />, label: 'JavaScript', color: '#3178c6', href: 'https://www.javascriptlang.org/' },
    { icon: <SiFramer />, label: 'Framer', color: '#bb4aff', href: 'https://www.framer.com/motion/' },
  ]

  const socialLinks = [
    { icon: <FaGithub />, label: 'GitHub', color: '#ffffff', href: 'https://github.com/Skywalkerlone' },
    { icon: <FaLinkedin />, label: 'LinkedIn', color: '#0077b5', href: 'https://www.linkedin.com/in/providence-idaewor-1059422a2/' },
    { icon: <FaCode />, label: 'Portfolio', color: '#3b82f6', href: '/' },
    { icon: <FaWhatsapp />, label: 'Reach me', color: 'green',  href: 'https://wa.me/2348117820918' },
  ]

  // Liquid wave animation
  const waveVariants = {
    animate: {
      d: [
        "M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,160C672,160,768,192,864,208C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
        "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
        "M0,160L48,154.7C96,149,192,139,288,149.3C384,160,480,192,576,186.7C672,181,768,139,864,128C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
      ],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <footer 
      ref={footerRef}
      className={`relative py-12 px-6 overflow-hidden transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-blue-950' 
          : 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600'
      }`}
    >
      {/* Liquid Wave Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-48"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            variants={waveVariants}
            animate="animate"
            fill={darkMode ? '#6366f1' : '#ffffff'}
            fillOpacity="0.9"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full h-56 transform scale-105"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ bottom: '-10px' }}
        >
          <motion.path
            variants={waveVariants}
            animate="animate"
            fill={darkMode ? '#8b5cf6' : '#ffffff'}
            fillOpacity="0.2"
            transition={{ delay: 0.9 }}
          />
        </svg>
      </div>

      {/* Interactive Gooey Blob */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-400 to-blue-400 blur-3xl opacity-10 pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-500 blur-3xl opacity-10"
          animate={{
            x: [0, 100, 0, -100, 0],
            y: [0, -50, 100, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: '10%',
            top: '20%',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-500 blur-3xl opacity-10"
          animate={{
            x: [0, -100, 0, 100, 0],
            y: [0, 50, -100, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            right: '10%',
            bottom: '20%',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          {/* Copyright & Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className={`text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${
                darkMode 
                  ? 'from-blue-300 to-blue-300' 
                  : 'from-white to-blue-100'
              }`}
            >
              Idaewor Samuel Providence
            </motion.h3>
            <p className={`text-sm mb-2 ${
              darkMode ? 'text-gray-300' : 'text-blue-100'
            }`}>
              Creative Technologist & Digital Artist
            </p>
            <motion.p 
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-blue-200'
              }`}
            >
              &copy; {new Date().getFullYear()} All rights reserved.
            </motion.p>
          </motion.div>

          {/* Tech Stack - Floating Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <motion.h4
              animate={{ 
                textShadow: ['0 0 8px rgba(59,130,246,0.3)', '0 0 16px rgba(147,51,234,0.3)', '0 0 8px rgba(59,130,246,0.3)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`text-sm font-medium mb-4 ${
                darkMode ? 'text-gray-300' : 'text-blue-100'
              }`}
            >
              Built with modern tech
            </motion.h4>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <motion.a
                  key={index}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  className="flex flex-col items-center gap-1 group"
                  aria-label={tech.label}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`text-2xl p-2 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                      darkMode 
                        ? 'bg-slate-800/50 group-hover:bg-slate-700/70 border border-slate-700' 
                        : 'bg-white/10 group-hover:bg-white/20 border border-white/20'
                    }`}
                    style={{ color: tech.color }}
                  >
                    {tech.icon}
                  </motion.div>
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-blue-200'
                  }`}>
                    {tech.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h4 className={`text-sm font-medium mb-4 ${
              darkMode ? 'text-gray-300' : 'text-blue-100'
            }`}>
              Connect with me
            </h4>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{ background: social.color }}
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <div className={`relative text-xl p-2 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                    darkMode 
                      ? 'bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700' 
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  }`} style={{ color: social.color }}>
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Liquid Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`h-px w-full mb-6 bg-gradient-to-r ${
            darkMode 
              ? 'from-transparent via-indigo-400 to-transparent' 
              : 'from-transparent via-white to-transparent'
          }`}
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {/* Made with Love */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-blue-400"
              >
                <FaHeart />
              </motion.span>
              <span className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-blue-200'
              }`}>
                Made with liquid precision
              </span>
            </motion.div>

            {/* Quick Links */}
            <div className={`flex gap-4 text-sm ${
              darkMode ? 'text-gray-400' : 'text-blue-200'
            }`}>
              {['Home', 'About', 'Work', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ y: -2 }}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Status */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-xs px-3 py-1 rounded-full backdrop-blur-sm ${
                darkMode 
                  ? 'bg-green-900/30 text-green-300 border border-green-800/50' 
                  : 'bg-green-500/20 text-green-800 border border-green-400/50'
              }`}
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"
              />
              Available for opportunities
            </motion.div>
          </div>

          {/* Final Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-xs mt-6 ${
              darkMode ? 'text-gray-500' : 'text-blue-300'
            }`}
          >
            Designed & developed with{' '}
            <motion.span
              animate={{ 
                color: ['#ef4444', '#3b82f6', '#8b5cf6', '#ef4444']
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              my unique sense of style
            </motion.span>{' '}
            by Idaewor Samuel E. Providence
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}