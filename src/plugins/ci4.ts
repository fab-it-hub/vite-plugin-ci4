import type { ResolvedConfig } from 'vite'

import { appConfig } from '@config/constant'
import { handleConfigureServer } from '@handlers/server'
import { configResolver } from '@resolvers/config'
import type { Ci4Plugin, PluginConfig } from 'src/types'

export const ci4 = (_config: Required<PluginConfig>): Ci4Plugin => {
	let devServerUrl: string
	let config: ResolvedConfig

	return {
		enforce: 'post',
		name: appConfig.plugin,
		config: (config, env) => configResolver(config, env, _config),
		configResolved: (resolveConfig) => {
			config = resolveConfig
		},
		transform: (code) => {
			if (config.command === 'serve') {
				code = code.replace(/__ci4_vite_placeholder__/g, devServerUrl)

				return _config.transformOnServe(code, devServerUrl)
			}
		},
		configureServer: handleConfigureServer
	}
}
