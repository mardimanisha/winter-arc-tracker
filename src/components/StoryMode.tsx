import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Mountain, Flag } from 'lucide-react';

interface StoryModeProps {
  completionPercentage: number;
  daysRemaining: number;
}

export const StoryMode = ({ completionPercentage, daysRemaining }: StoryModeProps) => {
  const mountainHeight = 300;
  const climberPosition = (completionPercentage / 100) * mountainHeight;

  return (
    <Card className="overflow-hidden bg-[#1e3a5f]/50 border-[#2d5080]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Mountain className="text-blue-300" size={24} />
          Your Winter Mountain
        </CardTitle>
        <CardDescription className="text-blue-200">Track your journey to the summit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full" style={{ height: `${mountainHeight}px` }}>
          {/* Mountain SVG */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
          >
            {/* Sky gradient */}
            <defs>
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1a2849', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#0f1c34', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            {/* Sky */}
            <rect width="400" height="300" fill="url(#skyGradient)" />

            {/* Mountain */}
            <path
              d="M 0 300 L 200 50 L 400 300 Z"
              fill="url(#mountainGradient)"
              stroke="#3b82f6"
              strokeWidth="2"
            />

            {/* Snow cap */}
            <path
              d="M 150 100 L 200 50 L 250 100 Z"
              fill="white"
              opacity="0.9"
            />

            {/* Flag at summit */}
            <g transform="translate(200, 50)">
              <line x1="0" y1="0" x2="0" y2="-20" stroke="#ef4444" strokeWidth="2" />
              <path d="M 0 -20 L 15 -15 L 0 -10 Z" fill="#ef4444" />
            </g>

            {/* Trail markers */}
            {[25, 50, 75].map((percent) => {
              const y = 300 - (percent / 100) * 250;
              return (
                <circle
                  key={percent}
                  cx="200"
                  cy={y}
                  r="3"
                  fill={completionPercentage >= percent ? '#22c55e' : '#475569'}
                  opacity="0.8"
                />
              );
            })}

            {/* Climber */}
            <g transform={`translate(200, ${300 - climberPosition})`}>
              <circle cx="0" cy="-15" r="8" fill="#60a5fa" />
              <line x1="0" y1="-7" x2="0" y2="5" stroke="#60a5fa" strokeWidth="3" />
              <line x1="0" y1="-2" x2="-5" y2="3" stroke="#60a5fa" strokeWidth="2" />
              <line x1="0" y1="-2" x2="5" y2="3" stroke="#60a5fa" strokeWidth="2" />
              <line x1="0" y1="5" x2="-4" y2="12" stroke="#60a5fa" strokeWidth="2" />
              <line x1="0" y1="5" x2="4" y2="12" stroke="#60a5fa" strokeWidth="2" />
            </g>
          </svg>

          {/* Overlay stats */}
          <div className="absolute bottom-4 left-4 right-4 bg-[#1a2d4a]/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-[#2d5080]">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-white">
                <Flag size={16} className="text-red-400" />
                Progress to Summit
              </span>
              <span className="text-white">{completionPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={completionPercentage} className="mb-2" />
            <p className="text-xs text-blue-200 text-center">
              {daysRemaining} days remaining in your winter arc
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
