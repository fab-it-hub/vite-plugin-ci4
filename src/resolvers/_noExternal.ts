import type { SSROptions, UserConfig } from "vite";
import { appConfig } from "@config/constant";

export const _resolveNoExternal = (config: UserConfig): true | Array<string | RegExp> => {
	const userNoExternal = (config.ssr as SSROptions | undefined)?.noExternal;
	const pluginNoExternal = [appConfig.pluginName];

	if (userNoExternal === true) {
		return true;
	}

	if (typeof userNoExternal === "undefined") {
		return pluginNoExternal;
	}

	return [
		...(Array.isArray(userNoExternal) ? userNoExternal : [userNoExternal]),
		...pluginNoExternal
	];
};
