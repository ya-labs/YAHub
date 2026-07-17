import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores([
        'dist/**',
        'build/**',
        'coverage/**',
        'node_modules/**',
        '.vite/**',
        '.turbo/**',
        '*.tsbuildinfo',
    ]),
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        extends: [js.configs.recommended],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [tseslint.configs.recommended],
    },
    {
        files: ['src/**/*.{js,jsx,ts,tsx}'],
        extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
        languageOptions: {
            globals: globals.browser,
        },
    },
    {
        files: ['*.config.{js,ts}', 'eslint.config.js', 'vite.config.ts'],
        languageOptions: {
            globals: globals.node,
        },
    },
    eslintConfigPrettier,
]);
