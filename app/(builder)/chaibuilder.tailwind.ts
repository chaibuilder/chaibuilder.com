import { getChaiBuilderTailwindConfig } from "@chaibuilder/pages/tailwind";
export default getChaiBuilderTailwindConfig([
  "./app/(builder)/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/builder/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@chaibuilder/pages/dist/**/*.{js,cjs}",
  "./node_modules/@chaibuilder/sdk/dist/**/*.{js,cjs}",
]);
