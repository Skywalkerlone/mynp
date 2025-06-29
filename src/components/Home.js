'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomeSection() {
  const name = 'IDAEWOR SAMUEL .E PROVIDENCE.'
  const [isPageReady, setIsPageReady] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)

  // Load Spline Viewer script
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.16/build/spline-viewer.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  // Lazy loading and welcome timing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPageReady(true)
      setShowWelcome(true)

      const welcomeTimeout = setTimeout(() => {
        setShowWelcome(false)
      }, 2500)

      return () => clearTimeout(welcomeTimeout)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen w-full px-4 sm:px-6 py-8 bg-fixed flex items-center justify-center text-white overflow-hidden transition duration-1000 bg-cover bg-center bg-no-repeat group"
      style={{
        backgroundImage: 'url("/images/ff.png")',
      }}
    >
      {/* FULL PAGE LOADER */}
      {!isPageReady && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* WELCOME POPUP */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 100 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue/50 text-white px-6 py-3 rounded shadow-lg z-50 font-semibold select-none"
          >
            Welcome
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/90 transition duration-700 z-0" />

      {/* AURA RINGS */}
      <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full border-4 border-blue-700 blur-xl animate-spin-slow z-0" />
      <div className="absolute w-[300px] h-[200px] sm:w-[400px] sm:h-[300px] md:w-[600px] md:h-[400px] rounded-full border-2 border-pink-600 blur-xl animate-pulse z-0" />

      {/* SPARKLE PARTICLES */}
      <div className="absolute w-full h-full overflow-hidden z-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-[2px] h-[2px] sm:w-1 sm:h-1 bg-white rounded-full opacity-50 animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      {isPageReady && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center max-w-2xl px-4 sm:px-6 pt-2 mt-[-250px]"
        >
          {/* Spline Viewer */}
          <div className="mx-auto mb-2 flex justify-center items-center" style={{ marginTop: '-1rem' }}>
            <spline-viewer
              loading-anim-type="spinner-small-dark"
              url="https://prod.spline.design/zHC0bnx32wj-Sxs9/scene.splinecode"
              style={{ width: '280px', height: '280px' }}
            />
          </div>

          <p className="mt-1 text-base sm:text-lg">My name is...</p>
          <h1 className="typewriter text-lg sm:text-2xl md:text-3xl lg:text-4xl my-6 font-bold text-blue-200">
            {name}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-1 text-white/90 text-base sm:text-lg"
          >
            If you are looking for a{' '}
            <span className="text-blue-300">Digital Artist</span>,{' '}
            <span className="text-blue-300">Graphic Designer</span>,{' '}
            <span className="text-blue-300">App</span> or{' '}
            <span className="text-blue-300">Website Developer</span> (Front-end/Back-end),{' '}
            <span className="text-blue-300">Video Editor</span>,{' '}
            <span className="text-blue-300">2D</span> or{' '}
            <span className="text-blue-300">3D product designer</span> and{' '}
            <span className="text-blue-300">animator</span>, or{' '}
            <span className="text-blue-300">Tutorials</span> or{' '}
            <span className="text-blue-300">Facilitator</span>, then you have come to the right place.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="#services"
              className="relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded text-lg shadow-lg font-semibold transition duration-300"
            >
              Get Started
              <span className="absolute top-0 left-[-75%] w-20 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform skew-x-[-25deg] animate-shine" />
            </a>

            <a
              href="https://www.redbubble.com/people/ESAIART/shop?asc=u"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-white/20 via-white/10 to-white/5 backdrop-blur-md px-5 py-2 shadow-lg border border-white/30 text-white rounded hover:bg-white/20 hover:border-white transition duration-300 font-semibold"
            >
              Visit Shop
            </a>
          </motion.div>
        </motion.div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #fff;
          width: fit-content;
          animation: typing 3s steps(30, end), blink 0.75s step-end infinite;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }

        @keyframes shine {
          0% {
            left: -75%;
          }
          100% {
            left: 125%;
          }
        }

        .animate-shine {
          animation: shine 2.5s infinite;
        }

        @keyframes sparkle {
          0% {
            opacity: 0.2;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px) scale(1.5);
          }
          100% {
            opacity: 0.2;
            transform: translateY(0) scale(1);
          }
        }

        .animate-sparkle {
          animation: sparkle infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  )
}
