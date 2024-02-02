import type { AddressInfo } from "net";
import type { ResolvedConfig } from "vite";

import { isIpv6 } from "@utils/uri";
import { HTTP_PROTOCOLS } from "@config/http";

export const _getServerUrl = (address: AddressInfo, config: ResolvedConfig): string => {
	const configHmrProtocol =
		typeof config.server.hmr === "object" ? config.server.hmr.protocol : null;
	const clientProtocol = configHmrProtocol
		? configHmrProtocol === HTTP_PROTOCOLS.WSS
			? HTTP_PROTOCOLS.HTTPS
			: HTTP_PROTOCOLS.HTTP
		: null;
	const serverProtocol = config.server.https ? HTTP_PROTOCOLS.HTTPS : HTTP_PROTOCOLS.HTTP;
	const protocol = clientProtocol ?? serverProtocol;

	const configHmrHost = typeof config.server.hmr === "object" ? config.server.hmr.host : null;
	const configHost = typeof config.server.host === "string" ? config.server.host : null;
	const serverAddress = isIpv6(address) ? `[${address.address}]` : address.address;
	const host = configHmrHost ?? configHost ?? serverAddress;

	const configHmrClientPort =
		typeof config.server.hmr === "object" ? config.server.hmr.clientPort : null;
	const port = configHmrClientPort ?? address.port;

	return `${protocol}://${host}:${port}`;
};
