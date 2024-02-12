/* eslint-disable indent */
import { appConfig } from "@config/constant";

export enum Errors {
	InvalidInput,
	UnableToWriteHotFile,
	InvalidConfiguration,
	InvalidBuildSubDirectory,
	InvalidPublicSubDirectory,
	TooLongBuildDirectoryInput,
	CompatibleFrameworkNotFound,
	TooLongPublicDirectoryInput,
	TooLongSsrOutputDirectoryInput
}

export const errorMessages = (key: Errors): string => {
	const { buildDirectory, composerPath, framework, pluginName, publicDirectory } = appConfig;
	let message;

	switch (key) {
		case Errors.TooLongSsrOutputDirectoryInput:
			message = `${pluginName}: input too long for 'ssrOutputDirectory'.`;
			break;

		case Errors.CompatibleFrameworkNotFound:
			message = `${pluginName}: ${framework} not found in ${composerPath}.`;
			break;

		case Errors.TooLongBuildDirectoryInput:
			message = `${pluginName}: input too long for 'buildDirectory'.`;
			break;

		case Errors.TooLongPublicDirectoryInput:
			message = `${pluginName}: input too long for 'publicDirectory'.`;
			break;

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
