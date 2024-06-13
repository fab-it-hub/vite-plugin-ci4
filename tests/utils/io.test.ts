import { afterEach, beforeEach, describe, expect, it, mock, spyOn } from 'bun:test'
import { isFileExists, readFileAsJson, readFileAsString, removeFile, writingFile } from '@utils/io'

const existsTextFile = 'exists-file.txt'
const nonExistsFile = 'non-exists-file.txt'
const existsJsonFile = 'exists-json-file.txt'
const existsNumberFile = 'exists-number-file.txt'
const existsAnotherTypeFile = 'exists-another-type-file.txt'

const numberContent = 4.57415678525
const jsonContent = { name: 'something', version: '1.0.0' }
const stringContent = 'this is a txt file with dummy content.'

describe('IO Functions', () => {
	afterEach(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		process.versions.bun = Bun.version
		mock.restore()
	})

	describe('Bun Runtime', () => {
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			spyOn(global.Bun, 'file').mockImplementation((filePath: string) => ({
				exists: () => {
					if (filePath.includes('non-')) {
						return Promise.resolve(false)
					}
					return Promise.resolve(true)
				},
				text: () => {
					if (filePath.includes('json')) {
						return Promise.resolve(jsonContent)
					} else if (filePath.includes('number')) {
						return Promise.resolve(numberContent)
					}
					return Promise.resolve(stringContent)
				}
			}))

			spyOn(global.Bun, 'write').mockResolvedValue(45)

			mock.module('fs/promises', () => ({ rm: () => Promise.resolve() }))
		})

		describe('isFileExists', () => {
			it('should return true if the file exists', async () =>
				expect(await isFileExists(existsTextFile)).toBeTrue())

			it('should return false if the file does not exists', async () =>
				expect(await isFileExists(nonExistsFile)).toBeFalse())
		})

		describe('readFileAsString', () => {
			it('should read a text file or other type of file as string', async () => {
				expect(await readFileAsString(existsJsonFile)).toBeString()
				expect(await readFileAsString(existsNumberFile)).toBeString()
				expect(await readFileAsString(existsTextFile)).toBe(stringContent)
			})

			it('should throw an error if the file does not exists', () =>
				expect(async () => await readFileAsString(nonExistsFile)).toThrow(
					nonExistsFile + ' not found.'
				))
		})

		describe('readFileAsJson', () => {
			it('should read and parse a JSON file', async () =>
				expect(await readFileAsJson(existsJsonFile)).toEqual(jsonContent))

			it('should throw an error if the file does not a valid json file', () =>
				expect(async () => await readFileAsJson(existsAnotherTypeFile)).toThrow(
					'It is not a valid Json file.'
				))

			it('should throw an error if the file does not exists', () =>
				expect(async () => await readFileAsJson(nonExistsFile)).toThrow(
					nonExistsFile + ' not found.'
				))
		})

		describe('writingFile', () => {
			it('should write string on existing or non-existing file', async () => {
				expect(await writingFile(nonExistsFile, stringContent)).toBeTrue()
				expect(await writingFile(existsTextFile, stringContent)).toBeTrue()
			})
		})

		describe('removeFile', () => {
			it('should remove existing file', async () =>
				expect(await removeFile(existsTextFile)).toBeTrue())

			it('should throw an error if the file does not exists', () =>
				expect(async () => await removeFile(nonExistsFile)).toThrow(
					nonExistsFile + ' not found.'
				))
		})
	})

	describe('Node Runtime', () => {
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			process.versions.bun = undefined
			mock.module('fs/promises', () => ({
				rm: () => Promise.resolve(),
				mkdir: () => Promise.resolve(),
				lstat: () => Promise.resolve(),
				readdir: () => Promise.resolve(),
				default: () => Promise.resolve(),
				realpath: () => Promise.resolve(),
				writeFile: () => Promise.resolve(),
				constants: () => Promise.resolve(),
				readFile: (filePath: string) => {
					if (filePath.includes('json')) {
						return Promise.resolve(jsonContent)
					} else if (filePath.includes('number')) {
						return Promise.resolve(numberContent)
					}
					return Promise.resolve(stringContent)
				},
				access: async (filePath: string) => {
					if (filePath.includes('non-')) {
						return Promise.resolve(false)
					}
					return
				}
			}))
		})

		describe('isFileExists', () => {
			it('should return true if the file exists', async () =>
				expect(await isFileExists(existsTextFile)).toBeTrue())

			it('should return false if the file does not exist', async () =>
				expect(await isFileExists(nonExistsFile)).toBeFalse())
		})

		describe('readFileAsString', () => {
			it('should read a text file or other type of file as string', async () => {
				expect(await readFileAsString(existsJsonFile)).toBeString()
				expect(await readFileAsString(existsNumberFile)).toBeString()
				expect(await readFileAsString(existsTextFile)).toBe(stringContent)
			})

			it('should throw an error if the file does not exists', () =>
				expect(async () => await readFileAsString(nonExistsFile)).toThrow(
					nonExistsFile + ' not found.'
				))
		})

		describe('readFileAsJson', () => {
			it('should read and parse a JSON file', async () =>
				expect(await readFileAsJson(existsJsonFile)).toEqual(jsonContent))

			it('should throw an error if the file does not a valid json file', () =>
				expect(async () => await readFileAsJson(existsAnotherTypeFile)).toThrow(
					'It is not a valid Json file.'
				))

			it('should throw an error if the file does not exists', () =>
				expect(async () => await readFileAsJson(nonExistsFile)).toThrow(
					nonExistsFile + ' not found.'
				))
		})

		describe('writingFile', () => {
			it('should write string on existing or non-existing file', async () => {
				expect(await writingFile(nonExistsFile, stringContent)).toBeTrue()
				expect(await writingFile(existsTextFile, stringContent)).toBeTrue()
			})
		})

		describe('removeFile', () => {
			it('should remove existing file', async () =>
				expect(await removeFile(existsTextFile)).toBeTrue())

			it('should throw an error if the file does not exists', () =>
				expect(async () => await removeFile(nonExistsFile)).toThrow(
					nonExistsFile + ' not found.'
				))
		})
	})
})
