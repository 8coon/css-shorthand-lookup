import { shorthandReverseMap } from "./shorthands";

export function lookupShorthands(
	fullPropName: string,
	rule?: CSSStyleRule
): string[] {
	const lookupResult = shorthandReverseMap[fullPropName] ?? [];

	if (rule) {
		return lookupResult
			.filter((prop) => rule.style.getPropertyValue(prop))
			.sort((a, b) => rule.cssText.indexOf(a) - rule.cssText.indexOf(b));
	}

	return lookupResult;
}
