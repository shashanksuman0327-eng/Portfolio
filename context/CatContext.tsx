"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getDiscoveredSecrets, saveDiscoveredSecret, Secret, SECRETS_LIST, TOTAL_SECRETS_COUNT } from "@/lib/secrets";
import { soundFx } from "@/lib/audio";

export type CatMood =
  | "idle"
  | "happy"
  | "curious"
  | "sleepy"
  | "excited"
  | "surprised"
  | "working"
  | "confused"
  | "proud"
  | "sleeping";

export type CatPosition = "bottom-right" | "hero" | "about" | "skills" | "projects" | "experience" | "contact" | "footer";

interface SpeechBubble {
  text: string;
  id: number;
}

interface CatContextType {
  mood: CatMood;
  setMood: (mood: CatMood) => void;
  position: CatPosition;
  setPosition: (pos: CatPosition) => void;
  isSleeping: boolean;
  setIsSleeping: (val: boolean) => void;
  isFollowing: boolean;
  setIsFollowing: (val: boolean) => void;
  interactionCount: number;
  incrementInteractions: () => void;
  pettingCount: number;
  incrementPetting: () => void;
  isPurring: boolean;
  speech: SpeechBubble | null;
  showSpeech: (text: string, durationMs?: number) => void;
  clearSpeech: () => void;
  sunglassesMode: boolean;
  setSunglassesMode: (val: boolean) => void;
  coffeeMode: boolean;
  setCoffeeMode: (val: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  crtEnabled: boolean;
  toggleCRT: () => void;
  matrixMode: boolean;
  triggerMatrix: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (val: boolean) => void;
  discoveredSecrets: string[];
  unlockSecret: (secretId: string) => void;
  latestSecretNotification: { secret: Secret; count: number } | null;
  clearSecretNotification: () => void;
  totalSecretsCount: number;
  isHoveringCat: boolean;
  setIsHoveringCat: (val: boolean) => void;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const CatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mood, setMoodState] = useState<CatMood>("idle");
  const [position, setPosition] = useState<CatPosition>("bottom-right");
  const [isSleeping, setIsSleeping] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [interactionCount, setInteractionCount] = useState<number>(0);
  const [pettingCount, setPettingCount] = useState<number>(0);
  const [isPurring, setIsPurring] = useState<boolean>(false);
  const [speech, setSpeech] = useState<SpeechBubble | null>(null);
  const [sunglassesMode, setSunglassesMode] = useState<boolean>(false);
  const [coffeeMode, setCoffeeMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);
  const [matrixMode, setMatrixMode] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [discoveredSecrets, setDiscoveredSecrets] = useState<string[]>([]);
  const [latestSecretNotification, setLatestSecretNotification] = useState<{ secret: Secret; count: number } | null>(null);
  const [isHoveringCat, setIsHoveringCat] = useState<boolean>(false);

  // Initialize discovered secrets & CRT preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDiscoveredSecrets(getDiscoveredSecrets());
      const savedCrt = localStorage.getItem("sank_os_crt");
      if (savedCrt !== null) {
        setCrtEnabled(savedCrt === "true");
      }
      const savedSound = localStorage.getItem("sank_os_sound");
      if (savedSound !== null) {
        const active = savedSound === "true";
        setSoundEnabled(active);
        soundFx.setEnabled(active);
      }

