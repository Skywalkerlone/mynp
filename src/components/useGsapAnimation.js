'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useGsapAnimation = (options = {}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      // Default animations
      const {
        elements = [],
        staggerAmount = 0.1,
        duration = 1,
        ease = 'power2.out'
      } = options

      // Elements that should animate when entering view
      elements.forEach(({ selector, from, to }) => {
        const targets = container.querySelectorAll(selector)
        
        targets.forEach((target) => {
          gsap.fromTo(target,
            { ...from, autoAlpha: 0 },
            {
              ...to,
              autoAlpha: 1,
              duration,
              ease,
              scrollTrigger: {
                trigger: target,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
                once: false
              }
            }
          )
        })
      })

      // Parallax effects for background elements
      const bgElements = container.querySelectorAll('[data-parallax]')
      bgElements.forEach((el) => {
        const speed = el.dataset.parallax || 0.5
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

      // Floating animation for elements with data-float
      const floatElements = container.querySelectorAll('[data-float]')
      floatElements.forEach((el, i) => {
        gsap.to(el, {
          y: '+=20',
          x: '+=10',
          rotation: '+=2',
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })

    }, container)

    return () => ctx.revert()
  }, [options])

  return containerRef
}