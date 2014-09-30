"use strict";

var XLSX = require('xlsx');
var lessonParse = require('./helpers/parse');
var exportToICS = require('./helpers/ical.js');
var getPath = require('./helpers/path.js');


module.exports = function generateIcs(filiere, majeure, cb) {
  if(!cb) {
    cb = majeure;
    majeure = null;
  }

  //Get the xlsx


  //parse the xlsx
  var data = XLSX.readFile(__dirname + '/../files/' + filiere + '.xlsx', {cellStyles: true});

  var lessons = lessonParse(data, filiere, majeure);

  var path = getPath(filiere, majeure);

  exportToICS(lessons, path, cb);
};
