import { appConfig } from '@config/constant'
import type { UserConfig } from 'vite'

export const _resolveManifest = (
	config: UserConfig,
	isSSR: boolean,
	ssrManifest?: boolean
): string | boolean =>
	ssrManifest
		? config.build?.ssrManifest ?? (isSSR ? appConfig.ssrManifestPath : false)
		: config.build?.manifest ?? (isSSR ? false : appConfig.manifestPath)
