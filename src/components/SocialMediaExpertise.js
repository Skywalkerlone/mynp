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
import { FaVideo, FaBullhorn, FaChartLine } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

export default function SocialMediaExpertise() {
  const { darkMode } = useTheme()
  
  const services = [
    {
      icon: <FaChartLine size={34} />,
      title: 'Social Media Strategy',
      description:
        'I design targeted content strategies that boost engagement, build brand identity, and increase reach across platforms like Instagram, TikTok, Twitter, and YouTube.',
    },
    {
      icon: <FaBullhorn size={34} />,
      title: 'Marketing Campaigns',
      description:
        'From influencer outreach to paid ads, I create data-driven marketing campaigns that convert views into loyal followers and sales.',
    },
    {
      icon: <FaVideo size={34} />,
      title: 'Video Editing & Content Creation',
      description:
        'With professional editing skills, I craft compelling short-form and long-form videos tailored for reels, stories, ads, and educational content.',
    },
  ]

  return (
    <section 
      className={`py-20 px-6 transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 via-blue-950/50 to-slate-900' 
          : 'bg-gradient-to-b from-white via-blue-100 to-white'
      }`} 
      id='sm'
    >
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border ${
                darkMode
                  ? 'bg-slate-800/60 border-slate-700 hover:border-blue-500/50 hover:bg-slate-800'
                  : 'bg-white/80 border-b-2  border-blue-500 hover:border-blue-300 hover:bg-white'
              }`}
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className={`mb-4 ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>
                {service.icon}
              </div>
              <h4 className={`text-xl font-semibold mb-3 ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}>
                {service.title}
              </h4>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className={`mt-16 p-6 rounded-xl ${
            darkMode
              ? 'bg-blue-900/20 border border-blue-800/30'
              : 'bg-blue-100/50 border border-blue-200'
          }`}
        >
          <h3 className={`text-2xl font-semibold mb-4 ${
            darkMode ? 'text-blue-200' : 'text-blue-700'
          }`}>
            Why Choose My Social Media Services?
          </h3>
          <p className={`mb-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            With expertise in analytics, content creation, and platform algorithms, I help your brand stand out in crowded digital spaces. Whether you're building from scratch or scaling existing platforms, I provide data-driven strategies that deliver real results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[
              'Platform-specific content optimization',
              'Audience growth & engagement strategies',
              'Performance tracking & analytics'
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`flex items-start gap-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <span className={`mt-1 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <a
            href="#contact"
            className={`inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Let's Grow Your Social Presence
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
