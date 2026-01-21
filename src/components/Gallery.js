'use client'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import GraphicGallery from '../components/graphic'

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

  const scroll = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = dir === 'left' ? -320 : 320
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Get first 4 items for initial display
  const initialArtImages = artImages.slice(0, 4)
  const initialBlenderImages = blenderImages.slice(0, 4)

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-black to-slate-900 text-white" id='art'>
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-extrabold text-center mb-10"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-300">
          Artistic Portfolio
        </span>
      </motion.h2>

      <p className="text-center text-base max-w-3xl mx-auto text-gray-300 mb-16 px-4">
        I specialize in creative services like book covers, illustrations, comics, animation, graphic design, 3D modeling, and product design. My gallery showcases the depth and diversity of my work — bringing characters and stories to life.
      </p>

      {/* ART IMAGES GRID */}
      <div className="px-4 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-blue-200">2D Art & Illustrations</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Initial 4 items - always visible */}
          {initialArtImages.map((img, index) => (
            <motion.div
              key={`initial-${index}`}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl shadow-xl bg-slate-800 hover:shadow-2xl hover:scale-[1.03] transition duration-300 group"
            >
              <Image
                src={`/gallery/${img}`}
                alt={`Artwork ${index + 1}`}
                width={400}
                height={600}
                className="object-cover w-full h-[400px] transition-transform duration-300"
                priority={index < 2}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-sm text-white">
                Artwork {index + 1}
              </div>
            </motion.div>
          ))}

          {/* Additional items - shown when expanded */}
          <AnimatePresence>
            {showAllArt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                  {artImages.slice(4).map((img, index) => (
                    <motion.div
                      key={`additional-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                      className="relative overflow-hidden rounded-xl shadow-xl bg-slate-800 hover:shadow-2xl hover:scale-[1.03] transition duration-300 group"
                    >
                      <Image
                        src={`/gallery/${img}`}
                        alt={`Artwork ${index + 5}`}
                        width={400}
                        height={600}
                        className="object-cover w-full h-[400px] transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-sm text-white">
                        Artwork {index + 5}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Show More/Less Button for Art */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAllArt(!showAllArt)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            {showAllArt ? (
              <>
                Show Less
                <FaChevronUp className="transition-transform duration-300" />
              </>
            ) : (
              <>
                Show {artImages.length - 4} More Artworks
                <FaChevronDown className="transition-transform duration-300" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* BLENDER SECTION */}
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl font-semibold text-center mt-24 mb-8"
      >
        3D Blender <span className="text-blue-200">Showcase</span>
      </motion.h3>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* SCROLL BUTTONS */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black p-3 rounded-full text-white"
        >
          <FaArrowLeft />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-6"
        >
          {/* Initial 4 blender items */}
          {initialBlenderImages.map((img, i) => (
            <motion.div
              key={`blender-initial-${i}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="min-w-[300px] bg-slate-800 rounded-xl shadow-lg hover:scale-[1.03] transition"
            >
              <Image
                src={`/blender/${img}`}
                alt={`Blender Render ${i + 1}`}
                width={600}
                height={450}
                className="w-full h-[230px] object-cover rounded-t-xl"
              />
              <div className="p-3 text-center text-sm text-white font-semibold">
                Render {i + 1}
              </div>
            </motion.div>
          ))}

          {/* Additional blender items - shown when expanded */}
          <AnimatePresence>
            {showAllBlender && (
              <>
                {blenderImages.slice(4).map((img, i) => (
                  <motion.div
                    key={`blender-additional-${i}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="min-w-[300px] bg-slate-800 rounded-xl shadow-lg hover:scale-[1.03] transition"
                  >
                    <Image
                      src={`/blender/${img}`}
                      alt={`Blender Render ${i + 5}`}
                      width={600}
                      height={450}
                      className="w-full h-[230px] object-cover rounded-t-xl"
                    />
                    <div className="p-3 text-center text-sm text-white font-semibold">
                      Render {i + 5}
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black p-3 rounded-full text-white"
        >
          <FaArrowRight />
        </button>

        {/* Show More/Less Button for Blender */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAllBlender(!showAllBlender)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            {showAllBlender ? (
              <>
                Show Less Blender Renders
                <FaChevronUp className="transition-transform duration-300" />
              </>
            ) : (
              <>
                Show {blenderImages.length - 4} More Renders
                <FaChevronDown className="transition-transform duration-300" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-16">
        <GraphicGallery />
      </div>
    </section>
  )
}