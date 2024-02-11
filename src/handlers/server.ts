import type { ViteDevServer } from "vite";

import { writingFile } from "@utils/io";
import { joinPaths } from "@utils/string";
import { isAddressInfo } from "@utils/uri";
import { appConfig } from "@config/constant";
import { Errors, errorMessages } from "@utils/errors";

import { _handleLogger } from "./_logger";
import { _handleExitProcess } from "./_processes";
import { _getDevServerUrl } from "./_getDevServerUrl";
import { _handleDevServer } from "./_handleDevServer";

export const handleConfigureServer = (
	server: ViteDevServer
): (() => void) | void | Promise<(() => void) | void> => {
	const { publicDirectory, hotFile } = appConfig;
	const hotFilePath = joinPaths(publicDirectory, hotFile);

	server.httpServer?.once("listening", () => {
		const address = server.httpServer?.address();

		if (isAddressInfo(address)) {
			writingFile(hotFilePath, _getDevServerUrl(address, server.config))
				.then(() => _handleLogger(server))
				.catch(() => {
					server.config.logger.error(errorMessages(Errors.UnableToWriteHotFile));
					server.close();
				});
		}
	});

	_handleExitProcess();

	return () => _handleDevServer(server);
};
