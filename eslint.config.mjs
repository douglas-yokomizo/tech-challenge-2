import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default {
  files: ['**/*.{js,mjs,cjs,ts}'],
  languageOptions: {
    globals: {
      ...globals.browser, // Define browser globals
      ...globals.node, // Define Node.js globals
    },
  },
  plugins: {
    'eslint-plugin': pluginJs,
    '@typescript-eslint': tseslint,
    prettier: prettier,
  },
  rules: {
    // Regras específicas do plugin JavaScript
    ...pluginJs.configs.recommended.rules,
    // Regras recomendadas do TypeScript
    ...tseslint.configs.recommended.rules,
    // Desabilitar regras que podem conflitar com Prettier
    ...prettierConfig.rules,

    'no-console': 'warn', // Exemplo: Avisar sobre o uso de console.log
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Exemplo: Desabilitar a exigência de tipos explícitos em funções
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf', // Ensure LF line endings
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        semi: false,
      },
    ],
    camelcase: 'off',
    'no-useless-constructor': 'off',
  },
}
