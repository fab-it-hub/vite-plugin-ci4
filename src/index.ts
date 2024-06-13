import type { Plugin, PluginOption } from 'vite'

import { ci4 } from '@plugins/ci4'
import { resolveFullReloadConfig } from '@plugins/fullReload'
import { resolvePluginConfig } from '@resolvers/pluginConfig'

import type { PluginConfig } from './types'

const plugin = (config: string | string[] | PluginConfig): PluginOption => {
	const pluginConfig = resolvePluginConfig(config)

	return [ci4(pluginConfig), ...(resolveFullReloadConfig(pluginConfig) as Plugin[])]
}

export default plugin
