"use client";

import React, { useState } from "react";
import { initialSystemStatus } from "@/data/content";
import { useCat } from "@/context/CatContext";
import { soundFx } from "@/lib/audio";
import { Activity, RefreshCw } from "lucide-react";

export const SystemStatus: React.FC = () => {
  const { unlockSecret, setMood, showSpeech } = useCat();
  const [statuses, setStatuses] = useState(initialSystemStatus);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    soundFx.playKeypress();
    setIsRefreshing(true);
    setTimeout(() => {
      setStatuses((prev) =>
        prev.map((item) =>
          item.key === "MOOD"
            ? { ...item, status: Math.random() > 0.5 ? "OPTIMIZED" : "EXCELLENT" }
            : item
        )
      );
      setIsRefreshing(false);
    }, 600);
  };

  const handleHeaderDoubleClick = () => {
    setMood("excited");
    showSpeech("> CAT_ADMIN_MODE UNLOCKED! 🐾👑", 4000);
    unlockSecret("cat_admin");
  };

  return (
    <div className="border border-mint/40 bg-surface/90 p-4 rounded-xs font-mono text-xs max-w-sm w-full shadow-[0_0_15px_rgba(57,255,136,0.1)]">
      {/* Header */}
      <div
        onDoubleClick={handleHeaderDoubleClick}
        className="flex items-center justify-between border-b border-mint/20 pb-2 mb-3 cursor-pointer select-none"
      >
        <div className="flex items-center gap-2 text-mint font-bold">
          <Activity className="w-4 h-4 text-mint animate-pulse" />
          <span>SYSTEM STATUS</span>
        </div>
        <button
          onClick={handleRefresh}
          className="text-mint/60 hover:text-mint transition-colors p-1"
          title="Refresh Telemetry"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Status Items List */}
      <div className="space-y-2">
        {statuses.map((item) => (
          <div key={item.key} className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-mint/70 flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  item.highlight ? "bg-mint animate-pulse" : "bg-amber"
                }`}
              />
              {item.key}
            </span>
            <span
              className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                item.highlight
                  ? "bg-mint/10 text-mint border border-mint/30"
                  : "bg-amber/10 text-amber border border-amber/30"
              }`}
            >
              [{item.status}]
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
