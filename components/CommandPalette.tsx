"use client";

import React, { useEffect } from "react";
import { Command } from "cmdk";
import { useCat } from "@/context/CatContext";
import { soundFx } from "@/lib/audio";
import { Terminal, User, Code, Briefcase, Mail, Coffee, Sparkles, Sliders, FileText, Lock, ShieldCheck } from "lucide-react";

interface CommandPaletteProps {
  onRunCommand?: (cmd: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onRunCommand }) => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setMood,
    showSpeech,
    setSunglassesMode,
    setCoffeeMode,
    triggerMatrix,
    toggleSound,
    toggleCRT,
    setIsFollowing,
    unlockSecret,
  } = useCat();

  // Keyboard shortcut Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        soundFx.playKeypress();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const execute = (cmd: string, action?: () => void) => {
    soundFx.playKeypress();
    setCommandPaletteOpen(false);

    if (action) {
      action();
    } else if (onRunCommand) {
      onRunCommand(cmd);
    }

    // Command specific cat reactions
    if (cmd === "sudo hire-me") {
      setSunglassesMode(true);
      setMood("proud");
      showSpeech("ROOT HIRING PERMISSIONS GRANTED! 😎", 4500);
      unlockSecret("sudo_hire_me");
    } else if (cmd === "pet") {
      setMood("happy");
      showSpeech("Purrrrr... thanks for petting me! 🐾", 3000);
      unlockSecret("petting");
    } else if (cmd === "meow") {
      setMood("happy");
      showSpeech("meow meow 🐱", 3000);
      unlockSecret("meow");
    } else if (cmd === "coffee") {
      setCoffeeMode(true);
      setMood("excited");
      showSpeech("Coffee injected into system! ☕", 3500);
      unlockSecret("coffee");
    } else if (cmd === "matrix") {
      triggerMatrix();
    } else if (cmd === "whoami") {
      unlockSecret("whoami");
    } else if (cmd === "secrets") {
      unlockSecret("secrets_run");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 p-4 font-mono select-none">
      <div className="relative w-full max-w-xl bg-surface border border-mint/60 rounded-md shadow-[0_0_30px_rgba(57,255,136,0.3)] overflow-hidden">
        {/* Cmdk Header */}
        <div className="flex items-center justify-between border-b border-mint/30 px-3 py-2 text-xs text-mint/60 bg-black/50">
          <span>SANK-OS // COMMAND PALETTE</span>
          <span>ESC to close</span>
        </div>

        <Command label="System Command Palette" className="w-full bg-transparent text-mint">
          <div className="flex items-center border-b border-mint/20 px-3 py-2 gap-2">
            <Terminal className="w-4 h-4 text-mint/70" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search section..."
              className="w-full bg-transparent text-sm text-mint outline-none placeholder:text-mint/40 font-mono"
            />
          </div>

          <Command.List className="max-h-72 overflow-y-auto p-2 space-y-1 text-xs">
            <Command.Empty className="p-4 text-center text-mint/40 italic">
              No matching commands found.
            </Command.Empty>

            <Command.Group heading="NAVIGATION" className="text-[10px] text-mint/50 px-2 py-1 font-bold">
              <Command.Item
                onSelect={() => execute("about", () => scrollToSection("about"))}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>about</span>
                <span className="ml-auto text-[10px] opacity-60">Go to About section</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("skills", () => scrollToSection("skills"))}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <Code className="w-3.5 h-3.5" />
                <span>skills</span>
                <span className="ml-auto text-[10px] opacity-60">Go to Tech Stack</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("projects", () => scrollToSection("projects"))}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>projects</span>
                <span className="ml-auto text-[10px] opacity-60">View Projects</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("experience", () => scrollToSection("experience"))}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>experience</span>
                <span className="ml-auto text-[10px] opacity-60">Git Timeline</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("links", () => scrollToSection("links"))}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>links</span>
                <span className="ml-auto text-[10px] opacity-60">Go to Links section</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("contact", () => scrollToSection("contact"))}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>contact</span>
                <span className="ml-auto text-[10px] opacity-60">Get in Touch</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="DIGITAL IDENTITY LINKS" className="text-[10px] text-amber/80 px-2 py-1 font-bold">
              <Command.Item
                onSelect={() => execute("Open Links", () => scrollToSection("links"))}
                className="flex items-center gap-2 p-2 rounded hover:bg-amber hover:text-black cursor-pointer transition-colors"
              >
                <span>Open Links</span>
                <span className="ml-auto text-[10px] opacity-60">~/links section</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("Open Email", () => window.location.href = "mailto:shashanksuman0327@gmail.com")}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <span>Open Email</span>
                <span className="ml-auto text-[10px] opacity-60">./email</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("Open LinkedIn", () => window.open("https://www.linkedin.com/in/shashanksuman03/", "_blank"))}
                className="flex items-center gap-2 p-2 rounded hover:bg-cyan hover:text-black cursor-pointer transition-colors"
              >
                <span>Open LinkedIn</span>
                <span className="ml-auto text-[10px] opacity-60">./linkedin</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("Open GitHub", () => window.open("https://github.com/shashanksuman0327-eng", "_blank"))}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <span>Open GitHub</span>
                <span className="ml-auto text-[10px] opacity-60">./github</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("Open ORCID", () => window.open("https://orcid.org/0009-0004-9893-4238", "_blank"))}
                className="flex items-center gap-2 p-2 rounded hover:bg-amber hover:text-black cursor-pointer transition-colors"
              >
                <span>Open ORCID</span>
                <span className="ml-auto text-[10px] opacity-60">./orcid</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="SYSTEM ACTIONS" className="text-[10px] text-cyan/70 px-2 py-1 font-bold">
              <Command.Item
                onSelect={() => execute("sudo hire-me")}
                className="flex items-center gap-2 p-2 rounded text-cyan hover:bg-cyan hover:text-black cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>sudo hire-me</span>
                <span className="ml-auto text-[10px] opacity-60">Root recruitment</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("whoami")}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>whoami</span>
                <span className="ml-auto text-[10px] opacity-60">Query user bio</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("resume")}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>resume</span>
                <span className="ml-auto text-[10px] opacity-60">Download CV</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="PET & EASTER EGGS" className="text-[10px] text-magenta/80 px-2 py-1 font-bold">
              <Command.Item
                onSelect={() => execute("pet")}
                className="flex items-center gap-2 p-2 rounded text-magenta hover:bg-magenta hover:text-white cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>pet</span>
                <span className="ml-auto text-[10px] opacity-60">Pet Mochi</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("meow")}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <span>meow</span>
                <span className="ml-auto text-[10px] opacity-60">Cat response</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("coffee")}
                className="flex items-center gap-2 p-2 rounded text-amber hover:bg-amber hover:text-black cursor-pointer transition-colors"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>coffee</span>
                <span className="ml-auto text-[10px] opacity-60">Serve coffee to Mochi</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("matrix")}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <span>matrix</span>
                <span className="ml-auto text-[10px] opacity-60">Digital Rain Mode</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("follow", () => setIsFollowing(true))}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <span>follow</span>
                <span className="ml-auto text-[10px] opacity-60">Cat cursor follow mode</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("secrets")}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>secrets</span>
                <span className="ml-auto text-[10px] opacity-60">View easter egg progress</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="PREFERENCES" className="text-[10px] text-amber/70 px-2 py-1 font-bold">
              <Command.Item
                onSelect={() => execute("sound", toggleSound)}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>toggle sound</span>
              </Command.Item>
              <Command.Item
                onSelect={() => execute("crt", toggleCRT)}
                className="flex items-center gap-2 p-2 rounded hover:bg-mint hover:text-black cursor-pointer transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>toggle CRT mode</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
};
