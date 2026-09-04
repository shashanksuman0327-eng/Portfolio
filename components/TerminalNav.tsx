"use client";

import React, { useState, useEffect } from "react";
import { useCat } from "@/context/CatContext";
import { profile } from "@/data/content";
import { soundFx } from "@/lib/audio";
import { Volume2, VolumeX, Monitor, Command, Sparkles } from "lucide-react";

export const TerminalNav: React.FC = () => {
  const {
    soundEnabled,
    toggleSound,
    crtEnabled,
    toggleCRT,
    setCommandPaletteOpen,
    discoveredSecrets,
    totalSecretsCount,
  } = useCat();

  const [timeStr, setTimeStr] = useState<string>("");
  const [uptimeStr, setUptimeStr] = useState<string>("00:00:00");

  useEffect(() => {
    const startTime = Date.now();

    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " LOCAL"
      );

      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hrs = String(Math.floor(elapsed / 3600)).padStart(2, "0");
      const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
      const secs = String(elapsed % 60).padStart(2, "0");
      setUptimeStr(`${hrs}:${mins}:${secs}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    soundFx.playKeypress();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-black/90 border-b border-mint/30 backdrop-blur-md font-mono text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Terminal Host Tag */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-mint">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span>guest@{profile.handle}-os:~$</span>
          </div>

          {/* Quick Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 text-mint/70">
            {["about", "skills", "projects", "experience", "links", "contact"].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="hover:text-mint hover:underline transition-colors"
              >
                ~/{sec}
              </button>
            ))}
          </nav>
        </div>

        {/* Status Metrics & Toggles */}
        <div className="flex items-center gap-3">
          {/* Secrets counter */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-1 px-2 py-0.5 rounded border border-amber/40 bg-amber/10 text-amber text-[11px] hover:bg-amber/20 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>
              [{String(discoveredSecrets.length).padStart(2, "0")}/{String(totalSecretsCount).padStart(2, "0")}] secrets
            </span>
          </button>

          {/* Command palette button */}
          <button
            onClick={() => {
              soundFx.playKeypress();
              setCommandPaletteOpen(true);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-mint/10 border border-mint/40 text-mint text-[11px] hover:bg-mint hover:text-black transition-colors"
          >
            <Command className="w-3 h-3" />
            <span className="hidden sm:inline">CTRL+K</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title="Toggle WebAudio synthesizer sound"
            className={`p-1.5 rounded border text-[11px] transition-colors ${
              soundEnabled
                ? "border-mint bg-mint/20 text-mint"
                : "border-mint/30 bg-black text-mint/40 hover:text-mint"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* CRT Toggle */}
          <button
            onClick={toggleCRT}
            title="Toggle CRT scanline overlay"
            className={`px-2 py-1 rounded border text-[11px] flex items-center gap-1 transition-colors ${
              crtEnabled
                ? "border-mint bg-mint/20 text-mint"
                : "border-mint/30 bg-black text-mint/40 hover:text-mint"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">CRT: {crtEnabled ? "ON" : "OFF"}</span>
          </button>

          {/* Dynamic Clock & Uptime */}
          <div className="hidden sm:flex flex-col text-[10px] text-mint/60 border-l border-mint/20 pl-3">
            <span>{timeStr}</span>
            <span>UPTIME: {uptimeStr}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
