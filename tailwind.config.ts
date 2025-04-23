/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
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
    themes: ["light", "dark"], // Configure DaisyUI themes
  },

  /*  plugins: [require("daisyui")], */
};
export default config;
