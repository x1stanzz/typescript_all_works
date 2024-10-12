import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";


export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended
    ],
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json'],
       },
    },
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'error',
    }
  }
)