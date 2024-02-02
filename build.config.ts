import { minify } from "minify";

(async () => {
	console.log("\n🛠️  Starting building library... \n");
	const bundler = await Bun.build({
		minify: true,
		outdir: "./dist",
		target: "node",
		sourcemap: "none",
		entrypoints: ["./src/index.ts"],
		external: ["vite", "picocolors", "vite-plugin-full-reload"]
	});

	if (!bundler.success) {
		console.error("Error: Something went wrong with building library!");
		return;
	}

	const compressHtml = await minify("./index.html", {
		html: {
			removeComments: true,
			removeEmptyAttributes: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			minifyCSS: true,
			minifyJS: true,
			minifyURLs: true
		}
	});

	if (typeof compressHtml !== "string") {
		console.error("Error: Something went wrong while minify the HTML file.");
		return;
	}

	await Bun.write("./dist/index.html", compressHtml, {
		createPath: true
	});

	console.log("✅ Library build successfully.");
})();
