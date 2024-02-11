/* eslint-disable indent */
import type { AliasOptions, UserConfig } from "vite";
import { appConfig } from "@config/constant";

export const _resolveAliases = (config: UserConfig): AliasOptions =>
	Array.isArray(config.resolve?.alias)
		? [
				...(config.resolve?.alias ?? []),
				...Object.keys(appConfig.alias).map((alias) => ({
					find: alias,
					replacement: appConfig.alias[alias]
				}))
			]
		: { ...appConfig.alias, ...config.resolve?.alias };
