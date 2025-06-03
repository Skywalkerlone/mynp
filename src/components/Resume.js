'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import SocialMedia from '../components/SocialMedia'

export default function Resume() {
  const controls = useAnimation()
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('show')
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls])

  const boxVariants = {
    hidden: { x: 0 },
    show: (i) => ({
      x: i === 0 ? '-100%' : '100%',
      transition: {
        duration: 1,
        ease: 'easeInOut',
        delay: i * 0.1,
      },
    }),
  }

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="resume"
      ref={ref}
      className="relative overflow-hidden max-w-4xl mx-auto px-6 py-32 flex flex-col items-center text-center z-10 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Aura Glow Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[400px] h-[400px] bg-sky-300 dark:bg-sky-500 opacity-30 dark:opacity-20 rounded-full blur-3xl animate-pulse top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Colliding Rectangles Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex"
        initial="hidden"
        animate={controls}
      >
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="w-1/2 h-full bg-sky-600 dark:bg-sky-800"
            custom={i}
            variants={boxVariants}
          />
        ))}
      </motion.div>

      {/* Content Reveal */}
      <motion.div
        className="relative z-10"
        initial="hidden"
        animate={controls}
        variants={contentVariants}
      >
        {/* Shiny Gradient */}
        <span
          className="absolute top-0 left-[-70%] w-[280px] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-[-35deg] animate-shine pointer-events-none"
          aria-hidden="true"
        />

        <motion.h2 className="text-4xl font-bold mb-8 text-sky-700 dark:text-sky-400">
          Download My Resume
        </motion.h2>

        <motion.a
          href="/images/IDAEWOR_SAMUEL_PROVIDENCE_Resume.pdf"
          download="IDAEWOR_SAMUEL_PROVIDENCE_Resume.pdf"
          className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-4 rounded shadow-lg transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download CV
        </motion.a>

        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Click the button above to download my latest resume in PDF format. Feel free to reach out if you would like more information!
        </p>
      </motion.div>

      {/* Shine Animation CSS */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-35deg);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(200%) skewX(-35deg);
            opacity: 0;
          }
        }
        .animate-shine {
          animation: shine 1.8s ease-in-out infinite;
        }
      `}</style>
      <SocialMedia />
    </section>
  )
}
