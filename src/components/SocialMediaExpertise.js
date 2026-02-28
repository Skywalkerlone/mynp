// 'use client'
// import { motion } from 'framer-motion'
// import { FaVideo, FaBullhorn, FaChartLine } from 'react-icons/fa'

// export default function SocialMediaExpertise() {
//   const services = [
//     {
//       icon: <FaChartLine size={34} />,
//       title: 'Social Media Strategy',
//       description:
//         'I design targeted content strategies that boost engagement, build brand identity, and increase reach across platforms like Instagram, TikTok, Twitter, and YouTube.',
//     },
//     {
//       icon: <FaBullhorn size={34} />,
//       title: 'Marketing Campaigns',
//       description:
//         'From influencer outreach to paid ads, I create data-driven marketing campaigns that convert views into loyal followers and sales.',
//     },
//     {
//       icon: <FaVideo size={34} />,
//       title: 'Video Editing & Content Creation',
//       description:
//         'With professional editing skills, I craft compelling short-form and long-form videos tailored for reels, stories, ads, and educational content.',
//     },
//   ]

//   return (
//     <section  className="py-20 px-6 bg-gradient-to-b from-white via-blue-50 to-white dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 text-gray-800 dark:text-white" id='sm'>
//       <motion.div
//         className="max-w-6xl mx-auto text-center"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: 'easeOut' }}
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <h2 className="text-4xl font-bold mb-4 text-blue-700 dark:text-white"><span className='text-blue-300'>Social Media</span> Expertise</h2>
//         <p className="mb-12 text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
//           I bring a powerful combination of creativity, strategy, and technical skill to help brands grow and shine in the digital space.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-r-2   border-white/10 shadow-lg hover:scale-105 transition-transform duration-300 dark:bg-white/5"
//               whileHover={{ y: -5 }}
//             >
//               <div className="mb-4 text-blue-600 dark:text-blue-300">{service.icon}</div>
//               <h4 className="text-xl text-blue-300 font-semibold mb-2">{service.title}</h4>
//               <p className="text-sm text-gray-700 dark:text-gray-300">{service.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   )
// }
























// 'use client'
// import { motion } from 'framer-motion'
// import { FaVideo, FaBullhorn, FaChartLine } from 'react-icons/fa'
// import { useTheme } from '../context/ThemeContext'

// export default function SocialMediaExpertise() {
//   const { darkMode } = useTheme()
  
//   const services = [
//     {
//       icon: <FaChartLine size={34} />,
//       title: 'Social Media Strategy',
//       description:
//         'I design targeted content strategies that boost engagement, build brand identity, and increase reach across platforms like Instagram, TikTok, Twitter, and YouTube.',
//     },
//     {
//       icon: <FaBullhorn size={34} />,
//       title: 'Marketing Campaigns',
//       description:
//         'From influencer outreach to paid ads, I create data-driven marketing campaigns that convert views into loyal followers and sales.',
//     },
//     {
//       icon: <FaVideo size={34} />,
//       title: 'Video Editing & Content Creation',
//       description:
//         'With professional editing skills, I craft compelling short-form and long-form videos tailored for reels, stories, ads, and educational content.',
//     },
//   ]

//   return (
//     <section 
//       className={`py-20 px-6 transition-all duration-700 ${
//         darkMode 
//           ? 'bg-gradient-to-b from-slate-900 via-blue-950/50 to-slate-900' 
//           : 'bg-gradient-to-b from-white via-blue-100 to-white'
//       }`} 
//       id='sm'
//     >
//       <motion.div
//         className="max-w-6xl mx-auto text-center"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: 'easeOut' }}
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
//           darkMode ? 'text-white' : 'text-gray-800'
//         }`}>
//           <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
//             Social Media
//           </span>
//           <span className={darkMode ? 'text-white' : 'text-gray-700'}>
//             {' '}Expertise
//           </span>
//         </h2>
        
