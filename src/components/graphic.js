'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const imageList = [
  '1748883413174.png',
  '1748883412610.jpg',
  '1748883412687.jpg',
  '1748883412764.png',
  '1748883412843.png',
  '1748883412963.png',
  'graa.png',
  'graaaaa.png'
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

export default function GraphicGallery() {
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(imageList)
  }, [])

  return (
    <section className="p-6" id='graphic'>
      <h2 className="text-4xl font-bold mb-14 text-center "><span className="text-blue-200">Graphic</span> Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className="overflow-hidden rounded-xl shadow-md bg-white dark:bg-gray-800"
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
              className="object-cover w-full h-auto transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
