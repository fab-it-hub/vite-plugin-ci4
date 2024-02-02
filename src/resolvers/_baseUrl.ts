import type { ConfigEnv, UserConfig } from "vite";
import type { PluginConfig } from "src/types";

export const _resolveBaseUrl = (
	env: ConfigEnv,
	config: UserConfig,
	pluginConfig: Required<PluginConfig>,
	assetUrl: string
): string =>
	config.base ??
	(env.command === "build" ? new URL(pluginConfig.buildDirectory, assetUrl).href : "");
