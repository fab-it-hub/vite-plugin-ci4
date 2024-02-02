import { type ResolvedConfig, type ViteDevServer } from "vite";

import { writingFile } from "@utils/io";
import { joinPaths } from "@utils/string";
import { isAddressInfo } from "@utils/uri";
import { appConfig } from "@config/constant";
import { highLightError } from "@utils/decorate";

import { _handleLogger } from "./_logger";
import { _devServerUrl } from "./_devServerUrl";
import { _handleExitProcess } from "./_processes";
import { _handleDevServer } from "./_handleDevServer";

export const handleConfigureServer = (
	server: ViteDevServer,
	config: ResolvedConfig
): (() => void) | void | Promise<(() => void) | void> => {
	const { publicDirectory, hotFile } = appConfig;
	const hotFilePath = joinPaths(publicDirectory, hotFile);

	server.httpServer?.once("listening", () => {
		const address = server.httpServer?.address();

		if (isAddressInfo(address)) {
			writingFile(hotFilePath, _devServerUrl(config, server, address))
				.then(() => {
					_handleLogger(server);
				})
				.catch((error) => {
					highLightError(error, "unable to create hotFile");
					return error;
				});
		}
	});

	_handleExitProcess();

	return () => _handleDevServer(config, server);
};
