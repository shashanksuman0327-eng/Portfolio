# SANK-OS // CAT TERMINAL

> **"You didn't visit a portfolio. You booted into someone's computer."**

A highly interactive, single-page developer portfolio website built using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **cmdk**.

Features a retro hacker terminal / personal operating system aesthetic, powered by **Mochi** — an interactive cyber cat companion living inside the website.

---

## 🌟 Key Features

1. **Retro Hacker Visual Identity**
   - Dark theme `#0a0a0a` background with subtle CRT scanline overlays, vignette, screen flicker, and optional Matrix digital rain mode.
   - Primary neon mint accent (`#39ff88`), cyan, amber, magenta, and electric blue playful highlights.
   - JetBrains Mono / Fira Code typography with terminal prompts, blinking cursors, and ASCII art borders.

2. **Mochi — The Interactive Cyber Cat Mascot (`components/PetMascot.tsx`)**
   - Custom Framer Motion SVG cat with head, twitching ears, blinking eyes, eye-mouse tracking pupils, paws, and tail.
   - Dynamic mood system: `idle`, `happy`, `curious`, `sleepy`, `excited`, `surprised`, `working`, `confused`, `proud`, `sleeping`.
   - Click reactions (Boing jump, roll over, wave, surprise, meow speech, spin cycle).
   - Hidden petting interaction (`PURR_MODE` unlocked on repeated clicks/holding).
   - Follow mode (`follow` command) where cat tracks mouse cursor closely.
   - Project inspection: cat walks over and inspects project cards on hover, and celebrates when clicked.
   - Inactivity sleep loop with floating `Zzz...` particles and wake-up reactions.

3. **Custom Desktop Cursor (`components/Cursor.tsx`)**
   - Spring physics ring with center dot and particle trail.
   - Swaps particle trail to **paw-print particles (`🐾`)** when hovering over Mochi!
   - Expands on links and buttons; respects touch devices and `prefers-reduced-motion`.

4. **Boot Sequence (`components/BootSequence.tsx`)**
   - Fullscreen terminal boot sequence initializing kernel, portfolio, and Mochi personality modules.
   - Includes a `[ SKIP INTRO ]` button and caches completion in `sessionStorage`.

5. **Interactive CLI Shell (`components/Shell.tsx`)**
   - Full terminal shell with history buffer (Up/Down arrow navigation), Tab auto-completion, and command execution.
   - Commands: `help`, `about`, `skills`, `projects`, `experience`, `contact`, `whoami`, `sudo hire-me`, `pet`, `meow`, `coffee`, `matrix`, `follow`, `unfollow`, `sleep`, `wake`, `cat /dev/random`, `camera`, `neofetch`, `secrets`, `resume`, `clear`.

6. **Global Command Palette (`components/CommandPalette.tsx`)**
   - Triggered via `Ctrl+K` or header button using `cmdk`.
   - Instant search and execution of section navigation links, pet interactions, and preference toggles.

7. **Secret & Easter Egg Manager (`components/SecretManager.tsx`)**
   - Tracks 28 hidden easter eggs (Konami code, cat admin clicks, petting purr mode, midnight browsing, speed scrolling, etc.).
   - Displays toast notifications showing `[07/28] secrets found` progress.

8. **Web Audio API Synthesizer (`lib/audio.ts`)**
   - Zero external audio file dependencies. Synthesizes subtle retro keypress bleeps, meows, purrs, and success chimes natively in the browser.
   - Includes an easy `[SOUND: OFF/ON]` toggle.

---

## 🛠️ Quick Start & Installation

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open browser at http://localhost:3000
```

---

## 📁 File & Component Structure

```text
suvo-os/
├── app/
│   ├── globals.css         # CRT scanlines, font imports, glitch text
│   ├── layout.tsx          # Root layout & Metadata
│   └── page.tsx            # Main single-page application
├── components/
│   ├── BootSequence.tsx    # OS boot terminal screen
│   ├── CatEffects.tsx      # Zzz, heart, paw, and sparkle particles
│   ├── CatSpeechBubble.tsx # Retro terminal speech bubble overlay
│   ├── CommandPalette.tsx  # cmdk palette (Ctrl+K)
│   ├── CRTOverlay.tsx      # CRT scanline and vignette overlay
│   ├── Cursor.tsx          # Custom cursor with paw-print trail
│   ├── Neofetch.tsx        # System hardware & cat info box
│   ├── PetMascot.tsx       # Animated SVG cat mascot (Mochi)
│   ├── ProjectCard.tsx     # Terminal style project cards
│   ├── SecretManager.tsx   # Easter egg discovery notifications
│   ├── Shell.tsx           # Interactive CLI shell
│   ├── SystemStatus.tsx    # Live system status monitor
│   ├── TerminalNav.tsx     # Sticky top navigation bar
│   └── Timeline.tsx        # Git log experience timeline
├── context/
│   └── CatContext.tsx      # Global Cat, sound, secret & CRT state
├── data/
│   └── content.ts          # Consolidated portfolio & profile data
├── lib/
│   ├── audio.ts            # Web Audio API sound synthesizer
│   ├── secrets.ts          # Secret registry & tracker
│   └── utils.ts            # Tailwind classnames merger
├── tailwind.config.ts      # Custom terminal theme & colors
└── tsconfig.json
```

---

## ⚙️ Editing Profile Information

All portfolio content is central in [`data/content.ts`](file:///C:/Users/DELL/.gemini/antigravity-ide/scratch/suvo-os/data/content.ts). To customize for your personal portfolio, edit the `profile`, `projectsData`, `skillsData`, `experienceData`, and `pet` objects.
