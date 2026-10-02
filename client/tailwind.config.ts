import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1E4F",
        royal: "#2563EB",
        saffron: "#F59E0B",
        steelgreen: "#22C55E",
        danger: "#EF4444",
        mist: "#F8FAFC"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(245,158,11,0.45), 0 0 26px rgba(245,158,11,0.45)",
        glass: "0 18px 45px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        "steel-grid": "linear-gradient(rgba(11,30,79,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(11,30,79,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
