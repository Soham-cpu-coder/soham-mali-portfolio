import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08090D",
        surface: {
          DEFAULT: "#10121A",
          card: "#121520",
          elevated: "#181C2B",
          hover: "#1E2337",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.10)",
          subtle: "rgba(255, 255, 255, 0.06)",
          active: "rgba(59, 130, 246, 0.4)",
        },
        accent: {
          blue: "#3B82F6",
          violet: "#8B5CF6",
        },
        text: {
          primary: "#F8FAFC",
          muted: "#94A3B8",
          subtle: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        subtlePulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        "subtle-pulse": "subtlePulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
