// certification.js
'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import {
  FaDownload,
  FaFileWord,
  FaGraduationCap,
  FaCheckCircle,
  FaAward,
} from 'react-icons/fa'
import { MdComputer, MdSecurity } from 'react-icons/md'

export default function Certification() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.15 })
  const { darkMode } = useTheme()
  const [downloading, setDownloading] = useState(null)

  useEffect(() => {
    if (inView) controls.start('show')
    else controls.start('hidden')
  }, [inView, controls])

  /* ============================
     DATA
  ============================ */

  const certifications = [
    {
      id: 'comptia',
      title: 'CompTIA A+ Certification',
      institution: 'NIIT',
      icon: <MdSecurity />,
      description:
        'Hardware troubleshooting, system maintenance, software installation, and IT infrastructure management',
      year: '2015',
      credentialId: 'COMPTIA-A+-2015-NIIT',
      skills: [
         'ICT training',
        'Hardware Configuration & Troubleshooting',
        'Operating Systems (Windows)',
        'Network Connectivity & Security',
        'System Maintenance & Optimization',
        'Software Installation & Management',
      ],
      fileUrl: '/images/niit.jpg',
      fileName: 'CompTIA_A+_Certificate_2015.pdf',
      fileType: 'PDF',
    },
    {
      id: 'webdev',
      title: 'Web Development Certification',
      institution: 'NIIT',
      icon: <MdComputer />,
      description:
        'Full-stack web development, modern frameworks, database design, and responsive web applications',
      year: '2023',
      credentialId: 'WEBDEV-2023-NIIT',
      skills: [
        'Front-End Development (React, Next.js, HTML, CSS)',
        'Back-End Development (Node.js, Python, PHP)',
        'Database Design & Management (SQL, MongoDB)',
      
        'API Development & Integration',
      ],
      fileUrl: '/images/web.pdf',
      fileName: 'Web_Development_Certificate_2023.pdf',
      fileType: 'PDF',
    },
  ]

  const education = {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Benin (UNIBEN)',
    year: '2020 - 2024',
    icon: <FaGraduationCap />,
    description:
      'Comprehensive computer science education covering programming, algorithms, data structures, software engineering, and emerging technologies.',
    courses: [
      'Data Structures & Algorithms',
      'Programming Languages (Java, Python, C++)',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
      'Artificial Intelligence',
      'Web Technologies',
    ],
  }

  /* ============================
     HANDLERS
  ============================ */

  const handleDownload = (certId, fileUrl, fileName) => {
    setDownloading(certId)
    setTimeout(() => {
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setDownloading(null)
    }, 800)
  }

  /* ============================
     VARIANTS (matching Services)
  ============================ */

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  /* ============================
     RENDER
  ============================ */

  return (
    <section
      id="certification"
      ref={ref}
      className={`relative min-h-screen py-20 px-4 sm:px-6 overflow-hidden transition-all duration-700 ${
        darkMode
          ? 'bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900'
          : 'bg-gradient-to-b from-blue-100 via-blue-50 to-blue-200'
      }`}
    >
      {/* ============================
         BACKGROUND EFFECTS (matching Services)
      ============================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top wave */}
        <svg
          className="absolute top-0 left-0 w-full h-auto"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill={darkMode ? '#1e3a8a' : '#1e3a8a'}
            fillOpacity={darkMode ? '0.4' : '0.3'}
            d="M0,64L80,90.7C160,117,320,171,480,181.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>

        {/* Floating blobs */}
        <motion.div
          className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-2xl ${
            darkMode ? 'bg-blue-400/70' : 'bg-blue-300/30'
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.2, y: [50, 0, 50] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`absolute bottom-0 right-0 w-60 h-60 rounded-full blur-3xl ${
            darkMode ? 'bg-purple-400/15' : 'bg-purple-300/20'
          }`}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 0.15, y: [80, 0, 80] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Aura blobs */}
        <motion.div
          className={`absolute rounded-full blur-3xl ${
            darkMode
              ? 'bg-gradient-to-tr from-blue-500/30 to-indigo-600/30'
              : 'bg-gradient-to-tr from-blue-400/30 to-indigo-500/30'
          }`}
          style={{ width: 180, height: 180, top: '20%', left: '15%' }}
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`absolute rounded-full blur-2xl ${
            darkMode
              ? 'bg-gradient-to-br from-purple-600/25 to-pink-600/25'
              : 'bg-gradient-to-br from-purple-500/25 to-pink-500/25'
          }`}
          style={{ width: 220, height: 220, top: '50%', left: '60%' }}
          animate={{
            x: [0, -15, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`absolute rounded-full blur-3xl ${
            darkMode
              ? 'bg-gradient-to-l from-teal-500/20 to-cyan-600/20'
              : 'bg-gradient-to-l from-teal-400/20 to-cyan-500/20'
          }`}
          style={{ width: 200, height: 200, top: '70%', left: '30%' }}
          animate={{
            x: [0, 10, 0],
            y: [0, 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ============================
         MAIN CONTENT
      ============================ */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                darkMode
                  ? 'bg-blue-900/50 text-blue-300 border-blue-700'
                  : 'bg-blue-100 text-blue-700 border-blue-300'
              }`}
            >
              <FaAward className="inline mr-2" />
              Professional Credentials
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              darkMode ? 'text-blue-200' : 'text-blue-700'
            }`}
          >
            My <span className="text-white">Certifications</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-lg mb-12 max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Professional certifications and educational credentials that
            validate my expertise in technology and development.
          </motion.p>
        </motion.div>

        {/* ============================
           EDUCATION CARD
        ============================ */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="mb-12 relative p-[2px] rounded-2xl overflow-hidden"
        >
          <div
            className="absolute inset-[-2px] rounded-2xl animate-border-spin"
            style={{
              boxShadow: '0 0 9px rgba(37, 22, 249, 0.5)',
              background:
                'conic-gradient(from 0deg, #05128a, #0646a7, #1000a1, #2516f9)',
              backgroundSize: '100% 100%',
            }}
          />

          <div
            className={`relative rounded-xl p-6 sm:p-8 border backdrop-blur-sm transition-all duration-500 ${
              darkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-blue-500'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`text-3xl ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}
              >
                {education.icon}
              </span>
              <h3
                className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                Education
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4
                  className={`text-xl font-semibold ${
                    darkMode ? 'text-blue-200' : 'text-blue-700'
                  }`}
                >
                  {education.degree}
                </h4>
                <p
                  className={`text-lg ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {education.institution}
                </p>
                <p
                  className={`text-sm mb-3 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {education.year}
                </p>
                <p
                  className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {education.description}
                </p>
              </div>

              <div>
                <h4
                  className={`font-semibold mb-3 ${
                    darkMode ? 'text-blue-200' : 'text-blue-700'
                  }`}
                >
                  Key Courses:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {education.courses.map((course, idx) => (
                    <span
                      key={idx}
                      className={`text-sm flex items-center gap-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <FaCheckCircle className="text-blue-500 text-xs flex-shrink-0" />
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================
           CERTIFICATIONS GRID
        ============================ */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left"
        >
          {certifications.map((cert, i) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              index={i}
              darkMode={darkMode}
              downloading={downloading}
              onDownload={handleDownload}
            />
          ))}
        </motion.div>

        {/* ============================
           LINK TO RESUME SECTION
        ============================ */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="text-center mt-4"
        >
          <p
            className={`text-sm mb-3 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Looking for the full picture?
          </p>
          <a
            href="#resume"
            className={`relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border transition-all duration-300 hover:scale-105 ${
              darkMode
                ? 'bg-blue-600 hover:bg-white text-white hover:text-black border-blue-700'
                : 'bg-blue-500 hover:bg-blue-100 text-white hover:text-black border-blue-400'
            }`}
          >
            <FaFileWord size={18} />
            Go to Full Resume
            <span
              className="absolute top-0 left-0 w-12 h-full bg-white opacity-30 -skew-x-12 animate-shine"
              style={{ pointerEvents: 'none' }}
            />
          </a>
        </motion.div>
      </div>

      {/* ============================
         STYLES
      ============================ */}
      <style jsx>{`
        @keyframes border-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-border-spin {
          animation: border-spin 6s linear infinite;
        }

        @keyframes shine {
          0% {
            left: -75%;
          }
          100% {
            left: 125%;
          }
        }

        .animate-shine {
          animation: shine 2.5s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-border-spin,
          .animate-shine {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}

/* ============================
   CERTIFICATION CARD SUB-COMPONENT
============================ */
function CertificationCard({ cert, index, darkMode, downloading, onDownload }) {
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: false, amount: 0.2 })

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{
        hidden: {
          opacity: 0,
          y: 50,
          scale: 0.95,
          transition: { duration: 0.5 },
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { delay: index * 0.2, duration: 0.6, ease: 'easeOut' },
        },
      }}
      className="relative p-[2px] rounded-2xl overflow-hidden"
    >
      {/* Rotating conic gradient border */}
      <div
        className="absolute inset-[-2px] rounded-2xl animate-border-spin"
        style={{
          boxShadow: '0 0 9px rgba(37, 22, 249, 0.5)',
          background:
            'conic-gradient(from 0deg, #05128a, #0646a7, #1000a1, #2516f9)',
          backgroundSize: '100% 100%',
        }}
      />

      <div
        className={`relative rounded-xl p-6 border transform duration-700 hover:scale-[1.02] shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col ${
          darkMode
            ? 'bg-slate-800 border-slate-700 hover:border-blue-500/50'
            : 'bg-white border-blue-500 hover:border-blue-700'
        }`}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`p-3 rounded-xl transition-transform duration-300 ${
              darkMode ? 'bg-blue-900/50' : 'bg-blue-100'
            }`}
          >
            <span className="text-3xl text-blue-500">{cert.icon}</span>
          </div>
          <div className="flex-1">
            <h3
              className={`text-xl font-bold ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}
            >
              {cert.title}
            </h3>
            <p
              className={`text-sm ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}
            >
              {cert.institution} • {cert.year}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {cert.description}
        </p>

        {/* Skills */}
        <div className="mb-4">
          <h4
            className={`text-sm font-semibold mb-2 ${
              darkMode ? 'text-blue-200' : 'text-blue-700'
            }`}
          >
            Key Skills:
          </h4>
          <div className="flex flex-wrap gap-2">
            {cert.skills.map((skill, idx) => (
              <span
                key={idx}
                className={`text-xs px-3 py-1 rounded-full border ${
                  darkMode
                    ? 'bg-blue-900/50 text-blue-200 border-blue-700'
                    : 'bg-blue-100 text-blue-700 border-blue-200'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Credential ID */}
        <div
          className={`mb-4 p-3 rounded-lg ${
            darkMode ? 'bg-slate-700/50' : 'bg-gray-50'
          }`}
        >
          <p
            className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Credential ID:{' '}
            <span className="font-mono">{cert.credentialId}</span>
          </p>
        </div>

        {/* Download Button */}
        <button
          onClick={() => onDownload(cert.id, cert.fileUrl, cert.fileName)}
          disabled={downloading === cert.id}
          className={`mt-auto relative overflow-hidden flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold border transition-all duration-300 ${
            darkMode
              ? 'bg-blue-600 hover:bg-white text-white hover:text-black border-blue-700'
              : 'bg-blue-500 hover:bg-blue-100 text-white hover:text-black border-blue-400'
          } ${
            downloading === cert.id
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:scale-105'
          }`}
        >
          {downloading === cert.id ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Downloading...
            </>
          ) : (
            <>
              <FaDownload />
              Download Certificate
            </>
          )}

          {/* Shine sweep */}
          {downloading !== cert.id && (
            <span
              className="absolute top-0 left-0 w-12 h-full bg-white opacity-30 -skew-x-12 animate-shine"
              style={{ pointerEvents: 'none' }}
            />
          )}
        </button>
      </div>
    </motion.div>
  )
}