import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta da marca Gabriela Silva: verde-petróleo (autoridade clínica,
        // vem do logotipo) + rosa suave (acolhimento, vem do cartão) + neutros
        // quentes. Os nomes dos tokens (sage/mist/dusk/sand/ink) foram
        // mantidos da versão anterior para não exigir refatorar todos os
        // componentes — apenas os valores hex mudaram para a nova marca.
        sage: {
          50: "#EFF6F5",
          100: "#DCEEEB",
          200: "#B7DCD5",
          300: "#8CC5BA",
          400: "#5EA89B",
          500: "#217F73", // primária (verde-petróleo do logo)
          600: "#1A6459",
          700: "#17544B",
          800: "#14453D",
          900: "#103732",
        },
        mist: {
          50: "#F1F8F7",
          100: "#DFF0EE",
          200: "#BFE1DD",
          300: "#96CDC6",
          400: "#6BB6AC", // secundária (verde-água mais claro)
          500: "#4C9A90",
          600: "#3D7D75",
          700: "#33665F",
          800: "#2A534E",
          900: "#234441",
        },
        dusk: {
          50: "#FDF3F3",
          100: "#FAE3E3",
          200: "#F3C7C8", // rosa do cartão (fundo/acento suave)
          300: "#E9A6A9",
          400: "#DD8489", // acento (rosa acolhedora)
          500: "#C96872",
          600: "#A8535C",
          700: "#86424A",
          800: "#6B363C",
          900: "#572D32",
        },
        sand: {
          50: "#FAFAF8",
          100: "#F5F4F0", // fundo principal
          200: "#EDEBE4",
          300: "#E0DCD1",
        },
        ink: {
          700: "#2E3A38", // texto principal
          800: "#24302E",
          900: "#1C2624",
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
