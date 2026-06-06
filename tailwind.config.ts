import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0b0d10",
          panel: "#12161c",
          raised: "#181d24",
          border: "#222a33",
        },
        accent: {
          DEFAULT: "#5eead4",
          muted: "#2dd4bf",
          dim: "#0d9488",
        },
        text: {
          DEFAULT: "#e6edf3",
          dim: "#9aa6b2",
          faint: "#5e6b78",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
