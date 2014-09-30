"use strict";

var filieres = require('../../data').filieres;

module.exports = function(req, res, next) {
  var err;
  // Cause i'm bad at HTML
  if(req.query.majeure === ""){
    delete req.query.majeure;
  }

  if(!req.query.filiere) {
    err = new Error("Veuillez spécifier la filière");
    err.status=400;
    return next(err);
  }
  if(!filieres[req.query.filiere]) {
    err = new Error("Cette filière n'existe juste pas...");
    err.status=400;
    return next(err);
  }

  if(filieres[req.query.filiere].majeures && !req.query.majeure) {
    err = new Error("Merci de spécifier une majeure");
    err.status=400;
    return next(err);
  }

  if(!filieres[req.query.filiere].majeures && req.query.majeure) {
    err = new Error("Cette filière n'a pas de majeure");
    err.status=400;
    return next(err);
  }

  if(filieres[req.query.filiere].majeures && filieres[req.query.filiere].majeures.indexOf(req.query.majeure) === -1) {
    err = new Error("Cette majeure ne correspond pas à ta filière. (je sais, c'est mal fait)");
    err.status=400;
    return next(err);
  }
  next();
};
