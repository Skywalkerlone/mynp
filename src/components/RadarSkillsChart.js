"use client";

import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const subjects = [
  { subject: "Mathematics", level: 95 },
  { subject: "Physics", level: 90 },
  { subject: "Chemistry", level: 85 },
  { subject: "Sciences", level: 88 },
  { subject: "Computer Science", level: 92 },
  { subject: "Fine Art", level: 80 },
];

export default function RadarChartComponent() {
  return (
    <div className="w-full h-96 mb-12 bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
        Teaching Strength by Subject
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjects}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            name="Skill"
            dataKey="level"
            stroke="#1e40af"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
