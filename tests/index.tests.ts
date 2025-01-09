import { shorthandReverseMap } from "../src/shorthands";
import { lookupShorthands } from "../src";
import { createStyleRule } from "./createStyleRule";

describe("lookupShorthands", () => {
	test("lookup map matches snapshot", () => {
		expect(shorthandReverseMap).toMatchSnapshot();
	});

	test("lookup function returns base property", () => {
		expect(lookupShorthands("border-top-color")).toEqual([
			"border-color",
			"border-top",
			"border",
		]);
	});

	test("lookup function returns nothing is no base property exists", () => {
		expect(lookupShorthands("border")).toEqual([]);
	});

	test("lookup function returns base properties that exist in the CSSRule", () => {
		const rule = createStyleRule(`
			.class {
				border: 1px solid var(--border-color);
			}
		`);

		expect(lookupShorthands("border-color", rule)).toEqual(["border"]);
	});

	test("lookup function sorts props based on their order in css", () => {
		const rule = createStyleRule(`
			.class {
				grid-column: inherit;
				grid-area: inherit;
			}
		`);

		expect(lookupShorthands("grid-column-start", rule)).toEqual([
			"grid-column",
			"grid-area",
		]);
	});

	test("lookup function returns nothing if base property does not exist on a rule", () => {
		const rule = createStyleRule(`
			.class {
				border: 1px solid var(--border-color);
			}
		`);

		expect(lookupShorthands("grid-column-start", rule)).toEqual([]);
	});
});
