import type { AddressInfo } from "net";
import type { ResolvedConfig, ViteDevServer } from "vite";

import { _getServerUrl } from "./_getServerUrl";

export const _devServerUrl = (
	config: ResolvedConfig,
	server: ViteDevServer,
	address: AddressInfo
): string => config.server?.origin ?? _getServerUrl(address, server.config);
