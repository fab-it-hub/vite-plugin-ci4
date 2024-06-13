import { lt } from 'semver'

import { appConfig } from '@config/constant'
import type { JsonVersion } from 'src/types'

import { Errors, errorMessages } from './errors'
import { readFileAsJson } from './io'

export const getFrameworkVersion = async (): Promise<JsonVersion> => {
	const content = await readFileAsJson(appConfig.composerPath)
	const framework = content.packages?.find(({ name }) => {
		return name === appConfig.framework
	}) as JsonVersion

	if (typeof framework?.version !== 'string') {
		throw new Error(errorMessages(Errors.CompatibleFrameworkNotFound))
	}

	if (lt(framework.version, appConfig.frameworkCompatibleVersion)) {
		throw new Error(
			`CompatibilityError: ${framework.name}@${framework.version} is not compatible with ${appConfig.pluginName}. Use ${appConfig.frameworkName}@${appConfig.frameworkCompatibleVersion}`,
			{ cause: 'CompatibilityError' }
		)
	}

	return framework
}

export const getPluginVersion = async (): Promise<JsonVersion> =>
	await readFileAsJson(appConfig.packageJsonPath)
