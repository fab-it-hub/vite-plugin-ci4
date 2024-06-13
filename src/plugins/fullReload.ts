import type { PluginOption } from 'vite'
import fullReload from 'vite-plugin-full-reload'

import type { PluginConfig, RefreshConfig } from 'src/types'

export const resolveFullReloadConfig = ({
	refresh: config
}: Required<PluginConfig>): PluginOption[] => {
	if (typeof config === 'boolean') {
		return []
	}

	if (typeof config === 'string') {
		config = [{ paths: [config] }]
	}

	if (!Array.isArray(config)) {
		config = [config]
	}

	if (config.some((c) => typeof c === 'string')) {
		config = [{ paths: config }] as RefreshConfig[]
	}

	return (config as RefreshConfig[]).flatMap((c) => {
		const plugin = fullReload(c.paths, c.config)

		/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
		/** @ts-ignore */
		plugin.__ci4_plugin_config = c

		return plugin
	})
}
