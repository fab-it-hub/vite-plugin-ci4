import { appConfig } from '@config/constant'
import type { PluginConfig } from 'src/types'

import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'

import { _resolveAliases } from './_aliases'
import { _resolveBaseUrl } from './_baseUrl'
import { _resolveInputs } from './_inputs'
import { _resolveManifest } from './_manifests'
import { _resolveNoExternal } from './_noExternal'
import { _resolveOutDir } from './_outputDirectories'

export const configResolver = (
	config: UserConfig,
	configEnv: ConfigEnv,
	pluginConfig: Required<PluginConfig>
): UserConfig => {
	const ssr = !!config.build?.ssr
	const env = loadEnv(configEnv.mode, config.envDir || process.cwd(), '')
	const assetUrl = env[appConfig.assets] ?? env[appConfig.placeholder] ?? ''

	return {
		publicDir: pluginConfig.publicDirectory ?? false,
		base: _resolveBaseUrl(configEnv, config, pluginConfig, assetUrl),
		build: {
			manifest: _resolveManifest(config, ssr),
			ssrManifest: _resolveManifest(config, ssr, true),
			outDir: _resolveOutDir(config, pluginConfig, ssr),
			rollupOptions: _resolveInputs(config, pluginConfig, ssr),
			assetsInlineLimit: config.build?.assetsInlineLimit ?? 0
		},
		// TODO - it replace server url
		// server: {origin: config.server?.origin ?? "__ci4_vite_placeholder__"},
		resolve: { alias: _resolveAliases(config) },
		ssr: { noExternal: _resolveNoExternal(config) }
	}
}
