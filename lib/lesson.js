"use strict";


module.exports = function Lesson(code, value, fgColor, dates, filiere) {
  var filiereData = require('../filieres/' + filiere);

  this.name = value;

  var letter = code.charAt(0);
  var number = code.slice(1);



  var horaires = filiereData.horaires;
  var colorToLocation = filiereData.colorToLocation;
  var columnToDate = filiereData.columnToDate;

  var location = colorToLocation[fgColor] || "cpe";
  var creneau = columnToDate[letter].creneau;


  var columnToRefer = columnToDate[letter].columnToRefer;

  var startDate = dates[columnToRefer][number];

  // Trick to avoid reference
  var endDate = new Date(startDate.getTime());

  var beginHours = horaires[location][creneau].start.split('h')[0];
  var beginMinutes = horaires[location][creneau].start.split('h')[1];


  var endHour = horaires[location][creneau].end.split('h')[0];
  var endMinutes = horaires[location][creneau].end.split('h')[1];

  startDate.setHours(beginHours);
  startDate.setMinutes(beginMinutes);

  endDate.setHours(endHour);
  endDate.setMinutes(endMinutes);

  this.start = startDate;
  this.end = endDate;

  if( letter === "C" && number === '14') {
    console.log(this);
  }
};
