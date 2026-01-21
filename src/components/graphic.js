'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const imageList = [
  '1748883413174.png',
  '1748883412610.jpg',
  '1748883412687.jpg',
  '1748883412764.png',
  '1748883412843.png',
  '1748883412963.png',
  'graa.png',
  'gra.png',
  'graaaaa.png',
  'lii.png',
  'opt.png',
  'jioi.png'
]

const cardVariants = {
  offscreen: (i) => ({
    opacity: 0,
    y: i % 2 === 0 ? -50 : 50,
    rotate: i % 2 === 0 ? -5 : 5,
  }),
  onscreen: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.8,
    },
  },
}

const additionalCardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}

export default function GraphicGallery() {
  const [showAll, setShowAll] = useState(false)
  
  // First 3 items for initial display
  const initialImages = imageList.slice(0, 3)
  // Remaining items
  const additionalImages = imageList.slice(3)

  return (
    <section className="p-6 bg-gray-100 dark:bg-black" id="graphic">
      <h2 className="text-4xl font-bold mb-14 text-center text-gray-900 dark:text-white">
        <span className="text-blue-200">Graphic</span> Gallery
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* First 3 items - always visible */}
        {initialImages.map((img, idx) => (
          <motion.div
            key={`initial-${idx}`}
            className="overflow-hidden rounded-xl shadow-xl bg-white dark:bg-gray-800 transform transition-transform"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            custom={idx}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={`/gallery/${img}`}
              alt={`Gallery Image ${idx + 1}`}
              width={600}
              height={400}
              className="object-cover w-full h-auto"
            />
          </motion.div>
        ))}

        {/* Additional items - animated container */}
        <AnimatePresence>
          {showAll && (
            <>
              {additionalImages.map((img, idx) => (
                <motion.div
                  key={`additional-${idx}`}
                  className="overflow-hidden rounded-xl shadow-xl bg-white dark:bg-gray-800"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={idx}
                  variants={additionalCardVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <Image
                    src={`/gallery/${img}`}
                    alt={`Gallery Image ${idx + 4}`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-auto"
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Show More/Less Button */}
      <div className="flex justify-center mt-10">
        {imageList.length > 3 && (
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll ? (
              <>
                Show Less
                <FaChevronUp className="transition-transform duration-300" />
              </>
            ) : (
              <>
                Show {additionalImages.length} More Graphics
                <FaChevronDown className="transition-transform duration-300" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </section>
  )
}