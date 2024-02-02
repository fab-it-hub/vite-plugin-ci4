import type { ViteDevServer } from "vite";

import { appConfig } from "@config/constant";
import { getVersions } from "@utils/version";
import { highLightError, highLightVersion } from "@utils/decorate";

export const _handleLogger = (server: ViteDevServer): void => {
	setTimeout(() => {
		server.config.logger.info("");

		getVersions(appConfig.composerPath, appConfig.framework)
			.then((framework) => {
				server.config.logger.info(
					highLightVersion(appConfig.frameworkName, framework.version)
				);
				return getVersions(appConfig.packageJsonPath);
			})
			.then((plugin) => {
				server.config.logger.info(highLightVersion(appConfig.pluginName, plugin.version));

				return plugin;
			})
			.catch((error) => {
				return highLightError(error, "version not found, error: ");
			});
	}, 100);
};
