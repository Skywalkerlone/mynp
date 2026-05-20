'use client'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaChevronDown, FaChevronUp, FaRobot, FaGamepad } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

// Game sprite images
const spriteImages = [
  'character1.png', 'character2.png', 'enemy1.png', 
]

// AI interaction demos
const aiDemos = [
  {
    id: 1,
    title: 'AI NPC Conversation',
    description: 'Dynamic dialogue system with AI-generated responses',
    icon: '💬',
    tech: 'GPT-4, React'
  },
  {
    id: 2,
    title: 'Procedural Animation',
    description: 'AI-driven character movements and behaviors',
    icon: '🎭',
    tech: 'TensorFlow, Three.js'
  },
  {
    id: 3,
    title: 'Smart Pathfinding',
    description: 'Real-time navigation and obstacle avoidance',
    icon: '🗺️',
    tech: 'A* Algorithm, ML Agents'
  },
  {
    id: 4,
    title: 'Gesture Recognition',
    description: 'Camera-based interaction for gameplay',
    icon: '✋',
    tech: 'MediaPipe, WebGL'
  },
  {
    id: 5,
    title: 'Emotion Detection',
    description: 'AI that responds to player emotions',
    icon: '😊',
    tech: 'Computer Vision, Affective Computing'
  },
  {
    id: 6,
    title: 'Voice Commands',
    description: 'Natural language processing for game control',
    icon: '🎙️',
    tech: 'Web Speech API, NLP'
  }
]

