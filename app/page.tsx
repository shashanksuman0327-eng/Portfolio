"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, pet, skillsData, projectsData, linksData } from "@/data/content";
import { useCat } from "@/context/CatContext";
import { soundFx } from "@/lib/audio";

import { TerminalNav } from "@/components/TerminalNav";
import { BootSequence } from "@/components/BootSequence";
import { CRTOverlay } from "@/components/CRTOverlay";
import { Cursor } from "@/components/Cursor";
import { PetMascot } from "@/components/PetMascot";
import { CommandPalette } from "@/components/CommandPalette";
import { SecretManager } from "@/components/SecretManager";
import { Shell } from "@/components/Shell";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { LinksSection } from "@/components/LinksSection";
import { Neofetch } from "@/components/Neofetch";
import { SystemStatus } from "@/components/SystemStatus";

import {
  Terminal as TerminalIcon,
  Code,
  Briefcase,
  Mail,
  FileText,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Send,
} from "lucide-react";

export default function Home() {
  const [booting, setBooting] = useState(true);
  const { setMood, showSpeech, unlockSecret, setPosition } = useCat();

  const resetScrollToTop = () => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  useLayoutEffect(() => {
    resetScrollToTop();
  }, []);

  useEffect(() => {
    if (!booting) {
      resetScrollToTop();
    }
  }, [booting]);

  // Scroll section tracking for Cat behavior
  useEffect(() => {
    if (booting) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);

      // Speed scroll secret check
      if (scrollDiff > 800) {
        unlockSecret("speed_scroll");
      }
      lastScrollY = currentScrollY;

      // Section boundary position detection
      const sections = ["hero", "about", "skills", "shell-section", "projects", "experience", "links", "contact", "footer"];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setPosition(sec as any);
            if (sec === "contact") {
              setMood("excited");
            } else if (sec === "footer") {
              unlockSecret("footer_goodbye");
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [booting, setMood, setPosition, unlockSecret]);

  const scrollTo = (id: string) => {
    soundFx.playKeypress();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    setMood("excited");
    showSpeech("> message.exe launched! Mochi will deliver your note! 💌", 4500);
    window.location.href = `mailto:${profile.email}?subject=Portfolio Contact from SANK-OS`;
  };

  return (
    <main className="relative min-h-screen bg-background text-mint font-mono selection:bg-mint selection:text-black">
      {/* Boot Sequence Overlay */}
      <AnimatePresence>
        {booting && <BootSequence onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      {!booting && (
        <>
          {/* CRT Monitor Effects */}
          <CRTOverlay />

          {/* Desktop Custom Particle Cursor */}
          <Cursor />

          {/* Sticky OS Header Navigation */}
          <TerminalNav />

          {/* Secret Discovery Toast Notifications */}
          <SecretManager />

          {/* Global Cmdk Command Palette */}
          <CommandPalette />

          {/* Persistent Cyber Cat Mascot Companion */}
          <PetMascot />

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-24 md:space-y-32">
            {/* HERO SECTION */}
            <section id="hero" className="min-h-[85vh] flex flex-col justify-center pt-8 space-y-12">
              <div className="space-y-6 max-w-4xl">
                {/* Intro Line */}
                <div className="flex items-center gap-2 text-xs md:text-sm text-cyan font-bold">
                  <span className="text-mint font-mono">&gt;</span>
                  <span>Hello, world.</span>
                  <span className="px-2 py-0.5 rounded border border-mint/40 bg-mint/10 text-mint text-[11px]">
                    [OS: ONLINE]
                  </span>
                </div>

                {/* Glitch Name Typography */}
                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white font-mono">
                  <span className="glitch-text" data-text={profile.name}>
                    {profile.name}
                  </span>
                </h1>

                {/* Tagline */}
                <p className="text-lg md:text-2xl text-mint/90 font-medium leading-relaxed">
                  &gt; {profile.bio}
                </p>

                {/* Skill Hashtags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {profile.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded border border-mint/30 bg-black/60 text-mint/80 font-mono hover:border-mint hover:text-mint transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => scrollTo("projects")}
                    className="px-6 py-3 bg-mint text-black font-bold text-xs md:text-sm border-2 border-mint hover:bg-black hover:text-mint transition-all shadow-[0_0_20px_rgba(57,255,136,0.5)] rounded-xs flex items-center gap-2"
                  >
                    <span>[[ VIEW PROJECTS ]]</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-6 py-3 bg-black text-cyan border border-cyan/60 hover:bg-cyan/10 text-xs md:text-sm font-bold transition-all rounded-xs flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-cyan" />
                    <span>[[ GET IN TOUCH ]]</span>
                  </button>

                  <a
                    href={`mailto:${profile.email}`}
                    className="px-4 py-3 text-xs text-mint/70 hover:text-mint underline flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>resume.pdf</span>
                  </a>
                </div>
              </div>

              {/* Neofetch System Information Card */}
              <div className="pt-6">
                <Neofetch />
              </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="space-y-8 scroll-mt-20">
              <div className="border-b border-mint/30 pb-3 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-mint flex items-center gap-2">
                  <TerminalIcon className="w-5 h-5 text-mint" />
                  <span>~/about</span>
                </h2>
                <span className="text-xs text-mint/50">// SYSTEM_BIOGRAPHY</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4 text-terminal-bright font-sans leading-relaxed text-sm md:text-base border-l-2 border-mint/60 pl-6 py-2">
                  <p>{profile.bio}</p>
                  <p>
                    Dedicated Indian Railways enthusiast with a deep appreciation for locomotive technology, transportation networks,
                    and the engineering behind one of the world's largest rail systems. This inspires me to explore how data science
                    and AI can drive smarter transportation — from predictive maintenance to logistics optimization and next-gen
                    mobility solutions.
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <SystemStatus />
                </div>
              </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="space-y-8 scroll-mt-20">
              <div className="border-b border-mint/30 pb-3 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-mint flex items-center gap-2">
                  <Code className="w-5 h-5 text-cyan" />
                  <span>~/skills</span>
                </h2>
                <span className="text-xs text-mint/50">// TECH_MATRIX</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(skillsData).map(([key, category]) => (
                  <div
                    key={key}
                    onMouseEnter={() => {
                      setMood("curious");
                      showSpeech(`> analyzing ${category.title} matrix...`, 2000);
                    }}
                    className="border border-mint/40 bg-surface/90 p-5 rounded-xs space-y-4 hover:border-mint transition-colors shadow-[0_0_12px_rgba(57,255,136,0.06)]"
                  >
                    <div className="flex items-center justify-between border-b border-mint/20 pb-2">
                      <h3 className="text-xs font-bold text-cyan tracking-wider">
                        +--- {category.title} -------------------+
                      </h3>
                      <span className="text-[10px] text-mint/50">[{category.skills.length} MODULES]</span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-terminal-bright">
                            <span>{skill.name}</span>
                            <span className="text-mint/70">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-black h-2 rounded overflow-hidden border border-mint/20">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="bg-gradient-to-r from-mint via-cyan to-mint h-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERACTIVE SHELL SECTION */}
            <section id="shell-section" className="space-y-8 scroll-mt-20">
              <div className="border-b border-mint/30 pb-3 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-mint flex items-center gap-2">
                  <TerminalIcon className="w-5 h-5 text-amber" />
                  <span>~/interactive-shell</span>
                </h2>
                <span className="text-xs text-amber font-mono animate-pulse">// LIVE_CLI_ENVIRONMENT</span>
              </div>

              <Shell />
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="space-y-8 scroll-mt-20">
              <div className="border-b border-mint/30 pb-3 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-mint flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-magenta" />
                  <span>~/projects</span>
                </h2>
                <span className="text-xs text-mint/50">// FEATURED_BUILDS ({projectsData.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            {/* EXPERIENCE TIMELINE SECTION */}
            <section id="experience" className="space-y-8 scroll-mt-20">
              <div className="border-b border-mint/30 pb-3 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-mint flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan" />
                  <span>~/experience</span>
                </h2>
                <span className="text-xs text-mint/50">// GIT_COMMIT_HISTORY</span>
              </div>

              <Timeline />
            </section>

            {/* LINKS SECTION */}
            <LinksSection />

            {/* CONTACT SECTION */}
            <section id="contact" className="space-y-8 scroll-mt-20 max-w-3xl mx-auto">
              <div className="border-b border-mint/30 pb-3 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-mint flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber" />
                  <span>~/contact</span>
                </h2>
                <span className="text-xs text-amber animate-pulse">// INITIATE_COMMUNICATION</span>
              </div>

              <div className="border border-mint/40 bg-surface/95 p-6 md:p-8 rounded-xs shadow-[0_0_25px_rgba(57,255,136,0.15)] space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-mint">Send a Message via SANK-OS</h3>
                  <p className="text-xs text-terminal-bright/80 font-sans">
                    Have an exciting project, recruitment opportunity, or rail engineering question? Launch message.exe below or reach out directly.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-mint/70 mb-1">&gt; Your Email Address:</label>
                    <input
                      required
                      type="email"
                      placeholder="visitor@domain.com"
                      className="w-full bg-black border border-mint/40 p-2.5 text-mint outline-none focus:border-mint rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-mint/70 mb-1">&gt; Message Body:</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      className="w-full bg-black border border-mint/40 p-2.5 text-mint outline-none focus:border-mint rounded-xs font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-mint text-black font-bold font-mono text-sm border border-mint hover:bg-black hover:text-mint transition-all shadow-[0_0_15px_rgba(57,255,136,0.4)] flex items-center justify-center gap-2 rounded-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>[[ TRANSMIT MESSAGE.EXE ]]</span>
                  </button>
                </form>

                {/* Direct Links — only the 4 canonical destinations */}
                <div className="pt-4 border-t border-mint/20 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-mint/70">
                  {linksData.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="hover:text-mint hover:underline transition-colors flex items-center gap-1"
                    >
                      <span className="text-mint/40">[</span>
                      <span>{link.title}</span>
                      <span className="text-mint/40">]</span>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* FOOTER & SYSTEM SHUTDOWN PANEL */}
          <footer id="footer" className="mt-32 border-t border-mint/30 bg-black/95 py-12 px-4 font-mono text-xs text-center select-none">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="border border-mint/40 bg-surface/80 p-6 rounded-xs space-y-4 shadow-[0_0_20px_rgba(57,255,136,0.1)]">
                <p className="text-cyan font-bold text-sm tracking-widest">+--- SYSTEM SHUTDOWN? -------------------+</p>
                <p className="text-terminal-bright text-xs">not really. connection kept alive...</p>

                <pre className="text-mint text-[11px] leading-tight select-none py-2">
                  {`
       /\\_/\\
      ( o.o )
       > ^ <   [MOCHI // ONLINE]
`}
                </pre>

                <div className="text-mint/80 text-xs space-y-1">
                  <p>&gt; hey...</p>
                  <p>&gt; thanks for visiting SANK-OS.</p>
                  <p>&gt; come back anytime. 🐾</p>
                </div>
              </div>

              <div className="text-[11px] text-mint/50 flex flex-col md:flex-row items-center justify-between gap-2 border-t border-mint/10 pt-4">
                <span>guest@sank-os:~$ exit</span>
                <span>Built with Next.js 14 • Framer Motion • cmdk • Tailwind CSS</span>
                <span>© {new Date().getFullYear()} {profile.name}</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
