import type { AddressInfo } from "net";
import { describe, it, expect } from "bun:test";

import type { IsAddressInfo } from "src/types";
import { addSlash, getCurrentPath, isIpv6 } from "@utils/uri";

describe("URI Helper", () => {
	describe("isAddressInfo", () => {
		it("should return true for an AddressInfo object", () => {
			const addressInfo: AddressInfo = { address: "127.0.0.1", family: "IPv4", port: 80 };
			const isAddressInfo: IsAddressInfo = (x): x is AddressInfo => typeof x === "object";
			const result = isAddressInfo(addressInfo);

			expect(result).toBeTrue();
		});

		it("should return false for a non-AddressInfo object", () => {
			const notAddressInfo = 123;
			const isAddressInfo: IsAddressInfo = (x): x is AddressInfo => typeof x === "object";

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			const result = isAddressInfo(notAddressInfo);

			expect(result).toBeFalse();
		});
	});

	describe("isIpv6", () => {
		it("should return true for IPv6 addresses", () => {
			expect(isIpv6({ address: "::1", port: 8080, family: "IPv6" })).toBeTrue();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			expect(isIpv6({ address: "::1", family: 6, port: 8080 })).toBeTrue();
		});

		it("should return false for IPv4 addresses", () => {
			expect(isIpv6({ address: "127.0.0.1", family: "IPv4", port: 8080 })).toBeFalse();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			expect(isIpv6({ address: "127.0.0.1", family: 4, port: 8080 })).toBeFalse();
		});
	});

	it("should return correct current path", () => {
		expect(getCurrentPath()).toBe(process.cwd() + "/src/utils/");
	});

	describe("addSlash", () => {
		it("should add a slash to the end of a path if it doesn't already have one", () => {
			expect(addSlash("/path/to/directory")).toBe("/path/to/directory/");
		});

		it("should not add a slash to the end of a path if it already has one", () => {
			expect(addSlash("/path/to/directory/")).toBe("/path/to/directory/");
		});
	});
});
