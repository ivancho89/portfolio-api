const bootConfig           = require("./bootstrap/config");
const bootEnvironment = require("./bootstrap/environment");
const bootExpress         = require("./bootstrap/express");

const bootDynamoDB        = require("./bootstrap/db");


/**
 * IMPORTANT: The bootloaders order of precedence must be maintained, changes
 * in the order could make the app brake
 */
const bootFunctions = [
  bootConfig,
  bootEnvironment,
  bootExpress,
  bootDynamoDB
];

const App = {
  config: undefined,
  env: undefined,
  express: undefined,
  dynamodb: undefined,
  boot() {
    bootFunctions.forEach(boot => boot(this));
  }
};

module.exports = App;