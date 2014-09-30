'use strict';
/**
 * @file Define everything that need to be exported for use with the server.
 *
 * This object contains everything that need to be exported (for test or production purposes) : handlers, models and middleware.
 */
var autoload = require('auto-load');

module.exports = autoload(__dirname);
