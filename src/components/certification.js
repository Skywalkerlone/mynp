// certification.js
'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { 
  FaCertificate, 
  FaDownload, 
  FaFilePdf, 
  FaFileWord,
  FaGraduationCap,
  FaCheckCircle,
  FaAward
} from 'react-icons/fa'
import { MdComputer, MdSecurity, MdSchool } from 'react-icons/md'

export default function Certification() {
  const controls = useAnimation()
  const ref = useRef(null)
  const { darkMode } = useTheme()
  const [downloading, setDownloading] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('show')
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls])

  // Your Certifications Data with downloadable files
  const certifications = [
    {
      id: 'comptia',
      title: 'CompTIA A+ Certification',
      institution: 'NIIT',
      icon: <MdSecurity />,
      description: 'Hardware troubleshooting, system maintenance, software installation, and IT infrastructure management',
      year: '2015',
      credentialId: 'COMPTIA-A+-2023-NIIT',
      skills: [
        'Hardware Configuration & Troubleshooting',
        'Operating Systems (Windows, Linux, macOS)',
        'Network Connectivity & Security',
        'System Maintenance & Optimization',
        'Software Installation & Management'
      ],
      // IMPORTANT: Place your certificate file in the public folder
      fileUrl: '/certificates/comptia-a-plus-certificate.pdf',
      fileName: 'CompTIA_A+_Certificate_2023.pdf',
      fileType: 'PDF'
    },
    {
      id: 'webdev',
      title: 'Web Development Certification',
      institution: 'NIIT',
      icon: <MdComputer />,
      description: 'Full-stack web development, modern frameworks, database design, and responsive web applications',
      year: '2023',
      credentialId: 'WEBDEV-2023-NIIT',
      skills: [
        'Front-End Development (React, Next.js, HTML, CSS)',
        'Back-End Development (Node.js, Python, PHP)',
        'Database Design & Management (SQL, MongoDB)',
        'Responsive Web Design & UI/UX',
        'API Development & Integration'
      ],
      fileUrl: '/certificates/web-development-certificate.pdf',
      fileName: 'Web_Development_Certificate_2023.pdf',
      fileType: 'PDF'
    }
  ]

  // Education Data
  const education = {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Benin (UNIBEN)',
    year: '2020 - 2024',
    icon: <FaGraduationCap />,
    description: 'Comprehensive computer science education covering programming, algorithms, data structures, software engineering, and emerging technologies.',
    courses: [
      'Data Structures & Algorithms',
      'Programming Languages (Java, Python, C++)',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
      'Artificial Intelligence',
      'Web Technologies'
    ]
  }

  // Handle file download with tracking
  const handleDownload = (certId, fileUrl, fileName) => {
    setDownloading(certId)
    
    // Simulate download delay
    setTimeout(() => {
      // Create a link element
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setDownloading(null)
    }, 800)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section
      id="certification"
      ref={ref}
      className={`relative min-h-screen py-20 px-4 sm:px-6 transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 via-blue-900/30 to-slate-900' 
          : 'bg-gradient-to-b from-blue-50 via-white to-blue-50'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'
        } animate-pulse`} />
        <div className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-purple-500/10' : 'bg-purple-300/20'
        } animate-pulse`} style={{ animationDelay: '2s' }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl ${
          darkMode ? 'bg-cyan-500/5' : 'bg-cyan-300/10'
        }`} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-4"
          >
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              darkMode 
                ? 'bg-blue-900/50 text-blue-300 border border-blue-700' 
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              <FaAward className="inline mr-2" />
              Professional Credentials
            </span>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Certifications
            </span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Professional certifications and educational credentials that validate my expertise in technology and development.
          </motion.p>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className={`mb-12 p-6 rounded-2xl border ${
            darkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/80 border-blue-100'
          } backdrop-blur-sm shadow-xl`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-3xl ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              {education.icon}
            </span>
            <h2 className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Education
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-xl font-semibold ${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`}>
                {education.degree}
              </h3>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {education.institution}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {education.year}
              </p>
              <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {education.description}
              </p>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`}>
                Key Courses:
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {education.courses.map((course, idx) => (
                  <span key={idx} className={`text-sm flex items-center gap-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <FaCheckCircle className="text-blue-500 text-xs flex-shrink-0" />
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50' 
                  : 'bg-white/80 border-blue-100 hover:border-blue-400'
              } backdrop-blur-sm hover:shadow-2xl hover:-translate-y-1`}
            >
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${
                    darkMode ? 'bg-blue-900/50' : 'bg-blue-100'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl text-blue-500">
                      {cert.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {cert.title}
                    </h3>
                    <p className={`text-sm ${
                      darkMode ? 'text-blue-300' : 'text-blue-600'
                    }`}>
                      {cert.institution} • {cert.year}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className={`mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className={`text-sm font-semibold mb-2 ${
                    darkMode ? 'text-blue-200' : 'text-blue-700'
                  }`}>
                    Key Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-3 py-1 rounded-full ${
                          darkMode
                            ? 'bg-blue-900/50 text-blue-200 border border-blue-700'
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credential ID */}
                <div className={`mb-4 p-3 rounded-lg ${
                  darkMode ? 'bg-slate-700/50' : 'bg-gray-50'
                }`}>
                  <p className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Credential ID: <span className="font-mono">{cert.credentialId}</span>
                  </p>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(
                    cert.id,
                    cert.fileUrl,
                    cert.fileName
                  )}
                  disabled={downloading === cert.id}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  } ${downloading === cert.id ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                  {downloading === cert.id ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <FaDownload />
                      Download Certificate
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Combined Download Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className={`text-center p-8 rounded-2xl border ${
            darkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/80 border-blue-100'
          } backdrop-blur-sm shadow-xl`}
        >
          <h3 className={`text-xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <FaFileWord className="inline mr-2 text-blue-500" />
            Complete Resume
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Download my complete resume with all certifications, education, and experience details.
          </p>
          <button
            onClick={() => {
              const link = document.createElement('a')
              link.href = '/resume/IDAEWOR_S_E_PROVIDENCE_CV.docx'
              link.download = 'IDAEWOR_S_E_PROVIDENCE_CV.docx'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
              darkMode
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            } hover:scale-105`}
          >
            <FaFileWord size={20} />
            Download Full Resume (DOCX)
          </button>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}