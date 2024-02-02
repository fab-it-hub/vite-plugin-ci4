import type { UserConfig } from "vite";

import { joinPaths } from "@utils/string";
import type { PluginConfig } from "src/types";

export const _resolveOutDir = (
	config: UserConfig,
	pluginConfig: Required<PluginConfig>,
	isSSR: boolean
): string | undefined =>
	config.build?.rollupOptions?.input ?? isSSR
		? pluginConfig.ssrOutputDirectory
		: joinPaths(pluginConfig.publicDirectory, pluginConfig.buildDirectory);
