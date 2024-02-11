import type { ViteDevServer } from "vite";

import { highlighter } from "@utils/decorate";
import { getFrameworkVersion, getPluginVersion } from "@utils/version";

export const _handleLogger = (server: ViteDevServer): void => {
	setTimeout(() => {
		server.config.logger.info("");

		Promise.all([getFrameworkVersion(), getPluginVersion()])
			.then((values) => {
				if (server.resolvedUrls) {
					for (const value of values) {
						server.config.logger.info(highlighter(value));
					}
				}
			})
			.catch((error) => {
				server.config.logger.error(error);
				server.close();
			});
	}, 100);
};
