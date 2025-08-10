'use client'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const socialLinks = [
  {
    href: 'www.linkedin.com/in/providence-idaewor-1059422a2',
    icon: <FaLinkedin />,
    label: 'LinkedIn',
  },
  {
    href: 'https://github.com/Skywalkerlone',
    icon: <FaGithub />,
    label: 'GitHub',
  },
  {
    href: 'https://www.twitter.com/yourprofile',
    icon: <FaTwitter />,
    label: 'Twitter',
  },
  {
    href: 'https://www.instagram.com/e_sai_art?igsh=MW1ndjNqMW8yZXB4Mw==',
    icon: <FaInstagram />,
    label: 'Instagram',
  },
  {
    href: 'https://youtube.com/@cansaidraw8494?si=f-c-CaPT5vSNJYae',
    icon: <FaYoutube />,
    label: 'YouTube',
  },
]

export default function SocialMedia() {
  return (
    <>
      {/* Vertical sidebar on medium+ screens */}
      <div className="fixed top-1/3 left-4 z-[9999] hidden md:flex flex-col space-y-6">
        {socialLinks.map(({ href, icon, label }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.2, color: '#3b82f6' }}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 120 }}
            className="text-white dark:text-blue-400 text-3xl hover:text-blue-500"
          >
            {icon}
          </motion.a>
        ))}
      </div>

      {/* Horizontal bottom bar on small screens */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] flex md:hidden bg-black/40 bg-opacity-20 dark:bg-slate-900/50 dark:bg-opacity-20 py-1 justify-center space-x-10">
        {socialLinks.map(({ href, icon, label }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.3, color: '#3b82f6' }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 120 }}
            className="text-white dark:text-blue-400 text-1xl hover:text-blue-500"
          >
            {icon}
          </motion.a>
        ))}
      </div>
    </>
  )
}
