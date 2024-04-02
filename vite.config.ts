// vite.config.js
import { resolve } from "path";
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
      // make sure to externalize deps that shouldn't be bundled
      // into your library
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
