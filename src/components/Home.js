'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomeSection() {
  const name = 'IDAEWOR SAMUEL .E PROVIDENCE.'
  const [isPageReady, setIsPageReady] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef(null)

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

  // Track scroll position for exit animation
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Calculate how much the section has scrolled out of view
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.bottom) / windowHeight))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full px-4 sm:px-6 py-8 bg-fixed flex items-center justify-center text-white overflow-hidden transition duration-1000 bg-cover bg-center bg-no-repeat group"
    >
      {/* BACKGROUND IMAGE with zoom on load and scroll exit */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.3 }}
        animate={{ 
          scale: isPageReady ? 1 - (scrollProgress * [-2.3]) : 1.3,
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut"
        }}
        style={{
          backgroundImage: 'url("/images/ff.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1 - (scrollProgress * 0.8)
        }}
      />
      
      {/* FULL PAGE LOADER */}
      {!isPageReady && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ripple" />
            <div className="absolute inset-4 rounded-full border-4 border-blue-300 animate-ripple-delay" />
            <div className="absolute inset-8 bg-blue-500 rounded-full" />
          </div>
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

      {/* BACKGROUND OVERLAY - PRESERVED */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/90 transition duration-700 z-0" />

      {/* AURA RINGS - PRESERVED */}
      <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full border-4 border-blue-700 blur-xl animate-spin-slow z-0" />
      <div className="absolute w-[300px] h-[200px] sm:w-[400px] sm:h-[300px] md:w-[600px] md:h-[400px] rounded-full border-2 border-pink-600 blur-xl animate-pulse z-0" />

      {/* SPARKLE PARTICLES - PRESERVED */}
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

      {/* MAIN CONTENT - COMPLETELY PRESERVED */}
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
          
          {/* TYPEWRITER EFFECT - ONLY ON THE NAME */}
          <h1 className="typewriter text-lg sm:text-2xl md:text-3xl lg:text-4xl my-6 font-bold text-blue-200 mx-auto">
            {name}
          </h1>

          {/* DESCRIPTION - WITH SCROLL-BASED EXIT ANIMATION */}
          <AnimatePresence mode="wait">
            {scrollProgress < 0.3 && (
              <motion.p
                key="description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-1 text-white/90 text-base sm:text-lg"
              >
                If you are looking for a{' '}
                <span className="text-blue-300">Digital Artist</span>,{' '}
                <span className="text-blue-300">Graphic Designer</span>,{' '}
                <span className="text-blue-300">AI Training</span>,{' '}
                <span className="text-blue-300">App</span> or{' '}
                <span className="text-blue-300">Website Developer</span> (Front-end/Back-end),{' '}
                <span className="text-blue-300">Video Editor</span>,{' '}
                <span className="text-blue-300">2D</span> or{' '}
                <span className="text-blue-300">3D product designer</span> and{' '}
                <span className="text-blue-300">animator</span>, or{' '}
                <span className="text-blue-300">Tutorials</span> or{' '}
                <span className="text-blue-300">Facilitator</span>, then you have come to the right place.
              </motion.p>
            )}
          </AnimatePresence>

          {/* BUTTONS - WITH SCROLL-BASED EXIT ANIMATION */}
          <AnimatePresence mode="wait">
            {scrollProgress < 0.3 && (
              <motion.div
                key="buttons"
                className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <a
                  href="#services"
                  className="relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded text-lg shadow-lg font-semibold transition duration-300"
                >
                  Explore
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
            )}
          </AnimatePresence>
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

        @keyframes ripple {
          0% {
            transform: scale(0.9);
            opacity: 1;
          }
          100% {
            transform: scale(12.5);
            opacity: 0;
          }
        }

        .animate-ripple {
          animation: ripple 1.2s infinite ease-out;
        }

        .animate-ripple-delay {
          animation: ripple 1.2s infinite ease-out;
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  )
}