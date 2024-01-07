import path from "path";
import {loadEnv} from "vite";
import {readFileSync} from "fs";
import {fileURLToPath} from "url";
import type {ResolvedConfig} from "vite";

import type {Ci4} from "@type/plugin";
import {highlightVersion} from "@utils/decorate";
import {frameworkVersion, pluginVersion} from "@utils/version";

const ci4: Ci4 = (_config: string | string[]) => {
	let config: ResolvedConfig;

	return {
		name: "ci4",
		enforce: "post",
		config: (userConfig) => {
			return userConfig;
		},
		configResolved: (resolveConfig) => {
			config = resolveConfig;
		},
		configureServer: (server) => {
			const envDir = config.envDir || process.cwd();
			const appUrl = loadEnv(config.mode, envDir, "")["app.baseURL"] ?? "undefined";

			server.httpServer?.once("listening", () => {
				setTimeout(() => {
					server.config.logger.info("");

					frameworkVersion()
						.then((version) => {
							server.config.logger.info(highlightVersion("CodeIgniter", version));

							return pluginVersion();
						})
						.then((version) => {
							server.config.logger.info(highlightVersion("Plugin     ", version));

							return version;
						});
				}, 100);
			});

			return () =>
				server.middlewares.use((req, res, next) => {
					if (req.url === "/index.html") {
						res.statusCode = 404;

						res.end(
							readFileSync(path.join(dirname(), "index.html"))
								.toString()
								.replace(/{{app.baseURL}}/g, appUrl)
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
