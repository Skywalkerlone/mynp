'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

const icons = [
  'blender.png',
  'cap.png',
  'flutter.png',
  'react.png',
  'nextjs.png',
  'tail.png',
  'ht,cs.png',
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
  const { darkMode } = useTheme()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const marqueeRef = useRef(null)
  
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.5 })
  const isMarqueeInView = useInView(marqueeRef, { once: false, amount: 0.3 })

  useEffect(() => {
    setDuplicatedIcons([...icons, ...icons])
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-10 overflow-hidden border-y border-blue-400 transition-all duration-500"
      style={{
        backgroundColor: darkMode ? '#020617' : '#f8fafc',
      }}
    >
      <div
        className="absolute inset-0 animate-background z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: darkMode ? 0.35 : 0.22,
          mixBlendMode: darkMode ? 'screen' : 'multiply',
          background: darkMode
            ? 'linear-gradient(90deg, #1e40af 0%, transparent 25%, transparent 75%, #1e40af 100%)'
            : 'linear-gradient(90deg, #bfdbfe 0%, #eff6ff 30%, #f8fafc 70%, #93c5fd 100%)',
        }}
      />

      {/* Gradient overlays - Enhanced fade effect */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: darkMode
            ? 'linear-gradient(to right, #020617, transparent 80%)'
            : 'linear-gradient(to right, #f8fafc, transparent 80%)'
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: darkMode
            ? 'linear-gradient(to left, #020617, transparent 80%)'
            : 'linear-gradient(to left, #f8fafc, transparent 80%)'
        }}
      />

      {/* Heading with fade left/right animation */}
      <motion.h2
        ref={headingRef}
        initial={{ opacity: 0, x: -50 }}
        animate={isHeadingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative z-20 text-2xl sm:text-3xl font-semibold text-center mb-8 px-4 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
          Tools & 
        </span>
        <span className={darkMode ? 'text-white' : 'text-gray-700'}>
          {' '}Technologies I Use
        </span>
      </motion.h2>

      {/* Marquee icons with fade left/right animation */}
      <motion.div
        ref={marqueeRef}
        initial={{ opacity: 0, x: -100 }}
        animate={isMarqueeInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative z-20 overflow-x-hidden whitespace-nowrap"
      >
        <div className="animate-marquee flex items-center gap-12 px-6">
          {duplicatedIcons.map((icon, index) => (
            <motion.div
              key={`${icon}-${index}`}
              className="flex-shrink-0 group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isMarqueeInView ? { 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.3 + (index * 0.02) }
              } : { 
                opacity: 0, 
                scale: 0.8,
                transition: { duration: 0.3 }
              }}
            >
              <div className={`transition-all duration-500 ease-in-out transform group-hover:scale-110 ${
                darkMode ? 'icon-dark' : 'icon-light'
              }`}>
                <Image
                  src={`/icons/${icon}`}
                  alt={icon.replace('.png', '').replace('-', ' ').toUpperCase()}
                  width={70}
                  height={70}
                  className="object-contain transition-all duration-300"
                  style={{
                    filter: darkMode 
                      ? 'brightness(0.9) contrast(1.1)' 
                      : 'brightness(1) contrast(1)'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
        }

        .icon-light {
          opacity: 0.7;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .icon-light:hover {
          opacity: 1;
          filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3));
        }

        .icon-dark {
          opacity: 0.8;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .icon-dark:hover {
          opacity: 1;
          filter: drop-shadow(0 4px 8px rgba(96, 165, 250, 0.4));
        }

        @keyframes backgroundMove {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .animate-background {
          background-size: 200% 100%;
          animation: backgroundMove 20s linear infinite;
        }

        /* Pause animations on hover */
        .group:hover .animate-marquee,
        .group:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          
          .animate-marquee-reverse {
            animation: marquee-reverse 20s linear infinite;
          }
        }
      `}</style>
    </section>
  )
}