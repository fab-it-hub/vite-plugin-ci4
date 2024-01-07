import {defineBuildConfig} from "unbuild";

export default defineBuildConfig({
	entries: ["./src/index"],
	outDir: "./dist",
	externals: ["vite"],
	declaration: true,
	clean: true,
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
		esbuild: {
			minify: true,
		},
	},
});
