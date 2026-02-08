// 'use client'
// import { motion } from 'framer-motion'
// import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

// const socialLinks = [
//   {
//     href: 'https://www.linkedin.com/in/providence-idaewor-1059422a2/',
//     icon: <FaLinkedin />,
//     label: 'LinkedIn',
//   },
//   {
//     href: 'https://github.com/Skywalkerlone',
//     icon: <FaGithub />,
//     label: 'GitHub',
//   },
//   {
//     href: 'https://www.twitter.com/yourprofile',
//     icon: <FaTwitter />,
//     label: 'Twitter',
//   },
//   {
//     href: 'https://www.instagram.com/e_sai_art?igsh=MW1ndjNqMW8yZXB4Mw==',
//     icon: <FaInstagram />,
//     label: 'Instagram',
//   },
//   {
//     href: 'https://youtube.com/@cansaidraw8494?si=f-c-CaPT5vSNJYae',
//     icon: <FaYoutube />,
//     label: 'YouTube',
//   },
// ]

// export default function SocialMedia() {
//   return (
//     <>
//       {/* Vertical sidebar on medium+ screens */}
//       <div className="fixed top-1/3 left-4 z-[9999] hidden md:flex flex-col space-y-6">
//         {socialLinks.map(({ href, icon, label }, i) => (
//           <motion.a
//             key={label}
//             href={href}
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label={label}
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             whileHover={{ scale: 1.2, color: '#3b82f6' }}
//             transition={{ delay: i * 0.15, type: 'spring', stiffness: 120 }}
//             className="text-white dark:text-blue-400 text-3xl hover:text-blue-500"
//           >
//             {icon}
//           </motion.a>
//         ))}
//       </div>

//       {/* Horizontal bottom bar on small screens */}
//       <div className="fixed bottom-0 left-0 right-0 z-[9999] flex md:hidden bg-black/40 bg-opacity-20 dark:bg-slate-900/50 dark:bg-opacity-20 py-1 justify-center space-x-10">
//         {socialLinks.map(({ href, icon, label }, i) => (
//           <motion.a
//             key={label}
//             href={href}
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label={label}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             whileHover={{ scale: 1.3, color: '#3b82f6' }}
//             transition={{ delay: i * 0.1, type: 'spring', stiffness: 120 }}
//             className="text-white dark:text-blue-400 text-1xl hover:text-blue-500"
//           >
//             {icon}
//           </motion.a>
//         ))}
//       </div>
//     </>
//   )
// }









'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaTimes,
  FaUserPlus,
} from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/providence-idaewor-1059422a2/',
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    color: '#0A66C2',
    description: 'Professional Network'
  },
  {
    href: 'https://github.com/Skywalkerlone',
    icon: <FaGithub />,
    label: 'GitHub',
    color: '#0A66C2',
    description: 'Code Projects'
  },
  {
    href: 'https://youtube.com/@cansaidraw8494',
    icon: <FaYoutube />,
    label: 'YouTube',
   color: '#0A66C2',
    description: 'Tutorials'
  },
  {
    href: 'https://wa.me/2348117820918',
    icon: <FaWhatsapp />,
    label: 'WhatsApp',
  color: '#0A66C2',
    description: 'Quick Chat'
  },
]

export default function MobileSocialMedia() {
  const { darkMode } = useTheme()
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && !e.target.closest('.social-media-container')) {
        setOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [open])

  // Mobile layout - Bottom right corner
  if (isMobile) {
    return (
      <div className="social-media-container fixed bottom-6 0 left-6 z-[9999]">
        {/* MAIN BUTTON - Mobile */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            setOpen(!open)
          }}
          className={`w-10 h-10 border border-blue-30 rounded-full flex items-center justify-center text-2xl shadow-2xl transition-all ${
            darkMode
              ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border border-slate-700'
              : 'bg-gradient-to-br from-white to-gray-100 text-gray-800 border border-blue-200'
          }`}
          style={{
            boxShadow: darkMode
              ? '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 -2px 10px rgba(255, 255, 255, 0.1)'
              : '0 10px 30px rgba(0, 0, 0, 0.1), inset 0 -2px 10px rgba(255, 255, 255, 0.8)'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={open ? 'close' : 'open'}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {open ? <FaTimes /> : <FaUserPlus />}
            </motion.div>
          </AnimatePresence>
          
          {/* Notification dot */}
          {!open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                darkMode ? 'bg-blue-500' : 'bg-blue-400'
              }`}
            />
          )}
        </motion.button>

        {/* SOCIAL POP-OUT - Mobile (circular arrangement) */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 right-0"
            >
              {socialLinks.map((item, i) => {
                const angle = (i * 90) - 45 // 4 items at 90° intervals, starting at -45°
                const radius = 80
                const x = Math.cos(angle * Math.PI / 180) * radius
                const y = Math.sin(angle * Math.PI / 180) * radius

                return (
                  <motion.a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      x,
                      y,
                      scale: 1,
                    }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: i * 0.1,
                    }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg ${
                      darkMode
                        ? 'bg-slate-800 border border-slate-700'
                        : 'bg-white border border-gray-200'
                    }`}
                    style={{ color: item.color }}
                    aria-label={item.label}
                  >
                    {item.icon}
                    
                    {/* Tooltip for mobile */}
                    <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 ${
                      darkMode
                        ? 'bg-slate-800 text-white border border-slate-700 shadow-2xl'
                        : 'bg-white text-gray-800 border border-gray-200 shadow-2xl'
                    }`}>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Desktop layout (vertical sidebar - similar to original but improved)
  return (
    <div className="social-media-container fixed left-6 top-1/2 -translate-y-1/2 z-[9999]">
      {/* MAIN BUTTON - Desktop */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-xl transition-all ${
          darkMode
            ? 'bg-slate-800 text-white border border-slate-700'
            : 'bg-white text-gray-800 border border-gray-200'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={open ? 'close' : 'open'}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? <FaTimes /> : <FaUserPlus />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* SOCIAL POP-OUT - Desktop (vertical) */}
      <AnimatePresence>
        {open &&
          socialLinks.map((item, i) => {
            const offset = (i + 1) * 70

            return (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  x: offset,
                  y: 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: i * 0.1,
                }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute top-0 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg group ${
                  darkMode
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-gray-200'
                }`}
                style={{ color: item.color }}
                aria-label={item.label}
              >
                {item.icon}
                
             
              </motion.a>
            )
          })}
      </AnimatePresence>
    </div>
  )
}