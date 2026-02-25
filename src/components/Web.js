'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'
import { useRef } from 'react'

const skills = [
  'Next.js', 'HTML', 'Tailwind', 'CSS', 'JavaScript',
  'PHP', 'React', 'WordPress', 'Laravel',
  'MySQL', 'MongoDB', 'Java', 'Python', 'reactNative', 'expressjs', 'node', 'git'
]

const projects = [
  {
    title: 'Country Finder',
    image: 'mk.png',
    description: 'An interactive app showing countries, maps, weather, travel data, and more. (HTML, CSS & JavaScript)',
    link: 'https://country-finder-gray-psi.vercel.app/',
    tag: ['HTML', 'CSS', 'Javascript', 'firebase'],
  },
  {
    title: 'Game hub',
    image: 'gb.png',
    description: 'Explore immersive Xavier-themed games! All titles are fully optimized for mobile with smooth swipe and touch controls. Each game delivers unique gameplay mechanics, power-ups, and progressively challenging levels—built with (HTML, CSS, and JavaScript).',
    link: 'https://skywalkergamehub.vercel.app/',
    tag: ['HTML', 'CSS', 'Javascript'],
  },
   {
    title: 'Upperclass AI',
    image: 'uo.png',
    description: 'An AI-driven LMS platform for machine learning, web development, and other skills, built with Django and Vite, featuring intelligent chatbots and interactive training.',
    link: 'upperclassai.com',
    tag: ['HTML', 'CSS', 'Javascript'],
  },
  {
    title: 'TPN consult',
    image: 'tpn.png',
    description: 'Learning management system (LMS)... coming soon (Next.js, TailwindCSS, Node.js, ExpressJS)',
    link: 'https://tpnschool.com',
    tag: ['Nextjs', 'tailwindcss', 'framer', 'nodejs', 'express.js'],
  },
  {
    title: 'Trashpoint',
    image: 'trs.png',
    description: 'A WordPress site.',
    link: 'https://trashpoint.africa/',
    tag: ['HTML', 'CSS', 'Javascript']
  },
  {
    title: 'OSA heritage',
    image: 'osa.png',
    description: 'A WordPress site.',
    link: 'https://www.osaheritage.com/',
  },
  {
    title: 'Obel',
    image: 'osay.png',
    description: 'From mechanical constructions to electrical installations, pipelines, and facility maintenance we deliver reliable, efficient, and high-quality solutions for the oil, gas, and manufacturing industries.',
    link: 'https://www.osayanyoboltd.com/',
    tag: ['react', 'tailwindcss', 'framer'],
  },
]

