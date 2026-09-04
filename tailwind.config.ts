import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#121212",
        "surface-border": "#222222",
        mint: "#39ff88",
        "mint-glow": "rgba(57, 255, 136, 0.15)",
        cyan: "#00f3ff",
        amber: "#ffb000",
        magenta: "#ff2a85",
        "electric-blue": "#0077ff",
        terminal: {
          dark: "#050505",
          dim: "#777777",
          bright: "#e0e0e0",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.96" },
          "70%": { opacity: "0.98" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(57, 255, 136, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(57, 255, 136, 0.5)" },
        },
      },
      animation: {
        flicker: "flicker 0.15s infinite",
        scanline: "scanline 8s linear infinite",
        blink: "blink 1s step-end infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
