import path from "path";
import {loadEnv} from "vite";
import {readFileSync} from "fs";
import {fileURLToPath} from "url";
import type {ResolvedConfig} from "vite";

import type {Ci4} from "@type/plugin";
import {appConfig} from "@config/constant";
import {highlightVersion} from "@utils/decorate";
import {frameworkVersion, pluginVersion} from "@utils/version";

const ci4: Ci4 = (_config: string | string[]) => {
	let config: ResolvedConfig;

	return {
		name: appConfig.plugin,
		enforce: "post",
		config: (userConfig) => {
			return userConfig;
		},
		configResolved: (resolveConfig) => {
			config = resolveConfig;
		},
		configureServer: (server) => {
			const envDir = config.envDir || process.cwd();
			const appUrl = loadEnv(config.mode, envDir, "")[appConfig.placeholder] ?? "undefined";

			server.httpServer?.once("listening", () => {
				setTimeout(() => {
					server.config.logger.info("");

					frameworkVersion()
						.then((version) => {
							server.config.logger.info(
								highlightVersion(appConfig.frameworkName, version)
							);

							return pluginVersion();
						})
						.then((version) => {
							server.config.logger.info(
								highlightVersion(appConfig.pluginName, version)
							);

							return version;
						});
				}, 100);
			});

			return () =>
				server.middlewares.use((req, res, next) => {
					if (req.url === "/" + appConfig.serverListener) {
						res.statusCode = 404;

						res.end(
							readFileSync(path.join(dirname(), appConfig.serverListener))
								.toString()
								.replace(appConfig.placeholderRegExp, appUrl)
						);
					}

					next();
				});
		},
	};
};

function dirname(): string {
	return fileURLToPath(new URL(".", import.meta.url));
}

export default ci4;
