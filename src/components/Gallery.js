'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import GraphicGallery from '../components/graphic'

const artImages = [
  'boo.png', 'ha.png', 'blood.png', '545r6rtf.png', 'resent.png',
  'fish1.png', 'ghghl.png', 'gjklb.png', 'guijh.png',
  'henry.png', 'j.png', 'nun.png', 'castle32.png', 'khggk.jpg',
  'Illustration28.png', 'hkh.jpg', 'fhjf.png', 'moon.png', 'ugug.png', 'omo.png'
]

const blenderImages = [
  '0002.png', 'b.png', 'cookie.png', 'gyi.png', 'hm.png', 'st.png', 'this.png',
  'ph.png', 'psc.png', 'untitled.png', 'untitl.png.png',
  'pef.png', 'jaaa.png', '0001.png', 'this.png'
]

export default function Gallery() {
  const sliderRef = useRef(null)

  const scroll = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = dir === 'left' ? -320 : 320
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section  className="py-20 bg-gradient-to-b from-slate-900 via-black to-slate-900 text-white" id='art'>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
        {artImages.map((img, index) => (
          <motion.div
            key={index}
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
              priority={index < 3}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-sm text-white">
              Artwork {index + 1}
            </div>
          </motion.div>
        ))}
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
          {blenderImages.map((img, i) => (
            <motion.div
              key={i}
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
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black p-3 rounded-full text-white"
        >
          <FaArrowRight />
        </button>
      </div>

      <div className="mt-16">
        <GraphicGallery />
      </div>
    </section>
  )
}
