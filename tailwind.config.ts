import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: {
          DEFAULT: "#F5F5DC",
          light: "#FFFDF5",
          dark: "#E5E5C0",
        },
        "dark-green": {
          DEFAULT: "#004225",
          light: "#005C34",
          dark: "#002917",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C158",
          dark: "#A3862A",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-geist-mono)", "ui-serif", "Georgia"],
      },
    },
  },
  plugins: [],
};
export default config;
