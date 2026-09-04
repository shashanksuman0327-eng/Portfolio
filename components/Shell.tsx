"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCat } from "@/context/CatContext";
import { profile, projectsData, skillsData, experienceData } from "@/data/content";
import { soundFx } from "@/lib/audio";
import { Terminal, CornerDownLeft, Sparkles } from "lucide-react";

interface HistoryItem {
  id: number;
  command: string;
  output: React.ReactNode;
}

const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "links",
  "open email",
  "open linkedin",
  "open github",
  "open orcid",
  "contact",
  "whoami",
  "sudo hire-me",
  "pet",
  "meow",
  "coffee",
  "matrix",
  "follow",
  "unfollow",
  "sleep",
  "wake",
  "cat /dev/random",
  "camera",
  "neofetch",
  "secrets",
  "resume",
  "clear",
];

export const Shell: React.FC = () => {
  const {
    setMood,
    showSpeech,
    setSunglassesMode,
    setCoffeeMode,
    triggerMatrix,
    setIsFollowing,
    setIsSleeping,
    unlockSecret,
    discoveredSecrets,
    totalSecretsCount,
  } = useCat();

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 1,
      command: "welcome",
      output: (
        <div className="space-y-1 text-mint/80">
          <p>Welcome to SANK-OS interactive CLI shell! 🐾</p>
          <p>
            Type <span className="text-amber font-bold font-mono">"help"</span> to view available commands, or click any suggested pill below.
          </p>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const processCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    soundFx.playKeypress();
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();
    let response: React.ReactNode = null;

    if (lower === "clear") {
      setHistory([]);
      setInput("");
      unlockSecret("clear");
      return;
    }

    if (lower === "help") {
      setMood("happy");
      showSpeech("Need guidance? Here are all shell commands! 🐾", 4000);
      unlockSecret("help");
      response = (
        <div className="space-y-2 text-xs">
          <p className="text-cyan font-bold">AVAILABLE SHELL COMMANDS:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-mint/90 font-mono">
            {AVAILABLE_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => processCommand(cmd)}
                className="text-left hover:text-amber hover:underline transition-colors"
              >
                &gt; {cmd}
              </button>
            ))}
          </div>
          <p className="text-mint/60 text-[11px] pt-1">
            Tip: Press UP/DOWN arrows for history, TAB for autocomplete.
          </p>
        </div>
      );
    } else if (lower === "about") {
      setMood("happy");
      showSpeech("> bio loaded successfully!", 3000);
      response = (
        <div className="space-y-1.5 text-xs text-mint/90">
          <p className="font-bold text-mint text-sm">{profile.name} — {profile.title}</p>
          <p className="text-terminal-bright">{profile.bio}</p>
          <p className="text-cyan">📍 Location: {profile.location}</p>
          <p className="text-amber">📧 Email: {profile.email}</p>
        </div>
      );
    } else if (lower === "skills") {
      setMood("curious");
      showSpeech("> inspecting tech stack...", 3000);
      response = (
        <div className="space-y-3 text-xs">
          {Object.entries(skillsData).map(([key, cat]) => (
            <div key={key} className="space-y-1">
              <span className="text-cyan font-bold text-[11px]">{cat.title}:</span>
              <div className="flex flex-wrap gap-2 text-mint/80">
                {cat.skills.map((s) => (
                  <span key={s.name} className="px-2 py-0.5 rounded bg-mint/10 border border-mint/30">
                    {s.name} ({s.level}%)
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (lower === "projects") {
      setMood("excited");
      showSpeech("> project list mounted!", 3000);
      response = (
        <div className="space-y-2 text-xs">
          <p className="text-cyan font-bold">FEATURED PROJECTS:</p>
          {projectsData.map((p) => (
            <div key={p.id} className="border-l-2 border-mint pl-3 py-1 space-y-0.5">
              <div className="flex items-center justify-between text-mint font-bold">
                <span>{p.name} [{p.status}]</span>
                <span className="text-mint/40">{p.tags.join(" • ")}</span>
              </div>
              <p className="text-terminal-bright/80">{p.description}</p>
            </div>
          ))}
        </div>
      );
    } else if (lower === "experience") {
      setMood("happy");
      showSpeech("> git timeline log printed!", 3000);
      response = (
        <div className="space-y-2 text-xs">
          <p className="text-cyan font-bold">GIT EXPERIENCE LOG:</p>
          {experienceData.map((exp) => (
            <div key={exp.id} className="flex items-start gap-2 text-mint/80">
              <span className="text-amber font-mono">{exp.commitHash}</span>
              <span>{exp.date}</span>
              <span className="font-bold text-mint">{exp.role} @ {exp.company}</span>
            </div>
          ))}
        </div>
      );
    } else if (lower === "links") {
      setMood("happy");
      showSpeech("> digital identity destinations listed!", 3000);
      response = (
        <div className="space-y-2 text-xs font-mono text-mint/90">
          <p className="text-cyan font-bold">Available destinations:</p>
          <div className="pl-2 space-y-1">
            <p>[01] email</p>
            <p>[02] linkedin</p>
            <p>[03] github</p>
            <p>[04] orcid</p>
          </div>
          <p className="text-mint/60 pt-1">Type: <span className="text-amber">open github</span></p>
        </div>
      );
    } else if (lower.startsWith("open ")) {
      const dest = lower.replace("open ", "").trim();
      if (dest === "email") {
        setMood("excited");
        showSpeech("> communication channel detected.", 3500);
        window.location.href = "mailto:shashanksuman0327@gmail.com";
        response = <p className="text-mint text-xs font-mono">&gt; Launching mailto:shashanksuman0327@gmail.com...</p>;
      } else if (dest === "linkedin") {
        setMood("happy");
        showSpeech("> professional mode activated.", 3500);
        window.open("https://www.linkedin.com/in/shashanksuman03/", "_blank");
        response = <p className="text-cyan text-xs font-mono">&gt; Opening https://www.linkedin.com/in/shashanksuman03/...</p>;
      } else if (dest === "github") {
        setMood("excited");
        showSpeech("> source code detected. 👀", 3500);
        window.open("https://github.com/shashanksuman0327-eng", "_blank");
        response = <p className="text-mint text-xs font-mono">&gt; Opening https://github.com/shashanksuman0327-eng...</p>;
      } else if (dest === "orcid") {
        setMood("curious");
        showSpeech("> research database detected.", 3500);
        window.open("https://orcid.org/0009-0004-9893-4238", "_blank");
        response = <p className="text-amber text-xs font-mono">&gt; Opening https://orcid.org/0009-0004-9893-4238...</p>;
      } else {
        setMood("confused");
        showSpeech("> destination not found.", 3000);
        response = (
          <div className="text-magenta text-xs font-mono space-y-1">
            <p>&gt; destination not found.</p>
            <p className="text-mint/70">Available: email, linkedin, github, orcid</p>
          </div>
        );
      }
    } else if (lower === "contact") {
      setMood("excited");
      showSpeech("Let's talk! 💌", 4000);
      response = (
        <div className="space-y-1 text-xs text-mint/90">
          <p className="text-cyan font-bold">CONTACT INFORMATION:</p>
          <p>Email: <a href={`mailto:${profile.email}`} className="text-mint underline">{profile.email}</a></p>
          <p>GitHub: <a href={profile.github} target="_blank" className="text-mint underline">{profile.github}</a></p>
          <p>LinkedIn: <a href={profile.linkedin} target="_blank" className="text-mint underline">{profile.linkedin}</a></p>
        </div>
      );
    } else if (lower === "whoami") {
      setMood("happy");
      showSpeech("You are a awesome guest developer!", 3500);
      unlockSecret("whoami");
      response = (
        <div className="text-xs space-y-1 text-mint/90">
          <p className="text-cyan font-bold">USER SESSION PROFILE:</p>
          <p>Identity: Guest Terminal Administrator</p>
          <p>OS Host: {profile.osVersion}</p>
          <p>Access Level: Interactive Explorer</p>
        </div>
      );
    } else if (lower === "sudo hire-me") {
      setSunglassesMode(true);
      setMood("proud");
      showSpeech("ROOT RECRUITMENT PERMISSIONS GRANTED! 😎", 4500);
      unlockSecret("sudo_hire_me");
      response = (
        <div className="p-3 bg-mint/10 border border-mint rounded space-y-1 text-xs text-mint">
          <p className="font-bold text-sm">[ACCESS GRANTED: ROOT RECRUITER]</p>
          <p>Thank you for offering root permissions! Contact: <span className="text-amber font-bold">{profile.email}</span></p>
          <p className="text-[11px] text-mint/70">Mochi is wearing cyber sunglasses in celebration!</p>
        </div>
      );
    } else if (lower === "pet") {
      setMood("happy");
      showSpeech("Purrrrr! Thank you! 🐾", 3000);
      unlockSecret("petting");
      response = <p className="text-magenta font-bold text-xs">&gt; Mochi closed eyes and purred softly. 🐾</p>;
    } else if (lower === "meow") {
      setMood("happy");
      showSpeech("meow meow meow! 🐱", 3000);
      unlockSecret("meow");
      response = <p className="text-mint text-xs">&gt; Mochi: meow meow 🐱</p>;
    } else if (lower === "coffee") {
      setCoffeeMode(true);
      setMood("excited");
      showSpeech("Hot coffee served to Mochi! ☕", 3500);
      unlockSecret("coffee");
      response = <p className="text-amber text-xs">&gt; ☕ Hot coffee delivered! Mochi is overclocked by 200%!</p>;
    } else if (lower === "matrix") {
      triggerMatrix();
      response = <p className="text-mint text-xs animate-pulse">&gt; Decrypting matrix digital rain reality...</p>;
    } else if (lower === "follow") {
      setIsFollowing(true);
      setMood("curious");
      showSpeech("> Following your cursor! 👀", 3500);
      unlockSecret("follow_mode");
      response = <p className="text-cyan text-xs">&gt; Cyber cat cursor tracking mode: ACTIVATED.</p>;
    } else if (lower === "unfollow") {
      setIsFollowing(false);
      setMood("idle");
      showSpeech("> Cursor tracking disabled.", 2500);
      response = <p className="text-mint/60 text-xs">&gt; Follow mode deactivated.</p>;
    } else if (lower === "sleep") {
      setIsSleeping(true);
      setMood("sleeping");
      showSpeech("Zzz... Mochi is taking a nap.", 3000);
      unlockSecret("sleep_command");
      response = <p className="text-cyan text-xs">&gt; Zzz... Cat sleep mode initiated.</p>;
    } else if (lower === "wake") {
      setIsSleeping(false);
      setMood("idle");
      showSpeech("(•ω•) Mochi woke up!", 3000);
      unlockSecret("wake_command");
      response = <p className="text-mint text-xs">&gt; Mochi woke up and stretched!</p>;
    } else if (lower === "cat /dev/random") {
      setMood("surprised");
      const messages = [
        "0xDEADBEEF: Cats run on 95% tuna and 5% cyber entropy.",
        "System error: Too much cuteness detected on line 42.",
        "Fun fact: 9 out of 10 developers prefer cyber cats over doges.",
        "Warning: Typing 'rm -rf /' will terrify Mochi!",
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      showSpeech(`> ${randomMsg}`, 4500);
      unlockSecret("random_cat");
      response = <p className="text-amber font-mono text-xs">&gt; /dev/random: {randomMsg}</p>;
    } else if (lower === "camera") {
      setMood("confused");
      showSpeech("> ERROR: No cat camera detected. Mochi is disappointed.", 4000);
      unlockSecret("camera_mode");
      response = (
        <div className="text-magenta font-mono text-xs space-y-1">
          <p>[CAMERA.EXE ERROR]</p>
          <p>No webcam feed found for cyber cat. Mochi looks disappointed.</p>
        </div>
      );
    } else if (lower === "neofetch") {
      unlockSecret("neofetch_run");
      response = (
        <pre className="text-mint text-[11px] font-mono leading-tight">
{`
       /\\_/\\       guest@suvo-os
      ( o.o )       OS: ${profile.osVersion}
       > ^ <        Role: ${profile.title}
                    Projects: ${projectsData.length}
                    Cat: Mochi (v2.6.1)
`}
        </pre>
      );
    } else if (lower === "secrets") {
      unlockSecret("secrets_run");
      response = (
        <div className="space-y-1 text-xs text-amber font-mono">
          <p className="font-bold">SECRET VAULT STATUS:</p>
          <p>Discovered: [{String(discoveredSecrets.length).padStart(2, "0")}/{String(totalSecretsCount).padStart(2, "0")}] Secrets</p>
          <p className="text-mint/70 text-[11px]">Keep exploring, clicking Mochi, and trying hidden shell commands!</p>
        </div>
      );
    } else if (lower === "resume") {
      unlockSecret("resume_download");
      response = (
        <div className="text-xs text-mint space-y-1">
          <p className="font-bold">&gt; Initiating resume.pdf download sequence...</p>
          <a
            href={`mailto:${profile.email}?subject=Resume Request`}
            className="inline-block text-cyan underline font-bold"
          >
            [ CLICK HERE TO REQUEST CV DIRECTLY VIA EMAIL ]
          </a>
        </div>
      );
    } else if (lower.includes("rm -rf")) {
      soundFx.playError();
      setMood("confused");
      showSpeech("(ಠ_ಠ) DANGER! ACCESS DENIED! Mochi saved the OS!", 4500);
      response = (
        <div className="p-2 border border-magenta bg-magenta/10 text-magenta font-bold text-xs rounded">
          🚨 SECURITY ALERT: Attempted recursive root destruction. Mochi blocked your command!
        </div>
      );
    } else {
      soundFx.playError();
      setMood("confused");
      showSpeech(`(ಠ_ಠ) Command not recognized: "${trimmed}"`, 3000);
      response = (
        <p className="text-magenta text-xs font-mono">
          bash: command not found: {trimmed}. Type <span className="text-amber">"help"</span> for options.
        </p>
      );
    }

    setHistory((prev) => [...prev, { id: Date.now(), command: trimmed, output: response }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(cmdHistory[nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (!input) return;
      const match = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div className="border border-mint/40 bg-surface/95 rounded-xs font-mono text-xs max-w-4xl w-full mx-auto shadow-[0_0_20px_rgba(57,255,136,0.12)] overflow-hidden flex flex-col h-[400px]">
      {/* Shell Title Bar */}
      <div className="bg-black/90 border-b border-mint/30 px-4 py-2 flex items-center justify-between text-mint text-xs select-none">
        <div className="flex items-center gap-2 font-bold">
          <Terminal className="w-3.5 h-3.5 text-mint" />
          <span>GUEST@SANK-OS // SHELL v2.6.1</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-mint/50">
          <span className="w-2 h-2 rounded-full bg-mint/40" />
          <span className="w-2 h-2 rounded-full bg-amber/40" />
          <span className="w-2 h-2 rounded-full bg-magenta/40" />
        </div>
      </div>

      {/* Terminal History Output Window */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-4 overflow-y-auto space-y-3 cursor-text bg-black/80 font-mono"
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-mint">
              <span className="text-cyan font-bold">guest@{profile.handle}-os:~$</span>
              <span className="font-mono text-terminal-bright">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Quick Action Command Pills */}
      <div className="bg-black/90 border-t border-mint/20 px-3 py-1.5 flex items-center gap-2 overflow-x-auto text-[11px] select-none scrollbar-none">
        <span className="text-mint/40 text-[10px] uppercase font-bold shrink-0">QUICK:</span>
        {["help", "about", "skills", "projects", "sudo hire-me", "pet", "coffee", "matrix"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => processCommand(cmd)}
            className="shrink-0 px-2 py-0.5 rounded bg-mint/10 border border-mint/30 text-mint hover:bg-mint hover:text-black transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Active Shell Prompt Input Field */}
      <div className="bg-black border-t border-mint/30 px-4 py-2.5 flex items-center gap-2">
        <span className="text-cyan font-bold shrink-0">guest@{profile.handle}-os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type command (e.g. 'help', 'projects', 'pet')..."
          className="w-full bg-transparent text-mint outline-none font-mono placeholder:text-mint/30 text-xs"
        />
        <button
          onClick={() => processCommand(input)}
          className="text-mint/70 hover:text-mint transition-colors p-1"
          title="Run command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
