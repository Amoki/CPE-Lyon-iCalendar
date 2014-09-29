"use strict";

var ical = require('ical-generator');


module.exports = function icalGenerator(lessons, cb) {
  var cal = ical();

  lessons.forEach(function(lesson) {
    cal.setDomain('cpe-calendar.herokuapp.com').setName(lesson.name);

    if(lesson.name === 'TP Introduction aux réseaux : G105') {
      console.log(lesson)
    }

    cal.addEvent({
        summary: lesson.name,
        start: lesson.start,
        end: lesson.end,
        description: lesson.name,
    });
  });

  cal.save('/tmp/3IRC.ics', cb);
};
