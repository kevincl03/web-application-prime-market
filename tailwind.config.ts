/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  /* --add component */
  plugins: [daisyui], // DaisyUI plugin
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
  },

  /*  plugins: [require("daisyui")], */
};
export default config;
