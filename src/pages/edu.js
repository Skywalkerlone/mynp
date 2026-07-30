'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaChalkboardTeacher, FaCode, FaUsers, FaSchool, FaLaptopCode, FaArrowLeft, FaLightbulb, FaChild, FaUserTie, FaRobot, FaBrain, FaChess, FaPython } from 'react-icons/fa'
import { MdComputer } from 'react-icons/md'
import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'
import Image from 'next/image'

const teachingExperiences = [
  {
    title: "eduBRICKS - Coding & Robotics Academy",
    organization: "eduBRICKS",
    period: "2026 - Present",
    type: "Bootcamp & School Programs",
    description: "Comprehensive technology education program for children aged 5-16. Teaching Scratch programming, Python development, HTML/CSS web design, robotics engineering, and strategic chess. Delivered through intensive bootcamps and ongoing school partnerships.",
    icon: <FaRobot />,
    skills: ["Scratch", "Python", "HTML/CSS", "Robotics", "Chess", "STEM Education"],
    color: "from-blue-500 to-blue-600",
    iconColor: "text-blue-500",
    images: [
      { src: "/gallery/edubricks1.jpg", alt: "Kids learning robotics at eduBRICKS" },
      { src: "/gallery/edubricks2.jpg", alt: "Students coding in Python at eduBRICKS" },

    ],
    imageLayout: "grid" // 4 images in grid
  },
  {
    title: "UpperClass AI - AI Awareness & Web Development",
    organization: "UpperClass AI",
    period: "2026 - Present",
    type: "Online & On-site Training",
    description: "Specialized training programs focused on artificial intelligence awareness and practical applications. Teaching AI fundamentals, machine learning concepts, and comprehensive web development bootcamps to prepare students for the future of technology.",
    icon: <FaBrain />,
    skills: ["AI Awareness", "Machine Learning", "Web Development", "Data Science", "Python", "AI Ethics"],
    color: "from-blue-500 to-blue-60000",
    iconColor: "text-purple-500",
    images: null
  },
  {
    title: "GivHerTech Trainee - HTML & CSS, JavaScript",
    organization: "GivHerTech Africa",
    period: "2024",
    type: "Online Teaching",
    description: "Conducted comprehensive online training sessions for HerTech participants, covering fundamental web technologies including HTML5, CSS3, and JavaScript. Focused on practical skills for women entering tech careers.",
    icon: <FaLaptopCode />,
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Fundamentals"],
    color: "from-blue-500 to-blue-600",
    iconColor: "text-blue-500",
    images: null
  },
  {
    title: "Programming Awareness Program",
    organization: "PIP Initiative",
    period: "2024",
    type: "School Outreach",
    description: "Led awareness sessions in secondary schools to introduce students to programming concepts. Demonstrated basic coding principles and career opportunities in technology to inspire the next generation.",
    icon: <FaSchool />,
    skills: ["Programming Basics", "Career Guidance", "Tech Awareness", "Youth Engagement"],
    color: "from-blue-500 to-blue-600",
    iconColor: "text-blue-500",
    images: null
  },
  {
    title: "Web Development Bootcamp (Adults)",
    organization: "Edo Innovate",
    period: "2025",
    type: "On-site Training",
    description: "Organized and taught hands-on web development workshops for adult learners. Created comprehensive curriculum covering full-stack development fundamentals and practical project building.",
    icon: <FaUserTie />,
    skills: ["Full-stack Development", "Project-based Learning", "Career Transition", "Practical Workshops"],
    color: "from-blue-500 to-blue-600",
    iconColor: "text-blue-500",
    images: null
  },
  {
    title: "Kids Coding Program",
    organization: "Edo Innovate",
    period: "2025",
    type: "On-site Training",
    description: "Designed and delivered age-appropriate coding workshops for children. Focused on making programming fun and accessible through visual programming tools and creative projects.",
    icon: <FaChild />,
    skills: ["Visual Programming", "Game Development", "Creative Learning", "Age-appropriate Curriculum"],
    color: "from-blue-500 to-blue-600",
    iconColor: "text-blue-500",
    images: [
      { src: "/gallery/ed.jpg", alt: "Children learning to code at Edo Innovate" }
    ],
    imageLayout: "full" // single full-width image
  }
]

