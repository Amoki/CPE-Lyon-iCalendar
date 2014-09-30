"use strict";

var filieres = require('../../data').filieres;

module.exports.get = function(req, res){
  var majeures = [];
  Object.keys(filieres).forEach(function(filiere) {
    if(filieres[filiere].majeures) {
      filieres[filiere].majeures.forEach(function(majeure) {
        majeures.push(majeure);
      });
    }
  });

  res.render('index', {
    filieres: Object.keys(filieres),
    majeures: majeures
  });
};
