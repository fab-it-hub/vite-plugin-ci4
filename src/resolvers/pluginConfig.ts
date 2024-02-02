import { joinPaths } from "@utils/string";
import { appConfig } from "@config/constant";
import { Errors, errorMessages } from "@utils/errors";

import type { PluginConfig } from "src/types";

export const resolvePluginConfig = (
	config: string | string[] | PluginConfig
): Required<PluginConfig> => {
	if (typeof config === "undefined") {
		throw new Error(errorMessages(Errors.InvalidConfiguration));
	}

	if (typeof config === "string" || Array.isArray(config)) {
		config = { input: config, ssr: config };
	}

	if (typeof config.input === "undefined") {
		throw new Error(errorMessages(Errors.InvalidInput));
	}

	if (typeof config.publicDirectory === "string") {
		config.publicDirectory = config.publicDirectory.trim().replace(/^\/+/, "");

		if (config.publicDirectory === "") {
			throw new Error(errorMessages(Errors.InvalidPublicSubDirectory));
		}
	}

	if (typeof config.buildDirectory === "string") {
		config.buildDirectory = config.buildDirectory
			.trim()
			.replace(/^\/+/, "")
			.replace(/\/+$/, "");

		if (config.buildDirectory === "") {
			throw new Error(errorMessages(Errors.InvalidBuildSubDirectory));
		}
	}

	if (typeof config.ssrOutputDirectory === "string") {
		config.ssrOutputDirectory = config.ssrOutputDirectory
			.trim()
			.replace(/^\/+/, "")
			.replace(/\/+$/, "");
	}

	if (config.refresh === true) {
		config.refresh = [{ paths: appConfig.refreshPaths }];
	}

	return {
		input: config.input,
		ssr: config.ssr ?? config.input,
		refresh: config.refresh ?? false,
		buildDirectory: config.buildDirectory ?? appConfig.buildDirectory,
		publicDirectory: config.publicDirectory ?? appConfig.publicDirectory,
		ssrOutputDirectory: config.ssrOutputDirectory ?? appConfig.ssrOutputDirectory,
		transformOnServe: config.transformOnServe ?? ((code) => code),
		hotFile:
			config.hotFile ??
			joinPaths(config.publicDirectory ?? appConfig.publicDirectory, appConfig.hotFile)
	};
};
