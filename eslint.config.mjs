import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';

export default {
  files: ['**/*.{js,mjs,cjs,ts}'],
  languageOptions: {
    globals: globals.browser, // Define os globals conforme necessário
  },
  plugins: {
    // Adicione plugins se necessário
    'eslint-plugin': pluginJs,
    '@typescript-eslint': tseslint,
  },
  rules: {
    // Regras específicas do plugin JavaScript
    ...pluginJs.configs.recommended.rules,
    // Regras recomendadas do TypeScript
    ...tseslint.configs.recommended.rules,

    // Suas regras personalizadas
    'no-console': 'warn', // Exemplo: Avisar sobre o uso de console.log
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Exemplo: Desabilitar a exigência de tipos explícitos em funções
    "prettier/prettier": [
      "error",
      {
        "printWidth": 80,
        "tabWidth": 2,
        "singleQuote": true,
        "trailingComma": "all",
        "arrowParens": "always",
        "semi": false
      }
    ],
    "camelcase": "off",
    "no-useless-constructor": "off"
  },
};