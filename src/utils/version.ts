import {readJsonFile} from "./read";
import {highLightError} from "./decorate";

import type {GetVersion} from "@type/version";

const errorMessage = "version not found, error: ";

export const frameworkVersion: GetVersion = async () => {
	try {
		return (await readJsonFile("composer.lock", "codeigniter4/framework")).version;
	} catch (error) {
		return highLightError(error, errorMessage);
	}
};

export const pluginVersion: GetVersion = async () => {
	try {
		return (await readJsonFile("./package.json")).version;
	} catch (error) {
		return highLightError(error, errorMessage);
	}
};
