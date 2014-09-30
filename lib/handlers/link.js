"use strict";


module.exports.get = function(req, res) {

  // Generate link to the ICS
  var link = process.env.URL || "" + '/ics?filiere=' + req.query.filiere;
  if(req.query.majeure) {
    link += '&majeure=' + req.query.majeure;
  }

  res.render('link', {
    link: link
  });
};
