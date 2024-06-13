import type { ViteDevServer } from 'vite'
import { loadEnv } from 'vite'

import { appConfig } from '@config/constant'
import { highlighter } from '@utils/decorate'
import { getFrameworkVersion, getPluginVersion } from '@utils/version'

export const _handleLogger = (server: ViteDevServer): void => {
	const { placeholder } = appConfig
	const { mode, envDir, logger } = server.config
	const appUrl = {
		name: 'App Url',
		version: loadEnv(mode, envDir || process.cwd(), '')[placeholder] ?? 'undefined'
	}

	setTimeout(() => {
		logger.info('')

		Promise.all([getFrameworkVersion(), getPluginVersion()])
			.then((values) => {
				if (server.resolvedUrls) {
					for (const value of values) {
						logger.info(
							highlighter({
								name: value.name,
								version: `v${value.version.replace('v', '')}`
							})
						)
					}
				}
			})
			.catch((error) => {
				logger.error(error)
				server.close()
			})
			.finally(() => logger.info('\n' + highlighter(appUrl)))
	}, 100)
}
