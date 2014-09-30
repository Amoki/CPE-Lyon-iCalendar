/**
 * @file Defines the settings.
 */

// node_env can either be "development" or "production"
var default_port = 8000;


// Exports configuration
module.exports = {
  port: process.env.PORT || default_port,
};