      // Check Night Owl secret
      const hour = new Date().getHours();
      if (hour >= 22 || hour < 5) {
        unlockSecret("night_owl");
      }
    }
  }, []);

  const setMood = useCallback((newMood: CatMood) => {
    setMoodState(newMood);
    if (newMood === "sleeping") {
      setIsSleeping(true);
    } else if (isSleeping) {
      setIsSleeping(false);
    }
  }, [isSleeping]);

  const unlockSecret = useCallback((secretId: string) => {
    const result = saveDiscoveredSecret(secretId);
    if (result.isNew && result.secret) {
      setDiscoveredSecrets((prev) => [...prev, secretId]);
      setLatestSecretNotification({ secret: result.secret, count: result.count });
      soundFx.playSuccess();
      setMoodState("excited");
      showSpeech(`🎉 Secret Unlocked: ${result.secret.name}!`, 4500);
    }
  }, []);

  const clearSecretNotification = useCallback(() => {
    setLatestSecretNotification(null);
  }, []);

  const showSpeech = useCallback((text: string, durationMs: number = 3500) => {
    const id = Date.now();
    setSpeech({ text, id });
    soundFx.playMeow();
    setTimeout(() => {
      setSpeech((current) => (current?.id === id ? null : current));
    }, durationMs);
  }, []);

  const clearSpeech = useCallback(() => {
    setSpeech(null);
  }, []);

  const incrementInteractions = useCallback(() => {
    setInteractionCount((prev) => {
      const next = prev + 1;
      if (next >= 10) {
        unlockSecret("cat_clicks");
      }
      return next;
    });
  }, [unlockSecret]);

  const incrementPetting = useCallback(() => {
    setPettingCount((prev) => {
      const next = prev + 1;
      if (next >= 8 && !isPurring) {
        setIsPurring(true);
        setMoodState("happy");
        soundFx.playPurr();
        showSpeech("purring.exe started... ^_^", 4000);
        unlockSecret("petting");
        setTimeout(() => setIsPurring(false), 5000);
      }
      return next;
    });
  }, [isPurring, showSpeech, unlockSecret]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundFx.setEnabled(next);
      localStorage.setItem("sank_os_sound", String(next));
      if (next) soundFx.playKeypress();
      unlockSecret("sound_toggle");
      return next;
    });
  }, [unlockSecret]);

  const toggleCRT = useCallback(() => {
    setCrtEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("sank_os_crt", String(next));
      unlockSecret("crt_toggle");
      return next;
    });
  }, [unlockSecret]);

  const triggerMatrix = useCallback(() => {
    setMatrixMode(true);
    setMoodState("confused");
    showSpeech("> Matrix rain detected... woah!", 4000);
    unlockSecret("matrix");
    setTimeout(() => {
      setMatrixMode(false);
      setMoodState("idle");
      showSpeech("> returning to normal reality...", 3000);
    }, 6000);
  }, [showSpeech, unlockSecret]);

  // Inactivity auto-sleep detection (35s)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetInactivity = () => {
      if (isSleeping) {
        setIsSleeping(false);
        setMoodState("idle");
        showSpeech("(•ω•) Mochi woke up!", 2500);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsSleeping(true);
        setMoodState("sleeping");
      }, 35000);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((evt) => window.addEventListener(evt, resetInactivity, { passive: true }));
    timer = setTimeout(() => {
      setIsSleeping(true);
      setMoodState("sleeping");
    }, 35000);

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, resetInactivity));
    };
  }, [isSleeping, showSpeech]);

  // Konami Code listener
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    let position = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const expected = konamiSequence[position];
      if (key.toLowerCase() === expected.toLowerCase()) {
        position++;
        if (position === konamiSequence.length) {
          position = 0;
          setSunglassesMode(true);
          showSpeech("> CHEAT CODE ACCEPTED. MOCHI HAS ADMIN ACCESS 😎", 5000);
          unlockSecret("konami");
        }
      } else {
        position = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSpeech, unlockSecret]);

  return (
    <CatContext.Provider
      value={{
        mood,
        setMood,
        position,
        setPosition,
        isSleeping,
        setIsSleeping,
        isFollowing,
        setIsFollowing,
        interactionCount,
        incrementInteractions,
        pettingCount,
        incrementPetting,
        isPurring,
        speech,
        showSpeech,
        clearSpeech,
        sunglassesMode,
        setSunglassesMode,
        coffeeMode,
        setCoffeeMode,
        soundEnabled,
        toggleSound,
        crtEnabled,
        toggleCRT,
        matrixMode,
        triggerMatrix,
        commandPaletteOpen,
        setCommandPaletteOpen,
        discoveredSecrets,
        unlockSecret,
        latestSecretNotification,
        clearSecretNotification,
        totalSecretsCount: TOTAL_SECRETS_COUNT,
        isHoveringCat,
        setIsHoveringCat,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCat = () => {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCat must be used within a CatProvider");
  }
  return context;
};
