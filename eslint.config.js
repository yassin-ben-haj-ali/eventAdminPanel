import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs["recommended-latest"],
		],
		plugins: {
			"react-refresh": reactRefresh,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			"@tanstack/query/exhaustive-deps": "off",
			"react-hooks/exhaustive-deps": "off",
			"no-console": "warn",
			"@typescript-eslint/ban-ts-comment": "off",
			"no-mixed-spaces-and-tabs": "off",
		},
		ignores: ["node_modules", "dist", "eslint.config.js"],
	},
]);
