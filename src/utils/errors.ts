/* eslint-disable indent */
import { appConfig } from "@config/constant";

export enum Errors {
	InvalidInput,
	InvalidConfiguration,
	InvalidBuildSubDirectory,
	InvalidPublicSubDirectory
}

export const errorMessages = (key: Errors): string => {
	const { pluginName, buildDirectory, publicDirectory } = appConfig;
	let message = `${pluginName}: missing configuration.`;

	switch (key) {
		case Errors.InvalidBuildSubDirectory:
			message = `${pluginName}: buildDirectory must be a subdirectory. E.g. '${buildDirectory}'.`;
			break;

		case Errors.InvalidInput:
			message = `${pluginName}: missing configuration for "input".`;
			break;

		case Errors.InvalidPublicSubDirectory:
			message = `${pluginName}: publicDirectory must be a subdirectory. E.g. '${publicDirectory}'.`;
			break;

		default:
			break;
	}

	return message;
};