//         <p className={`mb-12 text-lg max-w-3xl mx-auto ${
//           darkMode ? 'text-gray-300' : 'text-gray-600'
//         }`}>
//           I bring a powerful combination of creativity, strategy, and technical skill to help brands grow and shine in the digital space.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border ${
//                 darkMode
//                   ? 'bg-slate-800/60 border-slate-700 hover:border-blue-500/50 hover:bg-slate-800'
//                   : 'bg-white/80 border-b-2  border-blue-500 hover:border-blue-300 hover:bg-white'
//               }`}
//               whileHover={{ y: -8, scale: 1.02 }}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <div className={`mb-4 ${
//                 darkMode ? 'text-blue-300' : 'text-blue-600'
//               }`}>
//                 {service.icon}
//               </div>
//               <h4 className={`text-xl font-semibold mb-3 ${
//                 darkMode ? 'text-blue-300' : 'text-blue-600'
//               }`}>
//                 {service.title}
//               </h4>
//               <p className={`text-sm ${
//                 darkMode ? 'text-gray-300' : 'text-gray-700'
//               }`}>
//                 {service.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Additional Info Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//           viewport={{ once: true }}
//           className={`mt-16 p-6 rounded-xl ${
//             darkMode
//               ? 'bg-blue-900/20 border border-blue-800/30'
//               : 'bg-blue-100/50 border border-blue-200'
//           }`}
//         >
//           <h3 className={`text-2xl font-semibold mb-4 ${
//             darkMode ? 'text-blue-200' : 'text-blue-700'
//           }`}>
//             Why Choose My Social Media Services?
//           </h3>
//           <p className={`mb-4 ${
//             darkMode ? 'text-gray-300' : 'text-gray-700'
//           }`}>
//             With expertise in analytics, content creation, and platform algorithms, I help your brand stand out in crowded digital spaces. Whether you're building from scratch or scaling existing platforms, I provide data-driven strategies that deliver real results.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
//             {[
//               'Platform-specific content optimization',
//               'Audience growth & engagement strategies',
//               'Performance tracking & analytics'
//             ].map((item, idx) => (
//               <div 
//                 key={idx} 
//                 className={`flex items-start gap-2 ${
//                   darkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}
//               >
//                 <span className={`mt-1 ${
//                   darkMode ? 'text-blue-400' : 'text-blue-600'
//                 }`}>✓</span>
//                 <span>{item}</span>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Call to Action */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8, duration: 0.6 }}
//           viewport={{ once: true }}
//           className="mt-12"
//         >
//           <a
//             href="#contact"
//             className={`inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
//               darkMode
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                 : 'bg-blue-500 hover:bg-blue-600 text-white'
//             }`}
//           >
//             Let's Grow Your Social Presence
//           </a>
//         </motion.div>
//       </motion.div>
//     </section>
//   )
// }





























// 'use client'
// import { motion } from 'framer-motion'
// import { FaVideo, FaBullhorn, FaChartLine } from 'react-icons/fa'

// export default function SocialMediaExpertise() {
//   const services = [
//     {
//       icon: <FaChartLine size={34} />,
//       title: 'Social Media Strategy',
//       description:
//         'I design targeted content strategies that boost engagement, build brand identity, and increase reach across platforms like Instagram, TikTok, Twitter, and YouTube.',
//     },
//     {
//       icon: <FaBullhorn size={34} />,
//       title: 'Marketing Campaigns',
//       description:
//         'From influencer outreach to paid ads, I create data-driven marketing campaigns that convert views into loyal followers and sales.',
//     },
//     {
//       icon: <FaVideo size={34} />,
//       title: 'Video Editing & Content Creation',
//       description:
//         'With professional editing skills, I craft compelling short-form and long-form videos tailored for reels, stories, ads, and educational content.',
//     },
//   ]

//   return (
//     <section  className="py-20 px-6 bg-gradient-to-b from-white via-blue-50 to-white dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 text-gray-800 dark:text-white" id='sm'>
//       <motion.div
//         className="max-w-6xl mx-auto text-center"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, ease: 'easeOut' }}
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <h2 className="text-4xl font-bold mb-4 text-blue-700 dark:text-white"><span className='text-blue-300'>Social Media</span> Expertise</h2>
//         <p className="mb-12 text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
//           I bring a powerful combination of creativity, strategy, and technical skill to help brands grow and shine in the digital space.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-r-2   border-white/10 shadow-lg hover:scale-105 transition-transform duration-300 dark:bg-white/5"
//               whileHover={{ y: -5 }}
//             >
//               <div className="mb-4 text-blue-600 dark:text-blue-300">{service.icon}</div>
//               <h4 className="text-xl text-blue-300 font-semibold mb-2">{service.title}</h4>
//               <p className="text-sm text-gray-700 dark:text-gray-300">{service.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   )
// }





















