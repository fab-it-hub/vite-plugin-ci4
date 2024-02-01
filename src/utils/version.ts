import type { JsonVersion } from "src/types";
import { readFileAsJson } from "./io";

export const getVersions = async (filePath: string, packageName?: string): Promise<JsonVersion> => {
	const content = await readFileAsJson(filePath);

	if (typeof packageName === "string" && typeof content.packages !== "undefined") {
		return content.packages.find(
			({ name }: JsonVersion) => name === packageName
		) as JsonVersion;
	}

	return content;
};
