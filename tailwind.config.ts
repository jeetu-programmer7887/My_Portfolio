import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#080808",
        terminal: "#39FF14",
        "terminal-dim": "rgba(57, 255, 20, 0.4)",
        cream: "#F5F0E8",
        "mouse-gray": "#666666",
        charcoal: "#141414",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        "widest-xl": "0.2em",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "border-trace": "borderTrace 0.6s linear forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        borderTrace: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
