'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CrazyShowcase({ images, title }) {
  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const floatingElementsRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const cards = cardsRef.current
    const floatingEls = floatingElementsRef.current

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(cards, {
        opacity: 0,
        scale: 0,
        rotation: gsap.utils.random(-30, 30),
        x: gsap.utils.random(-200, 200),
        y: gsap.utils.random(-200, 200)
      })

      // Create floating elements
      floatingEls.forEach((el, i) => {
        gsap.to(el, {
          y: '+=30',
          x: '+=15',
          rotation: '+=5',
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        })
      })

      // Main entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.to(cards, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        duration: 1.5,
        stagger: {
          amount: 1,
          from: 'edges',
          grid: 'auto',
          ease: 'elastic.out(1, 0.5)'
        }
      })

      // Add glitch effect on hover
      cards.forEach((card) => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.timeline()
              .to(card, {
                scale: 1.05,
                rotation: gsap.utils.random(-2, 2),
                duration: 0.1,
                repeat: 3,
                yoyo: true,
                ease: 'none'
              })
              .to(card, {
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
                duration: 0.3
              }, 0)
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              rotation: 0,
              boxShadow: 'none',
              duration: 0.3
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
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) floatingElementsRef.current[i] = el
            }}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(4px)'
            }}
          />
        ))}
      </div>

      <h3 className="text-3xl font-bold text-center mb-12 text-white relative z-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          {title}
        </span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-20">
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el
            }}
            className="relative group cursor-pointer transform-gpu"
          >
            <div className="relative overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-sm border border-blue-500/30">
              <Image
                src={`/gallery/${img}`}
                alt={`Showcase ${i + 1}`}
                width={400}
                height={600}
                className="w-full h-[400px] object-cover transition-all duration-500 group-hover:scale-110"
              />
              
              {/* Overlay with glitch effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-lg font-bold">Project {i + 1}</p>
                  <p className="text-blue-300 text-sm">Click to view</p>
                </div>
              </div>

              {/* Glitch overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 mix-blend-overlay">
                <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
                <div className="absolute inset-0 bg-purple-500/20 animate-pulse delay-75" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}