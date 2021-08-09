module.exports = {
	preset: 'ts-jest',
	testMatch: ["**/?(*.)+(spec|tests).[jt]s?(x)"],
	testEnvironment: "jsdom",
	verbose: false,
	coverageReporters: ['html', 'cobertura', 'text-summary'],
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
	]
}
