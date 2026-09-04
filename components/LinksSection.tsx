"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { linksData, LinkItem, profile } from "@/data/content";
import { useCat } from "@/context/CatContext";
import { soundFx } from "@/lib/audio";
import { Terminal, ExternalLink, Activity, CornerDownLeft } from "lucide-react";

export const LinksSection: React.FC = () => {
  const { setMood, showSpeech } = useCat();
  const [activeConnecting, setActiveConnecting] = useState<LinkItem | null>(null);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<
    { command: string; output: React.ReactNode }[]
  >([
    {
      command: "links",
      output: (
        <div className="space-y-1 text-mint/80 font-mono text-xs">
          <p className="text-cyan font-bold">Available destinations:</p>
          <p>[01] email</p>
          <p>[02] linkedin</p>
          <p>[03] github</p>
          <p>[04] orcid</p>
          <p className="text-mint/60 pt-1">Type: <span className="text-amber">open github</span></p>
        </div>
      ),
    },
  ]);

  const lastCatSpeechTime = useRef<number>(0);

  const handleCardHover = (link: LinkItem) => {
    const now = Date.now();
    // Cooldown check (2.5 seconds) so Mochi does not constantly speak on rapid hovers
    if (now - lastCatSpeechTime.current > 2500) {
      lastCatSpeechTime.current = now;
      if (link.id === "email" || link.id === "github") {
        setMood("excited");
      } else if (link.id === "linkedin") {
        setMood("happy");
      } else if (link.id === "orcid") {
        setMood("curious");
      }
      showSpeech(link.catSpeech, 3000);
    }
  };

  const handleLinkOpen = (link: LinkItem) => {
    soundFx.playSuccess();
    setActiveConnecting(link);

    setTimeout(() => {
      setActiveConnecting(null);
      if (link.url.startsWith("mailto:")) {
        window.location.href = link.url;
      } else {
        window.open(link.url, "_blank", "noopener,noreferrer");
      }
    }, 1200);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    soundFx.playKeypress();
    const lower = cmd.toLowerCase();
    let response: React.ReactNode = null;

    if (lower === "links") {
      response = (
        <div className="space-y-1 text-mint/80 font-mono text-xs">
          <p className="text-cyan font-bold">Available destinations:</p>
          <p>[01] email</p>
          <p>[02] linkedin</p>
          <p>[03] github</p>
          <p>[04] orcid</p>
        </div>
      );
    } else if (lower.startsWith("open ")) {
      const destId = lower.replace("open ", "").trim();
      const match = linksData.find((l) => l.id === destId || l.command.toLowerCase() === destId);
      if (match) {
        response = <p className="text-mint font-mono text-xs">&gt; Connecting to {match.command}...</p>;
        handleLinkOpen(match);
      } else {
        setMood("confused");
        showSpeech("> destination not found.", 2500);
        response = (
          <div className="text-magenta font-mono text-xs space-y-1">
            <p>&gt; destination not found.</p>
            <p className="text-mint/70">Available: email, linkedin, github, orcid</p>
          </div>
        );
      }
    } else {
      setMood("confused");
      showSpeech("> destination not found.", 2500);
      response = (
        <div className="text-magenta font-mono text-xs space-y-1">
          <p>&gt; destination not found.</p>
          <p className="text-mint/70">Available: email, linkedin, github, orcid</p>
        </div>
      );
    }

    setTerminalHistory((prev) => [...prev, { command: cmd, output: response }]);
    setTerminalInput("");
  };

  return (
    <section id="links" className="space-y-8 scroll-mt-20">
      {/* Connecting UI Transition Modal */}
      <AnimatePresence>
        {activeConnecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 font-mono select-none"
          >
            <div className="bg-surface border-2 border-mint p-6 rounded max-w-md w-full space-y-4 shadow-[0_0_30px_rgba(57,255,136,0.4)]">
              <div className="flex items-center gap-2 text-xs text-mint/70 border-b border-mint/30 pb-2">
                <Terminal className="w-4 h-4 text-mint animate-pulse" />
                <span>guest@{profile.handle}-os:~$ open {activeConnecting.id}</span>
              </div>
              <div className="space-y-2">
                <p className="text-mint font-bold text-sm">Connecting...</p>
                <div className="w-full bg-black h-3 border border-mint/40 rounded overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="bg-mint h-full rounded-xs"
                  />
                </div>
                <p className="text-xs text-cyan animate-pulse pt-1">
                  [ CONNECTION ESTABLISHED ]
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heading */}
      <div className="border-b border-mint/30 pb-3 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-mint flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber" />
          <span>~/links</span>
        </h2>
        <span className="text-xs text-amber font-mono">// 05 LINKS_</span>
      </div>

      {/* Terminal Command Header */}
      <div className="border border-mint/30 bg-black/80 p-3 rounded-xs font-mono text-xs text-mint flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-cyan font-bold">guest@{profile.handle}-os:~$</span>
          <span>ls -la ~/links</span>
        </div>
        <span className="text-mint/40 text-[11px] hidden sm:inline">[4 DESTINATIONS]</span>
      </div>

      {/* Directory Contents Preview */}
      <div className="bg-black/60 border border-mint/20 p-3 rounded-xs font-mono text-xs space-y-1 text-mint/80">
        {linksData.map((link) => (
          <div key={link.id} className="flex items-center gap-4">
            <span className="text-mint/40 text-[11px]">-rw</span>
            <span className="text-cyan font-bold">{link.command}</span>
          </div>
        ))}
      </div>

      {/* Four Link Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {linksData.map((link) => (
          <div
            key={link.id}
            onMouseEnter={() => handleCardHover(link)}
            onClick={() => handleLinkOpen(link)}
            className="group cursor-pointer border border-mint/40 bg-surface/90 hover:border-mint hover:bg-black p-5 rounded-xs font-mono text-xs transition-all duration-300 shadow-[0_0_12px_rgba(57,255,136,0.06)] hover:shadow-[0_0_22px_rgba(57,255,136,0.25)] flex flex-col justify-between h-44"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-mint/20 pb-2">
              <span className="text-cyan font-bold text-sm group-hover:text-mint transition-colors">
                {link.command}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-mint">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                [●]
              </span>
            </div>

            {/* Content */}
            <div className="space-y-1 py-2">
              <h3 className="text-sm font-bold text-white group-hover:text-mint transition-colors">
                {link.title}
              </h3>
              <p className="text-terminal-bright/80 font-sans text-xs">
                {link.description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-mint/20 text-[11px]">
              <span className="text-mint/70 font-semibold">
                STATUS: <span className="text-mint font-bold">{link.status}</span>
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLinkOpen(link);
                }}
                className="px-2.5 py-1 bg-mint/10 border border-mint/40 text-mint group-hover:bg-mint group-hover:text-black font-bold transition-all rounded-xs flex items-center gap-1"
              >
                <span>[ OPEN → ]</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Link Terminal Component */}
      <div className="border border-mint/40 bg-surface/95 rounded-xs font-mono text-xs shadow-[0_0_15px_rgba(57,255,136,0.1)] overflow-hidden">
        <div className="bg-black/90 border-b border-mint/30 px-4 py-2 flex items-center justify-between text-mint text-xs select-none">
          <div className="flex items-center gap-2 font-bold">
            <Terminal className="w-3.5 h-3.5 text-mint" />
            <span>GUEST@{profile.handle.toUpperCase()} // LINK TERMINAL</span>
          </div>
          <span className="text-[10px] text-mint/50">INTERACTIVE_DESTINATIONS</span>
        </div>

        <div className="p-4 space-y-3 bg-black/80 max-h-48 overflow-y-auto">
          {terminalHistory.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-mint">
                <span className="text-cyan font-bold">guest@{profile.handle}-os:~$</span>
                <span>{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleTerminalSubmit} className="bg-black border-t border-mint/30 px-4 py-2 flex items-center gap-2">
          <span className="text-cyan font-bold shrink-0">guest@{profile.handle}-os:~$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="type 'links' or 'open github'..."
            className="w-full bg-transparent text-mint outline-none font-mono placeholder:text-mint/30 text-xs"
          />
          <button type="submit" className="text-mint/70 hover:text-mint p-1">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Digital Identity Status Panel */}
      <div className="border border-mint/40 bg-surface/90 p-5 rounded-xs font-mono text-xs max-w-xl mx-auto shadow-[0_0_15px_rgba(57,255,136,0.08)]">
        <div className="flex items-center gap-2 border-b border-mint/20 pb-2 mb-3 text-mint font-bold">
          <Activity className="w-4 h-4 text-mint animate-pulse" />
          <span>DIGITAL IDENTITY STATUS</span>
        </div>

        <div className="space-y-2">
          {linksData.map((link) => (
            <div key={link.id} className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-mint/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                [{link.command.toUpperCase()}] {link.title.toUpperCase()}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-mint/10 border border-mint/30 text-mint font-bold">
                {link.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
