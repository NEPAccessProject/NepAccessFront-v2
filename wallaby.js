const { trace } = require("console");
const { env } = require("process");

module.exports = function (wallaby) {
    return {
        files: [
            'src/**/*.ts','src/**/*.tsx'
        ],
        tests: [
            'src/tests/**/*test.ts'
        ],
        env: {
            type: 'node',
            runner: 'node'
        },
        // for node.js tests you need to set env property as well
        // https://wallabyjs.com/docs/integration/node.html
            // Example override: only detect and configure 'vitest'
    autoDetect: ['vitest'],
    // testFramework: 'jest',
    // delay: 1000,
    // trace: true,
        debug: true,
     runMode: 'onsave',
    };
  };