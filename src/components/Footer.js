'use client'
import { motion } from 'framer-motion'
import { FaHeart, FaReact, FaNodeJs, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-400 to-blue-700 dark:from-slate-900 dark:to-slate-800 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left text-sm"
        >
          &copy; {new Date().getFullYear()} Idaewor Samuel Providence. All rights reserved.
        </motion.div>

        <motion.div
          className="flex items-center space-x-4 text-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
          <motion.span
            whileHover={{ scale: 1.3, color: '#ef4444' }}
            className="text-red-500"
            aria-label="Love"
            title="Made with love"
          >
            <FaHeart />
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.3, color: '#61dafb' }}
            aria-label="React"
            title="Built with React"
            className="text-cyan-400"
          >
            <FaReact />
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.3, color: '#68a063' }}
            aria-label="Node.js"
            title="Powered by Node.js"
            className="text-green-600"
          >
            <FaNodeJs />
          </motion.span>
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3, color: '#ffffff' }}
            aria-label="GitHub Repository"
            title="GitHub"
            className="text-white"
          >
            <FaGithub />
          </motion.a>
        </motion.div>
      </div>
    </footer>
  )
}
