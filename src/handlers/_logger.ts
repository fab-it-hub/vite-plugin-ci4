import type { ViteDevServer } from "vite";

import { highlighter } from "@utils/decorate";
import { getFrameworkVersion, getPluginVersion } from "@utils/version";

export const _handleLogger = (server: ViteDevServer): void => {
	setTimeout(() => {
		server.config.logger.info("");

		getFrameworkVersion()
			.then((framework) => {
				if (server.resolvedUrls) {
					server.config.logger.info(highlighter(framework));
				}

				return getPluginVersion();
			})
			.then((plugin) => {
				if (server.resolvedUrls) {
					server.config.logger.info(highlighter(plugin));
				}

				return plugin;
			})
			.catch((error) => {
				server.config.logger.error(error);
				server.close();
			});
	}, 100);
};
