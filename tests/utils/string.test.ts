import { join } from "path";
import { describe, it, expect } from "bun:test";

export const joinPaths = (...paths: string[]): string => join(...paths);

describe("joinPaths", () => {
	it("should join multiple paths", () => {
		const result1 = joinPaths("path1", "path2");
		expect(result1).toEqual("path1/path2");

		const result2 = joinPaths("path1", "path2", "path3");
		expect(result2).toEqual("path1/path2/path3");
	});

	it("should ignore empty paths", () => {
		const result = joinPaths("path1", "", "path2", "", "path3");
		expect(result).toEqual("path1/path2/path3");
	});

	it("should return the first path if only one path is provided", () => {
		const result = joinPaths("path1");
		expect(result).toEqual("path1");
	});

	it("should handle absolute paths", () => {
		const result1 = joinPaths("/path1", "path2");
		expect(result1).toEqual("/path1/path2");

		const result2 = joinPaths("path1", "/path2", "path3");
		expect(result2).toEqual("path1/path2/path3");
	});

	it("should handle paths with trailing slashes", () => {
		const result1 = joinPaths("path1/", "path2");
		expect(result1).toEqual("path1/path2");

		const result2 = joinPaths("path1", "path2/", "path3");
		expect(result2).toEqual("path1/path2/path3");

		const result3 = joinPaths("path1/", "path2/", "path3/");
		expect(result3).toEqual("path1/path2/path3/");
	});
});
