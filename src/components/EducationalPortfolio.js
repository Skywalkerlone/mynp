"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from '../context/ThemeContext';
import Link from "next/link";

// BarChart dynamically loaded (fixes SSR issues)
const BarChart = dynamic(
  async () => {
    const recharts = await import("recharts");
    return ({ darkMode }) => {
      const subjects = [
        { subject: "Mathematics", level: 75 },
        { subject: "Physics", level: 90 },
        { subject: "Chemistry", level: 85 },
        { subject: "Sciences", level: 88 },
        { subject: "Computer Science", level: 92 },
        { subject: "Fine Art", level: 80 },
      ];

      return (
        <div 
        id="ep"
        className={`w-full h-96 mb-12 backdrop-blur rounded-xl shadow-lg p-4 border ${
          darkMode
            ? 'bg-slate-800/60 border-blue-700/50'
            : 'bg-white/80 border-blue-200'
        }`}>
          <h3 className={`text-xl font-semibold text-center mb-9 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Teaching Strength by Subject
          </h3>
          <recharts.ResponsiveContainer width="100%" height="100%">
            <recharts.BarChart data={subjects}>
              <recharts.CartesianGrid 
                strokeDasharray="3 3" 
                stroke={darkMode ? "#475569" : "#cbd5e1"} 
              />
              <recharts.XAxis 
                dataKey="subject" 
                stroke={darkMode ? "#cbd5e1" : "#475569"} 
              />
              <recharts.YAxis 
                stroke={darkMode ? "#cbd5e1" : "#475569"} 
              />
              <recharts.Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                  borderColor: darkMode ? '#475569' : '#cbd5e1',
                  color: darkMode ? '#ffffff' : '#000000',
                  borderRadius: '8px',
                }}
              />
              <recharts.Bar 
                dataKey="level" 
                fill={darkMode ? "#3b82f6" : "#2563eb"} 
                radius={[4, 4, 0, 0]}
              />
            </recharts.BarChart>
          </recharts.ResponsiveContainer>
        </div>
      );
    };
  },
  { ssr: false }
);

// Framer Motion animation
const container = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const programs = [
  "Edo State Innovation Center",
  "Teklearn",
  "GiveHerTech",
];

// New: Subject expertise data for professional presentation
const expertiseAreas = [
  { name: "Mathematics", level: "Advanced", years: 10, icon: "📐" },
  { name: "Physics", level: "Advanced", years: 8, icon: "⚛️" },
  { name: "Chemistry", level: "Advanced", years: 8, icon: "🧪" },
  { name: "Sciences", level: "Advanced", years: 9, icon: "🔬" },
  { name: "Computer Science", level: "Expert", years: 7, icon: "💻" },
  { name: "Frontend Development", level: "Expert", years: 6, icon: "🎨" },
  { name: "Video Editing", level: "Advanced", years: 5, icon: "🎬" },
  { name: "2D Drawing", level: "Intermediate", years: 11, icon: "✏️" },
];

const ageGroups = [
  "Early Learners (3-6 years)",
  "Primary School (7-12 years)",
  "Secondary School (13-18 years)",
  "University & Adults (18+)",
];

const EducationalPortfolio = () => {
  const { darkMode } = useTheme();

  return (
    <section
      className={`relative py-20 px-6 overflow-hidden transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900' 
          : 'bg-gradient-to-b from-blue-100 to-blue-50'
      }`}
      id="edu-portfolio"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 text-center ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
            Educational
          </span>
          <span className={darkMode ? 'text-white' : 'text-gray-700'}>
            {' '}Portfolio
          </span>
        </h2>

        {/* Professional Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-12 p-6 rounded-2xl backdrop-blur-sm border shadow-lg ${
            darkMode
              ? 'bg-blue-900/30 border-blue-500/30'
              : 'bg-white/70 border-blue-300'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">👨‍🏫</div>
              <div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  10+ Years of Experience
                </h3>
                <p className={`${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                  1-on-1 Tutoring • Ages 3 to Adult
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {ageGroups.map((age, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode
                      ? 'bg-blue-800/50 text-blue-200'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {age}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Expertise Grid - Professional presentation of subjects */}
        <div className="mb-12">
          <h3 className={`text-2xl font-semibold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Subject Expertise
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {expertiseAreas.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
                className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${
                  darkMode
                    ? 'bg-slate-800/60 border border-blue-700/30'
                    : 'bg-white/80 border border-blue-200 shadow-sm'
                }`}
              >
                <div className="text-3xl mb-2">{subject.icon}</div>
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {subject.name}
                </h4>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  {subject.level} • {subject.years}+ yrs
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Program Cards with Transparent Cube and Comet Border */}
        <div className="mb-12">
          <h3 className={`text-2xl font-semibold mb-9 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Programs I Facilitated{' '}
            <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
              (Web Development)
            </span>:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`p-7 rounded-lg text-center shadow-xl transform hover:scale-105 transition-all duration-300 border backdrop-blur-sm relative overflow-hidden ${
                  darkMode
                    ? 'bg-slate-800/60 border-blue-700/30 text-white'
                    : 'bg-white/80 border-blue-200 text-gray-800'
                }`}
                whileHover={{ 
                  y: -5,
                  boxShadow: darkMode 
                    ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
                    : '0 20px 40px rgba(59, 130, 246, 0.1)'
                }}
              >
                {/* Comet effect on hover */}
                <div className={`absolute inset-0 ${
                  darkMode 
                    ? 'comet-border-dark' 
                    : 'comet-border-light'
                }`} />
                <h4 className="text-xl font-medium relative z-10">{program}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <BarChart darkMode={darkMode} />

        {/* Professional footer with resume reference and CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-blue-200/30">
          <p className={`italic ${darkMode ? 'text-blue-200' : 'text-gray-600'}`}>
            📄 Refer to my resume for detailed experience and credentials.
          </p>
          <Link 
            href="/edu"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all border ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500'
                : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-400'
            }`}
          >
            View All Programs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      
      </motion.div>

      <style jsx>{`
        .comet-border-light::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(59, 130, 246, 0.4),
            transparent
          );
          animation: comet-move 2.5s linear infinite;
        }

        .comet-border-dark::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(96, 165, 250, 0.5),
            transparent
          );
          animation: comet-move 2.5s linear infinite;
        }

        @keyframes comet-move {
          0% {
            left: -100%;
          }
          50% {
            left: 0%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default EducationalPortfolio;