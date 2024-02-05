import { normalizePath } from "vite";
import { access, constants, readFile, rm, writeFile } from "fs/promises";

import type { ComposerJson } from "src/types";
import { isBunRunning } from "./bun";

export const isFileExists = async (path: string): Promise<boolean | void> =>
	isBunRunning() ? await Bun.file(path).exists() : await access(path, constants.F_OK);

export const readFileAsJson = async (filePath: string): Promise<ComposerJson> => {
	const path = normalizePath(filePath);

	if (!(await isFileExists(path))) {
		throw new Error(path + " not found.");
	}

	return isBunRunning()
		? await Bun.file(path).json()
		: JSON.parse((await readFile(path)).toString());
};

export const readFileAsString = async (filePath: string): Promise<string> => {
	const path = normalizePath(filePath);

	if (!(await isFileExists(path))) {
		throw new Error(path + " not found.");
	}

	return isBunRunning() ? await Bun.file(path).text() : (await readFile(path)).toString();
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
