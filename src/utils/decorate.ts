import colors from "picocolors";

export const highLightError = (error: unknown, tagLine: string): string => {
	const e = error as Error;
	let highlight: string = "";

	if (typeof tagLine === "string") highlight += colors.dim(tagLine);
	highlight += colors.red(e.message);

	return highlight;
};

export const highLightVersion = (name: string, version: string): string =>
	`  ${colors.white(name)}: ${colors.green(` v${version.replace("v", "")}`)}`;
