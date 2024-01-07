import type {AppConfig} from "@type/constant";

export const appConfig: AppConfig = {
	pluginName: "ci4",
	placeholder: "app.baseURL",
	frameworkName: "CodeIgniter",
	composerPath: "composer.lock",
	serverEntryPoint: "index.html",
	packageJsonPath: "./package.json",
	framework: "codeigniter4/framework",
	placeholderRegExp: /{{app.baseURL}}/g,
};
