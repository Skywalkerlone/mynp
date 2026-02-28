'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import SocialMedia from '../components/SocialMedia'
import { useTheme } from '../context/ThemeContext'
import { FaFileWord } from 'react-icons/fa'

export default function Resume() {
  const controls = useAnimation()
  const ref = useRef(null)
  const { darkMode } = useTheme()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('show')
        } else {
          controls.start('hidden')
        }
      },
      { threshold: 0.3 }
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
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.4,
        ease: 'easeIn'
      }
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const backgroundVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    },
    show: { 
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
  }

  return (
    <section
      id="resume"
      ref={ref}
      className={`relative overflow-hidden max-w-4xl mx-auto px-6 py-32 flex flex-col items-center text-center z-10 transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 to-black' 
          : 'bg-gradient-to-b from-blue-50 to-white'
      }`}
    >
      {/* Aura Glow Background with animation */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        initial="hidden"
        animate={controls}
        variants={backgroundVariants}
      >
        <div className={`absolute w-[400px] h-[400px] rounded-full blur-3xl animate-pulse-slow top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          darkMode ? 'bg-blue-500/20' : 'bg-blue-300/30'
        }`}></div>
        
        {/* Additional glow effects */}
        <div className={`absolute w-[300px] h-[300px] rounded-full blur-2xl animate-pulse-slow top-1/2 right-1/4 ${
          darkMode ? 'bg-purple-500/10' : 'bg-purple-300/20'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute w-[250px] h-[250px] rounded-full blur-2xl animate-pulse-slow bottom-1/4 left-1/4 ${
          darkMode ? 'bg-cyan-500/10' : 'bg-cyan-300/20'
        }`} style={{ animationDelay: '2s' }}></div>
      </motion.div>

      {/* Colliding Rectangles Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex"
        initial="hidden"
        animate={controls}
      >
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className={`w-1/2 h-full ${
              darkMode ? 'bg-blue-800' : 'bg-blue-500'
            }`}
            custom={i}
            variants={boxVariants}
          />
        ))}
      </motion.div>

      {/* Content Reveal */}
      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial="hidden"
        animate={controls}
        variants={contentVariants}
      >
        {/* Shiny Gradient - restored original shine animation */}
        <span
          className="absolute top-0 left-[-70%] w-[280px] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-[-35deg] animate-shine pointer-events-none py-10"
          aria-hidden="true"
        />

        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.4 } }
          }}
          className={`text-3xl sm:text-4xl font-bold mb-6 ${
            darkMode ? 'text-blue-300' : 'text-blue-700'
          }`}
        >
          Download My Resume
        </motion.h2>

        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.4 } }
          }}
          className={`mb-8 max-w-md mx-auto text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Access my comprehensive portfolio showcasing technical skills, creative projects, and professional experience.
        </motion.p>

        {/* Download Button */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            show: { opacity: 1, scale: 1, transition: { delay: 1.3, duration: 0.4 } }
          }}
          className="flex justify-center mb-8"
        >
          <motion.a
            href="/images/IDAEWOR S.E PROVIDENCE..CV.docx"
            download="IDAEWOR S.E PROVIDENCE..CV.docx"
            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFileWord size={20} />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Resume Preview Info */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.4 } }
          }}
          className={`p-6 rounded-xl mb-8 ${
            darkMode
              ? 'bg-slate-800/50 border border-slate-700'
              : 'bg-white/80 border border-blue-100'
          }`}
        >
          <motion.h3 
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { delay: 1.5 } }
            }}
            className={`text-xl font-semibold mb-3 ${
              darkMode ? 'text-blue-200' : 'text-blue-700'
            }`}
          >
            What's Included
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {[
              'Technical Skills & Proficiencies',
              'Project Portfolio & Case Studies',
              'Professional Experience',
              'Education & Certifications'
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  show: { opacity: 1, x: 0, transition: { delay: 1.6 + idx * 0.1 } }
                }}
                className={`flex items-start gap-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className={`mt-1 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>✓</span>
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.p 
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { delay: 2.0 } }
          }}
          className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          For specific inquiries or additional documents, please{' '}
          <a 
            href="#contact" 
            className={`font-semibold hover:underline ${
              darkMode ? 'text-blue-300' : 'text-blue-600'
            }`}
          >
            contact me directly
          </a>
          .
        </motion.p>
      </motion.div>

      {/* Social Media with animation */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { delay: 2.1, duration: 0.5 } }
        }}
        className="mt-12 w-full"
      >
        <SocialMedia />
      </motion.div>

      {/* Animations CSS */}
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
            opacity: 0.1;
          }
        }
        .animate-shine {
          animation: shine 1.8s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}