import React from "react";
import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
}

export const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.6 + 0.4,
      size: Math.random() * 3 + 2,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-snowfall"
          style={{
            left: `${flake.left}%`,
            top: '-10px',
            opacity: flake.opacity,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          <div className="w-full h-full bg-white rounded-full" />
        </div>
      ))}
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px);
          }
        }
        .animate-snowfall {
          animation: snowfall linear infinite;
        }
      `}</style>
    </div>
  );
};
