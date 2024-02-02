import type { UserConfig } from "vite";
import type { PluginConfig } from "src/types";

export const _resolveInputs = (
	config: UserConfig,
	pluginConfig: Required<PluginConfig>,
	isSSR: boolean
): Partial<Record<"input", string | string[]>> => ({
	input: config.build?.rollupOptions?.input ?? isSSR ? pluginConfig.ssr : pluginConfig.input
});
