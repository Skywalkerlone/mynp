// components/CustomCursor.js
'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show cursor when mouse enters the page
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Detect hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor circle with invert effect */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid white',
          backgroundColor: 'white',
        
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? '#60a5fa' : 'white',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Follower dot with trail effect */}
      <motion.div
        ref={followerRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'skyblue',
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
          mass: 0.1,
        }}
      />

      {/* Trailing circle (for the "tracker" effect) */}
      <motion.div
        className="fixed pointer-events-none z-[9997]"
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          backgroundColor: 'white',
          mixBlendMode: 'difference',
          blur:'9x ',
        }}
        animate={{
          x: mousePosition.x - 50,
          y: mousePosition.y - 50,
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 20,
          mass: 0.3,
        }}
      />
    </>
  )
}