export default function EducationPage() {
  const { darkMode, toggleTheme } = useTheme()
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 md:p-12">
      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          aria-label="Toggle theme"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLightbulb className="text-xl" />
        </motion.button>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              Teaching & Education Programs
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Sharing knowledge and empowering others through technology education
            </p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              href="/"
              className="group flex items-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Return Home</span>
            </Link>
          </motion.div>
        </div>

        {/* Stats Summary */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">6</div>
            <div className="text-gray-700 dark:text-gray-300">Teaching Programs</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
            <div className="text-gray-700 dark:text-gray-300">Students Trained</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10+ Years</div>
            <div className="text-gray-700 dark:text-gray-300">Teaching Experience</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
            <div className="text-gray-700 dark:text-gray-300">Satisfaction Rate</div>
          </div>
        </motion.div>

        {/* Teaching Experiences */}
        <div className="space-y-8">
          {teachingExperiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                {/* Header */}
                <div className={`p-8 bg-gradient-to-r ${experience.color} text-white`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        {experience.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold">{experience.title}</h2>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-sm">
                            {experience.organization}
                          </span>
                          <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-sm">
                            {experience.period}
                          </span>
                          <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-sm">
                            {experience.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Image Gallery - Grid layout for eduBRICKS (4 images) */}
                  {experience.images && experience.images.length > 0 && experience.imageLayout === "grid" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-8"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {experience.images.map((img, imgIndex) => (
                          <motion.div
                            key={imgIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * imgIndex }}
                            whileHover={{ scale: 1.05 }}
                            className="relative group/image cursor-pointer"
                            onClick={() => setSelectedImage({ src: img.src, alt: img.alt })}
                          >
                            <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-lg">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                              
                              {/* Overlay with zoom button */}
                              <motion.div 
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/40 transition-all"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                  </svg>
                                </motion.button>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* eduBRICKS stats tags */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-3 mt-4 text-sm"
                      >
                        <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center gap-1 border border-orange-200 dark:border-orange-800">
                          <FaRobot /> Robotics
                        </span>
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center gap-1 border border-blue-200 dark:border-blue-800">
                          <FaPython /> Python
                        </span>
                        <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center gap-1 border border-green-200 dark:border-green-800">
                          <FaChess /> Chess
                        </span>
                        <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center gap-1 border border-purple-200 dark:border-purple-800">
                          <FaCode /> HTML/CSS
                        </span>
                        <span className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center gap-1 border border-red-200 dark:border-red-800">
                          👶 Ages 5-16
                        </span>
                        <span className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center gap-1 border border-yellow-200 dark:border-yellow-800">
                          🏫 Bootcamp & Schools
                        </span>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Full-width image for Kids Coding Program */}
                  {experience.images && experience.images.length > 0 && experience.imageLayout === "full" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-8"
                    >
                      <div className="relative group/image">
                        <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-xl">
                          <Image
                            src={experience.images[0].src}
                            alt={experience.images[0].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                          
                          {/* Overlay with zoom button */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedImage({ src: experience.images[0].src, alt: experience.images[0].alt })}
                              className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/40 transition-all"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </motion.button>
                          </motion.div>
                        </div>

                        {/* Image caption */}
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-3 text-sm text-gray-500 dark:text-gray-400 italic flex items-center gap-2"
                        >
                          <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                          Children engaged in creative coding activities at Edo Innovate
                        </motion.p>
                      </div>

                      {/* Image stats */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4 mt-4 text-sm"
                      >
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          📸 Session Photo
                        </span>
                        <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                          👥 50+ Kids
                        </span>
                        <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                          🎮 Hands-on Learning
                        </span>
                      </motion.div>
                    </motion.div>
                  )}

                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    {experience.description}
                  </p>
                  
                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Skills & Technologies Covered:</h3>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, skillIndex) => (
                        <motion.span 
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * skillIndex }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Impact:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["Hands-on Workshops", "Practical Projects", "Career Guidance"].map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-3 group/impact"
                        >
                          <motion.div 
                            whileHover={{ scale: 1.2 }}
                            className="w-3 h-3 rounded-full bg-blue-500 group-hover/impact:bg-blue-600 transition-colors"
                          ></motion.div>
                          <span className="text-gray-600 dark:text-gray-400 group-hover/impact:text-blue-600 dark:group-hover/impact:text-blue-400 transition-colors">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className={`p-8 md:p-12 rounded-2xl shadow-lg border ${
            darkMode 
              ? 'bg-gray-800/50 border-blue-800' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <FaChalkboardTeacher className="text-5xl text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Interested in Collaborating on Education Programs?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              With over 10 years of teaching experience across various technology disciplines, I'm passionate about tech education and always open to new teaching opportunities, workshops, or educational collaborations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white  font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Back to Portfolio
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}