'use client'
import { motion } from 'framer-motion'
import { FaVideo, FaBullhorn, FaChartLine, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useSocialGsap } from './useSocialGsap'
import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SocialMediaExpertise() {
  const { darkMode } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  
  const services = [
    {
      icon: <FaChartLine size={34} />,
      title: 'Social Media Strategy',
      description:
        'I design targeted content strategies that boost engagement, build brand identity, and increase reach across platforms like Instagram, TikTok, Twitter, and YouTube.',
      platforms: ['instagram', 'tiktok', 'twitter', 'youtube']
    },
    {
      icon: <FaBullhorn size={34} />,
      title: 'Marketing Campaigns',
      description:
        'From influencer outreach to paid ads, I create data-driven marketing campaigns that convert views into loyal followers and sales.',
      platforms: ['instagram', 'tiktok', 'twitter']
    },
    {
      icon: <FaVideo size={34} />,
      title: 'Video Editing & Content Creation',
      description:
        'With professional editing skills, I craft compelling short-form and long-form videos tailored for reels, stories, ads, and educational content.',
      platforms: ['youtube', 'tiktok', 'instagram']
    },
  ]

  // Use our custom GSAP hook
  const { containerRef, iconsRef, cardsRef, particlesRef } = useSocialGsap(darkMode)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Platform icons mapping
  const platformIcons = {
    instagram: <FaInstagram size={14} />,
    tiktok: <FaTiktok size={14} />,
    twitter: <FaTwitter size={14} />,
    youtube: <FaYoutube size={14} />
  }

  if (!isMounted) {
    return <div className="min-h-[400px]" /> // Placeholder for SSR
  }

  return (
    <section 
      ref={containerRef}
      className={`relative py-20 px-6 overflow-hidden transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 via-blue-950/50 to-slate-900' 
          : 'bg-gradient-to-b from-white via-blue-100 to-white'
      }`} 
      id='sm'
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className={`absolute rounded-full blur-xl ${
              darkMode ? 'bg-blue-400/10' : 'bg-blue-300/20'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
          />
        ))}
      </div>

      {/* Animated grid background */}
      <div 
        data-parallax="0.2"
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20px 20px, ${darkMode ? '#3b82f6' : '#2563eb'} 1px, transparent 1px),
            linear-gradient(45deg, ${darkMode ? '#1e3a8a20' : '#3b82f620'} 0%, transparent 100%)
          `,
          backgroundSize: '40px 40px, 100% 100%'
        }}
      />

      {/* Floating social media icons */}
      <div className="absolute inset-0 pointer-events-none">
        {['instagram', 'tiktok', 'twitter', 'youtube'].map((platform, i) => (
          <motion.div
            key={platform}
            className={`absolute ${
              darkMode ? 'text-blue-400/20' : 'text-blue-500/30'
            }`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.5,
              rotate: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
              transition: {
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {platform === 'instagram' && <FaInstagram size={40} />}
            {platform === 'tiktok' && <FaTiktok size={40} />}
            {platform === 'twitter' && <FaTwitter size={40} />}
            {platform === 'youtube' && <FaYoutube size={40} />}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="max-w-6xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading with gradient animation */}
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
            darkMode 
              ? 'from-blue-300 via-blue-200 to-blue-300' 
              : 'from-blue-600 via-blue-500 to-blue-600'
          }`}>
            Social Media
          </span>
          <span className={darkMode ? 'text-white' : 'text-gray-700'}>
            {' '}Expertise
          </span>
        </h2>
        
        <p className={`mb-12 text-lg max-w-3xl mx-auto ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          I bring a powerful combination of creativity, strategy, and technical skill to help brands grow and shine in the digital space.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border ${
                darkMode
                  ? 'bg-slate-800/60 border-slate-700 hover:border-blue-500/50 hover:bg-slate-800'
                  : 'bg-white/80 border-b-2 border-blue-500 hover:border-blue-300 hover:bg-white'
              }`}
            >
              {/* Icon with its own ref for GSAP */}
              <div 
                ref={el => iconsRef.current[index] = el}
                className={`mb-4 ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}
              >
                {service.icon}
              </div>
              
              <h4 className={`text-xl font-semibold mb-3 ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>
                {service.title}
              </h4>
              
              <p className={`text-sm mb-4 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {service.description}
              </p>

              {/* Platform indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {service.platforms.map(platform => (
                  <span
                    key={platform}
                    className={`p-2 rounded-full ${
                      darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {platformIcons[platform]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section with GSAP animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className={`mt-16 p-8 rounded-xl ${
            darkMode
              ? 'bg-gradient-to-br from-blue-900/30 to-blue-900/30 border border-blue-800/30'
              : 'bg-gradient-to-br from-blue-100/80 to-blue-100/80 border border-blue-200'
          }`}
        >
          <h3 className={`text-2xl font-semibold mb-6 ${
            darkMode ? 'text-blue-200' : 'text-blue-700'
          }`}>
            Why Choose My Social Media Services?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: 'Platform Optimization',
                items: ['Content tailored for each platform', 'Algorithm-friendly strategies', 'Peak time scheduling']
              },
              {
                title: 'Growth Strategies',
                items: ['Audience engagement', 'Viral content creation', 'Community building']
              },
              {
                title: 'Analytics & ROI',
                items: ['Performance tracking', 'Conversion optimization', 'Data-driven decisions']
              }
            ].map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`p-4 rounded-lg ${
                  darkMode ? 'bg-slate-800/50' : 'bg-white/50'
                }`}
              >
                <h4 className={`font-semibold mb-3 ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li 
                      key={i}
                      className={`flex items-start gap-2 text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <span className={`mt-1 ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { value: '50+', label: 'Campaigns' },
            { value: '100k+', label: 'Reach' },
            { value: '85%', label: 'Engagement' },
            { value: '24/7', label: 'Support' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg ${
                darkMode 
                  ? 'bg-slate-800/50 border border-blue-900/50' 
                  : 'bg-white/50 border border-blue-200'
              }`}
            >
              <div className={`text-2xl font-bold ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action with pulse animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: darkMode
                ? ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 10px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0.4)']
                : ['0 0 0 0 rgba(37, 99, 235, 0.4)', '0 0 0 10px rgba(37, 99, 235, 0)', '0 0 0 0 rgba(37, 99, 235, 0.4)']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
              darkMode
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
            }`}
          >
            Let's Grow Your Social Presence
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}