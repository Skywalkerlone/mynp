'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  const bgRef = useRef(null)
  
  // Actual mouse position from event (target)
  const targetPos = useRef({ x: 0, y: 0 })

  // Smoothed position used for display
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const bgEl = bgRef.current
    if (!bgEl) return

    const handleMouseMove = (e) => {
      const rect = bgEl.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      targetPos.current = { x, y }
    }

    bgEl.addEventListener('mousemove', handleMouseMove)

    let animationFrameId

    const lerp = (start, end, t) => start + (end - start) * t

    // Animation loop to smooth mousePos towards targetPos
    const smoothMove = () => {
      setMousePos((current) => {
        const newX = lerp(current.x, targetPos.current.x, 0.1) // 0.1 = smoothing factor (0-1)
        const newY = lerp(current.y, targetPos.current.y, 0.1)
        return { x: newX, y: newY }
      })
      animationFrameId = requestAnimationFrame(smoothMove)
    }

    animationFrameId = requestAnimationFrame(smoothMove)

    return () => {
      bgEl.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section
      ref={bgRef}
      id="about"
      className="relative overflow-hidden py-20 bg-gradient-to-b from-sky-100 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white"
    >
      {/* Mouse Trail Background Reveal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/images/backgrd.png')`, // replace with your actual image path
          backgroundSize: 'cover',
          maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.6) 220px, transparent 420px)`,
          WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.6) 220px, transparent 420px)`,
          transition: 'mask-image 0.1s, -webkit-mask-image 0.1s',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 z-10">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex-shrink-0"
        >
          <Image
            src="/assets/profile.jpg"
            alt="Idaewor Samuel Providence"
            width={300}
            height={300}
            className="rounded-full shadow-2xl border-4 border-sky-400 dark:border-blue-700"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className=" max-w-2xl text-center md:text-left space-y-6"
        >
          <h2 className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md p-6 shadow-lg border border-white/30  text-4xl font-bold text-blue-600 dark:text-blue-400">About Me</h2>
          <p className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md p-6  text-lg leading-relaxed">
            I am <span className="font-semibold text-sky-600 dark:text-sky-400">Idaewor S.E Providence</span>, deeply passionate about{' '}
            <span className="italic text-blue-500 dark:text-blue-300">learning</span>,{' '}
            <span className="italic text-blue-500 dark:text-blue-300">teaching</span>, and{' '}
            <span className="italic text-blue-500 dark:text-blue-300">evolving</span>.
            With a lifelong love for growth, I treat every challenge like morning coffee or a midnight snack.
            I have forged a unique blend of <span className="font-medium text-sky-700 dark:text-sky-300">design</span> and{' '}
            <span className="font-medium text-sky-700 dark:text-sky-300">code</span> to tell stories and solve real problems.
          </p>
          <p className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md p-6 shadow-lg border border-white/30 text-md text-gray-800 dark:text-gray-300">
            As a seasoned educator, I simplify complexity and spark curiosity. My artistic alias —{' '}
            <span className="font-semibold italic text-blue-600 dark:text-blue-300">E_sai_Art (The Skywalker)</span> — symbolizes my
            journey of constant reinvention, imagination, and storytelling across every medium.
          </p>

          {/* Personal Philosophy */}
          <div className="border-l-4 pl-4 border-blue-400 dark:border-blue-600">
            <h3 className="text-xl font-semibold mb-1">Personal Philosophy</h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Curiosity is my superpower. It is how I became who I am. I believe that both{' '}
              <span className="font-medium">art</span> and <span className="font-medium">technology</span> are tools of transformation — empowering 
              connection, storytelling, and progress. Learning and growth are not hobbies for me, they are instincts.
            </p>
          </div>

          {/* Call to Collaborate */}
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-1">Let us Collaborate!</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              If you are looking for a creative partner who blends <strong>art, tech, and education</strong>, let us connect.
              Browse my work, and reach out — I would love to hear your ideas and make them real together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
