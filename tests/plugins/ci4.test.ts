import { describe, expect, it } from "bun:test";
import { ci4 } from "@plugins/ci4";

describe("ci4 plugin", () => {
	it("should be a function", () => {
		expect(ci4).toBeFunction();
	});

	describe("returned object", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		const plugin = ci4({});

		it("should have an enforce property", () => {
			expect(plugin.enforce).toBeString();
		});

		it("should have a name property", () => {
			expect(plugin.name).toBeString();
		});

		it("should have a config property", () => {
			expect(plugin.config).toBeFunction();
		});

		it("should have a configResolved property", () => {
			expect(plugin.configResolved).toBeFunction();
		});

		it("should have a transform property", () => {
			expect(plugin.transform).toBeFunction();
		});

		it("should have a configureServer property", () => {
			expect(plugin.configureServer).toBeFunction();
		});
	});
});
