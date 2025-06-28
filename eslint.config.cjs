const eslintPluginPlaywright = require('eslint-plugin-playwright');

module.exports = [
  {
    files: ['**/*.js'], // Target JavaScript files
    plugins: {
      playwright: eslintPluginPlaywright, // Playwright-specific rules
    },
    rules: {
      'playwright/no-focused-test': 'error', // Avoid test.only()
      'playwright/no-skipped-test': 'warn', // Avoid test.skip()
      'playwright/no-debug': 'warn',        // Avoid page.debug()
    },
  },
];