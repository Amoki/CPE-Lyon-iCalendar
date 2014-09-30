"use strict";

var async = require("async");
var generateIcs = require('../generate-ics');


module.exports.get = function(req, res, next) {
  async.waterfall([
    function icsGeneration(cb) {
      generateIcs(req.query.filiere, req.query.majeure, cb);
    },
    function sendIcs(path, cb) {
      var options = {
        maxAge: 45 * 60 * 1000
      };
      res.sendFile(path, options, cb);
    }
  ], next);
};
