import globals from 'globals' // Importing global variable definitions for different environments
import pluginJs from '@eslint/js' // Importing the ESLint core JavaScript plugin
import tseslint from '@typescript-eslint/eslint-plugin' // Importing the TypeScript ESLint plugin
import prettier from 'eslint-plugin-prettier' // Importing Prettier as an ESLint plugin
import prettierConfig from 'eslint-config-prettier' // Importing Prettier configuration for ESLint
import tsParser from '@typescript-eslint/parser' // Importing the TypeScript parser for ESLint

export default {
  // Defining the file patterns to lint
  files: ['**/*.{js,mjs,cjs,ts}'],
  languageOptions: {
    parser: tsParser, // Setting the parser to TypeScript parser
    parserOptions: {
      ecmaVersion: 2022, // Setting ECMAScript version
      sourceType: 'module', // Allowing the use of ES modules
    },
    ecmaVersion: 2022, // Setting ECMAScript version globally
    sourceType: 'module', // Allowing ES module syntax
    globals: {
      ...globals.browser, // Adding browser global variables
      ...globals.node, // Adding Node.js global variables
    },
  },

  plugins: {
    'eslint-plugin': pluginJs, // Registering the core JavaScript plugin
    '@typescript-eslint': tseslint, // Registering the TypeScript ESLint plugin
    prettier: prettier, // Registering Prettier plugin
  },
  rules: {
    // Merging recommended rules from plugins
    ...pluginJs.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    ...prettierConfig.rules,

    'no-console': 'off', // Off on console statements
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit boundary types
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // Setting line endings
        printWidth: 80, // Setting maximum line length
        tabWidth: 2, // Setting tab width
        singleQuote: true, // Using single quotes
        trailingComma: 'all', // Enforcing trailing commas
        arrowParens: 'always', // Always using parentheses for arrow function arguments
        semi: false, // Disabling semicolons
      },
    ],
    camelcase: 'off', // Disabling camelcase rule
    'no-useless-constructor': 'off', // Allowing useless constructors
  },
}
