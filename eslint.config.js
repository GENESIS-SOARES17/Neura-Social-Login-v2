// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default [
  // 1. Ignorados globais (substitui o antigo globalIgnores)
  {
    ignores: ['dist', 'coverage', 'build', '.next', 'out'], // adicione outras pastas conforme necessário
  },

  // 2. Configuração principal para arquivos TypeScript/JavaScript (React)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,               // regras ESLint recomendadas
      ...tseslint.configs.recommended,      // regras TypeScript recomendadas
      react.configs.flat.recommended,       // regras React recomendadas (plugin react)
      reactHooks.configs.flat.recommended,  // regras para React Hooks
      reactRefresh.configs.vite,             // regras para React Refresh (Vite)
    ],
    languageOptions: {
      ecmaVersion: 'latest',                 // suporte a recursos modernos
      globals: {
        ...globals.browser,                  // variáveis globais do navegador
      },
      parser: tseslint.parser,               // parser TypeScript
      parserOptions: {
        project: './tsconfig.json',           // necessário para regras que exigem informações de tipo
        tsconfigRootDir: import.meta.dirname, // compatibilidade com ES modules
      },
    },
    settings: {
      react: {
        version: 'detect',                    // detecta automaticamente a versão do React
      },
    },
    // Regras personalizadas (opcional – descomente se necessário)
    // rules: {
    //   'react/react-in-jsx-scope': 'off',   // não necessário com React 17+
    //   'react/prop-types': 'off',            // se usar TypeScript, prop-types são redundantes
    // },
  },

  // 3. Configuração separada para arquivos Node.js (ex: scripts, configs)
  {
    files: ['**/*.config.js', 'scripts/**/*.js', '.eslintrc.{js,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,                      // variáveis globais do Node.js
      },
    },
    rules: {
      // regras específicas para Node, se necessário
    },
  },
]
