import eslint from '@eslint/js'
import tsparser from '@typescript-eslint/parser'
import perfectionist from 'eslint-plugin-perfectionist'
import reactHooks from 'eslint-plugin-react-hooks'
import unicornPlugin from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  unicornPlugin.configs.recommended,
  reactHooks.configs['recommended-latest'],
  perfectionist.configs['recommended-natural'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
  {
    ignores: ['dist', 'build', 'out', 'coverage', 'node_modules'],
  },
])
