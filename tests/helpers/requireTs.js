// Helper to require TypeScript modules at runtime using ts-node
const tsnode = require('ts-node')
tsnode.register({ transpileOnly: true, compilerOptions: { module: 'commonjs' } })

module.exports = function requireTs(modulePath) {
  return require(modulePath)
}
