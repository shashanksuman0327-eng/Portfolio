export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  isFeatured?: boolean;
  status: "ONLINE" | "BETA" | "DEPRECATED" | "SHIPPED";
  commitHash: string;
  stars?: number;
}

export interface LinkItem {
  id: string;
  command: string;
  title: string;
  description: string;
  url: string;
  status: "READY" | "ONLINE";
  catSpeech: string;
}

export const linksData: LinkItem[] = [
  {
    id: "email",
    command: "./email",
    title: "Email",
    description: "Open a direct communication channel",
    url: "mailto:shashanksuman0327@gmail.com",
    status: "READY",
    catSpeech: "> communication channel detected.",
  },
  {
    id: "linkedin",
    command: "./linkedin",
    title: "LinkedIn",
    description: "Professional profile & network",
    url: "https://www.linkedin.com/in/shashanksuman03/",
    status: "ONLINE",
    catSpeech: "> professional mode activated.",
  },
  {
    id: "github",
    command: "./github",
    title: "GitHub",
    description: "Code, projects & experiments",
    url: "https://github.com/shashanksuman0327-eng",
    status: "ONLINE",
    catSpeech: "> source code detected. 👀",
  },
  {
    id: "orcid",
    command: "./orcid",
    title: "ORCID",
    description: "Research & academic identity",
    url: "https://orcid.org/0009-0004-9893-4238",
    status: "ONLINE",
    catSpeech: "> research database detected.",
  },
];

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface ExperienceItem {
  id: string;
  commitHash: string;
  date: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  tech: string[];
}

export const pet = {
  name: "Mochi",
  species: "cyber-cat",
  version: "v2.6.1",
  favoriteFood: "tuna.exe",
  hobbies: ["chasing cursor", "keyboard naps", "analyzing visitors", "purring"],
};

export const profile = {
  name: "Shashank Suman",
  title: "Data Science & Artificial Intelligence @ IIT Guwahati",
  handle: "shashanksuman0327-eng",
  osVersion: "SANK-OS v2.6.1 (x86_64-linux-gnu)",
  bio: "Currently Undergraduate student of Data Science & Artificial Intelligence at भारतीय प्रौद्योगिकी संस्थान (IIT Guwahati) exploring machine learning, analytics, workflow automation, and intelligent systems.",
  shortBio: "Data Science & AI @ भारतीय प्रौद्योगिकी संस्थान (IIT Guwahati) / Machine Learning & Intelligent Systems Builder",
  location: "Patna, Bihar, India",
  email: "shashanksuman0327@gmail.com",
  github: "https://github.com/shashanksuman0327-eng",
  linkedin: "https://www.linkedin.com/in/shashanksuman03/",
  twitter: "https://x.com/shashank_suman",
  hashtags: ["#datascience", "#artificialintelligence", "#machinelearning", "#iitguwahati", "#developer"],
  uptimeStart: new Date(),
};

export const skillsData: Record<string, SkillCategory> = {
  languages: {
    title: "LANGUAGES & CORE",
    skills: [
      { name: "Python (NumPy/Pandas/PyTorch)", level: 50 },
      { name: "TypeScript", level: 70 },
      { name: "JavaScript (ESNext)", level: 52 },
      { name: "C++ / C", level: 45 },
      { name: "SQL (PostgreSQL)", level: 30 },
      { name: "HTML5 / CSS3", level: 98 },
    ],
  },
  ai_ml: {
    title: "DATA SCIENCE & AI/ML",
    skills: [
      { name: "Machine Learning / Deep Learning", level: 10 },
      { name: "Computer Vision & Gesture Analytics", level: 60 },
      { name: "AI Agent Workflows", level: 20 },
      { name: "Data Analytics & Visualization", level: 25 },
      { name: "Natural Language Processing (NLP)", level: 15 },
    ],
  },
  frameworks: {
    title: "FRAMEWORKS & WEB",
    skills: [
      { name: "Next.js 14 (App Router)", level: 92 },
      { name: "React 18", level: 70 },
      { name: "Tailwind CSS", level: 60 },
      { name: "Node.js / Express", level: 88 },
      { name: "FastAPI / Flask", level: 85 },
      { name: "Framer Motion", level: 88 },
    ],
  },
  tools: {
    title: "TOOLS & INFRA",
    skills: [
      { name: "Git / GitHub CLI", level: 45 },
      { name: "Jupyter Notebooks", level: 32 },
      { name: "Linux / Bash Shell", level: 50 },
      { name: "Docker", level: 20 },
      { name: "Vercel / AWS", level: 85 },
    ],
  },
};

