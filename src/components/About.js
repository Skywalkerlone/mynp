'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  const bgRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        className="relative overflow-hidden py-20 bg-gradient-to-b from-sky-100 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white"
      >
        {/* Aura Trail Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 174, 255, 0.15) 0%, rgba(0, 174, 255, 0.08) 150px, transparent 400px), url('/images/backgrd.png')`,
            backgroundSize: 'cover',
            maskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.6) 220px, transparent 420px)`,
            WebkitMaskImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.6) 220px, transparent 420px)`,
            transition: 'mask-image 0.1s, -webkit-mask-image 0.1s',
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
              src="/blender/we.jpg"
              alt="Idaewor Samuel Providence"
              width={300}
              height={300}
              className="rounded-full shadow-2xl border-4 border-sky-400 dark:border-blue-700"
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
            <h2 className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md p-6 shadow-lg border border-white/30 text-4xl font-bold text-blue-600 dark:text-blue-400">
              About Me
            </h2>

            <p className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md p-6 text-lg leading-relaxed">
              I am <span className="font-semibold text-sky-600 dark:text-sky-400">Idaewor S.E Providence</span>, deeply passionate about{' '}
              <span className="italic text-blue-500 dark:text-blue-300">learning</span>,{' '}
              <span className="italic text-blue-500 dark:text-blue-300">teaching</span>, and{' '}
              <span className="italic text-blue-500 dark:text-blue-300">evolving</span>. I blend{' '}
              <span className="font-medium text-sky-700 dark:text-sky-300">design</span> and{' '}
              <span className="font-medium text-sky-700 dark:text-sky-300">code</span> to solve real-world problems creatively.
            </p>

            <p className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md p-6 text-md text-gray-900 dark:text-gray-300">
              As the creative force behind <strong>E_sai_Art (The Skywalker)</strong>, I offer book covers, illustrations, comic art, animation, 3D modeling, and product design — fusing imagination with function.
            </p>

            <p className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md p-6 shadow-lg border border-white/30 text-md text-gray-800 dark:text-gray-300">
              My artistic alias — <span className="font-semibold italic text-blue-600 dark:text-blue-300">E_sai_Art (The Skywalker)</span> — reflects a journey of storytelling, growth, and creative reinvention.
            </p>

            {/* Personal Philosophy */}
            <div className="border-l-4 pl-4 border-blue-400 dark:border-blue-600">
              <h3 className="text-xl font-semibold mb-1">Personal Philosophy</h3>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Curiosity is my superpower. I believe art and technology are tools of transformation — fueling connection, imagination, and purpose.
              </p>
            </div>

            {/* Call to Collaborate */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-1">Let us Collaborate!</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                If you're looking for a creative partner who blends <strong>art, tech, and education</strong>, let’s connect and bring your ideas to life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-blue-100 dark:from-blue-900 dark:to-slate-900 text-gray-800 dark:text-white">
        <style jsx>{`
          .comet-border {
            position: relative;
            overflow: hidden;
          }

          .comet-border::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 200%;
            height: 100%;
            background: linear-gradient(
              120deg,
              transparent,
              rgba(59, 130, 246, 0.7),
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

        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Soft Skills */}
          <h2 className="text-3xl font-bold mb-6 text-center">Soft Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className="comet-border p-6 text-center text-white bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <h4 className="text-lg font-medium">{skill}</h4>
              </div>
            ))}
          </div>

          {/* Hard Skills */}
          <h2 className="text-3xl font-bold mb-6 text-center">Hard Skills Being Developed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hardSkills.map((skill, index) => (
              <div
                key={index}
                className="comet-border p-6 text-center text-white bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <h4 className="text-lg font-medium">{skill}</h4>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