export default function Sprite() {
  const [showAllSprites, setShowAllSprites] = useState(false)
  const [showAllAIDemos, setShowAllAIDemos] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredDemo, setHoveredDemo] = useState(null)
  const { darkMode } = useTheme()
  
  // Refs for sections
  const titleRef = useRef(null)
  const spriteSectionRef = useRef(null)
  const aiTitleRef = useRef(null)
  const aiSectionRef = useRef(null)
  
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
  const isSpriteSectionInView = useInView(spriteSectionRef, { once: false, amount: 0.2 })
  const isAITitleInView = useInView(aiTitleRef, { once: false, amount: 0.3 })
  const isAISectionInView = useInView(aiSectionRef, { once: false, amount: 0.2 })

  // Get first 6 items for initial display
  const initialSpriteImages = spriteImages.slice(0, 6)
  const initialAIDemos = aiDemos.slice(0, 3)

  // Sprite animation variants
  const spriteVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -30 },
    visible: { scale: 1, opacity: 1, rotateY: 0 },
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.2 },
      y: -5
    }
  }

  return (
    <section 
      id="sprite"
      className={`py-16 md:py-20 transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-purple-900 via-slate-900 to-black' 
          : 'bg-gradient-to-b from-purple-100 via-white to-purple-50'
      }`} 
    >
      {/* Title Section */}
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
              ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300'
              : 'bg-gradient-to-r from-purple-700 via-pink-600 to-purple-500'
          }`}>
            Game Sprites & AI Interactions
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
          I create custom game sprites, character animations, and interactive AI systems. 
          From 2D platformer characters to intelligent NPC behaviors, my work brings games 
          to life with responsive and engaging interactions.
        </motion.p>
      </div>

      {/* GAME SPRITES SECTION */}
      <div ref={spriteSectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSpriteSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="px-4 max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <FaGamepad className={`text-2xl md:text-3xl ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <motion.h3 
              initial={{ opacity: 0, x: -30 }}
              animate={isSpriteSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className={`text-xl md:text-2xl font-bold ${
                darkMode ? 'text-purple-200' : 'text-purple-700'
              }`}
            >
              Game Sprites & Assets
            </motion.h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {/* Initial sprite items */}
            {initialSpriteImages.map((img, index) => (
              <motion.div
                key={`sprite-initial-${index}`}
                variants={spriteVariants}
                initial="hidden"
                animate={isSpriteSectionInView ? "visible" : "hidden"}
                whileHover="hover"
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`relative overflow-hidden rounded-xl shadow-xl group cursor-pointer ${
                  darkMode 
                    ? 'bg-gradient-to-br from-purple-900 to-slate-800 hover:shadow-purple-500/20' 
                    : 'bg-white border-2 border-purple-100 hover:shadow-purple-200/50'
                } transition-all duration-300`}
              >
                <div className="aspect-square relative">
                  <Image
                    src={`/sprites/${img}`}
                    alt={`Game Sprite ${index + 1}`}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                    priority={index < 3}
                  />
                </div>
                <div className={`absolute bottom-0 left-0 right-0 p-2 text-center text-xs font-semibold ${
                  darkMode 
                    ? 'bg-gradient-to-t from-black/80 to-transparent text-white' 
                    : 'bg-gradient-to-t from-white/90 to-transparent text-gray-700'
                }`}>
                  Sprite Asset
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional sprite items */}
          <AnimatePresence>
            {showAllSprites && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 md:mt-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                  {spriteImages.slice(6).map((img, index) => (
                    <motion.div
                      key={`sprite-additional-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`relative overflow-hidden rounded-xl shadow-xl group cursor-pointer ${
                        darkMode 
                          ? 'bg-gradient-to-br from-purple-900 to-slate-800' 
                          : 'bg-white border-2 border-purple-100'
                      } transition-all duration-300`}
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={`/sprites/${img}`}
                          alt={`Game Sprite ${index + 7}`}
                          fill
                          className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className={`absolute bottom-0 left-0 right-0 p-2 text-center text-xs font-semibold ${
                        darkMode 
                          ? 'bg-gradient-to-t from-black/80 to-transparent text-white' 
                          : 'bg-gradient-to-t from-white/90 to-transparent text-gray-700'
                      }`}>
                        Sprite Asset
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More/Less Button for Sprites */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isSpriteSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-6 md:mt-8"
          >
            <button
              onClick={() => setShowAllSprites(!showAllSprites)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
              }`}
            >
              {showAllSprites ? (
                <>
                  Show Less Sprites
                  <FaChevronUp className="text-xs md:text-sm transition-transform duration-300" />
                </>
              ) : (
                <>
                  Show {spriteImages.length - 6} More Sprites
                  <FaChevronDown className="text-xs md:text-sm transition-transform duration-300" />
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* AI INTERACTIONS SECTION */}
      <div ref={aiTitleRef}>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isAITitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className={`text-2xl md:text-3xl font-semibold text-center mt-16 md:mt-24 mb-6 md:mb-8 px-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          <FaRobot className="inline-block mr-3 mb-1" />
          AI-Powered{' '}
          <span className={darkMode ? 'text-purple-200' : 'text-purple-600'}>
            Interactions
          </span>
        </motion.h3>
      </div>

      <div ref={aiSectionRef}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isAISectionInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Initial AI demos */}
            {initialAIDemos.map((demo, index) => (
              <motion.div
                key={`ai-initial-${demo.id}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isAISectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onHoverStart={() => setHoveredDemo(demo.id)}
                onHoverEnd={() => setHoveredDemo(null)}
                className={`relative overflow-hidden rounded-2xl shadow-xl p-6 cursor-pointer transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-purple-900/50 to-slate-800/50 hover:shadow-purple-500/20' 
                    : 'bg-white border-2 border-purple-100 hover:shadow-purple-200/50'
                }`}
              >
                <div className="text-5xl mb-4">{demo.icon}</div>
                <h4 className={`text-xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {demo.title}
                </h4>
                <p className={`text-sm mb-3 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {demo.description}
                </p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono ${
                  darkMode 
                    ? 'bg-purple-800/50 text-purple-200' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {demo.tech}
                </div>
                
                {/* Animated hover indicator */}
                <AnimatePresence>
                  {hoveredDemo === demo.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute bottom-4 right-4 text-2xl ${
                        darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`}
                    >
                      →
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Additional AI demos */}
          <AnimatePresence>
            {showAllAIDemos && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 md:mt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {aiDemos.slice(3).map((demo, index) => (
                    <motion.div
                      key={`ai-additional-${demo.id}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      onHoverStart={() => setHoveredDemo(demo.id)}
                      onHoverEnd={() => setHoveredDemo(null)}
                      className={`relative overflow-hidden rounded-2xl shadow-xl p-6 cursor-pointer transition-all duration-300 ${
                        darkMode 
                          ? 'bg-gradient-to-br from-purple-900/50 to-slate-800/50 hover:shadow-purple-500/20' 
                          : 'bg-white border-2 border-purple-100 hover:shadow-purple-200/50'
                      }`}
                    >
                      <div className="text-5xl mb-4">{demo.icon}</div>
                      <h4 className={`text-xl font-bold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {demo.title}
                      </h4>
                      <p className={`text-sm mb-3 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {demo.description}
                      </p>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono ${
                        darkMode 
                          ? 'bg-purple-800/50 text-purple-200' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {demo.tech}
                      </div>
                      
                      <AnimatePresence>
                        {hoveredDemo === demo.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className={`absolute bottom-4 right-4 text-2xl ${
                              darkMode ? 'text-purple-400' : 'text-purple-600'
                            }`}
                          >
                            →
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More/Less Button for AI Demos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isAISectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-8 md:mt-10"
          >
            <button
              onClick={() => setShowAllAIDemos(!showAllAIDemos)}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
              }`}
            >
              {showAllAIDemos ? (
                <>
                  Show Less AI Demos
                  <FaChevronUp className="text-xs md:text-sm transition-transform duration-300" />
                </>
              ) : (
                <>
                  Show {aiDemos.length - 3} More AI Interactions
                  <FaChevronDown className="text-xs md:text-sm transition-transform duration-300" />
                </>
              )}
            </button>
          </motion.div>

          {/* Interactive Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAISectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`mt-12 md:mt-16 p-6 md:p-8 rounded-2xl text-center ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' 
                : 'bg-gradient-to-r from-purple-50 to-pink-50'
            }`}
          >
            <h4 className={`text-lg md:text-xl font-semibold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              🎮 Want to see AI in action?
            </h4>
            <p className={`text-sm md:text-base mb-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Check out my interactive demos featuring real-time AI NPCs, procedural animations, and smart game mechanics.
            </p>
            <button
              className={`px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              View Live Demos →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}