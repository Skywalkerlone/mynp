// pages/education.js
'use client';

import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

// Dynamically import Edu component
const Edu = dynamic(() => import('../components/Edu'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl">Loading Education Page...</div>
    </div>
  )
});

export default function EducationPage() {
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen transition-all duration-700 ${
      darkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <a 
          href="/" 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-400 mb-8 ${
            darkMode 
              ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/40' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Portfolio
        </a>
        
        {/* Page Header */}
        <div className={`mb-12 p-6 rounded-2xl border border-blue-400 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-900/20 to-blue-800/20' 
            : 'bg-gradient-to-r from-blue-50 to-blue-100'
        }`}>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Educational Programs
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprehensive overview of teaching initiatives and mentorship programs
          </p>
        </div>
        
        {/* Edu Component */}
        <Edu />
      </div>
      
      <Footer />
    </div>
  );
}