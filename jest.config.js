module.exports = {
	preset: 'ts-jest',
	testMatch: ["**/?(*.)+(spec|tests).[jt]s?(x)"],
	testEnvironment: "jsdom",
	verbose: false,
	coverageReporters: [
		"json-summary",
		"text",
		"html",
		"lcov"
	],
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
	]
}
