"use strict";

var XLSX = require('xlsx');
var rarity = require("rarity");

var lessonParse = require('./helpers/parse');
var exportToICS = require('./helpers/ical.js');


module.exports = function generateIcs(filiere, majeure, cb) {
  if(!cb) {
    cb = majeure;
    majeure = null;
  }

  //Get the xlsx


  //parse the xlsx
  var data = XLSX.readFile(__dirname + '/../files/' + filiere + '.xlsx', {cellStyles: true});

  var lessons = lessonParse(data, filiere, majeure);

  var path;
  if(majeure) {
    path = '/tmp/' + filiere + majeure + '.ics';
  }
  else {
    path = '/tmp/' + filiere + '.ics';
  }

  exportToICS(lessons, path, rarity.carry([path], cb));
};
