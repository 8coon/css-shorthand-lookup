import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
	input: "./src/index.ts",
	output: [
		{
			format: "commonjs",
			file: "dist/index.js",
		},
	],
	plugins: [
		typescript({
			include: "**/*.{ts,js}",
		}),
		nodeResolve(),
	],
	perf: true,
};
