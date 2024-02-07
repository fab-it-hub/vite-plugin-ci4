import colors from "picocolors";
import type { JsonVersion } from "src/types";

export const highlighter = (plugins: JsonVersion[]): string => {
	let versionString = "";
	for (const plugin of plugins) {
		versionString = `  ${colors.green("➜")}  ${colors.white(plugin.name)}: ${colors.cyan(`v${plugin.version.replace("v", "")}`)}`;
	}
	return versionString;
};
