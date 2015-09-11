"use strict";

var XLSX = require('xlsx');
var async = require('async');


var lessonParse = require('./helpers/parse');
var exportToICS = require('./helpers/ical');
var getPath = require('./helpers/path');
var getRooms = require('./helpers/rooms');


module.exports = function generateIcs(filiere, majeure, cb) {
  if(!cb) {
    cb = majeure;
    majeure = null;
  }

  // parse the xlsx
  var data = XLSX.readFile(__dirname + '/../files/' + filiere + '.xlsx', {cellStyles: true});

  var path = getPath(filiere, majeure);

  var lessons = lessonParse(data, filiere, majeure);

  async.waterfall([
    function getRoomsInformation(cb) {
      getRooms(filiere, majeure, cb);
    },
    function mergeLessonsAndRoom(rooms, cb) {
      merge(lessons, rooms, cb);
    },
    function generateIcsFromLessons(lessons, cb) {
      exportToICS(lessons, path, cb);
    }
  ], cb);


};
