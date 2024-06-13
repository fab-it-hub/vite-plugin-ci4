import { describe, expect, it } from 'bun:test'
import { Errors, errorMessages } from '@utils/errors'

describe('Error Messages', () => {
	const pluginName = '@fabithub/vite-plugin-ci4'

	it('should return an error message for InvalidConfiguration', () => {
		const message = errorMessages(Errors.InvalidConfiguration)
		const expected = pluginName + ': missing configuration.'
		expect(message).toBe(expected)
	})

	it('should return an error message for InvalidInput', () => {
		const message = errorMessages(Errors.InvalidInput)
		const expected = pluginName + ": missing configuration for 'input'."
		expect(message).toBe(expected)
	})

	it('should return an error message for InvalidBuildSubDirectory', () => {
		const message = errorMessages(Errors.InvalidBuildSubDirectory)
		const expected = pluginName + ": buildDirectory must be a subdirectory. E.g. 'build'."
		expect(message).toBe(expected)
	})

	it('should return an error message for InvalidPublicSubDirectory', () => {
		const message = errorMessages(Errors.InvalidPublicSubDirectory)
		const expected = pluginName + ": publicDirectory must be a subdirectory. E.g. 'public'."
		expect(message).toBe(expected)
	})
})
