import { chaiBuilderPlugin, getChaiBuilderTheme } from "@chaibuilder/pro/utils";
import aspectRatio from "@tailwindcss/aspect-ratio";
import containerQueries from "@tailwindcss/container-queries";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const chaiTheme = getChaiBuilderTheme();

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@chaibuilder/pro/dist/**/*.{js,cjs}",
  ],
  theme: {
    extend: {
      ...chaiTheme,
      colors: {
        ...chaiTheme.colors,
        surface: "hsl(var(--surface))",
      },
    },
  },
  plugins: [
    chaiBuilderPlugin,
    aspectRatio,
    containerQueries,
    forms,
    typography,
  ],
};
