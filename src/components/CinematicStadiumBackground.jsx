import { motion } from 'framer-motion';
import { useState } from 'react';
import './CinematicStadiumBackground.css';

export default function CinematicStadiumBackground() {
  const [players] = useState(() => {
    // Oyuncuları sadece sol-orta taraftaki yeşil çim alana (telefonların olmadığı alana) hapsediyoruz
    const newPlayers = Array.from({ length: 22 }).map((_, i) => {
      // X ekseninde telefonlardan uzak durmaları için 5vw - 55vw arası
      const startX = 5 + Math.random() * 50; 
      // Y ekseninde ufuk çizgisinin altı ve ekranın en altı (çim saha: 65vh - 95vh)
      const startY = 65 + Math.random() * 30;
      
      // Hareket ederken de bu sınırların dışına taşmalarını engelliyoruz
      const waypointsX = [
        startX, 
        Math.max(5, Math.min(55, startX + (Math.random() * 6 - 3))), 
        Math.max(5, Math.min(55, startX + (Math.random() * 6 - 3))), 
        startX
      ];
      
      const waypointsY = [
        startY, 
        Math.max(65, Math.min(95, startY + (Math.random() * 6 - 3))), 
        Math.max(65, Math.min(95, startY + (Math.random() * 6 - 3))), 
        startY
      ];

      return {
        id: i,
        startX,
        startY,
        animate: {
          left: waypointsX.map(x => `${x}vw`),
          top: waypointsY.map(y => `${y}vh`),
          transition: {
            duration: 12 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }
        },
        isHome: i < 11
      };
    });
    return newPlayers;
  });

  return (
    <div className="cinematic-wrapper">
      
      {/* 
        The Video/Image Container 
        Using the user's uploaded stadium image 1
      */}
      <div className="media-container">
        <div 
          className="bg-image" 
          style={{ backgroundImage: `url('/stadium-1.jpg')` }}
        />
      </div>

      {/* Tiny moving players scattered across the full screen */}
      <div className="players-layer">
        {players.map(player => (
          <motion.div
            key={`p-${player.id}`}
            className={`tiny-player ${player.isHome ? 'team-home' : 'team-away'}`}
            initial={{ left: `${player.startX}vw`, top: `${player.startY}vh` }}
            animate={player.animate}
          />
        ))}
      </div>

      {/* Dark gradient overlay so the text remains readable */}
      <div className="cinematic-overlay"></div>
    </div>
  );
}