export const projectsData: Project[] = [
  {
    id: "chartix",
    name: "CHARTIX",
    tagline: "Indian Railways Intelligence & Analytics Platform",
    description: "A modern railway intelligence platform that transforms Indian Railways chart data into powerful occupancy, journey, and coach analytics.",
    tags: ["TypeScript", "Next.js", "Data Analytics", "Railway Intelligence", "TailwindCSS"],
    githubUrl: "https://github.com/shashanksuman0327-eng/CHARTIX",
    liveUrl: "https://github.com/shashanksuman0327-eng/CHARTIX",
    isFeatured: true,
    status: "ONLINE",
    commitHash: "c8a192f",
    stars: 12,
  },
  {
    id: "docufill",
    name: "DOCUFILL",
    tagline: "Interactive Web PDF Document Automation System",
    description: "Modern document automation system that transforms static PDF forms into interactive web applications and generates production-ready filled PDFs.",
    tags: ["TypeScript", "React", "PDF Automation", "Form Engines", "TailwindCSS"],
    githubUrl: "https://github.com/shashanksuman0327-eng/Docufill",
    liveUrl: "https://github.com/shashanksuman0327-eng/Docufill",
    isFeatured: true,
    status: "ONLINE",
    commitHash: "d7f41e0",
    stars: 8,
  },
  {
    id: "veltrix-ai",
    name: "VELTRIX-AI",
    tagline: "Autonomous Intelligence & Workflow Automation Platform",
    description: "VELTRIX AI is an autonomous intelligence platform that helps organizations automate workflows, connect data, deploy AI agents, and analyze operations in real time.",
    tags: ["AI Agents", "Autonomous Workflows", "JavaScript", "HTML", "Real-Time Systems"],
    githubUrl: "https://github.com/shashanksuman0327-eng/VELTRIX-AI",
    liveUrl: "https://github.com/shashanksuman0327-eng/VELTRIX-AI",
    isFeatured: true,
    status: "BETA",
    commitHash: "v1e9a3b",
    stars: 15,
  },
  {
    id: "vibesnap",
    name: "VIBESNAP",
    tagline: "Cinematic AI Photobooth & Gesture Recognition Engine",
    description: "VibeSnap AI is a cinematic photobooth that reads your hand gestures, rates your smile confidence, and splits your portrait into stunning puzzle artwork housed inside a vintage Polaroid film strip.",
    tags: ["JavaScript", "Computer Vision", "Gesture Analytics", "AI Photobooth", "Canvas API"],
    githubUrl: "https://github.com/shashanksuman0327-eng/VIBESNAP",
    liveUrl: "https://github.com/shashanksuman0327-eng/VIBESNAP",
    isFeatured: true,
    status: "SHIPPED",
    commitHash: "a9b2c3d",
    stars: 19,
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    commitHash: "iitg2026",
    date: "2026 — PRESENT",
    role: "Undergraduate — Data Science & Artificial Intelligence",
    company: "Indian Institute of Technology (IIT) Guwahati",
    location: "Guwahati, Assam, India",
    description: [
      "Specializing in Machine Learning, Statistical Learning, Computer Vision, and Data Science.",
      "Engineered autonomous AI platforms (VELTRIX-AI) and computer vision gesture analytics (VibeSnap AI).",
      "Developed Indian Railways analytics platforms (CHARTIX) and automated PDF web workflow engines (Docufill).",
    ],
    tech: ["Python", "PyTorch", "TypeScript", "Next.js", "AI Agents", "Data Science"],
  },
  {
    id: "exp-2",
    commitHash: "gh2025b",
    date: "2025 — PRESENT",
    role: "Open Source AI & Web Systems Creator",
    company: "GitHub / shashanksuman0327-eng",
    location: "Patna, Bihar, India",
    description: [
      "Published open-source intelligence platforms, document automation systems, and computer vision web tools.",
      "Architected responsive Next.js and TypeScript user interfaces integrated with real-time AI backends.",
    ],
    tech: ["TypeScript", "JavaScript", "React", "Next.js", "TailwindCSS", "Git"],
  },
];

export const initialSystemStatus = [
  { key: "PORTFOLIO", status: "ONLINE", highlight: true },
  { key: "CAT (MOCHI)", status: "ONLINE", highlight: true },
  { key: "IIT G HYPERCLUSTER", status: "CONNECTED", highlight: true },
  { key: "COFFEE", status: "REQUIRED", highlight: false },
  { key: "BUGS", status: "0 FOUND", highlight: false },
  { key: "MOOD", status: "EXCELLENT", highlight: true },
];
