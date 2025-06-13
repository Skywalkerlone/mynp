'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const icons = [
  'blender.png',
  'cap.png',
  'flutter.png',
  'react.png',
  'nextjs.png',
  'tail.png',
  'ht,cs.png', // fixed typo
  'git.png',
  'CSP.png',
  'blender.png',
  'node.png',
  'office.png',
  'wp.png',
  'nextjs.png',
  'vs.png',
  'figma.png',
]

export default function Marquee() {
 const [duplicatedIcons, setDuplicatedIcons] = useState([])


  useEffect(() => {
    setDuplicatedIcons([...icons, ...icons])
  }, [])

  return (
    <section className="relative py-10 overflow-hidden border-y border-gray-200 dark:border-slate-700">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-transparent to-blue-100 dark:from-blue-950 dark:to-blue-950 bg-scroll animate-background z-0" aria-hidden="true" />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 text-2xl sm:text-3xl font-semibold text-center mb-6"
      >
        <span className="text-blue-400 dark:text-blue-200">Tools & </span>Technologies I Use
      </motion.h2>

      <div className="relative z-10 overflow-x-hidden whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-12 px-6">
          {duplicatedIcons.map((icon, index) => (
            <motion.div
              key={`${icon}-${index}`}
              className="flex-shrink-0 fade-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.02 }}
            >
              <Image
                src={`/icons/${icon}`}
                alt={icon.replace('.png', '').replace('-', ' ').toUpperCase()}
                width={60}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes backgroundMove {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-background {
          background-size: 200% 100%;
          animation: backgroundMove 10s linear infinite;
        }

        .fade-icon {
          opacity: 0.5;
          transition: opacity 0.8s ease-in-out;
          animation: fadeInOut 6s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
