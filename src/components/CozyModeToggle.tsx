import React from "react";
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Snowflake } from 'lucide-react';

interface CozyModeToggleProps {
  isCozy: boolean;
  onToggle: () => void;
}

export const CozyModeToggle = ({ isCozy, onToggle }: CozyModeToggleProps) => {
  return (
    <Button
      variant={isCozy ? 'default' : 'outline'}
      size="sm"
      onClick={onToggle}
      className="gap-2"
    >
      <Snowflake size={16} className={isCozy ? 'animate-spin' : ''} />
      {isCozy ? 'Cozy Mode On' : 'Cozy Mode Off'}
    </Button>
  );
};

export const SnowfallEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-fall"
          style={{
            left: `${flake.x}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        >
          <Snowflake className="text-blue-200 opacity-60" size={12 + Math.random() * 12} />
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};
