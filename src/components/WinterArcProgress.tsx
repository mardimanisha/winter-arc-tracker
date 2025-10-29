import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Sparkles } from 'lucide-react';

interface WinterArcProgressProps {
  currentDay: number;
}

export const WinterArcProgress = ({ currentDay }: WinterArcProgressProps) => {
  const phases = [
    { name: 'Foundation', days: '1-30', range: [1, 30] },
    { name: 'Focus', days: '31-60', range: [31, 60] },
    { name: 'Finish', days: '61-90', range: [61, 90] },
  ];

  const getCurrentPhase = () => {
    if (currentDay <= 30) return 0;
    if (currentDay <= 60) return 1;
    return 2;
  };

  const currentPhase = getCurrentPhase();

  return (
    <Card className="bg-[#1e3a5f]/50 border-[#2d5080]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="text-blue-300" size={20} />
          Winter Arc Progress
        </CardTitle>
        <p className="text-sm text-blue-200">Your 90-day journey • Day {currentDay} of 90</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {phases.map((phase, index) => {
            const isActive = index === currentPhase;
            const isCompleted = index < currentPhase;
            
            return (
              <div
                key={phase.name}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  isActive
                    ? 'bg-blue-500/20 border-blue-400'
                    : isCompleted
                    ? 'bg-green-500/20 border-green-400'
                    : 'bg-[#1a2d4a]/50 border-[#2d5080]'
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-xs mb-2 px-2 py-1 rounded inline-block ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-[#2d5080] text-blue-200'
                    }`}
                  >
                    {phase.days}
                  </div>
                  <h3 className={`text-lg ${isActive || isCompleted ? 'text-white' : 'text-blue-300'}`}>
                    {phase.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
