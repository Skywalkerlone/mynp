'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import GraphicGallery from '../components/graphic' 

// Fixed artImages array (removed extra comma)
const artImages = [
  'boo.png', 'ha.png', 'blood.png', '545r6rtf.png', 'gghl.png',
  'fish1.png', 'ghghl.png', 'gjklb.png', 'guijh.png',
  'henry.png', 'j.png', 'nun1.png', 'lhih.png', 'khggk.jpg',
  'Illustration28.png', 'hkh.jpg', 'Illustration26_022532.png', 'vhjvjk.png', 'ugug.png', 'om00X n.png'
]

// Blender 3D images array (unchanged)
const blenderImages = ['0002.png', 'b.png', 'cookie.png', 'gy.png','gyi.png', 'hm.png', 'st.png', 'this.png',
   'ph.png', 'psc.png', 'untitled.png', 'untitl.png.png','Screenshot 2024-12-12 120228.png.png', 'pef.png', 
   'Screenshot 2024-12-08 074234.png.png','0001.png', 'this.png']

export default function Gallery() {
  const sliderRef = useRef(null)

  // Scroll function for 3D slider buttons
  const scroll = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = dir === 'left' ? -300 : 300
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12"
      >
        <span className="text-blue-200">Artistic</span> Portfolio
        <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl m-5 mx-auto text-center">
  I specialize in a wide range of creative services including book covers, illustrations, comics, animations, storytelling, graphic design, 3D modeling, and product design. Whether you're looking to bring characters to life, visualize a product, or tell a compelling story through visuals, my gallery showcases the depth and diversity of my work.
</p>

      </motion.h2>

      {/* Art Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4 max-w-7xl mx-auto">
        {artImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-lg bg-slate-200 dark:bg-slate-800 hover:scale-105 transition h-[600px]"
          >
            <Image
              src={`/gallery/${img}`}
              alt={`Artwork ${index + 1}`}
              width={300}
              height={600}
              className="object-cover w-full h-full"
              priority={index < 3} // optionally preload first few images
            />
          </motion.div>
        ))}
      </div>
{/* Blender 3D Art Slider Title */}
<motion.h3
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
  className="text-2xl font-semibold text-center mt-20 mb-6"
>
  <span className="text-blue-200">3D Blender</span> Showcase
</motion.h3>

<div className="relative max-w-7xl mx-auto px-4">
  <button
    onClick={() => scroll('left')}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-slate-700 text-white p-2 rounded-full shadow-lg hover:bg-slate-900 transition"
    aria-label="Scroll Left"
  >
    <FaArrowLeft />
  </button>

  <div
    ref={sliderRef}
    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
  >
    {blenderImages.map((img, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.4 }}
        viewport={{ once: true }}
        className="min-w-[300px] bg-white dark:bg-slate-800 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300"
      >
        <Image
          src={`/blender/${img}`}
          alt={`3D Art ${i + 1}`}
          width={300}
          height={200}
          className="w-full h-[230px] object-cover rounded-t-xl"
        />
        <div className="p-2 text-center text-sm font-medium">Blender Render {i + 1}</div>
      </motion.div>
    ))}
  </div>

  <button
    onClick={() => scroll('right')}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-slate-700 text-white p-2 rounded-full shadow-lg hover:bg-slate-900 transition"
    aria-label="Scroll Right"
  >
    <FaArrowRight />
  </button>
</div>

       <GraphicGallery />
    </section>
   
  )
}
