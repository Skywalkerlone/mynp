'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useSocialGsap = (darkMode) => {
  const containerRef = useRef(null)
  const iconsRef = useRef([])
  const cardsRef = useRef([])
  const particlesRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(iconsRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0
      })

      gsap.set(cardsRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8
      })

      // Animate icons with bounce effect
      gsap.to(iconsRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      })

      // Animate cards with stagger
      gsap.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      })

      // Floating particles animation
      particlesRef.current.forEach((particle, i) => {
        if (particle) {
          gsap.to(particle, {
            y: '+=30',
            x: '+=15',
            rotation: '+=10',
            duration: 3 + i,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2
          })
        }
      })

      // Parallax effect for background
      const bgElements = container.querySelectorAll('[data-parallax]')
      bgElements.forEach((el) => {
        const speed = el.dataset.parallax || 0.3
        gsap.to(el, {
          y: `${100 * speed}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })

      // Hover effects for cards
      cardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              y: -10,
              boxShadow: darkMode 
                ? '0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 8px 10px -6px rgba(59, 130, 246, 0.2)'
                : '0 20px 25px -5px rgba(37, 99, 235, 0.2), 0 8px 10px -6px rgba(37, 99, 235, 0.1)',
              duration: 0.3,
              ease: 'power2.out'
            })
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              boxShadow: 'none',
              duration: 0.3,
              ease: 'power2.in'
            })
          })
        }
      })

    }, container)

    return () => ctx.revert()
  }, [darkMode])

  return {
    containerRef,
    iconsRef,
    cardsRef,
    particlesRef
  }
}