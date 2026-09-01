/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        navy: "hsl(var(--navy))",
        "navy-light": "hsl(var(--navy-light))",
        "navy-dark": "hsl(var(--navy-dark))",
        neon: "hsl(var(--neon))",
        amber: "hsl(var(--amber))",
        violet: "hsl(var(--violet))",
        "earth-50": "hsl(var(--earth-50))",
        "earth-400": "hsl(var(--earth-400))",
        "earth-500": "hsl(var(--earth-500))",
        "earth-950": "hsl(var(--earth-950))",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
        serif: ["Playfair Display", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        medium: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 4px 20px -4px hsl(var(--foreground) / 0.08)",
        "soft-lg": "0 10px 40px -10px hsl(var(--foreground) / 0.12)",
        neon: "0 0 24px -6px rgba(0,240,255,0.7)",
        "neon-sm": "0 0 14px -6px rgba(0,240,255,0.55)",
      },
    },
  },
  plugins: [],
};
