import type { ConfigEnv, UserConfig } from "vite";
import type { PluginConfig } from "src/types";
import { addSlash } from "@utils/uri";

export const _resolveBaseUrl = (
	env: ConfigEnv,
	config: UserConfig,
	pluginConfig: Required<PluginConfig>,
	assetUrl: string
): string =>
	config.base ??
	(env.command === "build"
		? addSlash(assetUrl).concat(addSlash(pluginConfig.buildDirectory))
		: "");
