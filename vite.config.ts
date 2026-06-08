import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    vinext(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
  resolve: {
    alias: [
      { find: /^nanoid$/, replacement: 'nanoid/non-secure' }
    ]
  },
  ssr: {
    external: ['browserslist', 'autoprefixer', 'tailwindcss', 'postcss']
  },
  build: {
    rolldownOptions: {
      external: ['canvas']
    },
    rollupOptions: {
      external: ['canvas']
    }
  }
});
