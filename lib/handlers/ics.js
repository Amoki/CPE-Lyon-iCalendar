"use strict";

var _path = require("path");
var fs = require("fs");
var async = require("async");
var generateIcs = require('../generate-ics');
var getPath = require('../helpers/path.js');


module.exports.get = function(req, res, next) {

  var path = getPath(req.query.filiere, req.query.majeure);
  async.waterfall([
    function checkOldFile(cb) {
      fs.stat(path, function(err, file) {
        if(!file) {
          return cb(null, false);
        }
        if(new Date(file.mtime.getTime() + 45 * 60 * 1000) < new Date()) {
          cb(null, true);
        }
        else {
          cb(null, false);
        }
      });
    },
    function icsGeneration(stillValid, cb) {
      if(!stillValid) {
        generateIcs(req.query.filiere, req.query.majeure, cb);
      }
      else {
        process.nextTick(cb);
      }
    },
    function sendIcs(cb) {
      var filename = _path.basename(path);
      res.set({
        "Content-Disposition": 'attachment; filename="' + filename + '"',
        "Content-Type": "text/calendar",
      });
      var options = {
        maxAge: 45 * 60 * 1000
      };
      res.sendFile(path, options, cb);
    }
  ], next);
};
