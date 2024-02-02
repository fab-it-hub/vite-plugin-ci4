import { joinPaths } from "@utils/string";
import { appConfig } from "@config/constant";
import { isFileExists, removeFile } from "@utils/io";

export const _cleaner = () => {
	const { publicDirectory, hotFile } = appConfig;
	const hotFilePath = joinPaths(publicDirectory, hotFile);

	isFileExists(hotFilePath)
		.then((exists) => {
			if (exists || typeof exists === "undefined") {
				removeFile(hotFilePath);
			}
			return exists;
		})
		.catch(() => {});
};
