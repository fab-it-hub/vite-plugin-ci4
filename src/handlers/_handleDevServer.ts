import { loadEnv } from "vite";
import { type ResolvedConfig, type ViteDevServer } from "vite";

import { joinPaths } from "@utils/string";
import { getCurrentPath } from "@utils/uri";
import { appConfig } from "@config/constant";
import { readFileAsString } from "@utils/io";

export const _handleDevServer = (config: ResolvedConfig, server: ViteDevServer) => {
	const envDir = config.envDir || process.cwd();
	const { serverListener, placeholder, placeholderRegExp } = appConfig;
	const appUrl = loadEnv(config.mode, envDir, "")[placeholder] ?? "undefined";

	return server.middlewares.use(async (req, res, next) => {
		if (req.url === `/${serverListener}`) {
			res.statusCode = 404;
			const contents = await readFileAsString(joinPaths(getCurrentPath(), serverListener));
			res.end(contents.replace(placeholderRegExp, appUrl));
		}

		next();
	});
};
