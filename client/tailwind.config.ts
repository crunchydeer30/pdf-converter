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
      variants: ["hover", "before"],
    },
    {
      pattern: /bg-(default|word|excel|ppt|jpg|openoffice)/,
      variants: ["hover", "before"],
    },
    {
      pattern: /border-(default|word|excel|ppt|jpg|openoffice)/,
      variants: ["hover", "before"],
    },
    {
      pattern: /fill-(default|word|excel|ppt|jpg|openoffice)/,
      variants: ["hover", "before"],
    },
  ],
  theme: {
    extend: {
      colors: {
        p: {
          1: "#313131",
        },
        s: {
          1: "#505050",
        },
        default: {
          DEFAULT: "#e74c3c",
          light: "#e95e4f",
          "very-light": "#faf6f6",
        },
        word: {
          DEFAULT: "#2980b9",
          light: "#2e90d0",
          "very-light": "#f2f9fe",
        },
        excel: {
          DEFAULT: "#27ae60",
          light: "#2cc66d",
          "very-light": "#f9fefb",
        },
        ppt: {
          DEFAULT: "#d35400",
          light: "#f16000",
          "very-light": "#fffcfa",
        },
        jpg: {
          DEFAULT: "#9b59b6",
          light: "#a56abd",
          "very-light": "#fdf8ff",
        },
        openoffice: {
          DEFAULT: "#3498db",
          light: "#48a2df",
          "very-light": "#f8fcff",
        },
      },
    },
  },
  plugins: [],
};
export default config;
