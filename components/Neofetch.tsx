"use client";

import React, { useState, useEffect } from "react";
import { profile, pet, projectsData, skillsData } from "@/data/content";
import { GithubContributionCount } from "@/components/GithubContributionCount";

export const Neofetch: React.FC = () => {
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="border border-mint/40 bg-black/90 p-4 md:p-6 rounded-xs font-mono text-xs md:text-sm text-mint shadow-[0_0_15px_rgba(57,255,136,0.15)] max-w-2xl w-full">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-mint/20 pb-2 mb-4 text-[10px] text-mint/60">
        <span>neofetch --sysinfo</span>
        <span>guest@{profile.handle}-os</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* ASCII Mascot Left Column */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-mint/20 pb-3 sm:pb-0 sm:pr-4 text-center">
          <pre className="text-mint text-[11px] leading-tight select-none drop-shadow-[0_0_6px_rgba(57,255,136,0.4)]">
{`
       /\\_/\\
      ( o.o )
       > ^ <
  [MOCHI // OK]
`}
          </pre>
          <span className="text-[10px] text-mint/60 mt-2">SANK-OS System Fetch</span>
        </div>

        {/* System Details Right Column */}
        <div className="sm:col-span-7 space-y-1.5 font-mono text-xs">
          <div className="text-cyan font-bold border-b border-mint/20 pb-1">
            {profile.handle}@{profile.handle}-os
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 text-mint/70 font-semibold">OS:</span>
            <span className="col-span-8 text-terminal-bright">{profile.osVersion}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 text-mint/70 font-semibold">Role:</span>
            <span className="col-span-8 text-terminal-bright">{profile.title}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 text-mint/70 font-semibold">Location:</span>
            <span className="col-span-8 text-terminal-bright">{profile.location}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 text-mint/70 font-semibold">Projects:</span>
            <span className="col-span-8 text-amber font-bold">{projectsData.length} Active Repos</span>
          </div>
          <GithubContributionCount />
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 text-mint/70 font-semibold">Languages:</span>
            <span className="col-span-8 text-terminal-bright">{skillsData.languages.skills.length} Core</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 text-mint/70 font-semibold">Coffee:</span>
            <span className="col-span-8 text-magenta">∞ Cups / Day</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 text-mint/70 font-semibold">Mascot:</span>
            <span className="col-span-8 text-mint font-bold">{pet.name} ({pet.version})</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 text-mint/70 font-semibold">Uptime:</span>
            <span className="col-span-8 text-cyan">{formatUptime(uptimeSeconds)}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4 text-mint/70 font-semibold">Status:</span>
            <span className="col-span-8 text-mint font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              ONLINE & RECRUITING
            </span>
          </div>

          {/* Terminal Color Palette Test Blocks */}
          <div className="pt-2 flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-black border border-mint/40" />
            <span className="w-3.5 h-3.5 bg-mint" />
            <span className="w-3.5 h-3.5 bg-cyan" />
            <span className="w-3.5 h-3.5 bg-amber" />
            <span className="w-3.5 h-3.5 bg-magenta" />
            <span className="w-3.5 h-3.5 bg-electric-blue" />
            <span className="w-3.5 h-3.5 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
