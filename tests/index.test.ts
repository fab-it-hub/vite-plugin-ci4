import { describe, expect, it } from "bun:test";

import ci4 from "src";
import type { Ci4Plugin } from "src/types";

describe("@fabithub/vite-plugin-ci4", () => {
	it("handles missing configuration", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(() => ci4()).toThrow("@fabithub/vite-plugin-ci4: missing configuration.");

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(() => ci4({})).toThrow(
			"@fabithub/vite-plugin-ci4: missing configuration for 'input'."
		);
	});

	it("accepts a single input", () => {
		const plugin = ci4("resources/js/app.ts") as Ci4Plugin[];

		const config = plugin[0].config({}, { command: "build", mode: "production" });
		expect(config.build?.rollupOptions?.input).toBe("resources/js/app.ts");

		const ssrConfig = plugin[0].config(
			{ build: { ssr: true } },
			{ command: "build", mode: "production" }
		);
		expect(ssrConfig.build?.rollupOptions?.input).toBe("resources/js/app.ts");
	});

	it("accepts an array of inputs", () => {
		const plugin = ci4(["resources/js/app.ts", "resources/js/other.js"]) as Ci4Plugin[];

		const config = plugin[0].config({}, { command: "build", mode: "production" });
		expect(config.build?.rollupOptions?.input).toEqual([
			"resources/js/app.ts",
			"resources/js/other.js"
		]);

		const ssrConfig = plugin[0].config(
			{ build: { ssr: true } },
			{ command: "build", mode: "production" }
		);
		expect(ssrConfig.build?.rollupOptions?.input).toEqual([
			"resources/js/app.ts",
			"resources/js/other.js"
		]);
	});

	it("accepts a full configuration", () => {
		const plugin = ci4({
			input: "resources/js/app.ts",
			publicDirectory: "other-public",
			buildDirectory: "other-build",
			ssr: "resources/js/ssr.ts",
			ssrOutputDirectory: "other-ssr-output"
		}) as Ci4Plugin[];

		const config = plugin[0].config({}, { command: "build", mode: "production" });
		expect(config.base).toBe("/other-build/");
		expect(config.build?.manifest).toBe("manifest.json");
		expect(config.build?.outDir).toBe("other-public/other-build");
		expect(config.build?.rollupOptions?.input).toBe("resources/js/app.ts");

		const ssrConfig = plugin[0].config(
			{ build: { ssr: true } },
			{ command: "build", mode: "production" }
		);
		expect(ssrConfig.base).toBe("/other-build/");
		expect(ssrConfig.build?.manifest).toBe(false);
		expect(ssrConfig.build?.outDir).toBe("other-ssr-output");
		expect(ssrConfig.build?.rollupOptions?.input).toBe("resources/js/ssr.ts");
	});

	it("respects the users build.manifest config option", () => {
		const plugin = ci4({ input: "resources/js/app.js" }) as Ci4Plugin[];

		const userConfig = { build: { manifest: "my-custom-manifest.json" } };
		const config = plugin[0].config(userConfig, { command: "build", mode: "production" });

		expect(config.build?.manifest).toBe("my-custom-manifest.json");
	});

	it("has a default manifest path", () => {
		const plugin = ci4({ input: "resources/js/app.js" }) as Ci4Plugin[];

		const userConfig = {};
		const config = plugin[0].config(userConfig, { command: "build", mode: "production" });

		expect(config.build?.manifest).toBe("manifest.json");
	});

	it("respects users base config option", () => {
		const plugin = ci4({ input: "resources/js/app.ts" }) as Ci4Plugin[];

		const userConfig = { base: "/foo/" };
		const config = plugin[0].config(userConfig, { command: "build", mode: "production" });

		expect(config.base).toBe("/foo/");
	});

	it("accepts a partial configuration", () => {
		const plugin = ci4({
			input: "resources/js/app.js",
			ssr: "resources/js/ssr.js"
		}) as Ci4Plugin[];

		const config = plugin[0].config({}, { command: "build", mode: "production" });
		expect(config.base).toBe("/build/");
		expect(config.build?.manifest).toBe("manifest.json");
		expect(config.build?.outDir).toBe("public/build");
		expect(config.build?.rollupOptions?.input).toBe("resources/js/app.js");

		const ssrConfig = plugin[0].config(
			{ build: { ssr: true } },
			{ command: "build", mode: "production" }
		);
		expect(ssrConfig.base).toBe("/build/");
		expect(ssrConfig.build?.manifest).toBe(false);
		expect(ssrConfig.build?.outDir).toBe("writable/ssr");
		expect(ssrConfig.build?.rollupOptions?.input).toBe("resources/js/ssr.js");
	});

	it("uses the default entry point when ssr entry point is not provided", () => {
		// This is support users who may want a dedicated Vite config for SSR.
		const plugin = ci4("resources/js/ssr.js") as Ci4Plugin[];

		const ssrConfig = plugin[0].config(
			{ build: { ssr: true } },
			{ command: "build", mode: "production" }
		);
		expect(ssrConfig.build?.rollupOptions?.input).toBe("resources/js/ssr.js");
	});

	it("prefixes the base with ASSET_URL in production mode", () => {
		process.env["app_assetURL"] = "http://example.com";
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];

		const devConfig = plugin[0].config({}, { command: "serve", mode: "development" });
		expect(devConfig.base).toBe("");

		const prodConfig = plugin[0].config({}, { command: "build", mode: "production" });
		expect(prodConfig.base).toBe("http://example.com/build/");

		delete process.env["app_assetURL"];
	});

	it("prevents setting an empty publicDirectory", () => {
		expect(() => ci4({ input: "resources/js/app.js", publicDirectory: "" })).toThrow(
			"@fabithub/vite-plugin-ci4: publicDirectory must be a subdirectory. E.g. 'public'."
		);
	});

	it("prevents setting an empty buildDirectory", () => {
		expect(() => ci4({ input: "resources/js/app.js", buildDirectory: "" })).toThrow(
			"@fabithub/vite-plugin-ci4: buildDirectory must be a subdirectory. E.g. 'build'."
		);
	});

	it("handles surrounding slashes on directories", () => {
		const plugin = ci4({
			input: "resources/js/app.js",
			publicDirectory: "/public/test/",
			buildDirectory: "/build/test/",
			ssrOutputDirectory: "/ssr-output/test/"
		}) as Ci4Plugin[];

		const config = plugin[0].config({}, { command: "build", mode: "production" });
		expect(config.base).toBe("/build/test/");
		expect(config.build?.outDir).toBe("public/test/build/test");

		const ssrConfig = plugin[0].config(
			{ build: { ssr: true } },
			{ command: "build", mode: "production" }
		);
		expect(ssrConfig.build?.outDir).toBe("ssr-output/test");
	});

	it("provides an @components alias by default", () => {
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];
		const config = plugin[0].config({}, { command: "build", mode: "development" });
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(config.resolve?.alias?.["@components"]).toBe("/resources/components");
	});

	it("provides an @contexts alias by default", () => {
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];
		const config = plugin[0].config({}, { command: "build", mode: "development" });

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(config.resolve?.alias?.["@contexts"]).toBe("/resources/contexts");
	});

	it("provides an @hooks alias by default", () => {
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];
		const config = plugin[0].config({}, { command: "build", mode: "development" });

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(config.resolve?.alias?.["@hooks"]).toBe("/resources/hooks");
	});

	it("provides an @layouts alias by default", () => {
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];
		const config = plugin[0].config({}, { command: "build", mode: "development" });

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(config.resolve?.alias?.["@layouts"]).toBe("/resources/layouts");
	});

	it("provides an @styles alias by default", () => {
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];
		const config = plugin[0].config({}, { command: "build", mode: "development" });

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(config.resolve?.alias?.["@styles"]).toBe("/resources/styles");
	});

	it("provides an @utils alias by default", () => {
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];
		const config = plugin[0].config({}, { command: "build", mode: "development" });

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(config.resolve?.alias?.["@utils"]).toBe("/resources/utils");
	});

	it("define new @ alias by user", () => {
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];

		const config = plugin[0].config(
			{ resolve: { alias: { "@": "/somewhere/else" } } },
			{ command: "build", mode: "development" }
		);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(config.resolve?.alias?.["@"]).toBe("/somewhere/else");
	});

	it("respects a users existing @components alias", () => {
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];

		const config = plugin[0].config(
			{ resolve: { alias: { "@components": "/somewhere/else" } } },
			{ command: "build", mode: "development" }
		);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		expect(config.resolve?.alias?.["@components"]).toBe("/somewhere/else");
	});

	it("appends an Alias object when using an alias array", () => {
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];
		const config = plugin[0].config(
			{ resolve: { alias: [{ find: "@components", replacement: "/something/else" }] } },
			{ command: "build", mode: "development" }
		);

		expect(config.resolve?.alias).toEqual([
			{
				find: "@components",
				replacement: "/something/else"
			},
			{
				find: "@components",
				replacement: "/resources/components"
			},
			{
				find: "@contexts",
				replacement: "/resources/contexts"
			},
			{
				find: "@layouts",
				replacement: "/resources/layouts"
			},
			{
				find: "@styles",
				replacement: "/resources/styles"
			},
			{
				find: "@utils",
				replacement: "/resources/utils"
			},
			{
				find: "@hooks",
				replacement: "/resources/hooks"
			},
			{
				find: "types",
				replacement: "/resources/types"
			}
		]);
	});

	it("prevents the Inertia helpers from being externalized", () => {
		/* eslint-disable @typescript-eslint/ban-ts-comment */
		const plugin = ci4("resources/js/app.js") as Ci4Plugin[];

		const noSsrConfig = plugin[0].config(
			{ build: { ssr: true } },
			{ command: "build", mode: "production" }
		);
		expect(noSsrConfig.ssr?.noExternal).toEqual(["@fabithub/vite-plugin-ci4"]);

		const nothingExternalConfig = plugin[0].config(
			{ ssr: { noExternal: true }, build: { ssr: true } },
			{ command: "build", mode: "production" }
		);
		expect(nothingExternalConfig.ssr?.noExternal).toBe(true);

		const arrayNoExternalConfig = plugin[0].config(
			{ ssr: { noExternal: ["foo"] }, build: { ssr: true } },
			{ command: "build", mode: "production" }
		);
		expect(arrayNoExternalConfig.ssr?.noExternal).toEqual(["foo", "@fabithub/vite-plugin-ci4"]);

		const stringNoExternalConfig = plugin[0].config(
			{ ssr: { noExternal: "foo" }, build: { ssr: true } },
			{ command: "build", mode: "production" }
		);
		expect(stringNoExternalConfig.ssr?.noExternal).toEqual([
			"foo",
			"@fabithub/vite-plugin-ci4"
		]);
	});

	it("does not configure full reload when configuration it not an object", () => {
		const plugins = ci4("resources/js/app.js") as Ci4Plugin[];

		expect(plugins.length).toBe(1);
	});

	it("does not configure full reload when refresh is not present", () => {
		const plugins = ci4({ input: "resources/js/app.js" }) as Ci4Plugin[];

		expect(plugins.length).toBe(1);
	});

	it("does not configure full reload when refresh is set to undefined", () => {
		const plugins = ci4({ input: "resources/js/app.js", refresh: undefined }) as Ci4Plugin[];
		expect(plugins.length).toBe(1);
	});

	it("does not configure full reload when refresh is false", () => {
		const plugins = ci4({ input: "resources/js/app.js", refresh: false }) as Ci4Plugin[];

		expect(plugins.length).toBe(1);
	});

	it("configures full reload with routes and views when refresh is true", () => {
		const plugins = ci4({ input: "resources/js/app.js", refresh: true }) as Ci4Plugin[];

		expect(plugins.length).toBe(2);
		// @ts-ignore
		expect(plugins[1].__ci4_plugin_config).toEqual({
			paths: [
				"app/Views/*",
				"modules/**/Views/*",
				"app/Config/Routes.php",
				"modules/**/Config/Routes.php"
			]
		});
	});

	it("configures full reload when refresh is a single path", () => {
		const plugins = ci4({
			input: "resources/js/app.js",
			refresh: "path/to/watch/**"
		}) as Ci4Plugin[];

		expect(plugins.length).toBe(2);
		// @ts-ignore
		expect(plugins[1].__ci4_plugin_config).toEqual({ paths: ["path/to/watch/**"] });
	});

	it("configures full reload when refresh is an array of paths", () => {
		const plugins = ci4({
			input: "resources/js/app.js",
			refresh: ["path/to/watch/**", "another/to/watch/**"]
		}) as Ci4Plugin[];

		expect(plugins.length).toBe(2);
		// @ts-ignore
		expect(plugins[1].__ci4_plugin_config).toEqual({
			paths: ["path/to/watch/**", "another/to/watch/**"]
		});
	});

	it("configures full reload when refresh is a complete configuration to proxy", () => {
		const plugins = ci4({
			input: "resources/js/app.js",
			refresh: {
				paths: ["path/to/watch/**", "another/to/watch/**"],
				config: { delay: 987 }
			}
		}) as Ci4Plugin[];

		expect(plugins.length).toBe(2);
		// @ts-ignore
		expect(plugins[1].__ci4_plugin_config).toEqual({
			paths: ["path/to/watch/**", "another/to/watch/**"],
			config: { delay: 987 }
		});
	});

	it("configures full reload when refresh is an array of complete configurations to proxy", () => {
		const plugins = ci4({
			input: "resources/js/app.js",
			refresh: [
				{
					paths: ["path/to/watch/**"],
					config: { delay: 987 }
				},
				{
					paths: ["another/to/watch/**"],
					config: { delay: 123 }
				}
			]
		}) as Ci4Plugin[];

		expect(plugins.length).toBe(3);
		// @ts-ignore
		expect(plugins[1].__ci4_plugin_config).toEqual({
			paths: ["path/to/watch/**"],
			config: { delay: 987 }
		});
		// @ts-ignore
		expect(plugins[2].__ci4_plugin_config).toEqual({
			paths: ["another/to/watch/**"],
			config: { delay: 123 }
		});
	});
});
