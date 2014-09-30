"use strict";

var ical = require('ical-generator');


module.exports = function icalGenerator(lessons, path, cb) {
  var cal = ical();

  lessons.forEach(function(lesson) {
    cal.setDomain('cpe-calendar.herokuapp.com').setName(lesson.name);

    cal.addEvent({
      summary: lesson.name,
      start: lesson.start,
      end: lesson.end,
      description: lesson.name,
      location: lesson.room + ' ' + lesson.location
    });
  });

  cal.save(path, cb);
};
