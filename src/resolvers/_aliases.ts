import type { AliasOptions, UserConfig } from "vite";
import { appConfig } from "@config/constant";

export const _resolveAliases = (config: UserConfig): AliasOptions => {
	if (Array.isArray(config.resolve?.alias)) {
		return [
			...(config.resolve?.alias ?? []),
			...Object.keys(appConfig.alias).map((alias) => ({
				find: alias,
				replacement: appConfig.alias[alias]
			}))
		];
	}
	return {
		...appConfig.alias,
		...config.resolve?.alias
	};
};
