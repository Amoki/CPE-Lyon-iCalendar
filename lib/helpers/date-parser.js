"use strict";

/*
 * @param: data. The parsed xls
 * @return: An object with cell code as keys and Date as value
 */

module.exports = function datesGenerator(data) {

  var dates = {};
  Object.keys(data).forEach(function(key) {
    if(data[key].v >= 40000) {
      // transform number as day/month value ans store it in an object
      dates[key] = data[key].w;
    }
  });


  var fullDates = {};
  Object.keys(dates).forEach(function(code) {
    // Parse code
    var letter = code.charAt(0);
    var number = code.slice(1);

    // Cause lessons are 'printed' on 2 lines
    var next = parseInt(number) + 1;


    // Convert string into Date
    var month = dates[code].split('/')[1];
    var day = dates[code].split('/')[0];
    var year;

    // demander pour ne pas avoir à hard coder les dates
    if(month >= 9) {
      year = 2014;
    }
    else {
      year = 2015;
    }

    if(fullDates[letter] === undefined) {
      fullDates[letter] = {};
    }
    fullDates[letter][number] = new Date(year, month - 1, day);

    if(dates[letter + next] === undefined) {
      fullDates[letter][next] = fullDates[letter][number];
    }
  });

  return fullDates;
};
