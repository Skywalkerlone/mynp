'use client'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import GraphicGallery from '../components/graphic'
import { useTheme } from '../context/ThemeContext'

const artImages = [
  'boo.png', 'ha.png', 'blood.png', '545r6rtf.png', 'resent.png',
  'fish1.png', 'ghghl.png', 'gjklb.png', 'guijh.png',
  'henry.png', 'j.png', 'nun.png', 'castle32.png', 'khggk.jpg',
  'Illustration28.png', 'hkh.jpg', 'fhjf.png', 'moon.png', 'ugug.png', 'omo.png'
]

const blenderImages = [
  '0002.png', 'b.png', 'cookie.png', 'gyi.png', 'hm.png', 'st.png', 'this.png',
  'ph.png', 'psc.png', 'untitled.png', 'untitl.png',
  'pef.png', 'jaaa.png', '0001.png', 'this.png'
]

export default function Gallery() {
  const sliderRef = useRef(null)
  const [showAllArt, setShowAllArt] = useState(false)
  const [showAllBlender, setShowAllBlender] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { darkMode } = useTheme()
  
  // Refs for sections
  const titleRef = useRef(null)
  const artSectionRef = useRef(null)
  const blenderTitleRef = useRef(null)
  const blenderSectionRef = useRef(null)
  
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // InView states
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.3 })
  const isArtSectionInView = useInView(artSectionRef, { once: false, amount: 0.2 })
  const isBlenderTitleInView = useInView(blenderTitleRef, { once: false, amount: 0.3 })
  const isBlenderSectionInView = useInView(blenderSectionRef, { once: false, amount: 0.2 })

  const scroll = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = dir === 'left' ? -280 : 280
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Get first 4 items for initial display
  const initialArtImages = artImages.slice(0, 4)
  const initialBlenderImages = blenderImages.slice(0, 4)

  return (
    <section 
      id="art"
      className={`py-16 md:py-20 text-white transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 via-black to-slate-900' 
          : 'bg-gradient-to-b from-blue-100 via-white to-blue-100'
      }`} 
    >
      {/* Title with out-view animation */}
      <div ref={titleRef}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className={`text-3xl md:text-4xl font-extrabold text-center px-4 mb-6 md:mb-10 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          <span className={`bg-clip-text text-transparent ${
            darkMode 
              ? 'bg-gradient-to-r from-white via-blue-200 to-blue-300'
              : 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500'
          }`}>
            Artistic Portfolio
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-center text-sm md:text-base max-w-3xl mx-auto mb-12 md:mb-16 px-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          I specialize in creative services like book covers, illustrations, comics, animation, graphic design, 3D modeling, and product design. My gallery showcases the depth and diversity of my work — bringing characters and stories to life.
        </motion.p>
      </div>

      {/* ART IMAGES GRID */}
      <div ref={artSectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isArtSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="px-4 max-w-7xl mx-auto"
        >
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            animate={isArtSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${
              darkMode ? 'text-blue-200' : 'text-blue-700'
            }`}
          >
            2D Art & Illustrations
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Initial 4 items */}
            {initialArtImages.map((img, index) => (
              <motion.div
                key={`initial-${index}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isArtSectionInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] md:hover:scale-[1.03] transition-all duration-300 group ${
                  darkMode ? 'bg-slate-800' : 'bg-white border border-blue-100'
                }`}
              >
                <Image
                  src={`/gallery/${img}`}
                  alt={`Artwork ${index + 1}`}
                  width={400}
                  height={600}
                  className="object-cover w-full h-[300px] sm:h-[350px] md:h-[400px] transition-transform duration-300"
                  priority={index < 2}
                />
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t p-3 md:p-4 text-xs md:text-sm ${
                  darkMode 
                    ? 'from-black/80 to-transparent text-white' 
                    : 'from-blue-900/80 to-transparent text-gray-800'
                }`}>
                  Artwork {index + 1}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional items */}
          <AnimatePresence>
            {showAllArt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 md:mt-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {artImages.slice(4).map((img, index) => (
                    <motion.div
                      key={`additional-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                      className={`relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] md:hover:scale-[1.03] transition-all duration-300 group ${
                        darkMode ? 'bg-slate-800' : 'bg-white border border-blue-100'
                      }`}
                    >
                      <Image
                        src={`/gallery/${img}`}
                        alt={`Artwork ${index + 5}`}
                        width={400}
                        height={600}
                        className="object-cover w-full h-[300px] sm:h-[350px] md:h-[400px] transition-transform duration-300"
                      />
                      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t p-3 md:p-4 text-xs md:text-sm ${
                        darkMode 
                          ? 'from-black/80 to-transparent text-white' 
                          : 'from-blue-900/80 to-transparent text-gray-800'
                      }`}>
                        Artwork {index + 5}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More/Less Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isArtSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-6 md:mt-8"
          >
            <button
              onClick={() => setShowAllArt(!showAllArt)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
              }`}
            >
              {showAllArt ? (
                <>
                  Show Less
                  <FaChevronUp className="text-xs md:text-sm transition-transform duration-300" />
                </>
              ) : (
                <>
                  Show {artImages.length - 4} More
                  <FaChevronDown className="text-xs md:text-sm transition-transform duration-300" />
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* BLENDER SECTION */}
      <div ref={blenderTitleRef}>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isBlenderTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className={`text-2xl md:text-3xl font-semibold text-center mt-16 md:mt-24 mb-6 md:mb-8 px-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          3D Blender{' '}
          <span className={darkMode ? 'text-blue-200' : 'text-blue-600'}>
            Showcase
          </span>
        </motion.h3>
      </div>

      <div ref={blenderSectionRef}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isBlenderSectionInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4"
        >
          {/* Scroll buttons - hidden on mobile, use touch scroll instead */}
          {!isMobile && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={isBlenderSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                onClick={() => scroll('left')}
                className={`absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full transition-all duration-300 ${
                  darkMode 
                    ? 'bg-black/60 hover:bg-black text-white'
                    : 'bg-blue-100/80 hover:bg-blue-200 text-blue-800'
                }`}
                aria-label="Scroll left"
              >
                <FaArrowLeft className="text-sm md:text-base" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={isBlenderSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                onClick={() => scroll('right')}
                className={`absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full transition-all duration-300 ${
                  darkMode 
                    ? 'bg-black/60 hover:bg-black text-white'
                    : 'bg-blue-100/80 hover:bg-blue-200 text-blue-800'
                }`}
                aria-label="Scroll right"
              >
                <FaArrowRight className="text-sm md:text-base" />
              </motion.button>
            </>
          )}

          {/* Slider container */}
          <div
            ref={sliderRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 md:py-6 px-2 md:px-0"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollPadding: '0 16px'
            }}
          >
            {/* Initial blender items */}
            {initialBlenderImages.map((img, i) => (
              <motion.div
                key={`blender-initial-${i}`}
                initial={{ opacity: 0, y: 60 }}
                animate={isBlenderSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`min-w-[260px] sm:min-w-[280px] md:min-w-[300px] rounded-xl shadow-lg hover:scale-[1.02] md:hover:scale-[1.03] transition-all duration-300 ${
                  darkMode ? 'bg-slate-800' : 'bg-white border border-blue-100'
                }`}
              >
                <Image
                  src={`/blender/${img}`}
                  alt={`Blender Render ${i + 1}`}
                  width={600}
                  height={450}
                  className="w-full h-[200px] sm:h-[220px] md:h-[230px] object-cover rounded-t-xl"
                />
                <div className={`p-2 md:p-3 text-center text-xs md:text-sm font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Render {i + 1}
                </div>
              </motion.div>
            ))}

            {/* Additional blender items */}
            <AnimatePresence>
              {showAllBlender && (
                <>
                  {blenderImages.slice(4).map((img, i) => (
                    <motion.div
                      key={`blender-additional-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className={`min-w-[260px] sm:min-w-[280px] md:min-w-[300px] rounded-xl shadow-lg hover:scale-[1.02] md:hover:scale-[1.03] transition-all duration-300 ${
                        darkMode ? 'bg-slate-800' : 'bg-white border border-blue-100'
                      }`}
                    >
                      <Image
                        src={`/blender/${img}`}
                        alt={`Blender Render ${i + 5}`}
                        width={600}
                        height={450}
                        className="w-full h-[200px] sm:h-[220px] md:h-[230px] object-cover rounded-t-xl"
                      />
                      <div className={`p-2 md:p-3 text-center text-xs md:text-sm font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        Render {i + 5}
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile scroll hint */}
          {isMobile && (
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
              ← Swipe to scroll →
            </p>
          )}

          {/* Show More/Less Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isBlenderSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-6 md:mt-8"
          >
            <button
              onClick={() => setShowAllBlender(!showAllBlender)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
              }`}
            >
              {showAllBlender ? (
                <>
                  Show Less
                  <FaChevronUp className="text-xs md:text-sm transition-transform duration-300" />
                </>
              ) : (
                <>
                  Show {blenderImages.length - 4} More
                  <FaChevronDown className="text-xs md:text-sm transition-transform duration-300" />
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Graphic Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mt-12 md:mt-16"
      >
        <GraphicGallery />
      </motion.div>

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}