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
        surface: "#0F1117",
        "surface-light": "#161922",
        "border-subtle": "rgba(255, 255, 255, 0.08)",
        "border-hover": "rgba(255, 255, 255, 0.16)",
        accent: {
          blue: "#3B82F6",
          violet: "#8B5CF6",
          cyan: "#06B6D4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-slow": "glow 6s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { opacity: "0.4", transform: "scale(1)" },
          "100%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
