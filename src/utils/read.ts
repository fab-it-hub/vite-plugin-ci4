import {normalizePath} from "vite";
import {readFile} from "fs/promises";
import type {IsBunRunning, ReadJsonFile} from "../types/read";

export const isBunRunning: IsBunRunning = () => typeof process.versions["bun"] !== "undefined";

export const readJsonFile: ReadJsonFile = async (filePath, packageName) => {
	const path = normalizePath(filePath);
	const contents = isBunRunning()
		? await Bun.file(path).json()
		: JSON.parse((await readFile(path)).toString());
	let framework: Record<"version", string> = contents;

	if (typeof packageName === "string") {
		framework = contents?.packages?.find(
			({name}: Record<string, string>) => name === packageName
		);
	}

	return framework;
};
