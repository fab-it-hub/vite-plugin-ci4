import path from "path";
import {defineBuildConfig} from "unbuild";

export default defineBuildConfig({
	entries: ["src/index"],
	outDir: "dist",
	externals: ["vite"],
	declaration: true,
	clean: true,
	rollup: {
		alias: {
			entries: [
				{find: "@type", replacement: path.resolve("src/types/")},
				{find: "@config", replacement: path.resolve("src/config/")},
				{find: "@utils", replacement: path.resolve("src/utils/")},
			],
		},
		emitCJS: true,
		inlineDependencies: true,
		esbuild: {
			minify: true,
		},
	},
});
