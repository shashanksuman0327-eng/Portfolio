"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CatEffectsProps {
  isSleeping?: boolean;
  isPurring?: boolean;
  isExcited?: boolean;
}

export const CatEffects: React.FC<CatEffectsProps> = ({ isSleeping, isPurring, isExcited }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {/* Sleeping Zzz particles */}
      <AnimatePresence>
        {isSleeping && (
          <>
            {[0, 1, 2].map((idx) => (
              <motion.span
                key={`z-${idx}`}
                initial={{ opacity: 0, x: 10, y: -10, scale: 0.6 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [10 + idx * 6, 25 + idx * 10],
                  y: [-10 - idx * 15, -45 - idx * 20],
                  scale: [0.6, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: idx * 0.9,
                  ease: "easeInOut",
                }}
                className="absolute right-4 top-0 text-cyan text-xs font-mono font-bold select-none drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]"
              >
                Zzz...
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Purring Hearts / Paws */}
      <AnimatePresence>
        {isPurring && (
          <>
            {[0, 1, 2, 3].map((idx) => (
              <motion.span
                key={`purr-${idx}`}
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-10, -50],
                  x: [(idx % 2 === 0 ? -1 : 1) * (15 + idx * 5)],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: idx * 0.4,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-0 text-magenta text-sm select-none drop-shadow-[0_0_8px_rgba(255,42,133,0.8)]"
              >
                {idx % 2 === 0 ? "🐾" : "💖"}
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Excited Sparkles */}
      <AnimatePresence>
        {isExcited && (
          <>
            {[0, 1, 2, 3, 4].map((idx) => (
              <motion.span
                key={`sparkle-${idx}`}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.4, 0],
                  x: Math.cos((idx * 72 * Math.PI) / 180) * 35,
                  y: Math.sin((idx * 72 * Math.PI) / 180) * 35 - 15,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: idx * 0.2,
                }}
                className="absolute left-1/2 top-1/2 text-amber text-xs select-none drop-shadow-[0_0_6px_rgba(255,176,0,0.9)]"
              >
                ✨
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
