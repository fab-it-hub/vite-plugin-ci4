import { loadEnv } from "vite";
import { type ResolvedConfig, type ViteDevServer } from "vite";

import { joinPaths } from "@utils/string";
import { appConfig } from "@config/constant";
import { readFileAsString } from "@utils/io";
import { currentDirectory } from "@utils/uri";

export const _handleDevServer = (config: ResolvedConfig, server: ViteDevServer) => {
	const envDir = config.envDir || process.cwd();
	const { serverListener, placeholder, placeholderRegExp } = appConfig;
	const appUrl = loadEnv(config.mode, envDir, "")[placeholder] ?? "undefined";

	return server.middlewares.use(async (req, res, next) => {
		if (req.url === `/${serverListener}`) {
			res.statusCode = 404;
			const contents = await readFileAsString(joinPaths(currentDirectory(), serverListener));
			res.end(contents.replace(placeholderRegExp, appUrl));
		}

		next();
	});
};
