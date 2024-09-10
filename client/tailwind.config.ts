import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /text-(default|word|excel|ppt|jpg|openoffice)/,
      variants: ["hover"],
    },
    {
      pattern: /bg-(default|word|excel|ppt|jpg|openoffice)/,
      variants: ["hover"],
    },
    {
      pattern: /border-(default|word|excel|ppt|jpg|openoffice)/,
      variants: ["hover"],
    },
    {
      pattern: /fill-(default|word|excel|ppt|jpg|openoffice)/,
      variants: ["hover"],
    },
  ],
  theme: {
    extend: {
      colors: {
        default: {
          DEFAULT: "#e74c3c",
          light: "#faf6f6",
        },
        word: {
          DEFAULT: "#2980b9",
          light: "#f2f9fe",
        },
        excel: {
          DEFAULT: "#27ae60",
          light: "#f9fefb",
        },
        ppt: {
          DEFAULT: "#d35400",
          light: "#fffcfa",
        },
        jpg: {
          DEFAULT: "#9b59b6",
          light: "#fdf8ff",
        },
        openoffice: {
          DEFAULT: "#3498db",
          light: "#f8fcff",
        },
      },
    },
  },
  plugins: [],
};
export default config;
