import { getChaiBuilderTailwindConfig } from "@chaibuilder/next/utils";

export default getChaiBuilderTailwindConfig({
  content: ["./node_modules/@chaibuilder/next/dist/**/*.{js,cjs}"],
  theme: {},
});
