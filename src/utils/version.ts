import semver from "semver/functions/gt";

import { appConfig } from "@config/constant";
import type { JsonVersion } from "src/types";
import { readFileAsJson } from "./io";

export const getFrameworkVersion = async (): Promise<JsonVersion> => {
	const framework = (await readFileAsJson(appConfig.composerPath)).packages?.find(
		({ name }) => name === appConfig.framework
	) as JsonVersion;

	if (!semver(framework.version, appConfig.frameworkCompatibleVersion)) {
		throw new Error(
			`CompatibilityError: ${framework.name}@${framework.version} is not compatible with ${appConfig.pluginName}. Use ${appConfig.frameworkName}@${appConfig.frameworkCompatibleVersion}`,
			{ cause: "CompatibilityError" }
		);
	}

	return framework;
};
