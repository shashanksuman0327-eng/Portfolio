"use client";

import React from "react";
import { useCat } from "@/context/CatContext";

export const CRTOverlay: React.FC = () => {
  const { crtEnabled, matrixMode } = useCat();

  if (!crtEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* CRT Scanline Horizontal Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

      {/* Moving Scanline Bar */}
      <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-mint/5 to-transparent animate-scanline opacity-40" />

      {/* Subtle CRT Radial Vignette */}
      <div className="absolute inset-0 shadow-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.65)_100%)]" />

      {/* Matrix Mode Digital Rain Overlay */}
      {matrixMode && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center pointer-events-auto z-40">
          <div className="text-mint font-mono text-center space-y-4 p-8 border border-mint/60 bg-black shadow-[0_0_30px_rgba(57,255,136,0.4)] animate-pulse max-w-lg">
            <div className="text-2xl font-bold tracking-widest text-mint">[ MATRIX REALITY OVERRIDE ]</div>
            <p className="text-xs text-mint/80">01001101 01001111 01000011 01001000 01001001</p>
            <div className="text-sm text-cyan font-mono">
              SANK-OS Kernel: Decrypting reality stream...
            </div>
            <div className="w-full bg-mint/20 h-2 rounded overflow-hidden">
              <div className="bg-mint h-full animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
