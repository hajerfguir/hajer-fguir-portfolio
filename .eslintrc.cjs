module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    // React 17+ / Next.js doesn't require React import in JSX files
    'react/react-in-jsx-scope': 'off',

    // TypeScript already handles props typing
    'react/prop-types': 'off',

    // Allow Next.js styled-jsx syntax: <style jsx>
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['jsx'],
      },
    ],

    // Don't require explicit return types everywhere
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Keep explicit "any" visible, but don't fail CI because of it
    '@typescript-eslint/no-explicit-any': 'warn',

    // Unused variables should warn, not fail CI
    // Arguments beginning with "_" are intentionally ignored
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
};