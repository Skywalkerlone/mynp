// 'use client'
// import { motion } from 'framer-motion'
// import { FaHeart, FaReact, FaNodeJs, FaGithub } from 'react-icons/fa'

// export default function Footer() {
//   return (
//     <footer className="bg-gradient-to-r from-sky-400 to-blue-700 dark:from-slate-900 dark:to-slate-800 text-white py-8 px-6">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center md:text-left text-sm"
//         >
//           &copy; {new Date().getFullYear()} I daewor  Samuel  Providence. All rights reserved.
//         </motion.div>

//         <motion.div
//           className="flex items-center space-x-4 text-xl"
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ type: 'spring', stiffness: 100, damping: 10 }}
//         >
//           <motion.span
//             whileHover={{ scale: 1.3, color: '#ef4444' }}
//             className="text-red-500"
//             aria-label="Love"
//             title="Made with love"
//           >
//             <FaHeart />
//           </motion.span>
//           <motion.span
//             whileHover={{ scale: 1.3, color: '#61dafb' }}
//             aria-label="React"
//             title="Built with React"
//             className="text-cyan-400"
//           >
//             <FaReact />
//           </motion.span>
//           <motion.span
//             whileHover={{ scale: 1.3, color: '#68a063' }}
//             aria-label="Node.js"
//             title="Powered by Node.js"
//             className="text-green-600"
//           >
//             <FaNodeJs />
//           </motion.span>
//           <motion.a
//             href="https://github.com/yourusername"
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.3, color: '#ffffff' }}
//             aria-label="GitHub Repository"
//             title="GitHub"
//             className="text-white"
//           >
//             <FaGithub />
//           </motion.a>
//         </motion.div>
//       </div>
//     </footer>
//   )
// }

















'use client'
import { motion } from 'framer-motion'
import { FaHeart, FaReact, FaNodeJs, FaGithub, FaCode, FaPalette } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss } from 'react-icons/si'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { darkMode } = useTheme()

  const techStack = [
    { icon: <FaReact />, label: 'React', color: '#61dafb', href: 'https://reactjs.org/' },
    { icon: <SiNextdotjs />, label: 'Next.js', color: '#000000', href: 'https://nextjs.org/' },
    { icon: <SiTailwindcss />, label: 'Tailwind CSS', color: '#06b6d4', href: 'https://tailwindcss.com/' },
    { icon: <FaNodeJs />, label: 'Node.js', color: '#68a063', href: 'https://nodejs.org/' },
    { icon: <FaPalette />, label: 'Framer Motion', color: '#0055ff', href: 'https://www.framer.com/motion/' },
  ]

  const socialLinks = [
    { icon: <FaGithub />, label: 'GitHub', color: '#ffffff', href: 'https://github.com/yourusername' },
    { icon: <FaCode />, label: 'Portfolio', color: '#3b82f6', href: '#' },
  ]

  return (
    <footer className={`py-8 px-6 transition-all duration-700 ${
      darkMode 
        ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600'
    }`}>
      <div className="max-w-7xl mx-auto">
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
            <div className={`text-lg font-semibold mb-2 ${
              darkMode ? 'text-blue-300' : 'text-white'
            }`}>
              Idaewor Samuel Providence
            </div>
            <p className={`text-sm ${
              darkMode ? 'text-gray-300' : 'text-blue-100'
            }`}>
              Creative Technologist & Digital Artist
            </p>
            <p className={`text-xs mt-2 ${
              darkMode ? 'text-gray-400' : 'text-blue-200'
            }`}>
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className={`text-sm font-medium mb-3 ${
              darkMode ? 'text-gray-300' : 'text-blue-100'
            }`}>
              Built with:
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <motion.a
                  key={index}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  className="flex flex-col items-center gap-1"
                  aria-label={tech.label}
                  title={tech.label}
                >
                  <div className={`text-2xl p-2 rounded-lg transition-all duration-300 ${
                    darkMode 
                      ? 'bg-slate-700/50 hover:bg-slate-700' 
                      : 'bg-blue-500/30 hover:bg-blue-400/50'
                  }`} style={{ color: tech.color }}>
                    {tech.icon}
                  </div>
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
            <div className={`text-sm font-medium mb-3 ${
              darkMode ? 'text-gray-300' : 'text-blue-100'
            }`}>
              Connect:
            </div>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href === '#' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-xl p-2 rounded-lg transition-all duration-300 ${
                    darkMode 
                      ? 'bg-slate-700/50 hover:bg-slate-700' 
                      : 'bg-blue-500/30 hover:bg-blue-400/50'
                  }`}
                  style={{ color: social.color }}
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-6 ${
          darkMode ? 'bg-slate-700' : 'bg-blue-400'
        }`} />

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
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-red-500"
              >
                <FaHeart />
              </motion.span>
              <span className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-blue-200'
              }`}>
                Made with passion
              </span>
            </div>

            {/* Quick Links */}
            <div className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-blue-200'
            }`}>
              <a href="#home" className="hover:underline hover:text-white transition-colors mx-2">
                Home
              </a>
              •
              <a href="#about" className="hover:underline hover:text-white transition-colors mx-2">
                About
              </a>
              •
              <a href="#contact" className="hover:underline hover:text-white transition-colors mx-2">
                Contact
              </a>
            </div>

            {/* Status */}
            <div className={`text-xs px-3 py-1 rounded-full ${
              darkMode 
                ? 'bg-green-900/30 text-green-300 border border-green-800/50' 
                : 'bg-green-500/20 text-green-800 border border-green-400/50'
            }`}>
              🟢 Available for opportunities
            </div>
          </div>

          {/* Final Copyright */}
          <p className={`text-xs mt-6 ${
            darkMode ? 'text-gray-500' : 'text-blue-300'
          }`}>
            Designed & developed by Idaewor Samuel E. Providence • Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}