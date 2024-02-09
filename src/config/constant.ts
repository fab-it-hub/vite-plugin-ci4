import { getCurrentPath } from "@utils/uri";
import type { AppConfig } from "src/types";

export const appConfig: AppConfig = {
	hotFile: "hot",
	buildDirectory: "build",
	publicDirectory: "public",
	ssrOutputDirectory: "writable/ssr",

	alias: {
		"@components": "/resources/components",
		"@contexts": "/resources/contexts",
		"@layouts": "/resources/layouts",
		"@styles": "/resources/styles",
		"@utils": "/resources/utils",
		"@hooks": "/resources/hooks",
		types: "/resources/types"
	},

	refreshPaths: [
		"app/Views/*",
		"modules/**/Views/*",
		"app/Config/Routes.php",
		"modules/**/Config/Routes.php"
	],

	// Plugin
	plugin: "ci4",
	pluginName: "@fabithub/vite-plugin-ci4",

	// Framework
	frameworkName: "CodeIgniter",
	frameworkCompatibleVersion: "4.1.5",
	framework: "codeigniter4/framework",

	// Manifests
	manifestPath: "manifest.json",
	ssrManifestPath: "manifest.json",

	// Placeholders
	assets: "app_assetURL",
	placeholder: "app_baseURL",
	placeholderRegExp: /{{app_baseURL}}/g,

	// Paths
	serverListener: "index.html",
	composerPath: "composer.lock",
	packageJsonPath: getCurrentPath() + "../package.json"
};
