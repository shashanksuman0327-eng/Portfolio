"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { useCat } from "@/context/CatContext";
import { pet } from "@/data/content";
import { CatSpeechBubble } from "./CatSpeechBubble";
import { CatEffects } from "./CatEffects";
import { soundFx } from "@/lib/audio";

export const PetMascot: React.FC = () => {
  const {
    mood,
    setMood,
    position,
    isSleeping,
    isFollowing,
    interactionCount,
    incrementInteractions,
    incrementPetting,
    isPurring,
    speech,
    showSpeech,
    clearSpeech,
    sunglassesMode,
    coffeeMode,
    setIsHoveringCat,
    unlockSecret,
  } = useCat();

  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [earTwitch, setEarTwitch] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [tailAngle, setTailAngle] = useState(0);
  const [bodyAngle, setBodyAngle] = useState(0);
  const [trickAnimation, setTrickAnimation] = useState<string | null>(null);

  const controls = useAnimation();
  const catRef = useRef<HTMLDivElement>(null);

  // Eye mouse tracking logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isSleeping || typeof window === "undefined") return;

      // Check prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (!catRef.current) return;
      const rect = catRef.current.getBoundingClientRect();
      const catCenterX = rect.left + rect.width / 2;
      const catCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - catCenterX;
      const deltaY = e.clientY - catCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      // Follow mode body angle rotation
      if (isFollowing) {
        const rad = Math.atan2(deltaY, deltaX);
        const deg = (rad * 180) / Math.PI;
        setBodyAngle(Math.max(-15, Math.min(15, deg / 10)));
      } else {
        setBodyAngle(0);
      }

      // Pupil movement scale
      const maxPupilMove = isFollowing ? 5 : 3.5;
      const moveX = (deltaX / (distance || 1)) * Math.min(maxPupilMove, distance / 50);
      const moveY = (deltaY / (distance || 1)) * Math.min(maxPupilMove, distance / 50);

      setPupilOffset({ x: moveX, y: moveY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isSleeping, isFollowing]);

  // Natural idle loop generator
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runIdleCycle = () => {
      if (isSleeping) return;

      // Random blink
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);

      // Random ear twitch
      if (Math.random() > 0.5) {
        setEarTwitch(true);
        setTimeout(() => setEarTwitch(false), 400);
      }

      // Random tail wag
      setTailAngle((prev) => (prev === 0 ? (Math.random() > 0.5 ? 12 : -12) : 0));

      const nextInterval = 2500 + Math.random() * 4000;
      timeoutId = setTimeout(runIdleCycle, nextInterval);
    };

    timeoutId = setTimeout(runIdleCycle, 3000);
    return () => clearTimeout(timeoutId);
  }, [isSleeping]);

  // Handle Cat click reactions
  const handleCatClick = useCallback(() => {
    if (isSleeping) {
      setMood("idle");
      showSpeech("(•ω•) Yawwwn... I'm awake!", 3000);
      unlockSecret("wake_command");
      return;
    }

    incrementInteractions();
    incrementPetting();
    soundFx.playMeow();

    const reactions = ["boing", "roll", "wave", "surprised", "meow_speak", "circle"];
    const chosen = reactions[Math.floor(Math.random() * reactions.length)];
    setTrickAnimation(chosen);

    if (chosen === "boing") {
      setMood("excited");
      showSpeech("BOING! 🐾", 2500);
      controls.start({
        y: [-15, 0, -8, 0],
        transition: { duration: 0.5 },
      });
    } else if (chosen === "roll") {
      setMood("happy");
      showSpeech("> Mochi rolled over! ✨", 3000);
      controls.start({
        rotate: [0, 360],
        transition: { duration: 0.8 },
      });
    } else if (chosen === "wave") {
      setMood("happy");
      showSpeech("Hi friend! ( • ⍵ • )/ ", 3000);
    } else if (chosen === "surprised") {
      setMood("surprised");
      showSpeech("(⊙_⊙) Eek!", 2500);
    } else if (chosen === "meow_speak") {
      setMood("happy");
      showSpeech("> meow.exe", 2500);
    } else if (chosen === "circle") {
      setMood("curious");
      showSpeech("> running spin cycle...", 3000);
      controls.start({
        x: [0, 20, 0, -20, 0],
        y: [0, -10, 0, 10, 0],
        transition: { duration: 0.9 },
      });
    }

    setTimeout(() => {
      setTrickAnimation(null);
      if (mood !== "happy" && mood !== "sleeping") setMood("idle");
    }, 1200);
  }, [isSleeping, incrementInteractions, incrementPetting, setMood, showSpeech, controls, mood, unlockSecret]);

  // Determine pupil color based on mood
  const getPupilColor = () => {
    if (sunglassesMode) return "#000000";
    if (mood === "excited") return "#ff2a85";
    if (mood === "curious") return "#00f3ff";
    if (mood === "proud") return "#ffb000";
    return "#39ff88";
  };

  return (
    <div
      ref={catRef}
      onMouseEnter={() => setIsHoveringCat(true)}
      onMouseLeave={() => setIsHoveringCat(false)}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-8 z-40 select-none flex flex-col items-center group pointer-events-auto"
      style={{ pointerEvents: "auto" }}
    >
      {/* Speech Bubble */}
      <CatSpeechBubble speech={speech} onDismiss={clearSpeech} />

      {/* Visual Effects (Zzz, Purring, Sparkles) */}
      <CatEffects isSleeping={isSleeping} isPurring={isPurring} isExcited={mood === "excited"} />

      {/* Main Interactive Mascot Container */}
      <motion.div
        animate={controls}
        onClick={handleCatClick}
        style={{ rotate: bodyAngle }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative cursor-pointer flex flex-col items-center justify-center p-2 rounded-xl transition-shadow duration-300"
      >
        {/* Coffee Cup Accessory */}
        {coffeeMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -left-6 bottom-2 z-10 text-base font-mono drop-shadow-[0_0_8px_rgba(255,176,0,0.8)]"
          >
            ☕
          </motion.div>
        )}

        {/* Magnifying Glass Accessory on Curiosity */}
        {mood === "curious" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -right-5 top-1 z-10 text-base"
          >
            🔍
          </motion.div>
        )}

        {/* Custom SVG Cyber Cat */}
        <svg
          width="88"
          height="88"
          viewBox="0 0 100 100"
          className="drop-shadow-[0_0_12px_rgba(57,255,136,0.35)] transition-all duration-300"
        >
          {/* Tail */}
          <motion.path
            d="M 25 70 Q 10 50 15 35 Q 20 25 25 35"
            fill="none"
            stroke="#39ff88"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{
              d: isSleeping
                ? "M 25 70 Q 15 65 18 60"
                : tailAngle > 0
                ? "M 25 70 Q 5 45 10 25 Q 18 15 22 30"
                : "M 25 70 Q 12 55 18 40 Q 24 30 26 42",
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Cat Body */}
          <ellipse cx="50" cy="68" rx="28" ry="22" fill="#0f1712" stroke="#39ff88" strokeWidth="2.5" />
          {/* Inner chest accent */}
          <ellipse cx="50" cy="72" rx="16" ry="12" fill="#16271c" />

          {/* Paws */}
          <ellipse cx="36" cy="88" rx="8" ry="5" fill="#0a0a0a" stroke="#39ff88" strokeWidth="2" />
          <ellipse cx="64" cy="88" rx="8" ry="5" fill="#0a0a0a" stroke="#39ff88" strokeWidth="2" />

          {/* Cat Head */}
          <motion.g
            animate={{
              y: isSleeping ? 4 : 0,
            }}
            transition={{ duration: 1 }}
          >
            {/* Left Ear */}
            <motion.polygon
              points="24,35 15,10 40,24"
              fill="#0a0a0a"
              stroke="#39ff88"
              strokeWidth="2.5"
              strokeLinejoin="round"
              animate={{ rotate: earTwitch ? -8 : 0 }}
              style={{ transformOrigin: "24px 35px" }}
            />
            {/* Inner Left Ear */}
            <polygon points="25,32 18,15 36,25" fill="#39ff88" opacity="0.35" />

            {/* Right Ear */}
            <motion.polygon
              points="76,35 85,10 60,24"
              fill="#0a0a0a"
              stroke="#39ff88"
              strokeWidth="2.5"
              strokeLinejoin="round"
              animate={{ rotate: earTwitch ? 8 : 0 }}
              style={{ transformOrigin: "76px 35px" }}
            />
            {/* Inner Right Ear */}
            <polygon points="75,32 82,15 64,25" fill="#39ff88" opacity="0.35" />

            {/* Head Outline */}
            <ellipse cx="50" cy="42" rx="26" ry="20" fill="#0a0a0a" stroke="#39ff88" strokeWidth="2.5" />

            {/* Whiskers Left */}
            <line x1="16" y1="42" x2="32" y2="44" stroke="#39ff88" strokeWidth="1.5" opacity="0.8" />
            <line x1="14" y1="48" x2="31" y2="48" stroke="#39ff88" strokeWidth="1.5" opacity="0.8" />
            <line x1="17" y1="54" x2="32" y2="51" stroke="#39ff88" strokeWidth="1.5" opacity="0.8" />

            {/* Whiskers Right */}
            <line x1="84" y1="42" x2="68" y2="44" stroke="#39ff88" strokeWidth="1.5" opacity="0.8" />
            <line x1="86" y1="48" x2="69" y2="48" stroke="#39ff88" strokeWidth="1.5" opacity="0.8" />
            <line x1="83" y1="54" x2="68" y2="51" stroke="#39ff88" strokeWidth="1.5" opacity="0.8" />

            {/* Nose & Mouth */}
            <polygon points="47,47 53,47 50,51" fill="#39ff88" />
            <path d="M 46 53 Q 50 56 54 53" fill="none" stroke="#39ff88" strokeWidth="1.5" strokeLinecap="round" />

            {/* Eyes Section */}
            {isSleeping || isPurring || isBlinking ? (
              // Closed Eyes / Sleepy Arcs
              <g stroke="#39ff88" strokeWidth="2.5" strokeLinecap="round" fill="none">
                <path d="M 33 40 Q 39 44 43 40" />
                <path d="M 57 40 Q 61 44 67 40" />
              </g>
            ) : sunglassesMode ? (
              // Cyber Sunglasses Mode
              <g fill="#39ff88">
                <polygon points="30,34 47,34 44,45 33,45" />
                <polygon points="53,34 70,34 67,45 56,45" />
                <line x1="47" y1="37" x2="53" y2="37" stroke="#39ff88" strokeWidth="2" />
              </g>
            ) : (
              // Normal Open Eyes with Pupil Mouse Tracking
              <g>
                {/* Eye Sockets */}
                <ellipse cx="37" cy="39" rx="7" ry="8" fill="#000" stroke="#39ff88" strokeWidth="1.5" />
                <ellipse cx="63" cy="39" rx="7" ry="8" fill="#000" stroke="#39ff88" strokeWidth="1.5" />

                {/* Pupils */}
                <ellipse
                  cx={37 + pupilOffset.x}
                  cy={39 + pupilOffset.y}
                  rx="3.5"
                  ry="5"
                  fill={getPupilColor()}
                />
                <ellipse
                  cx={63 + pupilOffset.x}
                  cy={39 + pupilOffset.y}
                  rx="3.5"
                  ry="5"
                  fill={getPupilColor()}
                />

                {/* Eye Catchlights */}
                <circle cx={35 + pupilOffset.x} cy={37 + pupilOffset.y} r="1.2" fill="#fff" />
                <circle cx={61 + pupilOffset.x} cy={37 + pupilOffset.y} r="1.2" fill="#fff" />
              </g>
            )}
          </motion.g>
        </svg>

        {/* Mascot OS Status Tag */}
        <div className="mt-1.5 px-2 py-0.5 rounded bg-black/90 border border-mint/40 text-[10px] font-mono text-mint flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
          <span>[{pet.name.toUpperCase()} // ONLINE]</span>
        </div>

        {/* Interaction Count Counter Tag */}
        {interactionCount > 0 && (
          <div className="text-[9px] font-mono text-mint/60 mt-0.5">
            // CAT INTERACTIONS: {String(interactionCount).padStart(2, "0")}
          </div>
        )}
      </motion.div>
    </div>
  );
};
