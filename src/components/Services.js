import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import Link from 'next/link'

export default function Services() {
  // CountUp component for animated stats
  function CountUp({ target }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
      let start = 0
      const duration = 2000 // 2 seconds total
      const increment = target / (duration / 30) // update every 30ms

      const counter = setInterval(() => {
        start += increment
        if (start >= target) {
          setCount(target)
          clearInterval(counter)
        } else {
          setCount(Math.ceil(start))
        }
      }, 30)

      return () => clearInterval(counter)
    }, [target])

    return <span>{count}+</span>
  }

  const services = [
    {
      title: 'Artistic Services',
      description:
        'Illustration and Graphic Design: Custom illustrations, logo design and visual branding solutions utilizing Clip Studio and Adobe Creative Suite.',
      list: [
        '3D Modeling and Animation: Blender expertise for sculpting, modeling and animating captivating 3D visuals',
        'Digital Art: Commissioned artwork, concept art and visual storytelling',
        'Graphic Design and Logo Creation: Visual branding solutions for companies and individuals',
      ],
      link: '#gallery',
    },
    {
      title: 'Technical Services',
      description:
        'Web development, apps, UI/UX prototyping, and code optimization.',
      list: [
        'Full-Stack Development: Front-end, back-end App dev and database development for web applications, SEO specialist and digital solutions',
        'Data Entry and Management: Efficient data entry, management and analysis for businesses and organizations',
        'CompTIA A+ certification in NIIT: Hardware maintenance and software management',
      ],
      link: '#web',
    },
    {
      title: 'Social media management',
      description:
        'Helping your Personal and Bussiness platforms Grow.',
      list: [
        'Video editing and creation',
        'Post creation and scheduling',
        'Paid ADs',
      ],
      link: '#gallery',
    },
    {
      title: 'Educational Services',
      description:
        'Workshops, e-learning, curriculum creation, and tutoring.',
      list: [
        'Teaching and Mentorship: Guided instruction and mentorship in art, technology and education.',
        'Workshops and Tutorials: Custom workshops and tutorials on various art and tech topics',
        'One-on-One Mentorship',
      ],
      link: '#edu-portfolio',
    },
  ]

  return (
    <section
      id="services"
      className="relative py-20 px-6 bg-gradient-to-b from-white to-blue-100 dark:from-blue-900 dark:to-slate-900 text-gray-800 dark:text-white overflow-hidden"
    >
      {/* Background wave */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-auto"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#93c5fd"
            fillOpacity="0.3"
            d="M0,64L80,90.7C160,117,320,171,480,181.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>

        {/* Floating bubbles */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.2, y: [50, 0, 50] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-2xl z-0"
        />
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 0.15, y: [80, 0, 80] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 right-0 w-60 h-60 bg-purple-300/20 rounded-full blur-3xl z-0"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-4 text-blue-600 dark:text-blue-200"
        >
          My Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-md mb-12 text-gray-600 dark:text-gray-300"
        >
          Unlock powerful solutions through artistry, technology, and education—crafted to elevate your vision.
        </motion.p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left ">
          {services.map((service, i) => {
            const ref = useRef(null)
            const inView = useInView(ref, { once: true })
            const controls = useAnimation()

            useEffect(() => {
              if (inView) controls.start('visible')
            }, [inView, controls])

            return (
              <motion.div
                ref={ref}
                key={i}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      delay: i * 0.2,
                      duration: 0.6,
                      ease: 'easeOut',
                    },
                  },
                }}
                // Added flex-col and flex + push button down with mt-auto
                className="border border-blue-200 dark:border-white/50 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition duration-300 backdrop-blur-md relative flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-3  text-blue-300 dark:text-blue-300">
                  {service.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {service.description}
                </p>
                <ul className="list-disc pl-5 mb-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {service.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <Link
                  href={service.link}
                  className="block relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all font-semibold mt-auto"
                >
                  View Portfolio
                  <span
                    className="absolute top-0 left-0 w-12 h-full bg-white opacity-30 -skew-x-12 animate-shine"
                    style={{ pointerEvents: 'none' }}
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ label: 'Projects', value: 30 },
            { label: 'Clients', value: 25 },
            { label: 'Years Experience', value: 5 },
            { label: 'Workshops', value: 10 },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.3 }}
              className="bg-blue-100 dark:bg-blue-600  otext-blue-900 dark:text-white p-4 rounded-xl"
            >
              <p className="text-3xl font-bold">
                <CountUp target={stat.value} />
              </p>
              <p className="mt-1 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shine animation */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
            opacity: 0;
          }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
