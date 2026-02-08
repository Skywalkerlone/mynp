"use client";

import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from '../context/ThemeContext';

const subjects = [
  { subject: "Mathematics", level: 95 },
  { subject: "Physics", level: 90 },
  { subject: "Chemistry", level: 85 },
  { subject: "Sciences", level: 88 },
  { subject: "Computer Science", level: 92 },
  { subject: "Fine Art", level: 80 },
];

export default function RadarChartComponent() {
  const { darkMode } = useTheme();

  return (
    <div className={`w-full h-96 mb-12 rounded-xl shadow-lg p-4 border transition-all duration-500 ${
      darkMode
        ? 'bg-slate-800/60 border-slate-700'
        : 'bg-white border-blue-100'
    }`}>
      <h3 className={`text-xl font-semibold text-center mb-6 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        Teaching Strength by Subject
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={subjects}>
          <PolarGrid 
            stroke={darkMode ? "#475569" : "#cbd5e1"} 
            strokeOpacity={0.5}
          />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ 
              fill: darkMode ? "#cbd5e1" : "#475569",
              fontSize: 12,
              fontWeight: 500
            }}
            stroke={darkMode ? "#64748b" : "#94a3b8"}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]}
            tick={{ 
              fill: darkMode ? "#94a3b8" : "#64748b",
              fontSize: 10
            }}
            stroke={darkMode ? "#475569" : "#cbd5e1"}
          />
          <Radar
            name="Teaching Proficiency"
            dataKey="level"
            stroke={darkMode ? "#60a5fa" : "#1e40af"}
            fill={darkMode ? "#3b82f6" : "#60a5fa"}
            fillOpacity={darkMode ? 0.6 : 0.4}
            strokeWidth={2}
          />
          <Legend 
            wrapperStyle={{
              fontSize: '12px',
              color: darkMode ? '#cbd5e1' : '#475569'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Legend explanation */}
      <div className={`mt-4 text-center text-sm ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Scale: 0-100 (100 = Highest Proficiency)
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { label: 'Avg Score', value: '88.3' },
          { label: 'Highest', value: '95' },
          { label: 'Subjects', value: '6' },
        ].map((stat, idx) => (
          <div 
            key={idx} 
            className={`text-center p-2 rounded ${
              darkMode 
                ? 'bg-slate-700/50 text-blue-300' 
                : 'bg-blue-50 text-blue-700'
            }`}
          >
            <div className="text-xs opacity-80">{stat.label}</div>
            <div className="text-lg font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}