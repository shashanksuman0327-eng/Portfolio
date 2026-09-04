"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useCat } from "@/context/CatContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  isPaw: boolean;
  size: number;
}

const TRAIL_COLORS = ["#39ff88", "#00f3ff", "#ffb000", "#ff2a85", "#0077ff"];

export const Cursor: React.FC = () => {
  const { isHoveringCat } = useCat();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check touch devices or prefers-reduced-motion
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Element under cursor check
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") !== null ||
          target.closest("button") !== null ||
          target.getAttribute("role") === "button";
        setIsHovered(isClickable);

        const isButton = target.tagName === "BUTTON" || target.closest("button") !== null;
        setIsButtonHovered(isButton);
      }

      // Add particle trail on sufficient movement
      const dist = Math.hypot(e.clientX - lastPosRef.current.x, e.clientY - lastPosRef.current.y);
      if (dist > 15) {
        lastPosRef.current = { x: e.clientX, y: e.clientY };

        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
          isPaw: isHoveringCat,
          size: isHoveringCat ? 14 : Math.random() * 5 + 4,
        };

        setParticles((prev) => [...prev.slice(-15), newParticle]);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, isHoveringCat]);

  // Clean up particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [particles]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Particle Trail */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, y: p.y - 12 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
          }}
          className="pointer-events-none select-none font-mono"
        >
          {p.isPaw ? (
            <span className="text-xs text-mint drop-shadow-[0_0_6px_rgba(57,255,136,0.9)]">🐾</span>
          ) : (
            <div
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 8px ${p.color}`,
              }}
              className="rounded-full"
            />
          )}
        </motion.div>
      ))}

      {/* Main Cursor Ring */}
      <motion.div
        animate={{
          x: pos.x - (isHovered ? 20 : 12),
          y: pos.y - (isHovered ? 20 : 12),
          scale: isHovered ? 1.5 : 1,
          borderColor: isButtonHovered ? "#39ff88" : isHoveringCat ? "#ff2a85" : "#39ff88",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.2 }}
        className={`fixed top-0 left-0 rounded-full border-2 border-mint pointer-events-none z-50 transition-colors ${
          isHovered ? "w-10 h-10 bg-mint/10 backdrop-blur-[1px]" : "w-6 h-6"
        } ${isHoveringCat ? "border-magenta border-dashed" : ""}`}
      />

      {/* Center Cursor Dot */}
      <motion.div
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          backgroundColor: isHoveringCat ? "#ff2a85" : "#39ff88",
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-mint pointer-events-none z-50 shadow-[0_0_8px_#39ff88]"
      />
    </div>
  );
};
