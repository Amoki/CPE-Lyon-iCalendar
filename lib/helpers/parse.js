"use strict";

var Lesson = require('../lesson');
var dateParse = require('./date-parser');

var clean = function(data) {
  Object.keys(data).forEach(function(key) {
    if(data[key].v === undefined) {
      // I do not use empty cells
      delete data[key];
      return;
    }
    if(data[key].v >= 40000) {
      // I do not use dates here
      delete data[key];
      return;
    }
    if(key === "!merges") {
      // I do not use merges, i do something more manual
      delete data[key];
      return;
    }

    if(key === "!objects" || key === "!ref" || key === "!range" || key === "!cols") {
      // I don't know what are these values
      delete data[key];
      return;
    }

    if(key.match(/^[A-Z]{2}/i)) {
      // I do not use the last colunm
      delete data[key];
      return;
    }


    if(key.indexOf('A') === 0) {
      // I do not use weeks number
      delete data[key];
      return;
    }

    if(data[key].v.toString().match(/(vacances|ski|intégration|conseils|Armistice|Ascension|8 mai 1945|Fête du travail|noël|Jour de l'an)/i)) {
      // I do not want to save holidays|ski|etc as an event
      delete data[key];
      return;
    }

    if(data[key].v.toString().match(/(lundi|mardi|mercredi|jeudi|vendredi)/i)) {
      // I do not use visualisable days
      delete data[key];
      return;
    }

    if(data[key].v.toString().match(/(septembre|octobre|novembre|décembre|janvier|février|mars|avril|mai|juin|juillet|aout)/i)) {
      // I do not use months
      delete data[key];
      return;
    }

    if(key.match(/^[A-Z]3$/i)) {
      // I do not use visualisable times
      delete data[key];
      return;
    }
  });

  return data;
};

module.exports = function parse(data, filiere, majeure) {
  var sheet = filiere.toUpperCase();
  if(majeure) {
    sheet = sheet + 'Maj' + majeure;
  }
  // Remove useless info about the xls
  data = data.Sheets[sheet];

  var dates = dateParse(data);

  var lessons = [];

  data = clean(data);

  Object.keys(data).forEach(function(key) {

    var fgColor = (data[key].s && data[key].s.fgColor && data[key].s.fgColor.rgb) ? data[key].s.fgColor.rgb : "FFFFFF";

    var lesson = new Lesson(key, data[key].v, fgColor, dates, filiere);

    var additionnalLesson = lesson.mergeLessons(data);

    if(additionnalLesson) {
      lessons.push(additionnalLesson);
    }
    lessons.push(lesson);
  });

  return lessons;
};
