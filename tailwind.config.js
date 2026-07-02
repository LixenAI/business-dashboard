/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        slate: {
          1: "#060E1A",
          2: "#0B1D35",
          3: "#0F2647",
          4: "#152E50",
          5: "#1A3358",
          6: "#234470",
          7: "#2E5688",
          8: "#3D6FA0",
          9: "#1A6FD4",
          10: "#3B8AE6",
          11: "#7B8DA8",
          12: "#F0F4FA",
        },
        navy: {
          deep: "#0C2D5A",
          primary: "#1A6FD4",
          soft: "#5BB8FF",
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
