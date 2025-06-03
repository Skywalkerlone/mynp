'use client'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/samuel-providence-idaewor-1059422a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    icon: <FaLinkedin />,
    label: 'LinkedIn'
  },
  {
    href: 'https://github.com/Skywalkerlone',
    icon: <FaGithub />,
    label: 'GitHub'
  },
  {
    href: 'https://www.twitter.com/yourprofile',
    icon: <FaTwitter />,
    label: 'Twitter'
  },
  {
    href: 'https://www.instagram.com/e_sai_art?igsh=MW1ndjNqMW8yZXB4Mw==',
    icon: <FaInstagram />,
    label: 'Instagram'
  },
  {
    href: 'https://youtube.com/@cansaidraw8494?si=f-c-CaPT5vSNJYae',
    icon: <FaYoutube />,
    label: 'YouTube'
  }
]

export default function SocialMedia() {
  return (
    <div className="fixed top-1/3 left-4 z-[9999] flex flex-col space-y-6">
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
  )
}
