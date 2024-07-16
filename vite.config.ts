/// <reference types="vitest" />
import { resolve } from "node:path";
import { type LibraryOptions, defineConfig } from "vite";

const libOptions: Record<string, LibraryOptions> = {
	default: {
		entry: resolve(__dirname, "src/index.ts"),
		name: "fancyTextFill",
		fileName: "fancy-text-fill",
	},
	plugin: {
		entry: resolve(__dirname, "src/jquery.plugin.ts"),
		name: "fancyTextFill",
		fileName: "fancy-text-fill.jquery",
	},
};

const optionName = process.env.BUILD_PACKAGE_NAME ?? "default";

export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			...libOptions[optionName],
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
			name: "chrome",
		},
	},
});
