import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "fancyTextFill",
      fileName: "fancy-text-fill",
      formats: ["umd", "es"],
    },
    rollupOptions: {
      external: ["jquery"],
      //   output: {
      //     // // Provide global variables to use in the UMD build
      //     // // for externalized deps
      //     // globals: {
      //     //   vue: "Vue",
      //     // },
      //   },
    },
  },
  test: {
    browser: {
      enabled: true,
      name: "chrome", // browser name is required
    },
  },
});
