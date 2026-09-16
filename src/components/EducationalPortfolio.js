"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from '../context/ThemeContext';
import Link from "next/link";

// Icon Components
const TeacherIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

const MathIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const PhysicsIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ChemistryIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const SciencesIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ComputerScienceIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const FrontendIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const VideoEditingIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const DrawingIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const ResumeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

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
        { subject: "Computer Science", level: 82 },
        { subject: "Fine Art", level: 92 },
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

// Subject expertise data for professional presentation
const expertiseAreas = [
  { name: "Mathematics", level: "Advanced", years: 10, Icon: MathIcon },
  { name: "Physics", level: "Advanced", years: 8, Icon: PhysicsIcon },
  { name: "Chemistry", level: "Advanced", years: 8, Icon: ChemistryIcon },
  { name: "Sciences", level: "Advanced", years: 9, Icon: SciencesIcon },
  { name: "Computer Science", level: "Expert", years: 7, Icon: ComputerScienceIcon },
  { name: "Frontend Development", level: "Expert", years: 6, Icon: FrontendIcon },
  { name: "Video Editing", level: "Advanced", years: 5, Icon: VideoEditingIcon },
  { name: "2D Drawing", level: "Intermediate", years: 11, Icon: DrawingIcon },
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
              <div className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <TeacherIcon className="w-12 h-12" />
              </div>
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
            {expertiseAreas.map((subject, index) => {
              const IconComponent = subject.Icon;
              return (
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
                  <div className={`flex justify-center mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {subject.name}
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    {subject.level} • {subject.years}+ yrs
                  </p>
                </motion.div>
              );
            })}
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
          <p className={`italic flex items-center gap-2 ${darkMode ? 'text-blue-200' : 'text-gray-600'}`}>
            <ResumeIcon className="w-5 h-5" />
            Refer to my resume for detailed experience and credentials.
          </p>
          <Link 
            href="/edu"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all border ${
              darkMode
                ? 'bg-blue-600 hover:bg-white text-white hover:text-black border-blue-500'
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