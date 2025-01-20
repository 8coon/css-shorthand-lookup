const shorthands = {
	animation: [
		"-name",
		"-duration",
		"-timing-function",
		"-delay",
		"-iteration-count",
		"-direction",
		"-fill-mode",
		"-play-state",
	],
	background: [
		"-clip",
		"-color",
		"-image",
		"-origin",
		"-position",
		"-repeat",
		"-size",
		"-attachment",
	],
	columns: ["-count", "-width"],
	flex: ["-grow", "-shrink", "-basis"],
	"flex-flow": ["flex-direction", "flex-wrap"],
	font: [
		"-style",
		"-variant",
		"-weight",
		"-stretch",
		"-size",
		"line-height",
		"-family",
	],
	grid: [
		"-template-rows",
		"-template-columns",
		"-template-areas",
		"-auto-rows",
		"-auto-columns",
		"-auto-flow",
		"-column-gap",
		"-row-gap",
		"column-gap",
		"row-gap",
	],
	"grid-area": [
		"grid-row-start",
		"grid-column-start",
		"grid-row-end",
		"grid-column-end",
	],
	"grid-column": ["-start", "-end"],
	"grid-row": ["-start", "-end"],
	"grid-template": ["-areas", "-columns", "-rows"],
	"list-style": ["-image", "-position", "-type"],
	offset: ["-anchor", "-distance", "-path", "-position", "-rotate"],
	"place-content": ["align-content", "justify-content"],
	"place-items": ["align-items", "justify-items"],
	"place-self": ["align-self", "justify-self"],
	"text-decoration": ["-line", "-color", "-style", "-thickness"],
	transition: ["-property", "-duration", "-timing-function", "-delay"],

	// Generated at run-time
	border: [],
	"border-radius": [],
	"column-rule": [],
	margin: [],
	outline: [],
	padding: [],
};

const topSide = "top";
const bottomSide = "bottom";
const rightSide = "right";
const leftSide = "left";

const sides = [topSide, rightSide, bottomSide, leftSide];
const verticalSides = [topSide, bottomSide];
const horizontalSides = [rightSide, leftSide];

const borderCommonProps = ["width", "style", "color"];

for (const prop of borderCommonProps) {
	const propAffix = `-${prop}`;

	shorthands[`border${propAffix}`] = [];
	shorthands["border"].push(propAffix);
	shorthands["column-rule"].push(propAffix);
	shorthands["outline"].push(propAffix);
}

for (const side of sides) {
	const sideAffix = `-${side}`;

	shorthands[`border${sideAffix}`] = shorthands["border"];
	shorthands["margin"].push(sideAffix);
	shorthands["padding"].push(sideAffix);

	for (const prop of borderCommonProps) {
		shorthands[`border-${prop}`].push(`border${sideAffix}-${prop}`);
	}
}

for (const verticalSide of verticalSides) {
	for (const horizontalSide of horizontalSides) {
		shorthands["border-radius"].push(
			`border-${verticalSide}-${horizontalSide}-radius`
		);
	}
}

// Expanding all props and building a reverse lookup map
const shorthandKeys = Object.keys(shorthands);
export const shorthandReverseMap: Record<string, string[]> = {};

for (const shorthand of shorthandKeys) {
	for (const partialProp of shorthands[shorthand]) {
		const fullProp = partialProp.startsWith("-")
			? shorthand + partialProp
			: partialProp;

		shorthandReverseMap[fullProp] = shorthandReverseMap[fullProp] ?? [];
		shorthandReverseMap[fullProp].push(shorthand);
	}
}

// Adding border fallback for each full property
for (const side of sides) {
	for (const prop of borderCommonProps) {
		const fullBorderProp = `border-${side}-${prop}`;
		shorthandReverseMap[fullBorderProp] =
			shorthandReverseMap[fullBorderProp] ?? [];
		shorthandReverseMap[fullBorderProp].push("border");
	}
}
