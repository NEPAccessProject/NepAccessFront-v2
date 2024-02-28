const { trace } = require("console");

module.exports = function (wallaby) {
    return {
        files: [
            'src/**/*.ts','src/**/*.tsx'
        ],
        tests: [
            'src/tests/**/*test.ts'
        ],
        // for node.js tests you need to set env property as well
        // https://wallabyjs.com/docs/integration/node.html
            // Example override: only detect and configure 'vitest'
    // autoDetect: ['vitest','jest'],
    // testFramework: 'jest',
    // delay: 1000,
    // trace: true,
    // debug: true,
    // runMode: 'onsave',
    };
  };