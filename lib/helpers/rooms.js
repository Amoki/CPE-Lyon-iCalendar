"use strict";

var ical = require('ical');

var config = require('../../data');
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


module.exports = function getRooms(filiere, majeur, cb) {
  var url;
  if(majeur) {
    url = config.filieres[filiere].rooms[majeur];
  }
  else {
    url = config.filieres[filiere].rooms;
  }

  ical.fromURL(url, {}, function(err, data) {
    if(err) {
      return cb(err);
    }
    console.log(data);
    data.forEach(function(lesson){

    });
    cb();
  });
};
