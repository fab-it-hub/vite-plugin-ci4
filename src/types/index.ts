import type { AddressInfo } from "net";
import type { ConfigEnv, Plugin, UserConfig } from "vite";
import type { Config as FullReloadConfig } from "vite-plugin-full-reload";

export type JsonVersion = Record<"name" | "version", string>;

export interface ComposerJson extends JsonVersion {
	packages?: JsonVersion[];
}

export type IsAddressInfo = (x?: string | AddressInfo | null) => x is AddressInfo;

export type DevServerUrl = `${"http" | "https"}://${string}:${number}`;

export interface AppConfig {
	hotFile: string;
	buildDirectory: string;
	publicDirectory: string;
	ssrOutputDirectory: string;

	alias: Record<string, string>;
	refreshPaths: string[];

	manifestPath: string;
	ssrManifestPath: string;

	plugin: string;
	pluginName: string;

	framework: string;
	frameworkName: string;

	composerPath: string;
	serverListener: string;
	packageJsonPath: string;

	assets: string;
	placeholder: string;
	placeholderRegExp: string | RegExp;
}

export interface RefreshConfig {
	paths: string[];
	config?: FullReloadConfig;
}

export interface PluginConfig {
	/**
	 * The path or paths of the entry points to compile.
	 */
	input: string | string[];

	/**
	 * Project's public directory.
	 *
	 * @default 'public'
	 */
	publicDirectory?: string;

	/**
	 * The public subdirectory where compiled assets should be written.
	 *
	 * @default 'build'
	 */
	buildDirectory?: string;

	/**
	 * The path to the "hot" file.
	 *
	 * @default `${publicDirectory}/hot`
	 */
	hotFile?: string;

	/**
	 * The path of the SSR entry point.
	 */
	ssr?: string | string[];

	/**
	 * The directory where the SSR bundle should be written.
	 *
	 * @default 'writable/ssr'
	 */
	ssrOutputDirectory?: string;

	/**
	 * Configuration for performing full page refresh on blade (or other) file changes.
	 *
	 * {@link https://github.com/ElMassimo/vite-plugin-full-reload}
	 * @default false
	 */
	refresh?: boolean | string | string[] | RefreshConfig | RefreshConfig[];

	/**
	 * Transform the code while serving.
	 */
	transformOnServe?: (code: string, url: string) => string;
}

export interface Ci4Plugin extends Plugin {
	config: (config: UserConfig, env: ConfigEnv) => UserConfig;
}
