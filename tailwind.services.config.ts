import type { Config } from "tailwindcss";

// Services site (/) — loaded only via app/(services)/services.css.
// Colours are CSS variables so the same classes serve the light and dark themes
// (values live in services.css under [data-theme]).
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/services/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/services/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: token("canvas"),
        surface: token("surface"),
        "surface-2": token("surface-2"),
        ink: token("ink"),
        "ink-muted": token("ink-muted"),
        line: token("line"),
        accent: token("accent"),
        "accent-soft": token("accent-soft"),
        "accent-ink": token("accent-ink"),
        inverse: token("inverse"),
        "inverse-ink": token("inverse-ink"),
        "inverse-muted": token("inverse-muted"),
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "76rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
