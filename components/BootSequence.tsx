"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, pet } from "@/data/content";
import { useCat } from "@/context/CatContext";
import { soundFx } from "@/lib/audio";

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const { unlockSecret, showSpeech } = useCat();
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [impatientMessage, setImpatientMessage] = useState(false);

  const fullLogs = [
    `${profile.osVersion}`,
    "Initializing system kernel............ OK",
    "Checking CPU & RAM allocations....... OK",
    "Mounting VFS /projects & /skills..... OK",
    "Loading cyber mascot subsystem....... OK",
    `Initializing ${pet.name.toUpperCase()} personality v2.6.1... OK`,
    "meow.exe module loaded............... OK",
    "SANK-OS Ready for guest terminal initialization.",
  ];

  useEffect(() => {
    // Check if session already booted
    if (typeof window !== "undefined") {
      const booted = sessionStorage.getItem("sank_os_booted");
      if (booted) {
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "manual";
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        onComplete();
        return;
      }
    }

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < fullLogs.length) {
        setBootLines((prev) => [...prev, fullLogs[currentIdx]]);
        soundFx.playKeypress();
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsBootComplete(true);
      }
    }, 280);

    // Impatient cat timer
    const impatientTimer = setTimeout(() => {
      setImpatientMessage(true);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(impatientTimer);
    };
  }, []);

  const handleStartSystem = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sank_os_booted", "true");
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    soundFx.playSuccess();
    showSpeech("Welcome to SANK-OS! Type 'help' in terminal anytime. 🐾", 4500);
    onComplete();
  };

  const handleSkipIntro = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sank_os_booted", "true");
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    unlockSecret("boot_skip");
    soundFx.playKeypress();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-[#070707] text-mint font-mono p-4 md:p-10 flex flex-col justify-between select-none overflow-hidden"
    >
      {/* Top Header & Skip Button */}
      <div className="flex items-center justify-between border-b border-mint/30 pb-3">
        <div className="flex items-center gap-2 text-xs text-mint/70">
          <span className="w-2.5 h-2.5 rounded-full bg-mint animate-pulse" />
          <span>SANK-OS // BOOT_LOADER_v2.6.1</span>
        </div>
        <button
          onClick={handleSkipIntro}
          className="px-3 py-1 text-xs border border-mint/50 hover:bg-mint hover:text-black transition-colors rounded-xs shadow-[0_0_10px_rgba(57,255,136,0.2)]"
        >
          [ SKIP INTRO ]
        </button>
      </div>

      {/* Main Terminal Screen Content */}
      <div className="my-auto max-w-3xl w-full mx-auto space-y-4">
        {/* ASCII Pet Art Header */}
        <pre className="text-mint text-xs md:text-sm font-mono leading-none select-none text-center md:text-left drop-shadow-[0_0_8px_rgba(57,255,136,0.5)]">
{`
       /\\_/\\
      ( o.o )
       > ^ <   [MOCHI // INITIALIZING SYSTEM]
`}
        </pre>

        {/* Boot Lines Output */}
        <div className="space-y-1.5 text-xs md:text-sm font-mono bg-black/80 p-4 border border-mint/20 rounded shadow-inner max-h-[300px] overflow-y-auto">
          {bootLines.map((line, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-mint/40 text-[10px]">&gt;</span>
              <span className={idx === bootLines.length - 1 ? "text-mint font-bold" : "text-mint/90"}>
                {line}
              </span>
            </div>
          ))}

          {isBootComplete && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 border-t border-mint/30 space-y-2"
            >
              <p className="text-cyan text-sm font-bold animate-pulse">
                {pet.name.toUpperCase()}@SANK-OS:~$ SYSTEM BOOT READY.
              </p>
              <p className="text-xs text-mint/70">
                Type <span className="text-amber">"start"</span> or click the button below to launch workspace.
              </p>
            </motion.div>
          )}

          {impatientMessage && (
            <div className="text-magenta text-xs italic pt-1">
              &gt; MOCHI is getting impatient... pawing at loading bar 🐾
            </div>
          )}
        </div>

        {/* Launch Action Button */}
        {isBootComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center pt-2"
          >
            <button
              onClick={handleStartSystem}
              className="px-6 py-2.5 bg-mint text-black font-bold font-mono text-sm border-2 border-mint hover:bg-black hover:text-mint transition-all shadow-[0_0_20px_rgba(57,255,136,0.6)] rounded-sm"
            >
              [[ START SYSTEM // ENTER WORKSPACE ]]
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer System Details */}
      <div className="flex items-center justify-between text-[11px] text-mint/50 border-t border-mint/20 pt-2 font-mono">
        <span>HOST: {profile.handle}.os</span>
        <span>STATUS: BOOT_READY</span>
      </div>
    </motion.div>
  );
};
