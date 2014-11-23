/**
 * @file Defines the settings.
 */

// node_env can either be "development" or "production"
var defaultPort = 32100;


// Exports configuration
module.exports = {
  port: process.env.PORT || defaultPort,
};
