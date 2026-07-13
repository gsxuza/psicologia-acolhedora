import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "acolhedora": salvia (calma/confiança), azul-bruma (serenidade),
        // rosa-poeira (acolhimento) e neutros quentes. Evita o cliché
        // creme+serifa+terracota: aqui o acento é o rosa-poeira, não terracota.
        sage: {
          50: "#F3F6F3",
          100: "#E4EBE3",
          200: "#C7D6C4",
          300: "#A3BD9E",
          400: "#82A47B",
          500: "#658A5D", // primária
          600: "#516F4A",
          700: "#42583C",
          800: "#374832",
          900: "#2E3C2A",
        },
        mist: {
          50: "#F2F7FA",
          100: "#E2EEF3",
          200: "#C4DDE7",
          300: "#9FC5D5",
          400: "#78A9BF", // secundária
          500: "#5A8CA4",
          600: "#48708A",
          700: "#3C5B70",
          800: "#324A5B",
          900: "#2A3D4B",
        },
        dusk: {
          50: "#FBF3F2",
          100: "#F5E1DE",
          200: "#EAC1BC",
          300: "#DA9C95", // acento (rosa-poeira, acolhimento)
          400: "#C87E75",
          500: "#B0645B",
          600: "#8F4F48",
          700: "#733F3A",
          800: "#5F3531",
          900: "#4F2D2A",
        },
        sand: {
          50: "#FBFAF7",
          100: "#F7F4EE", // fundo principal
          200: "#EFEAE0",
          300: "#E2DAC9",
        },
        ink: {
          700: "#33413D", // texto principal
          800: "#293530",
          900: "#1F2823",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(51, 65, 61, 0.12)",
        softer: "0 2px 12px -4px rgba(51, 65, 61, 0.08)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.08)", opacity: "0.85" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        breathe: "breathe 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
