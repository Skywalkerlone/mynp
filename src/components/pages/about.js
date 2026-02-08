// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';

// export default function About() {
//   const bgRef = useRef(null);
//   const targetPos = useRef({ x: 0, y: 0 });
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   const softSkills = [
//     'Honesty',
//     'Team Work',
//     'Imaginative',
//     'Diligence',
//     'Hyper-active',
//     'Observant',
//     'Cognitive Thinking',
//     'Just',
//   ];

//   const hardSkills = ['Web3', 'AI Development', 'Game Development'];

//   // Mouse effect handler
//   useEffect(() => {
//     const bgEl = bgRef.current;
//     if (!bgEl) return;

//     const handleMouseMove = (e) => {
//       const rect = bgEl.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       targetPos.current = { x, y };
//     };

//     const lerp = (start, end, t) => start + (end - start) * t;

//     const smoothMove = () => {
//       setMousePos((current) => {
//         const newX = lerp(current.x, targetPos.current.x, 0.1);
//         const newY = lerp(current.y, targetPos.current.y, 0.1);
//         return { x: newX, y: newY };
//       });
//       requestAnimationFrame(smoothMove);
//     };

//     bgEl.addEventListener('mousemove', handleMouseMove);
//     const animId = requestAnimationFrame(smoothMove);

//     return () => {
//       bgEl.removeEventListener('mousemove', handleMouseMove);
//       cancelAnimationFrame(animId);
//     };
//   }, []);

//   return (
//     <>
//       {/* ABOUT SECTION */}
//       <section
//         ref={bgRef}
//         id="about"
//         className="relative overflow-hidden py-20 bg-gradient-to-b from-sky-100 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white"
//       >
//         {/* Aura Trail Background */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             backgroundImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 174, 255, 0.15) 0%, rgba(0, 174, 255, 0.08) 150px, transparent 400px), url('/images/backgrd.png')`,
//             backgroundSize: 'cover',
//             maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.6) 220px, transparent 420px)`,
//             WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.6) 220px, transparent 420px)`,
//             transition: 'mask-image 0.1s, -webkit-mask-image 0.1s',
//           }}
//         />

//         <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 z-10">
//           {/* Profile Image */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
//             whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
//             transition={{ duration: 0.8, ease: 'easeOut' }}
//             viewport={{ once: true }}
//             className="flex-shrink-0"
//           >
//             <Image
//               src="/blender/wee.jpg"
//               alt="Idaewor Samuel Providence"
//               width={300}
//               height={300}
//               className="rounded-full shadow-2xl border-4 border-sky-400 dark:border-blue-700"
//             />
//           </motion.div>

//           {/* About Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="max-w-2xl text-center md:text-left space-y-6"
//           >
//             <h2 className=" backdrop-blur-md p-6 shadow-lg  text-4xl font-bold text-blue-300">
//               About <span className='text-white'>Me</span>
//             </h2>

//             <p className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md p-6 text-lg leading-relaxed">
//               I am <span className="font-semibold text-sky-600 dark:text-sky-400">Idaewor S.E Providence</span>, deeply passionate about{' '}
//               <span className="italic text-blue-500 dark:text-blue-300">learning</span>,{' '}
//               <span className="italic text-blue-500 dark:text-blue-300">teaching</span>, and{' '}
//               <span className="italic text-blue-500 dark:text-blue-300">evolving</span>. I blend{' '}
//               <span className="font-medium text-sky-700 dark:text-sky-300">design</span> and{' '}
//               <span className="font-medium text-sky-700 dark:text-sky-300">code</span> to solve real-world problems creatively.
//             </p>
//             <p className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md p-6 text-md text-gray-900 dark:text-gray-300">
//   I'm a versatile developer and digital artist blending creativity with code. I specialize in frontend and backend development, mobile app development, video editing, and 3D modeling. I also offer book covers, illustrations, comic art, animation, and product design — fusing imagination with function to deliver unique, high-impact solutions.
//         </p>


            

//             <p className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md p-6 shadow-lg border border-white/30 text-md text-gray-800 dark:text-gray-300">
//               My artistic alias — <span className="font-semibold italic text-blue-600 dark:text-blue-300">E_sai_Art (The Skywalker)</span> — reflects a journey of storytelling, growth, and creative reinvention.
//             </p>

//             {/* Personal Philosophy */}
//             <div className="border-l-4 pl-4 border-blue-400 dark:border-blue-600">
//               <h3 className="text-xl font-semibold mb-1">Personal Philosophy</h3>
//               <p className="text-sm text-gray-700 dark:text-gray-400">
//                 Curiosity is my superpower. I believe art and technology are tools of transformation — fueling connection, imagination, and purpose.
//               </p>
//             </div>

//             {/* Call to Collaborate */}
//             <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-inner">
//               <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-1">Let us Collaborate!</h3>
//               <p className="text-sm text-gray-700 dark:text-gray-300">
//                 If you're looking for a creative partner who blends <strong>art, tech, and education</strong>, let’s connect and bring your ideas to life.
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* SKILLS SECTION */}
//       <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-blue-100 dark:from-blue-900 dark:to-slate-900 text-gray-800 dark:text-white">
//         <style jsx>{`
//           .comet-border {
//             position: relative;
//             overflow: hidden;
//           }

