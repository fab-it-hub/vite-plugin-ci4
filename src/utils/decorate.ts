import colors from "picocolors";
import type { JsonVersion } from "src/types";

export const highlighter = (plugin: JsonVersion): string =>
	`  ${colors.green("➜")}  ${colors.white(plugin.name)}: ${colors.cyan(`v${plugin.version.replace("v", "")}`)}`;
