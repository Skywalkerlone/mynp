'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaChalkboardTeacher, FaCode, FaUsers, FaSchool, FaLaptopCode, FaArrowLeft, FaLightbulb, FaChild, FaUserTie } from 'react-icons/fa'
import { MdComputer } from 'react-icons/md'
import Link from 'next/link'
import { useTheme } from '../context/ThemeContext'

const teachingExperiences = [
  {
    title: "GivHerTech Trainee - HTML & CSS, JavaScript",
    organization: "GivHerTech Africa",
    period: "2024",
    type: "Online Teaching",
    description: "Conducted comprehensive online training sessions for HerTech participants, covering fundamental web technologies including HTML5, CSS3, and JavaScript. Focused on practical skills for women entering tech careers.",
    icon: <FaLaptopCode />,
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Fundamentals"],
    color: "from-blue-500 to-blue-600",
    iconColor: "text-blue-500"
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
    iconColor: "text-blue-500"
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
    iconColor: "text-blue-500"
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
    iconColor: "text-blue-500"
  }
]

export default function EducationPage() {
  const { darkMode, toggleTheme } = useTheme()

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
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4</div>
            <div className="text-gray-700 dark:text-gray-300">Teaching Programs</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">200+</div>
            <div className="text-gray-700 dark:text-gray-300">Students Trained</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2 Years</div>
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
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    {experience.description}
                  </p>
                  
                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Skills & Technologies Covered:</h3>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Impact:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Hands-on Workshops</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Practical Projects</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-600 dark:text-gray-400">Career Guidance</span>
                      </div>
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
              I'm passionate about tech education and always open to new teaching opportunities, workshops, or educational collaborations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Link>
              <Link 
                href="/"
                className="px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
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