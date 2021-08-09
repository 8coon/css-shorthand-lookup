export function createStyleRule(contents: string): CSSStyleRule {
	const styleEl: HTMLStyleElement = document.createElement(
		"STYLE"
	) as unknown as HTMLStyleElement;
	styleEl.innerHTML = contents;
	document.head.appendChild(styleEl);

	for (const styleSheet of Array.from(document.styleSheets)) {
		styleEl.remove();

		// Assumes that document.styleSheets is cleared between each test
		if (styleSheet instanceof CSSStyleSheet && styleSheet.cssRules.length) {
			const rule = styleSheet.cssRules[0];

			if (rule instanceof CSSStyleRule) {
				rule.cssText = contents;
				return rule;
			}
		}
	}
}
