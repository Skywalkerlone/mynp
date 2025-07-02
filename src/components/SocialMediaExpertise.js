'use client'
import { motion } from 'framer-motion'
import { FaVideo, FaBullhorn, FaChartLine } from 'react-icons/fa'

export default function SocialMediaExpertise() {
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
    <section  className="py-20 px-6 bg-gradient-to-b from-white via-blue-50 to-white dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 text-gray-800 dark:text-white" id='sm'>
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-blue-700 dark:text-white"><span className='text-blue-300'>Social Media</span> Expertise</h2>
        <p className="mb-12 text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          I bring a powerful combination of creativity, strategy, and technical skill to help brands grow and shine in the digital space.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl border-r-2   border-white/10 shadow-lg hover:scale-105 transition-transform duration-300 dark:bg-white/5"
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 text-blue-600 dark:text-blue-300">{service.icon}</div>
              <h4 className="text-xl text-blue-300 font-semibold mb-2">{service.title}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
