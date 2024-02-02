import type { Plugin, PluginOption } from "vite";

import { resolvePluginConfig } from "@resolvers/pluginConfig";
import { resolveFullReloadConfig } from "@plugins/fullReload";
import { ci4 } from "@plugins/ci4";

import type { PluginConfig } from "./types";

const plugin = (config: string | string[] | PluginConfig): PluginOption => {
	const pluginConfig = resolvePluginConfig(config);

	return [ci4(pluginConfig), ...(resolveFullReloadConfig(pluginConfig) as Plugin[])];
};

export default plugin;
