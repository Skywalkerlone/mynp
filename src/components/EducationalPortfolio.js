// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import dynamic from "next/dynamic";

// // BarChart dynamically loaded (fixes SSR issues)
// const BarChart = dynamic(
//   async () => {
//     const recharts = await import("recharts");
//     return () => {
//       const subjects = [
//         { subject: "Mathematics", level: 75 },
//         { subject: "Physics", level: 90 },
//         { subject: "Chemistry", level: 85 },
//         { subject: "Sciences", level: 88 },
//         { subject: "Computer Science", level: 92 },
//         { subject: "Fine Art", level: 80 },
//       ];

//       const AnimatedBar = ({ x, y, width, height, fill }) => {
//   return (
//     <motion.rect
//       x={x}
//       width={width}
//       y={y + height}
//       height={0}
//       fill={fill}
//       initial={{ y: y + height, height: 0 }}
//       whileInView={{ y, height }}
//       transition={{ duration: 1, ease: "easeOut" }}
//       viewport={{ once: true, amount: 0.3 }}
//     />
//   );
// };


//       return (
//         <div className="w-full h-96 mb-12 bg-white/10 backdrop-blur rounded-xl shadow-lg p-4 border border-blue-400">
//           <h3 className="text-xl font-semibold text-white text-center mb-9">
//             Teaching Strength by Subject
//           </h3>
//           <recharts.ResponsiveContainer width="100%" height="100%">
//             <recharts.BarChart data={subjects}>
//               <recharts.CartesianGrid strokeDasharray="3 3" />
//               <recharts.XAxis dataKey="subject" stroke="#fff" />
//               <recharts.YAxis stroke="#fff" />
//               <recharts.Tooltip />
//               <recharts.Bar dataKey="level" fill="#3b82f6" />
//             </recharts.BarChart>
//           </recharts.ResponsiveContainer>
//         </div>
//       );
//     };
//   },
//   { ssr: false }
// );

// // Framer Motion animation
// const container = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
// };

// const programs = [
//   "Edo State Innovation Center",
//   "Teklearn",
//   "GiveHerTech",
// ];

// const EducationalPortfolio = () => {
//   return (
//     <section
//       className="relative py-20 px-6 bg-gradient-to-b from-white to-blue-100 dark:from-blue-900 dark:to-slate-900 text-gray-800 dark:text-white overflow-hidden"
//       id="edu-portfolio"
//     >
//       <style jsx>{`
//         .comet-border {
//           position: relative;
//           overflow: hidden;
//         }

//         .comet-border::before {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 200%;
//           height: 100%;
//           background: linear-gradient(
//             120deg,
//             transparent,
//             rgba(59, 130, 246, 0.7),
//             transparent
//           );
//           animation: comet-move 2.5s linear infinite;
//         }

//         @keyframes comet-move {
//           0% {
//             left: -100%;
//           }
//           50% {
//             left: 0%;
//           }
//           100% {
//             left: 100%;
//           }
//         }
//       `}</style>

//       <motion.div
//         className="max-w-7xl mx-auto"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         variants={container}
//       >
//         <h2 className="text-4xl font-bold mb-8 text-center">
//         <span className="text-blue-200"> Educational</span>  Portfolio
//         </h2>

//         {/* Program Cards with Transparent Cube and Comet Border */}
//         <div className="mb-12">
//           <h3 className="text-2xl font-semibold mb-9">
//             Programs i Facilitated <span className="text-blue-200">(Web Development)</span>:
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {programs.map((program, index) => (
//               <div
//                 key={index}
//                 className="p-7 m-2 rounded-sm bg-white/10 backdrop-blur-md text-white text-center shadow-xl transform hover:scale-102 transition-all duration-300 border border-white/10 comet-border"
//               >
//                 <h4 className="text-xl font-medium">{program}</h4>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bar Chart */}
//         <BarChart />

//         {/* Resume Reference */}
//         <p className="text-center text-lg mt-6">
//           <span className="italic">
//             Refer to my resume for more detailed experience.
//           </span>
//         </p>
//       </motion.div>
//     </section>
//   );
// };

// export default EducationalPortfolio;
























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
        <h2 className={`text-3xl sm:text-4xl font-bold mb-8 text-center ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
            Educational
          </span>
          <span className={darkMode ? 'text-white' : 'text-gray-700'}>
            {' '}Portfolio
          </span>
        </h2>

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

            <p className="italic">
              Refer to my resume for more detailed experience.
           </p>
         <div className="text-center">
  <Link 
    href="/edu"
    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all border border-blue-400 ${
      darkMode
        ? 'bg-blue-600 hover:bg-blue-700 text-white'
        : 'bg-blue-500 hover:bg-blue-600 text-white'
    }`}
  >
    View All Programs
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