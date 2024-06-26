import { access, constants, readFile, unlink, writeFile } from 'node:fs/promises'
import type { ComposerJson } from 'src/types'
import { normalizePath } from 'vite'
import { isBunRunning } from './bun'

export const isFileExists = async (path: string): Promise<boolean> => {
	try {
		// Check if we are running in Bun environment.
		return isBunRunning()
			? await Bun.file(path).exists() // Use Bun's `file` API to check if the file exists.
			: typeof (await access(path, constants.F_OK)) === 'undefined' // Use Node.js's `access` API to check if the file exists.
	} catch (_error: unknown) {
		// If any error occurs, return false.
		return false
	}
}

export const readFileAsString = async (filePath: string): Promise<string> => {
	// Normalize the file path to ensure it is in a consistent format.
	const path = normalizePath(filePath)

	// Check if the file exists.
	if (!(await isFileExists(path))) {
		throw new Error(path + ' not found.')
	}

	// Read the file contents.
	const content = isBunRunning()
		? await Bun.file(path).text()
		: await readFile(path, { encoding: 'utf8' })

	if (typeof content !== 'string') {
		return JSON.stringify(content)
	}

	return content
}

export const readFileAsJson = async (filePath: string): Promise<ComposerJson> => {
	try {
		// Parse the file contents as a JSON object.
		return JSON.parse(await readFileAsString(filePath))
	} catch (error: unknown) {
		// If the error is a SyntaxError, it means that the file is not a valid JSON file.
		if (error instanceof SyntaxError) {
			throw new SyntaxError('It is not a valid Json file.', { cause: error.message })
		}
		// Otherwise, rethrow the error.
		throw error
	}
}

export const writingFile = async (filePath: string, content: string): Promise<boolean> => {
	// Normalize the file path to ensure that it uses the correct separators for the current platform.
	const path = normalizePath(filePath)

	try {
		// Check if we are running in the Bun environment.
		return isBunRunning()
			? (await Bun.write(path, content)) > 0 // Return true if the number of bytes written is greater than 0.
			: typeof (await writeFile(path, content)) === 'undefined' // Return true, as it does not return a value.
	} catch (_error: unknown) {
		// If an error occurred while writing the file, return false.
		return false
	}
}

export const removeFile = async (filepath: string): Promise<boolean> => {
	// Normalize the file path to ensure that it is in a consistent format.
	const path = normalizePath(filepath)

	// Attempt to remove the file.
	try {
		// Use the `rm` function from the `fs/promises` library to remove the file.
		// The `force` option is used to ensure that the file is removed, even if it is read-only.
		return typeof (await unlink(path)) === 'undefined'
	} catch (_error: unknown) {
		// If an error occurred while attempting to remove the file, return `false`.
		return false
	}
}
