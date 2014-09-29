"use strict";

require('should');
var XLSX = require('xlsx');

var lessonParse = require('../lib/helpers/parse.js');

var exportToICS = require('../lib/helpers/ical.js');


describe('Index', function(){
  it('should print xlsx', function(done) {

    var data = XLSX.readFile(__dirname + '/samples/complet.xlsx', {cellStyles: true});


    //console.log(Object.keys(data.Sheets['3IRC']))
    //console.log(require('util').inspect(data.Sheets['3IRC'], true, 50));
    //console.log(data.Sheets['3IRC']);
    var lessons = lessonParse(data, '3IRC');


    exportToICS(lessons, done);
  });
});