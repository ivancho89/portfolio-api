/* eslint global-require: 0 import/no-dynamic-require: 0 */

const serverless = require('serverless-http')

// Require wrapper to facilitate files imports
global.rootRequire = path => require(`${__dirname}/${path}`);

const app = rootRequire("app/init/index");
app.boot();

// because node doesn't have the import/export features of ES6
// the app is better "exported" as a global variable since:
// index boots it
// the rest of the code just use it
// it's easier to mock
global.app = app;

const handler = serverless(app.express)

module.exports.handler = async (event, context) => {
  const result = await handler(event, context)
  return result
}