import {readJsonFile} from "./read";
import {highLightError} from "./decorate";

import {appConfig} from "@config/constant";
import type {GetVersion} from "@type/version";

const errorMessage = "version not found, error: ";
const {composerPath, packageJsonPath, framework} = appConfig;

export const frameworkVersion: GetVersion = async () => {
	try {
		return (await readJsonFile(composerPath, framework)).version;
	} catch (error) {
		return highLightError(error, errorMessage);
	}
};

export const pluginVersion: GetVersion = async () => {
	try {
		return (await readJsonFile(packageJsonPath)).version;
	} catch (error) {
		return highLightError(error, errorMessage);
	}
};
