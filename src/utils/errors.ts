/* eslint-disable indent */
import { appConfig } from "@config/constant";

export enum Errors {
	InvalidInput,
	UnableToWriteHotFile,
	InvalidConfiguration,
	InvalidBuildSubDirectory,
	InvalidPublicSubDirectory
}

export const errorMessages = (key: Errors): string => {
	const { pluginName, buildDirectory, publicDirectory } = appConfig;
	let message;

	switch (key) {
		case Errors.InvalidInput:
			message = `${pluginName}: missing configuration for 'input'.`;
			break;

		case Errors.UnableToWriteHotFile:
			message = `${pluginName}: unable to write 'hot' file.`;
			break;

		case Errors.InvalidBuildSubDirectory:
			message = `${pluginName}: buildDirectory must be a subdirectory. E.g. '${buildDirectory}'.`;
			break;

		case Errors.InvalidPublicSubDirectory:
			message = `${pluginName}: publicDirectory must be a subdirectory. E.g. '${publicDirectory}'.`;
			break;

		default:
			message = `${pluginName}: missing configuration.`;
			break;
	}

	return message;
};
