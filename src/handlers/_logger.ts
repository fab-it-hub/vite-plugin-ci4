import type { ViteDevServer } from "vite";

import { getFrameworkVersion } from "@utils/version";
import { highlighter } from "@utils/decorate";
import packageJson from "./../../package.json";

export const _handleLogger = (server: ViteDevServer): void => {
	setTimeout(() => {
		server.config.logger.info("");

		getFrameworkVersion()
			.then((framework) => {
				if (server.resolvedUrls) {
					server.config.logger.info(highlighter([framework, packageJson]));
				}

				return framework;
			})
			.catch((error) => {
				server.config.logger.error(error);
				server.close();
			});
	}, 100);
};
