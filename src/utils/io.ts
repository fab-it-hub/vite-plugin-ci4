import { normalizePath } from "vite";
import { access, constants, readFile, rm, writeFile } from "fs/promises";

import type { ComposerJson } from "src/types";
import { isBunRunning } from "./bun";

export const isFileExists = async (path: string): Promise<boolean> => {
	try {
		// Check if we are running in Bun environment.
		return isBunRunning()
			? await Bun.file(path).exists() // Use Bun's `file` API to check if the file exists.
			: typeof (await access(path, constants.F_OK)) === "undefined"; // Use Node.js's `access` API to check if the file exists.
	} catch (error: unknown) {
		// If any error occurs, return false.
		return false;
	}
};

export const readFileAsString = async (filePath: string): Promise<string> => {
	// Normalize the file path to ensure it is in a consistent format.
	const path = normalizePath(filePath);

	// Check if the file exists.
	if (!(await isFileExists(path))) {
		throw new Error(path + " not found.");
	}

	// Read the file contents.
	return isBunRunning() ? await Bun.file(path).text() : (await readFile(path)).toString();
};

export const readFileAsJson = async (filePath: string): Promise<ComposerJson | undefined> => {
	try {
		// Parse the file contents as a JSON object.
		return JSON.parse(await readFileAsString(filePath)) as ComposerJson;
	} catch (error: unknown) {
		// If the error is a SyntaxError, it means that the file is not a valid JSON file.
		if (error instanceof SyntaxError) {
			throw new SyntaxError("It is not a valid Json file.");
		}
		// Otherwise, rethrow the error.
		throw error;
	}
};

export const writingFile = async (filePath: string, content: string): Promise<number | void> => {
	const path = normalizePath(filePath);

	if (!(await isFileExists(path))) {
		throw new Error(path + " not found.");
	}

	return isBunRunning() ? await Bun.write(path, content) : await writeFile(path, content);
};

export const removeFile = async (filepath: string): Promise<void> => {
	const path = normalizePath(filepath);

	if (!(await isFileExists(path))) {
		throw new Error(path + " not found.");
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return isBunRunning() ? unlink(path) : rm(path, { force: true });
};
