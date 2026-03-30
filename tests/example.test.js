// Simple example test runnable with `node tests/example.test.js`
const assert = require('assert');

function sum(a, b) {
  return a + b;
}

assert.strictEqual(sum(2, 3), 5);
console.log('example.test.js: OK');