function ProjectCard({ project, index, darkMode }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.2 })

  return (
    <div
      ref={cardRef}
      id="web"
      className={`relative group rounded-xl overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-r from-blue-500/30 via-purple-800/20 to-pink-500/20'
          : 'bg-gradient-to-r from-blue-600 via-slate-50 to-white'
      }`}
    >
      <div className={`absolute inset-0 z-0 blur-2xl opacity-80 group-hover:opacity-80 transition-opacity duration-500 rounded-lg ${
        darkMode
          ? 'bg-gradient-to-r from-blue-500/30 via-purple-800/20 to-pink-500/20'
          : 'bg-gradient-to-r from-blue-400/20 via-purple-600/10 to-pink-400/10'
      }`} />
      
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        transition={{ duration: 0.8 }}
        className={`relative z-10 flex flex-col md:flex-row items-center gap-6 rounded-xl shadow-xl p-5 md:p-8 w-full overflow-hidden border backdrop-blur-md hover:shadow-2xl transition-all duration-500 ${
          darkMode
            ? 'bg-slate-800/60 border-slate-700 hover:border-blue-500/50 hover:shadow-blue-500/20'
            : 'bg-white/80 border-blue-500 hover:border-blue-300 hover:shadow-blue-300/30'
        }`}
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={`/webb/${project.image}`}
            alt={`Screenshot of ${project.title}`}
            width={400}
            height={250}
            className="rounded-lg object-cover w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg"
            priority={index < 2}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className={`text-2xl font-semibold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {project.title}
          </h3>
          <p className={`text-base mb-4 leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {project.description}
          </p>

          {/* Tag rendering */}
          {project.tag && Array.isArray(project.tag) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tag.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-xs px-2 py-1 rounded-md ${
                    darkMode
                      ? 'bg-blue-700/50 text-blue-200'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View website for ${project.title}`}
            className={`relative inline-block px-5 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 ease-in-out shadow-md overflow-hidden ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <span className="relative z-10">View Website</span>
            <span className={`absolute inset-0 transition-opacity duration-300 rounded-lg blur-sm ${
              darkMode ? 'bg-white/10' : 'bg-white/20'
            }`}></span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default function Web() {
  const { darkMode } = useTheme()
  const skillsRef = useRef(null)
  const statsRef = useRef(null)
  const headingRef = useRef(null)
  
  const isSkillsInView = useInView(skillsRef, { once: false, amount: 0.3 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.5 })
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.5 })

  // Stats animation variants - REMOVED ALL DELAYS
  const statsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } // No delay
    }
  }

  return (
    <section
      id="web"
      className={`relative py-16 w-full overflow-hidden transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 via-blue-900/10 to-slate-900' 
          : 'bg-gradient-to-b from-blue-200 via-white to-blue-50'
      }`}
    >
      {/* Background Aura */}
      <div className={`absolute -z-10 top-0 left-0 w-full h-full blur-3xl opacity-20 pointer-events-none ${
        darkMode
          ? 'bg-gradient-to-br from-blue-800/10 via-pink-500/5 to-indigo-700/10'
          : 'bg-gradient-to-br from-blue-400/5 via-purple-300/5 to-indigo-400/5'
      }`} />

      {/* Skills Bar with out-view animation */}
      <motion.div
        ref={skillsRef}
        initial={{ opacity: 0, y: -20 }}
        animate={isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center items-center gap-3 mb-8 px-4 max-w-5xl mx-auto"
      >
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className={`text-sm md:text-base px-4 py-2 rounded-full font-medium hover:scale-105 transition-all duration-200 ${
              darkMode
                ? 'bg-blue-900/50 text-blue-200 hover:bg-blue-800'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            {skill}
          </span>
        ))}
      </motion.div>

      {/* Frontend/Backend Stats with out-view animation - NO STAGGER */}
      <motion.div
        ref={statsRef}
        variants={statsVariants}
        initial="hidden"
        animate={isStatsInView ? "visible" : "hidden"}
        className="max-w-2xl mx-auto mb-8 px-4"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Frontend */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={isStatsInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.6, type: "spring" }} // REMOVED delay
              className={`relative rounded-full w-32 h-32 mx-auto mb-3 flex items-center justify-center ${
                darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
              }`}
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke={darkMode ? '#1e3a8a' : '#93c5fd'}
                  strokeWidth="8"
                  fill="none"
                  className="opacity-30"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke={darkMode ? '#60a5fa' : '#2563eb'}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 364` }}
                  animate={isStatsInView ? { strokeDasharray: `${290} 364` } : { strokeDasharray: `0 364` }}
                  transition={{ duration: 1.5, ease: "easeOut" }} // REMOVED delay
                  style={{
                    strokeDasharray: `${290} 364`,
                  }}
                />
              </svg>
              <span className={`text-3xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                85%
              </span>
            </motion.div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Frontend
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              React, Next.js, Framer, Tailwind
            </p>
          </div>

          {/* Backend */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={isStatsInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.6, type: "spring" }} // REMOVED delay
              className={`relative rounded-full w-32 h-32 mx-auto mb-3 flex items-center justify-center ${
                darkMode ? 'bg-purple-900/30' : 'bg-purple-100'
              }`}
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke={darkMode ? '#581c87' : '#c4b5fd'}
                  strokeWidth="8"
                  fill="none"
                  className="opacity-30"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke={darkMode ? '#c084fc' : '#7c3aed'}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 364` }}
                  animate={isStatsInView ? { strokeDasharray: `${55} 364` } : { strokeDasharray: `0 364` }}
                  transition={{ duration: 1.5, ease: "easeOut" }} // REMOVED delay
                  style={{
                    strokeDasharray: `${55} 364`,
                  }}
                />
              </svg>
              <span className={`text-3xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                15%
              </span>
            </motion.div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Backend
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Node.js, Laravel, Django, Express, Databases
            </p>
          </div>
        </div>

        {/* Stats description - REMOVED delay */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }} // REMOVED delay
          className={`text-center mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          ⚡ Specialized in modern frontend with growing backend expertise
        </motion.p>
      </motion.div>

      {/* Technical Portfolio Heading with out-view animation */}
      <motion.h2
        ref={headingRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className={`text-3xl sm:text-4xl font-bold text-center mb-12 px-4 max-w-4xl mx-auto ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
          Technical
        </span>
        <span className={darkMode ? 'text-white' : 'text-gray-700'}>
          {' '}Portfolio
        </span>
      </motion.h2>

      {/* Projects */}
      <div className="space-y-12 px-4 max-w-6xl mx-auto w-full">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index} 
            darkMode={darkMode}
          />
        ))}
      </div>

      {/* Back Button with out-view animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }} // Changed from delay to duration
        className="mt-16 text-center px-4"
      >
        <Link href="#services">
          <button
            className={`backdrop-blur-md p-3 md:p-3 shadow-lg border rounded-lg hover:scale-105 transition-all duration-300 ${
              darkMode
                ? 'bg-gradient-to-r from-white/20 via-white/10 to-white/5 border-white/30 text-white hover:bg-white/20'
                : 'bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-purple-500/5 border-blue-300/50 text-blue-800 hover:bg-blue-500/30 hover:border-blue-400'
            }`}
            aria-label="Back to Technical Services"
          >
            Back to Technical Services
          </button>
        </Link>
      </motion.div>
    </section>
  )
}