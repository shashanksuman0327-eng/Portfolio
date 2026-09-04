"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pet } from "@/data/content";

interface CatSpeechBubbleProps {
  speech: { text: string; id: number } | null;
  onDismiss?: () => void;
}

export const CatSpeechBubble: React.FC<CatSpeechBubbleProps> = ({ speech, onDismiss }) => {
  return (
    <AnimatePresence>
      {speech && (
        <motion.div
          key={speech.id}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={onDismiss}
          className="absolute bottom-full mb-3 right-0 md:-right-6 z-50 pointer-events-auto cursor-pointer select-none max-w-xs w-max"
        >
          <div className="relative border border-mint/80 bg-black/90 p-2.5 rounded-sm shadow-[0_0_15px_rgba(57,255,136,0.25)] text-left backdrop-blur-md">
            {/* Header */}
            <div className="flex items-center justify-between text-[10px] text-mint/70 font-mono mb-1 border-b border-mint/20 pb-1">
              <span>{pet.name.toLowerCase()}.exe</span>
              <span>CTRL+C to close</span>
            </div>
            {/* Content */}
            <p className="text-xs font-mono text-mint leading-relaxed font-medium">
              {speech.text}
            </p>
            {/* Bubble Tail */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-mint/80" />
            <div className="absolute top-full right-[25px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-black" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
