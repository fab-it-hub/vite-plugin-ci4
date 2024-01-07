import type {AppConfig} from "@type/constant";

export const appConfig: AppConfig = {
	// Placeholders
	placeholder: "app.baseURL",
	placeholderRegExp: /{{app.baseURL}}/g,

	// Paths
	serverListener: "index.html",
	composerPath: "composer.lock",
	packageJsonPath: "./package.json",

	// Plugin
	plugin: "ci4",
	pluginName: "@fabithub/vite-plugin-ci4:",

	// Framework
	frameworkName: "CodeIgniter:              ",
	framework: "codeigniter4/framework",
};
