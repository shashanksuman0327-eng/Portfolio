"use client";

import React from "react";
import { experienceData } from "@/data/content";
import { useCat } from "@/context/CatContext";
import { soundFx } from "@/lib/audio";
import { GitCommit, MapPin, Calendar, Briefcase } from "lucide-react";

export const Timeline: React.FC = () => {
  const { setMood, showSpeech } = useCat();

  const handleMilestoneHover = (company: string) => {
    setMood("happy");
    showSpeech(`> git log: ${company} milestone! 🐾`, 2500);
    soundFx.playKeypress();
  };

  return (
    <div className="space-y-6 font-mono text-xs max-w-4xl mx-auto">
      {/* Git Log Header */}
      <div className="border-b border-mint/30 pb-2 text-[11px] text-mint/60 flex items-center justify-between">
        <span>$ git log --graph --oneline --decorate</span>
        <span>branch: main</span>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-mint before:via-cyan before:to-mint/20">
        {experienceData.map((item, idx) => (
          <div
            key={item.id}
            onMouseEnter={() => handleMilestoneHover(item.company)}
            className="relative group bg-surface/80 border border-mint/30 hover:border-mint p-5 rounded-xs transition-all shadow-[0_0_10px_rgba(57,255,136,0.05)] hover:shadow-[0_0_18px_rgba(57,255,136,0.2)]"
          >
            {/* Git Commit Node Circle */}
            <div className="absolute -left-[31px] top-5 w-4 h-4 rounded-full bg-black border-2 border-mint flex items-center justify-center group-hover:scale-125 group-hover:bg-mint transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-mint group-hover:bg-black" />
            </div>

            {/* Commit Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-mint/20 pb-2 mb-3">
              <div className="flex items-center gap-2 text-cyan font-bold">
                <GitCommit className="w-3.5 h-3.5" />
                <span>commit {item.commitHash}</span>
                <span className="text-mint/40">({item.date})</span>
              </div>
              <div className="flex items-center gap-2 text-mint/70 text-[11px]">
                <MapPin className="w-3 h-3 text-amber" />
                <span>{item.location}</span>
              </div>
            </div>

            {/* Title & Company */}
            <div className="mb-3">
              <h3 className="text-sm font-bold text-mint flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-mint" />
                {item.role} <span className="text-cyan">@ {item.company}</span>
              </h3>
            </div>

            {/* Description Bullet points */}
            <ul className="space-y-1.5 mb-4 text-terminal-bright/80 font-sans text-xs">
              {item.description.map((desc, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2">
                  <span className="text-mint font-mono text-[10px] mt-0.5">&gt;</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-mint/10">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] bg-black border border-mint/30 text-mint/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
