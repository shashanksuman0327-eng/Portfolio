"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCat } from "@/context/CatContext";
import { Sparkles, X } from "lucide-react";

export const SecretManager: React.FC = () => {
  const { latestSecretNotification, clearSecretNotification, totalSecretsCount } = useCat();

  useEffect(() => {
    if (latestSecretNotification) {
      const timer = setTimeout(() => {
        clearSecretNotification();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [latestSecretNotification, clearSecretNotification]);

  if (!latestSecretNotification) return null;

  const { secret, count } = latestSecretNotification;
  const progressPercent = Math.min(100, Math.round((count / totalSecretsCount) * 100));
  const filledBlocks = Math.round((count / totalSecretsCount) * 10);
  const emptyBlocks = 10 - filledBlocks;
  const progressBar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed bottom-20 left-4 md:left-8 z-50 pointer-events-auto font-mono text-xs max-w-sm w-full select-none"
      >
        <div className="bg-[#0b0b0b] border-2 border-amber rounded-sm p-3.5 shadow-[0_0_25px_rgba(255,176,0,0.35)] backdrop-blur-md">
          {/* Header */}
          <div className="flex items-center justify-between text-amber font-bold mb-1 border-b border-amber/30 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 animate-spin text-amber" />
              <span>+1 SECRET DISCOVERED!</span>
            </div>
            <button
              onClick={clearSecretNotification}
              className="text-amber/60 hover:text-amber transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Secret Metadata */}
          <div className="space-y-1 my-2">
            <p className="text-mint font-bold text-sm">{secret.name}</p>
            <p className="text-terminal-bright text-xs">{secret.description}</p>
          </div>

          {/* Progress Bar */}
          <div className="mt-2.5 pt-2 border-t border-amber/20 text-[10px] space-y-1 text-amber/80">
            <div className="flex items-center justify-between">
              <span>Progress: [{progressBar}]</span>
              <span>
                {String(count).padStart(2, "0")}/{String(totalSecretsCount).padStart(2, "0")} ({progressPercent}%)
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
