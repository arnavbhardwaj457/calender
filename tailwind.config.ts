import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.4rem",
        "3xl": "1.8rem"
      },
      boxShadow: {
        soft: "0 12px 24px -12px rgba(0, 0, 0, 0.2)"
      },
      fontFamily: {
        sans: ["Trebuchet MS", "Segoe UI", "ui-sans-serif", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "ui-serif", "serif"]
      },
      backgroundImage: {
        paper:
          "radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.85), transparent 45%), radial-gradient(circle at 80% 100%, rgba(255, 255, 255, 0.35), transparent 45%)"
      }
    }
  },
  plugins: [animate]
} satisfies Config;

export default config;
