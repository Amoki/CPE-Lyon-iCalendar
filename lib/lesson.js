"use strict";

var columnToDate = require('../data/column-to-date');

var nextLetter = function nextLetter(s){
  return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a){
    var c = a.charCodeAt(0);
    switch(c){
      case 90: return 'AA';
      default: return String.fromCharCode(c + 1);
    }
  });
};


var Lesson = function Lesson(code, value, fgColor, dates, filiere) {
  var filiereData = require('../data/filieres/' + filiere);

  this.name = value;
  this.value = value;
  this.rawLocation = filiereData.colorToLocation[fgColor] || "cpe";

  this.letter = code.charAt(0);
  this.number = code.slice(1);

  this.room = this.name.split(':')[1] || "Salle non définie";

  this.location = filiereData.rawLocationToPrettyLocation[this.rawLocation];

  var timetable = filiereData.timetable;

  var timeSlot = columnToDate[this.letter].timeSlot;

  var columnToRefer = columnToDate[this.letter].columnToRefer;

  // Trick to avoid reference
  var startDate = new Date(dates[columnToRefer][this.number].getTime());

  // Trick to avoid reference
  var endDate = new Date(startDate.getTime());

  var startHours = timetable[this.rawLocation][timeSlot].start.split('h')[0];
  var startMinutes = timetable[this.rawLocation][timeSlot].start.split('h')[1] || 0;


  var endHour = timetable[this.rawLocation][timeSlot].end.split('h')[0];
  var endMinutes = timetable[this.rawLocation][timeSlot].end.split('h')[1] || 0;

  startDate.setHours(startHours);
  startDate.setMinutes(startMinutes);

  endDate.setHours(endHour);
  endDate.setMinutes(endMinutes);

  this.start = startDate;
  this.end = endDate;


  // So ugly, but works. If you have a better solution, i take it !
  this.mergeLessons = function(data) {
    var next = nextLetter(this.letter);
    var nextCode = next + this.number;

    if(data[nextCode] === undefined && columnToDate[next] !== undefined) {
      // update the endDate
      var timeSlot = columnToDate[next].timeSlot;

      // Trick to avoid reference
      var endDate = new Date(dates[columnToRefer][this.number].getTime());

      endHour = timetable[this.rawLocation][timeSlot].end.split('h')[0];
      endMinutes = timetable[this.rawLocation][timeSlot].end.split('h')[1] || 0;

      endDate.setHours(endHour);
      endDate.setMinutes(endMinutes);

      this.end = endDate;

      // Create a new event for the afternoon (if a lesson lasts 8 hours in a row)
      next = nextLetter(next);
      nextCode = next + this.number;

      if(data[nextCode] === undefined && columnToDate[next] !== undefined) {
        var lesson = new Lesson(nextCode, value, fgColor, dates, filiere);
        lesson.mergeLessons(data);
        return lesson;
      }
    }
  };
};

module.exports = Lesson;
