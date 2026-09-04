"use client";

import React, { useRef } from "react";
import { Project } from "@/data/content";
import { useCat } from "@/context/CatContext";
import { soundFx } from "@/lib/audio";
import { ExternalLink, Github, Star, ShieldCheck } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onInspect?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onInspect }) => {
  const { setMood, showSpeech, unlockSecret } = useCat();
  const hoverCountRef = useRef(0);

  const handleMouseEnter = () => {
    setMood("curious");
    showSpeech(`> inspecting ${project.name}... 🔍`, 2500);
    hoverCountRef.current += 1;
    if (hoverCountRef.current >= 3) {
      unlockSecret("project_inspect");
    }
    if (onInspect) onInspect();
  };

  const handleMouseLeave = () => {
    setMood("idle");
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    soundFx.playSuccess();
    setMood("excited");
    showSpeech("> excellent choice! 🐾✨", 3500);
    unlockSecret("project_approve");
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative border border-mint/40 bg-surface/90 hover:border-mint hover:bg-black p-5 rounded-xs font-mono text-xs transition-all duration-300 shadow-[0_0_10px_rgba(57,255,136,0.08)] hover:shadow-[0_0_20px_rgba(57,255,136,0.25)] flex flex-col justify-between"
    >
      {/* Top Header ASCII Border */}
      <div>
        <div className="flex items-center justify-between text-[11px] text-mint/60 border-b border-mint/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-mint font-bold text-sm group-hover:text-cyan transition-colors">
              +-- {project.name}
            </span>
            <span className="text-mint/40">[{project.commitHash}]</span>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-mint/30 bg-mint/10 text-mint">
            [{project.status}]
          </span>
        </div>

        {/* Tagline & Description */}
        <h4 className="text-sm font-bold text-mint mb-1.5">{project.tagline}</h4>
        <p className="text-terminal-bright/80 leading-relaxed mb-4 text-xs font-sans">
          {project.description}
        </p>
      </div>

      {/* Footer Tech Stack & Links */}
      <div className="space-y-3 pt-3 border-t border-mint/20">
        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] bg-black border border-mint/30 text-mint/80 group-hover:border-mint/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex items-center gap-1 text-mint/70 hover:text-mint hover:underline transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>source</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex items-center gap-1 text-cyan hover:text-cyan/80 font-bold hover:underline transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>live demo -&gt;</span>
              </a>
            )}
          </div>

          {project.stars && (
            <span className="flex items-center gap-1 text-amber text-[11px]">
              <Star className="w-3 h-3 fill-amber" />
              <span>{project.stars}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
