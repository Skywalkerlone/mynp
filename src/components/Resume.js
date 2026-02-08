// 'use client'
// import { motion, useAnimation } from 'framer-motion'
// import { useEffect, useRef } from 'react'
// import SocialMedia from '../components/SocialMedia'

// export default function Resume() {
//   const controls = useAnimation()
//   const ref = useRef(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           controls.start('show')
//         }
//       },
//       { threshold: 0.5 }
//     )

//     if (ref.current) {
//       observer.observe(ref.current)
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current)
//       }
//     }
//   }, [controls])

//   const boxVariants = {
//     hidden: { x: 0 },
//     show: (i) => ({
//       x: i === 0 ? '-100%' : '100%',
//       transition: {
//         duration: 1,
//         ease: 'easeInOut',
//         delay: i * 0.1,
//       },
//     }),
//   }

//   const contentVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     show: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         delay: 1,
//         duration: 0.6,
//         ease: 'easeOut',
//       },
//     },
//   }

//   return (
//     <section
//       id="resume"
//       ref={ref}
//       className="relative overflow-hidden max-w-4xl mx-auto px-6 py-32 flex flex-col items-center text-center z-10 bg-white dark:bg-gray-900 transition-colors duration-300"
//     >
//       {/* Aura Glow Background */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute w-[400px] h-[400px] bg-sky-300 dark:bg-sky-500 opacity-30 dark:opacity-20 rounded-full blur-3xl animate-pulse top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
//       </div>

//       {/* Colliding Rectangles Animation */}
//       <motion.div
//         className="absolute top-0 left-0 w-full h-full flex"
//         initial="hidden"
//         animate={controls}
//       >
//         {[0, 1].map((i) => (
//           <motion.div
//             key={i}
//             className="w-1/2 h-full bg-sky-600 dark:bg-sky-800"
//             custom={i}
//             variants={boxVariants}
//           />
//         ))}
//       </motion.div>

//       {/* Content Reveal */}
//       <motion.div
//         className="relative z-10"
//         initial="hidden"
//         animate={controls}
//         variants={contentVariants}
//       >
//         {/* Shiny Gradient */}
//         <span
//           className="absolute top-0 left-[-70%] w-[280px] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-[-35deg] animate-shine pointer-events-none py-10"
//           aria-hidden="true"
//         />

//         <motion.h2 className="text-4xl font-bold mb-8 text-sky-700 dark:text-sky-400">
//           Download My Resume
//         </motion.h2>
// <motion.a
//   href="/images/IDAEWORPROVIDENCE-CV.docx"
//   download="IDAEWORSAMUEL.docx"
//   className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-4 rounded shadow-lg transition-transform"
//   whileHover={{ scale: 1.05 }}
//   whileTap={{ scale: 0.95 }}
// >
//   Download CV
// </motion.a>


//         <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
//           Click the button above to download my latest resume in PDF format. Feel free to reach out if you would like more information!
//         </p>
//       </motion.div>

//       {/* Shine Animation CSS */}
//       <style jsx>{`
//         @keyframes shine {
//           0% {
//             transform: translateX(-100%) skewX(-35deg);
//             opacity: 0;
//           }
//           50% {
//             opacity: 0.5;
//           }
//           100% {
//             transform: translateX(200%) skewX(-35deg);
//             opacity: 0;
//           }
//         }
//         .animate-shine {
//           animation: shine 1.8s ease-in-out infinite;
//         }
//       `}</style>
//       <SocialMedia />
//     </section>
//   )
// }

















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
      className={`relative overflow-hidden max-w-4xl mx-auto px-6 py-32 flex flex-col items-center text-center z-10 transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 to-black' 
          : 'bg-gradient-to-b from-blue-50 to-white'
      }`}
    >
      {/* Aura Glow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className={`absolute w-[400px] h-[400px] rounded-full blur-3xl animate-pulse top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          darkMode ? 'bg-blue-500/20' : 'bg-blue-300/30'
        }`}></div>
        
        {/* Additional glow effects */}
        <div className={`absolute w-[300px] h-[300px] rounded-full blur-2xl animate-pulse top-1/2 right-1/4 ${
          darkMode ? 'bg-purple-500/10' : 'bg-purple-300/20'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute w-[250px] h-[250px] rounded-full blur-2xl animate-pulse bottom-1/4 left-1/4 ${
          darkMode ? 'bg-cyan-500/10' : 'bg-cyan-300/20'
        }`} style={{ animationDelay: '2s' }}></div>
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
        {/* Shiny Gradient */}
        <span
          className="absolute top-0 left-[-70%] w-[280px] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-[-35deg] animate-shine pointer-events-none py-10"
          aria-hidden="true"
        />

        <motion.h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
          darkMode ? 'text-blue-300' : 'text-blue-700'
        }`}>
          Download My Resume
        </motion.h2>

        <motion.p className={`mb-8 max-w-md mx-auto text-lg ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Access my comprehensive portfolio showcasing technical skills, creative projects, and professional experience.
        </motion.p>

        {/* Download Button */}
        <div className="flex justify-center mb-8">
          <motion.a
            href="/images/IDAEWORPROVIDENCE-CV.docx"
            download="IDAEWORSAMUEL.docx"
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
        </div>

        {/* Resume Preview Info */}
        <div className={`p-6 rounded-xl mb-8 ${
          darkMode
            ? 'bg-slate-800/50 border border-slate-700'
            : 'bg-white/80 border border-blue-100'
        }`}>
          <h3 className={`text-xl font-semibold mb-3 ${
            darkMode ? 'text-blue-200' : 'text-blue-700'
          }`}>
            What's Included
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {[
              'Technical Skills & Proficiencies',
              'Project Portfolio & Case Studies',
              'Professional Experience',
              'Education & Certifications'
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`flex items-start gap-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className={`mt-1 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>✓</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
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
        </p>
      </motion.div>

      <div className="mt-12 w-full">
        <SocialMedia />
      </div>

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

        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}