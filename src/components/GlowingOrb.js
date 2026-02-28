'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GlowingOrb({ darkMode }) {
  const orbRef = useRef(null)

  useEffect(() => {
    const orb = orbRef.current
    if (!orb) return

    // Create timeline for orb animation
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    tl.to(orb, {
      scale: 1.2,
      opacity: 0.3,
      duration: 3,
      filter: 'blur(20px)'
    }).to(orb, {
      scale: 0.8,
      opacity: 0.1,
      duration: 3,
      filter: 'blur(10px)'
    })

    // Mouse move parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const x = (clientX / innerWidth - 0.5) * 30
      const y = (clientY / innerHeight - 0.5) * 30

      gsap.to(orb, {
        x,
        y,
        duration: 1,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      tl.kill()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={orbRef}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        darkMode 
          ? 'bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-pink-500/30'
          : 'bg-gradient-to-r from-blue-300/40 via-purple-300/30 to-pink-300/40'
      }`}
      style={{ zIndex: 1 }}
    />
  )
}