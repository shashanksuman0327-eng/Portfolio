export interface Secret {
  id: string;
  name: string;
  description: string;
  hint: string;
}

export const SECRETS_LIST: Record<string, Secret> = {
  cat_clicks: {
    id: "cat_clicks",
    name: "CAT_ADMIN_MODE",
    description: "Clicked Mochi 10 times!",
    hint: "Keep poking Mochi...",
  },
  meow: {
    id: "meow",
    name: "MEOW_PROTOCOL",
    description: "Spoke fluent cat language in terminal.",
    hint: "What does a cat say?",
  },
  sudo_hire_me: {
    id: "sudo_hire_me",
    name: "ROOT_RECRUITMENT",
    description: "Executed 'sudo hire-me' with root privileges!",
    hint: "Try requesting root hiring permissions...",
  },
  coffee: {
    id: "coffee",
    name: "CAFFEINE_OVERCLOCK",
    description: "Served hot virtual coffee to Mochi.",
    hint: "Fuel for developers and cyber cats...",
  },
  matrix: {
    id: "matrix",
    name: "MATRIX_RAINFALL",
    description: "Entered the Matrix digital rain reality.",
    hint: "Take the green pill...",
  },
  konami: {
    id: "konami",
    name: "CHEAT_CODE_ACCEPTED",
    description: "Entered ↑ ↑ ↓ ↓ ← → ← → B A Konami code!",
    hint: "The classic arcade cheat sequence...",
  },
  petting: {
    id: "petting",
    name: "PURR_MODE_UNLOCKED",
    description: "Pet Mochi until purring.exe started!",
    hint: "Mochi loves continuous affection...",
  },
  follow_mode: {
    id: "follow_mode",
    name: "CYBER_SHADOW",
    description: "Activated cat cursor follow mode.",
    hint: "Command Mochi to follow you...",
  },
  sleep_command: {
    id: "sleep_command",
    name: "NAP_TIME",
    description: "Sent Mochi to sleep with terminal commands.",
    hint: "Tell Mochi to take a nap...",
  },
  wake_command: {
    id: "wake_command",
    name: "WAKEUP_CALL",
    description: "Woke up Mochi from cyber sleep.",
    hint: "Wake the sleeping cat...",
  },
  random_cat: {
    id: "random_cat",
    name: "RANDOM_BEHAVIOR",
    description: "Ran 'cat /dev/random' for raw entropy.",
    hint: "Inspect random devices in shell...",
  },
  camera_mode: {
    id: "camera_mode",
    name: "CAT_CAM_ERROR",
    description: "Tried to open imaginary cat camera.",
    hint: "Look for cat camera feed...",
  },
  whoami: {
    id: "whoami",
    name: "IDENTITY_VERIFIED",
    description: "Queried user identity in terminal.",
    hint: "Ask terminal who you are...",
  },
  help: {
    id: "help",
    name: "COMMAND_MANUAL",
    description: "Discovered available shell commands.",
    hint: "Ask for guidance...",
  },
  clear: {
    id: "clear",
    name: "CLEAN_SCREEN",
    description: "Wiped terminal buffer clean.",
    hint: "Tidy up your command prompt...",
  },
  project_inspect: {
    id: "project_inspect",
    name: "CURIOUS_INSPECTOR",
    description: "Mochi inspected 3 developer projects with magnifying glass.",
    hint: "Hover around project cards...",
  },
  project_approve: {
    id: "project_approve",
    name: "STAMP_OF_APPROVAL",
    description: "Mochi celebrated an excellent project choice!",
    hint: "Click to explore project links...",
  },
  sound_toggle: {
    id: "sound_toggle",
    name: "RETRO_AUDIO",
    description: "Toggled terminal sound synthesizer.",
    hint: "Listen to retro sound effects...",
  },
  crt_toggle: {
    id: "crt_toggle",
    name: "CRT_MONITOR_ON",
    description: "Activated heavy CRT scanline mode.",
    hint: "Switch to vintage CRT visuals...",
  },
  night_owl: {
    id: "night_owl",
    name: "NIGHT_OWL",
    description: "Visited SANK-OS during midnight hours.",
    hint: "Browse late at night...",
  },
  speed_scroll: {
    id: "speed_scroll",
    name: "HYPER_SCROLL",
    description: "Scrolled across all terminal sections rapidly.",
    hint: "Traverse the page at warp speed...",
  },
  footer_goodbye: {
    id: "footer_goodbye",
    name: "CONNECTION_ALIVE",
    description: "Reached system footer and received cat farewell message.",
    hint: "Scroll to the bottom shutdown panel...",
  },
  neofetch_run: {
    id: "neofetch_run",
    name: "SYSTEM_FETCH",
    description: "Displayed system hardware and cat stats.",
    hint: "Fetch system info in shell...",
  },
  secrets_run: {
    id: "secrets_run",
    name: "SECRET_HUNTER",
    description: "Queried secret vault status in CLI.",
    hint: "Type 'secrets' in terminal...",
  },
  cat_admin: {
    id: "cat_admin",
    name: "ADMIN_PETTER",
    description: "Discovered hidden cat admin mode.",
    hint: "Double click cat status header...",
  },
  theme_matrix: {
    id: "theme_matrix",
    name: "CYBER_PALETTE",
    description: "Switched theme aesthetic settings.",
    hint: "Change terminal theme...",
  },
  resume_download: {
    id: "resume_download",
    name: "CV_DOWNLOADED",
    description: "Triggered resume download command.",
    hint: "Request developer resume in CLI...",
  },
  boot_skip: {
    id: "boot_skip",
    name: "SPEED_BOOT",
    description: "Fast-forwarded OS boot sequence.",
    hint: "Skip boot loading screen...",
  },
};

export const TOTAL_SECRETS_COUNT = Object.keys(SECRETS_LIST).length;

const STORAGE_KEY = "sank_os_discovered_secrets";

export function getDiscoveredSecrets(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDiscoveredSecret(id: string): { isNew: boolean; count: number; secret?: Secret } {
  if (typeof window === "undefined" || !SECRETS_LIST[id]) {
    return { isNew: false, count: 0 };
  }
  try {
    const current = getDiscoveredSecrets();
    if (!current.includes(id)) {
      const updated = [...current, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return {
        isNew: true,
        count: updated.length,
        secret: SECRETS_LIST[id],
      };
    }
    return { isNew: false, count: current.length, secret: SECRETS_LIST[id] };
  } catch {
    return { isNew: false, count: 0 };
  }
}
