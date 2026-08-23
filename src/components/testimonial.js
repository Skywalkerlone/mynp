import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

export default function Testimonial() {
  const { darkMode } = useTheme()
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasBeenInView, setHasBeenInView] = useState(false)

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, Creative Studios',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=1e3a8a&color=fff&size=80',
      content: 'Working with this talented professional was an absolute game-changer for our brand. The artistic vision and technical expertise brought our ideas to life in ways we never imagined possible. Highly recommend!',
      rating: 5,
      date: 'March 2026',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Founder, TechStart Inc.',
      image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=1e3a8a&color=fff&size=80',
      content: 'The web development and UI/UX design services exceeded our expectations. The attention to detail and understanding of our business needs resulted in a website that truly represents our brand and drives results.',
      rating: 5,
      date: 'February 2026',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Art Director, Design Hub',
      image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=1e3a8a&color=fff&size=80',
      content: 'The 3D modeling and animation work was phenomenal! The creativity and technical skill brought our concepts to life with stunning visuals that wowed our clients. A true professional in every sense.',
      rating: 5,
      date: 'January 2026',
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Marketing Manager, Growth Co.',
      image: 'https://ui-avatars.com/api/?name=David+Thompson&background=1e3a8a&color=fff&size=80',
      content: 'Social media management has transformed our online presence. The consistent quality of content, strategic planning, and engagement has significantly grown our following and converted leads into loyal customers.',
      rating: 5,
      date: 'December 2025',
    },
  ]

  // Track section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    if (hasBeenInView) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [hasBeenInView, testimonials.length])

  // Star rating component
  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  )

  // Individual testimonial card component
  const TestimonialCard = ({ testimonial, index }) => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: false, amount: 0.2 })
    const controls = useAnimation()

    useEffect(() => {
      if (inView) {
        controls.start('visible')
      } else {
        controls.start('hidden')
      }
    }, [inView, controls])

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95,
            transition: { duration: 0.5 }
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              delay: index * 0.2,
              duration: 0.6,
              ease: 'easeOut',
            },
          },
        }}
        className="relative p-[2px] rounded-2xl overflow-hidden"
      >
        {/* Conic gradient border */}
        <div 
          className="absolute inset-[-2px] rounded-2xl animate-border-spin"
          style={{
            boxShadow: '0 0 9px rgba(37, 22, 249, 0.5)',
            background: 'conic-gradient(from 0deg, #05128a, #0646a7, #1000a1, #2516f9)',
          }}
        />

        {/* Card content */}
        <div
          className={`relative rounded-xl p-6 transform duration-700 hover:scale-105 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col ${
            darkMode
              ? 'bg-slate-800/95 border-slate-700 hover:border-blue-500/50'
              : 'bg-white/95 border-blue-500 hover:border-blue-700'
          } border`}
        >
          {/* Quote icons */}
          <div className="flex justify-between items-start mb-4">
            <FaQuoteLeft 
              className={`w-6 h-6 ${
                darkMode ? 'text-blue-400/30' : 'text-blue-300/50'
              }`} 
            />
            <FaQuoteRight 
              className={`w-6 h-6 ${
                darkMode ? 'text-blue-400/30' : 'text-blue-300/50'
              }`} 
            />
          </div>

          {/* Rating */}
          <StarRating rating={testimonial.rating} />

          {/* Content */}
          <p className={`mt-4 mb-6 text-sm leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            "{testimonial.content}"
          </p>

          {/* User info */}
          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="flex-1">
              <h4 className={`font-semibold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {testimonial.name}
              </h4>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {testimonial.role}
              </p>
              <p className={`text-xs mt-1 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {testimonial.date}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`relative py-20 px-6 overflow-hidden transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900' 
          : 'bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200'
      }`}
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-auto"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill={darkMode ? "#1e3a8a" : "#1e3a8a"}
            fillOpacity={darkMode ? "0.4" : "0.3"}
            d="M0,64L80,90.7C160,117,320,171,80,181.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>

        {/* Floating blobs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.2, y: [50, 0, 50] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-2xl z-0 ${
            darkMode ? 'bg-blue-400/70' : 'bg-blue-300/30'
          }`}
        />
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 0.15, y: [80, 0, 80] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute bottom-0 right-0 w-60 h-60 rounded-full blur-3xl z-0 ${
            darkMode ? 'bg-purple-400/15' : 'bg-purple-300/20'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${
            darkMode ? 'text-blue-200' : 'text-blue-700'
          }`}>
            What My <span className='text-white'>Clients Say</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Real feedback from real clients who trusted me with their vision
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? `w-8 ${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`
                  : darkMode
                  ? 'bg-gray-600 hover:bg-gray-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className={`mt-12 p-6 rounded-xl text-center max-w-md mx-auto border ${
            darkMode
              ? 'bg-blue-900/50 border-blue-700/30'
              : 'bg-blue-50/70 border-blue-200'
          }`}
        >
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            5.0 / 5.0
          </p>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Based on {testimonials.length} client reviews
          </p>
        </motion.div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes border-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-border-spin {
          animation: border-spin 32s linear infinite;
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
      `}</style>
    </section>
  )
}