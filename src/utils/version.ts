import { lt } from "semver";

import { appConfig } from "@config/constant";
import type { JsonVersion } from "src/types";
import { readFileAsJson } from "./io";

export const getFrameworkVersion = async (): Promise<JsonVersion> => {
	const framework = (await readFileAsJson(appConfig.composerPath)).packages?.find(
		({ name }) => name === appConfig.framework
	) as JsonVersion;

	if (lt(framework.version, appConfig.frameworkCompatibleVersion)) {
		throw new Error(
			`CompatibilityError: ${framework.name}@${framework.version} is not compatible with ${appConfig.pluginName}. Use ${appConfig.frameworkName}@${appConfig.frameworkCompatibleVersion}`,
			{ cause: "CompatibilityError" }
		);
	}

	return framework;
};