//           .comet-border::before {
//             content: "";
//             position: absolute;
//             top: 0;
//             left: -100%;
//             width: 200%;
//             height: 100%;
//             background: linear-gradient(
//               120deg,
//               transparent,
//               rgba(59, 130, 246, 0.7),
//               transparent
//             );
//             animation: comet-move 2.5s linear infinite;
//           }

//           @keyframes comet-move {
//             0% {
//               left: -100%;
//             }
//             50% {
//               left: 0%;
//             }
//             100% {
//               left: 100%;
//             }
//           }
//         `}</style>

//         <motion.div
//           className="max-w-6xl mx-auto"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: 'easeOut' }}
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           {/* Soft Skills */}
//           <h2 className="text-3xl font-bold mb-6 text-center">Soft Skills</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
//             {softSkills.map((skill, index) => (
//               <div
//                 key={index}
//                 className="comet-border p-6 text-center text-white bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
//               >
//                 <h4 className="text-lg font-medium">{skill}</h4>
//               </div>
//             ))}
//           </div>

//           {/* Hard Skills */}
//           <h2 className="text-3xl font-bold mb-6 text-center">Hard Skills Being Developed</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {hardSkills.map((skill, index) => (
//               <div
//                 key={index}
//                 className="comet-border p-6 text-center text-white bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
//               >
//                 <h4 className="text-lg font-medium">{skill}</h4>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </section>
//     </>
//   );
// }


































