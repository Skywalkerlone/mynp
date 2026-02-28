'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function GridScanAnimation({ children, className = '' }) {
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  const scanLineRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const grid = gridRef.current
    const scanLine = scanLineRef.current
    const items = itemsRef.current

    // Create grid background
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(grid, {
        opacity: 0,
        scale: 0.8
      })

      gsap.set(items, {
        opacity: 0,
        scale: 0.5,
        rotation: -10
      })

      gsap.set(scanLine, {
        y: '-100%',
        opacity: 0
      })

      // Main timeline for the grid scan effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          scrub: 1,
          markers: false // Set to true for debugging
        }
      })

      // Grid appears with scan line
      tl.to(grid, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
      .to(scanLine, {
        y: '100%',
        opacity: 1,
        duration: 1.5,
        ease: 'power2.inOut'
      }, '-=0.3')
      .to(scanLine, {
        opacity: 0,
        duration: 0.3
      }, '-=0.2')

      // Animate items with stagger based on grid position
      tl.to(items, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: {
          amount: 1.2,
          from: 'random',
          grid: 'auto',
          ease: 'back.out(1.7)'
        }
      }, '-=0.5')

      // Add hover effects to items
      items.forEach((item) => {
        if (item) {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.1,
              y: -10,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
              duration: 0.3,
              ease: 'power2.out',
              zIndex: 10
            })
          })

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              y: 0,
              boxShadow: 'none',
              duration: 0.3,
              ease: 'power2.in',
              zIndex: 1
            })
          })
        }
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
    >
      {/* Grid overlay */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: 5
        }}
      />
      
      {/* Scan line */}
      <div
        ref={scanLineRef}
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent pointer-events-none"
        style={{
          filter: 'blur(2px)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
          zIndex: 10
        }}
      />

      {/* Content with refs for items */}
      <div className="relative z-20">
        {children({
          registerItem: (el) => {
            if (el && !itemsRef.current.includes(el)) {
              itemsRef.current.push(el)
            }
          }
        })}
      </div>

      {/* Decorative glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-blue-500/5 to-transparent" />
      </div>
    </div>
  )
}