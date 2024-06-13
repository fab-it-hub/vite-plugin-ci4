import { addSlash } from '@utils/uri'
import type { PluginConfig } from 'src/types'
import type { ConfigEnv, UserConfig } from 'vite'

export const _resolveBaseUrl = (
	env: ConfigEnv,
	config: UserConfig,
	pluginConfig: Required<PluginConfig>,
	assetUrl: string
): string =>
	config.base ??
	(env.command === 'build'
		? addSlash(assetUrl).concat(addSlash(pluginConfig.buildDirectory))
		: '')
