import js from '@eslint/js'
import eslint from '@eslint/js'
import tsparser from '@typescript-eslint/parser'
import perfectionist from 'eslint-plugin-perfectionist'
import reactHooks from 'eslint-plugin-react-hooks'
import unicornPlugin from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  js.configs.recommended,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  perfectionist.configs['recommended-natural'],
  unicornPlugin.configs.recommended,
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
  },
  {
    ignores: ['dist', 'build', 'out', 'coverage', 'node_modules'],
  },
])