'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function About() {
  const bgRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { darkMode } = useTheme();

  const softSkills = [
    'Honesty',
    'Team Work',
    'Imaginative',
    'Diligence',
    'Hyper-active',
    'Observant',
    'Cognitive Thinking',
    'Just',
  ];

  const hardSkills = ['Web3', 'AI Development', 'Game Development'];

  // Mouse effect handler
  useEffect(() => {
    const bgEl = bgRef.current;
    if (!bgEl) return;

    const handleMouseMove = (e) => {
      const rect = bgEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetPos.current = { x, y };
    };

    const lerp = (start, end, t) => start + (end - start) * t;

    const smoothMove = () => {
      setMousePos((current) => {
        const newX = lerp(current.x, targetPos.current.x, 0.1);
        const newY = lerp(current.y, targetPos.current.y, 0.1);
        return { x: newX, y: newY };
      });
      requestAnimationFrame(smoothMove);
    };

    bgEl.addEventListener('mousemove', handleMouseMove);
    const animId = requestAnimationFrame(smoothMove);

    return () => {
      bgEl.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* ABOUT SECTION */}
      <section
        ref={bgRef}
        id="about"
        className={`relative overflow-hidden py-20 transition-all duration-700 ${
          darkMode 
            ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
            : 'bg-gradient-to-b from-blue-200 to-blue-50'
        }`}
      >
        {/* Aura Trail Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: darkMode 
              ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.08) 150px, transparent 400px), url('/images/backgrd.png')`
              : `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 150px, transparent 400px), url('/images/backgrd.png')`,
            backgroundSize: 'cover',
            maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,${darkMode ? '0.8' : '0.6'}) 220px, transparent 420px)`,
            WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,${darkMode ? '0.8' : '0.6'}) 220px, transparent 420px)`,
            transition: 'mask-image 0.1s, -webkit-mask-image 0.1s',
            opacity: darkMode ? 0.8 : 0.7,
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 z-10">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <Image
              src="/blender/wee.jpg"
              alt="Idaewor Samuel Providence"
              width={300}
              height={300}
              className={`rounded-full shadow-2xl border-4 ${
                darkMode ? 'border-blue-600' : 'border-blue-400'
              }`}
              priority
            />
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl text-center md:text-left space-y-6"
          >
            <h2 className={`text-3xl sm:text-4xl font-bold p-6 rounded-xl backdrop-blur-sm ${
              darkMode 
                ? 'bg-slate-800/60 border border-slate-700' 
                : 'bg-white/80  border-blue-500 border-r-4'
            }`}>
              <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
                About
              </span>
              <span className={darkMode ? 'text-white' : 'text-gray-700'}>
                {' '}Me
              </span>
            </h2>

            <div className={`p-6 rounded-xl backdrop-blur-sm ${
              darkMode 
                ? 'bg-slate-800/60 border border-slate-700' 
                : 'bg-white/80 border-blue-500 border-l-4'
            }`}>
              <p className={`text-lg leading-relaxed mb-4 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                I am <span className={`font-semibold ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>Idaewor S.E Providence</span>, deeply passionate about{' '}
                <span className={`italic ${
                  darkMode ? 'text-blue-300' : 'text-blue-500'
                }`}>learning</span>,{' '}
                <span className={`italic ${
                  darkMode ? 'text-blue-300' : 'text-blue-500'
                }`}>teaching</span>, and{' '}
                <span className={`italic ${
                  darkMode ? 'text-blue-300' : 'text-blue-500'
                }`}>evolving</span>. I blend{' '}
                <span className={`font-medium ${
                  darkMode ? 'text-blue-200' : 'text-blue-600'
                }`}>design</span> and{' '}
                <span className={`font-medium ${
                  darkMode ? 'text-blue-200' : 'text-blue-600'
                }`}>code</span> to solve real-world problems creatively.
              </p>
              <p className={`text-md ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I'm a versatile developer and digital artist blending creativity with code. I specialize in frontend and backend development, mobile app development, video editing, and 3D modeling. I also offer book covers, illustrations, comic art, animation, and product design — fusing imagination with function to deliver unique, high-impact solutions.
              </p>
            </div>

            <div className={`p-6 rounded-xl backdrop-blur-sm  ${
              darkMode 
                ? 'bg-slate-800/60 border-slate-700' 
                : 'bg-white/80 border-blue-500 border-r-4'
            }`}>
              <p className={`text-md ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                My artistic alias —{' '}
                <span className={`font-semibold italic ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  E_sai_Art (The Skywalker)
                </span> — reflects a journey of storytelling, growth, and creative reinvention.
              </p>
            </div>

            {/* Personal Philosophy */}
            <div className={`border-l-4 pl-4 py-2 ${
              darkMode 
                ? 'border-blue-500 bg-blue-900/20' 
                : 'border-blue-400 bg-blue-50'
            }`}>
              <h3 className={`text-xl font-semibold mb-1 ${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`}>
                Personal Philosophy
              </h3>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Curiosity is my superpower. I believe art and technology are tools of transformation — fueling connection, imagination, and purpose.
              </p>
            </div>

            {/* Call to Collaborate */}
            <div className={`p-6 rounded-xl ${
              darkMode 
                ? 'bg-blue-900/30 border border-blue-800/30' 
                : 'bg-blue-100/50 border border-blue-200'
            }`}>
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-blue-200' : 'text-blue-700'
              }`}>
                Let's Collaborate!
              </h3>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                If you're looking for a creative partner who blends{' '}
                <strong className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
                  art, tech, and education
                </strong>, let's connect and bring your ideas to life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className={`py-20 px-6 transition-all duration-700 ${
        darkMode 
          ? 'bg-gradient-to-b from-blue-900/30 to-slate-900' 
          : 'bg-gradient-to-b from-blue-50 to-blue-100'
      }`}>
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Soft Skills */}
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Soft Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-16">
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`p-6 text-center rounded-xl shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden ${
                  darkMode
                    ? 'bg-slate-800/60 border border-slate-700 text-white'
                    : 'bg-white/80 border border-blue-100 text-gray-800'
                }`}
                whileHover={{ y: -5 }}
              >
                {/* Comet effect */}
                <div className={`absolute inset-0 ${
                  darkMode 
                    ? 'comet-border-dark' 
                    : 'comet-border-light'
                }`} />
                <h4 className="text-lg font-medium relative z-10">{skill}</h4>
              </motion.div>
            ))}
          </div>

          {/* Hard Skills */}
          <h2 className={`text-3xl font-bold mb-8 text-center ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Hard Skills Being Developed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {hardSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className={`p-8 text-center rounded-xl shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden ${
                  darkMode
                    ? 'bg-blue-900/40 border border-blue-800/30 text-white'
                    : 'bg-blue-100 border border-blue-200 text-gray-800'
                }`}
                whileHover={{ y: -5 }}
              >
                {/* Comet effect */}
                <div className={`absolute inset-0 ${
                  darkMode 
                    ? 'comet-border-dark' 
                    : 'comet-border-light'
                }`} />
                <h4 className="text-xl font-bold relative z-10">{skill}</h4>
                <p className={`text-sm mt-2 relative z-10 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Currently expanding expertise
                </p>
              </motion.div>
            ))}
          </div>

          {/* Skills Description */}
          <div className={`mt-16 p-8 rounded-xl ${
            darkMode
              ? 'bg-slate-800/40 border border-slate-700'
              : 'bg-white/80 border border-blue-100'
          }`}>
            <h3 className={`text-2xl font-semibold mb-4 text-center ${
              darkMode ? 'text-blue-200' : 'text-blue-700'
            }`}>
              Why These Skills Matter
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className={`font-semibold mb-2 ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  Soft Skills
                </h4>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  These interpersonal and personal attributes enable effective collaboration, communication, and problem-solving in any professional environment.
                </p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  Hard Skills
                </h4>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Technical competencies being developed to stay ahead in emerging technologies, ensuring cutting-edge solutions for future challenges.
                </p>
              </div>
            </div>
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
    </>
  );
}
