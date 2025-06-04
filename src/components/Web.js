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
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="project-card flex flex-col md:flex-row items-center md:items-start md:gap-8 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8"
    >
      <div className="w-full md:w-1/2 flex-shrink-0">
        <Image
          src={`/webb/${project.image}`}
          alt={`Screenshot of ${project.title}`}
          width={400}
          height={250}
          className="rounded-md object-cover w-full h-auto"
          priority={index < 2} // prioritize first 2 images for performance
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-6 md:mt-0 md:w-1/2 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-3 md:mb-4">{project.title}</h3>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">{project.description}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View website for ${project.title}`}
          className="inline-block bg-blue-600 dark:bg-blue-400 px-5 py-3 rounded-lg text-white font-medium hover:scale-105 transition-transform duration-300 ease-in-out shadow-md"
        >
          View Website
        </a>
      </div>
    </motion.div>
  )
}

export default function Web() {
  return (
    <section id="web" className="py-16 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12 px-4 md:px-0 max-w-4xl mx-auto"
      >
        <span className="text-blue-200">Technical</span> Portfolio
      </motion.h2>

      <div className="space-y-12 px-4 max-w-6xl mx-auto">
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
            className="bg-gradient-to-r from-white/20 via-white/10 to-white/5 backdrop-blur-md p-4 md:p-6 shadow-lg border border-white/30 text-white rounded-xl hover:scale-105 transition-transform duration-300"
            aria-label="Back to Technical Services"
          >
            Back to Technical Services
          </button>
        </Link>
      </motion.div>
    </section>
  )
}
