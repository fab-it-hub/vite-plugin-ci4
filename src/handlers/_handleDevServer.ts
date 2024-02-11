import { loadEnv } from "vite";
import type { ViteDevServer } from "vite";

import { joinPaths } from "@utils/string";
import { getCurrentPath } from "@utils/uri";
import { appConfig } from "@config/constant";
import { readFileAsString } from "@utils/io";

export const _handleDevServer = ({ config, middlewares }: ViteDevServer) => {
	const { serverListener, placeholder, placeholderRegExp } = appConfig;
	const appUrl =
		loadEnv(config.mode, config.envDir || process.cwd(), "")[placeholder] ?? "undefined";

	return middlewares.use(async (req, res, next) => {
		if (req.url === `/${serverListener}`) {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(
				(await readFileAsString(joinPaths(getCurrentPath(), serverListener))).replace(
					placeholderRegExp,
					appUrl
				)
			);
		}

		next();
	});
};
