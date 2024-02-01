import { fileURLToPath } from "url";
import type { AddressInfo } from "net";

import type { IsAddressInfo } from "src/types";
import { isBunRunning } from "./bun";

export const isAddressInfo: IsAddressInfo = (x): x is AddressInfo => typeof x === "object";

export const isIpv6 = (address: AddressInfo): boolean => {
	return (
		address.family === "IPv6" ||
		// In node >=18.0 <18.4 this was an integer value.
		// See: https://nodejs.org/api/net.html#serveraddress
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore-next-line
		address.family === 6
	);
};

export const currentDirectory = (): string => {
	const path = new URL(".", import.meta.url);
	return isBunRunning() ? Bun.fileURLToPath(path) : fileURLToPath(path);
};
