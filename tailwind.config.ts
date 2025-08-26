import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // PicklePath semantic color system
        brand: {
          teal: { DEFAULT: "#00BFA6", hover: "#10CFB6", ring: "#14B8A6" },
          coral: { DEFAULT: "#FF5A5F" },
          gold: "#FACC15",
        },
        ink: {
          heading: "#F8FAFC",
          body: "#CBD5E1",
          muted: "#94A3B8",
        },
        navy: {
          base: "#0B1621",
          s1: "#0F1A24",
          s2: "#132233",
          outline: "#244055"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        'brand-teal': '0 10px 25px -3px rgba(0, 191, 166, 0.25)',
        'brand-gold': '0 10px 25px -3px rgba(250, 204, 21, 0.25)',
        'brand-coral': '0 10px 25px -3px rgba(255, 90, 95, 0.25)',
        'purple': '0 10px 25px -3px rgba(147, 51, 234, 0.25)',
        'emerald': '0 10px 25px -3px rgba(16, 185, 129, 0.25)',
        'amber': '0 10px 25px -3px rgba(245, 158, 11, 0.25)',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
