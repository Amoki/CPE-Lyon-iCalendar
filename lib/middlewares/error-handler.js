"use strict";

module.exports = function(err, req, res, next){
  console.log(err);
  res.status(err.status);
  res.render('error', { error: err });
};
