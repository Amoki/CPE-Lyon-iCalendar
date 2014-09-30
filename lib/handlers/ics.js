"use strict";

var path = require("path");
var async = require("async");
var generateIcs = require('../generate-ics');


module.exports.get = function(req, res, next) {
  async.waterfall([
    function icsGeneration(cb) {
      generateIcs(req.query.filiere, req.query.majeure, cb);
    },
    function sendIcs(_path, cb) {
      var filename = path.basename(_path);
      res.set({
        "Content-Disposition": 'attachment; filename="' + filename + '"',
        "Content-Type": "text/calendar",
      });
      var options = {
        maxAge: 45 * 60 * 1000
      };
      res.sendFile(_path, options, cb);
    }
  ], next);
};
