/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        blackbox: {
          bg: "#020611",
          panel: "#06111f",
          cyan: "#00e5ff",
          green: "#6cff9b",
          red: "#ff345d",
          gold: "#f5c84c"
        }
      },
      boxShadow: {
        neon: "0 0 24px rgba(0,229,255,0.18)",
      }
    },
  },
  plugins: [],
};
