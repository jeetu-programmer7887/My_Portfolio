import type { Config } from "tailwindcss";

// Services site (/) — loaded only via app/(services)/services.css.
// Colours are CSS variables so the same classes serve the light and dark themes
// (values live in services.css under [data-theme]). Several tokens carry their own
// alpha, so opacity modifiers (bg-accent/40) are not supported — use a token instead.
const token = (name: string) => `var(--${name})`;

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
        tint: token("tint"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        accent: token("accent"),
        "accent-ink": token("accent-ink"),
        "accent-soft": token("accent-soft"),
        "inv-accent": token("inv-accent"),
        "inv-muted": token("inv-muted"),
        "inv-fill": token("inv-fill"),
        "inv-line": token("inv-line"),
        ok: token("ok"),
        live: "#3FA66B",
        glass: token("glass"),
        "chrome-ink": token("chrome-ink"),
        "chrome-muted": token("chrome-muted"),
        "chrome-accent": token("chrome-accent"),
        "chrome-accent-ink": token("chrome-accent-ink"),
        "chrome-line": token("chrome-line"),
        foot: token("foot"),
        "foot-ink": token("foot-ink"),
        "foot-muted": token("foot-muted"),
        "foot-accent": token("foot-accent"),
        "foot-line": token("foot-line"),
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        lg: "var(--shadow-lg)",
      },
      maxWidth: {
        site: "1280px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(.16,1,.3,1)",
        "in-out": "cubic-bezier(.76,0,.24,1)",
      },
      screens: {
        // The design switches between its phone and desktop layouts at 1000px.
        wide: "1000px",
      },
    },
  },
  plugins: [],
};

export default config;
