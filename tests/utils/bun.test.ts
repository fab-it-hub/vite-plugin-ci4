import { describe, expect, it } from "bun:test";
import { isBunRunning } from "@utils/bun";

describe("Bun Test", () => {
	it("isBunRunning() function returns true when running in Bun", () => {
		it.skipIf(isBunRunning())("isBunRunning() returns false when running not in Bun", () => {
			expect(isBunRunning()).toBeFalse();
		});

		expect(isBunRunning()).toBeTrue();
	});
});
