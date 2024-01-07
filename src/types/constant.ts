export declare interface AppConfig {
	plugin: string;
	pluginName: string;

	framework: string;
	frameworkName: string;

	composerPath: string;
	serverListener: string;
	packageJsonPath: string;

	placeholder: string;
	placeholderRegExp: string | RegExp;
}
