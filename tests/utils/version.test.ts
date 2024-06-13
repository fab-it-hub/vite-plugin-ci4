import { afterEach, beforeEach, describe, expect, it, mock, spyOn } from 'bun:test'

import { appConfig } from '@config/constant'
import { getFrameworkVersion, getPluginVersion } from '@utils/version'

describe('Version Functions', () => {
	afterEach(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		process.versions.bun = Bun.version
		mock.restore()
	})

	describe('Bun Runtime', () => {
		describe('getFrameworkVersion', () => {
			it('should return object with framework name & version.', async () => {
				const framework = {
					name: appConfig.framework,
					version: appConfig.frameworkCompatibleVersion
				}
				const composerLock = { ...framework, packages: [framework] }

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				spyOn(global.Bun, 'file').mockImplementation(() => ({
					exists: () => Promise.resolve(true),
					text: () => Promise.resolve(JSON.stringify(composerLock))
				}))

				expect(await getFrameworkVersion()).toEqual(framework)
			})

			it('should throw an error If installed codeigniter 4 is not compatible.', () => {
				const framework = { name: appConfig.framework, version: '1.0.0' }
				const composerLock = { ...framework, packages: [framework] }

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				spyOn(global.Bun, 'file').mockImplementation(() => ({
					exists: () => Promise.resolve(true),
					text: () => Promise.resolve(JSON.stringify(composerLock))
				}))

				expect(async () => await getFrameworkVersion()).toThrow('not compatible')
			})

			it('should throw an error If codeigniter 4 is not found in composer.', () => {
				const framework = { name: 'something', version: '1.0.0' }
				const composerLock = { ...framework, packages: [framework] }

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				spyOn(global.Bun, 'file').mockImplementation(() => ({
					exists: () => Promise.resolve(true),
					text: () => Promise.resolve(JSON.stringify(composerLock))
				}))

				expect(async () => await getFrameworkVersion()).toThrow(
					'@fabithub/vite-plugin-ci4: codeigniter4/framework not found in composer.lock.'
				)
			})

			it('should throw an error If composer.lock not found.', () => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				spyOn(global.Bun, 'file').mockImplementation(() => ({
					exists: () => Promise.resolve(false)
				}))

				expect(async () => await getFrameworkVersion()).toThrow('composer.lock not found.')
			})
		})

		describe('getPluginVersion', () => {
			it('should return object with plugin name & version.', async () => {
				const plugin = { name: appConfig.pluginName, version: '1.0.0' }

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				spyOn(global.Bun, 'file').mockImplementation(() => ({
					exists: () => Promise.resolve(true),
					text: () => Promise.resolve(JSON.stringify(plugin))
				}))

				expect(await getPluginVersion()).toEqual(plugin)
			})

			it('should throw an error If package.json not found.', () => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				spyOn(global.Bun, 'file').mockImplementation(() => ({
					exists: () => Promise.resolve(false)
				}))

				expect(async () => await getPluginVersion()).toThrow('package.json not found.')
			})
		})
	})

	describe('Node Runtime', () => {
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			process.versions.bun = undefined
		})

		describe('getFrameworkVersion', () => {
			it('should return object with framework name & version.', async () => {
				const framework = {
					name: appConfig.framework,
					version: appConfig.frameworkCompatibleVersion
				}
				const composerLock = { ...framework, packages: [framework] }

				mock.module('fs/promises', () => ({
					readFile: () => Promise.resolve(JSON.stringify(composerLock)),
					access: () => Promise.resolve()
				}))

				expect(await getFrameworkVersion()).toEqual(framework)
			})

			it('should throw an error If installed codeigniter 4 is not compatible.', () => {
				const framework = { name: appConfig.framework, version: '1.0.0' }
				const composerLock = { ...framework, packages: [framework] }

				mock.module('fs/promises', () => ({
					readFile: () => Promise.resolve(JSON.stringify(composerLock)),
					access: () => Promise.resolve()
				}))

				expect(async () => await getFrameworkVersion()).toThrow(
					'CompatibilityError: codeigniter4/framework@1.0.0 is not compatible with @fabithub/vite-plugin-ci4. Use CodeIgniter@4.1.5'
				)
			})

			it('should throw an error If codeigniter 4 is not found in composer.', () => {
				const framework = { name: 'something', version: '1.0.0' }
				const composerLock = { ...framework, packages: [framework] }

				mock.module('fs/promises', () => ({
					readFile: () => Promise.resolve(JSON.stringify(composerLock)),
					access: () => Promise.resolve()
				}))

				expect(async () => await getFrameworkVersion()).toThrow(
					'@fabithub/vite-plugin-ci4: codeigniter4/framework not found in composer.lock.'
				)
			})

			it('should throw an error If composer.lock not found.', () => {
				mock.module('fs/promises', () => ({
					access: () => Promise.reject()
				}))

				expect(async () => await getFrameworkVersion()).toThrow('composer.lock not found.')
			})
		})

		describe('getPluginVersion', () => {
			it('should return object with plugin name & version.', async () => {
				const plugin = { name: appConfig.pluginName, version: '1.0.0' }

				mock.module('fs/promises', () => ({
					readFile: () => Promise.resolve(JSON.stringify(plugin)),
					access: () => Promise.resolve()
				}))

				expect(await getPluginVersion()).toEqual(plugin)
			})

			it('should throw an error If package.json not found.', () => {
				mock.module('fs/promises', () => ({
					access: () => Promise.reject()
				}))

				expect(async () => await getPluginVersion()).toThrow('package.json not found.')
			})
		})
	})
})
