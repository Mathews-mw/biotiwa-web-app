import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	...pluginQuery.configs['flat/recommended'],
	eslintPluginPrettierRecommended,
	{
		rules: {
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					printWidth: 120,
					tabWidth: 2,
					useTabs: true,
					semi: true,
					arrowParens: 'always',
					trailingComma: 'es5',
					bracketSpacing: true,
					bracketLine: true,
					endOfLine: 'auto',
					arrowFunctionParens: 'always',
				},
			],
			camelcase: 'off',
			'no-undef': 'off',
			'prefer-const': 'off',
			'no-unused-vars': 0,
			'dot-notation': 'off',
			'no-useless-constructor': 'off',
			'no-trailing-spaces': 'error',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-namespace': 'off',
		},
	},
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
]);

export default eslintConfig;
