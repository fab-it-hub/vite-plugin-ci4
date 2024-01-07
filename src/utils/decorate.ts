import picocolors from "picocolors";
import type {HighLightError, HighLightVersion} from "@type/decorate";

export const highLightError: HighLightError = (error, tagLine) => {
	const e = error as Error;
	let highlight: string = "";

	if (typeof tagLine === "string") highlight += picocolors.dim(tagLine);
	highlight += picocolors.red(e.message);

	return highlight;
};

export const highlightVersion: HighLightVersion = (name, version) => {
	let highlight: string = "  ";
	highlight += picocolors.white(picocolors.bold(name));
	highlight += picocolors.green(" v" + version.replace("v", ""));

	return highlight;
};
