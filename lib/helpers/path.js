"use strict";


module.exports = function(filiere, majeure) {
  if(majeure) {
    return '/tmp/' + filiere + majeure + '.ics';
  }
  else {
    return '/tmp/' + filiere + '.ics';
  }
};
