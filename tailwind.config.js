/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        "surface-3": "var(--color-surface-3)",
        purple: {
          DEFAULT: "var(--color-purple)",
          light: "var(--color-purple-light)",
          dim: "var(--color-purple-dim)",
          glow: "var(--color-purple-glow)",
        },
        orange: {
          DEFAULT: "var(--color-orange)",
          light: "var(--color-orange-light)",
          dim: "var(--color-orange-dim)",
          glow: "var(--color-orange-glow)",
        },
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        muted: "var(--color-text-muted)",
        faint: "var(--color-text-faint)",
        border: "var(--color-border)",
        "border-hover": "var(--color-border-hover)",
        "border-orange": "var(--color-border-orange)",
      },
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"],
        accent: ["Cormorant Garamond", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
