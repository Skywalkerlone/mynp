'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const projects = [
  {
    title: 'Country Finder',
    image: 'cffff.png',
    description: 'An interactive app showing countries, maps, weather, travel data, and more.',
    link: 'https://country-finder-gray-psi.vercel.app/',
  },
  {
    title: 'Word Scramble',
    image: 'wc.png',
    description: 'Unscramble the letters to form a valid word! Challenge yourself with my Word Scramble game. Can you solve it?',
    link: 'https://word-scramble-gv93.vercel.app',
  },
  {
    title: 'TPN consult',
    image: 'tpn.png',
    description: 'Learning management system (LMS)... coming soon',
    link: 'https://your-news-app.com',
  },
  {
    title: 'Trashpoint',
    image: 'trs.png',
    description: 'A React + Next.js site that does amazing things.',
    link: 'https://trashpoint.africa/',
  },
  {
    title: 'OSA heritage',
    image: 'osa.png',
    description: 'non-code',
    link: 'https://www.osaheritage.com/',
  },
]

function ProjectCard({ project, index }) {
  return (
    <div className="relative group rounded-xl overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-pink-500/20 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 rounded-xl" />
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col md:flex-row items-center gap-6 bg-white/10 dark:bg-slate-800/60 rounded-xl shadow-2xl p-5 md:p-8 w-full overflow-hidden border border-white/10 backdrop-blur-md hover:shadow-blue-400/30 transition-shadow duration-500"
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={`/webb/${project.image}`}
            alt={`Screenshot of ${project.title}`}
            width={400}
            height={250}
            className="rounded-md object-cover w-full max-w-xs sm:max-w-sm md:max-w-md"
            priority={index < 2}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
            {project.description}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View website for ${project.title}`}
            className="relative inline-block bg-blue-500 px-5 py-3 rounded-lg text-white font-semibold hover:scale-105 transition-all duration-300 ease-in-out shadow-md overflow-hidden"
          >
            <span className="relative z-10">View Website</span>
            <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-opacity duration-300 rounded-lg blur-sm"></span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default function Web() {
  return (
    <section
      id="web"
      className="relative py-16 bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full overflow-hidden"
    >
      {/* Section Background Aura */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-blue-800/10 via-pink-500/5 to-indigo-700/10 blur-3xl opacity-20 pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12 px-4 max-w-4xl mx-auto"
      >
        <span className="text-blue-200">Technical</span> Portfolio
      </motion.h2>

      <div className="space-y-12 px-4 max-w-6xl mx-auto w-full">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 text-center px-4"
      >
        <Link href="#services">
          <button
            className="bg-gradient-to-r from-white/20 via-white/10 to-white/5 backdrop-blur-md p-3 md:p-3 shadow-lg border border-white/30 text-white rounded-lg hover:scale-105 transition-transform duration-300"
            aria-label="Back to Technical Services"
          >
            Back to Technical Services
          </button>
        </Link>
      </motion.div>
    </section>
  )
}
