"use strict";

var XLS = require('xlsjs');

var xlsParse = require('./helpers/parse');
var dateParser = require('./helpers/date-parser');

module.exports = function init() {
  var data = XLS.readFile(__dirname + '/samples/complet.xls');

  var dates = dateParser(data);
  console.log(dates);

  var lessons = xlsParse(data);

  lessons.map(function(lesson) {


  });

  return lessons;
};