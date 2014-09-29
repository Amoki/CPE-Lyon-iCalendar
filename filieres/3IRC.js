"use strict";

var horaires = {
  cpe: {
    // 8H 10H
    creneau8h: {
      start: '8h00',
      end: '10h00'
    },
    // 10H15 12H15
    creneau10h: {
      start: '10h15',
      end: '12h15'
    },
    // 13H30 15H30
    creneau14h: {
      start: '13h30',
      end: '15h30'
    },
    // 15H45 17H45
    creneau16h: {
      start: '15h45',
      end: '17h45'
    },
  },
  iut: {
    // 8h 10h
    creneau8h: {
      start: '8h00',
      end: '10h00'
    },
    // 10h 12h
    creneau10h: {
      start: '10h00',
      end: '12h00'
    },
    // 13h30 15h30
    creneau14h: {
      start: '13h30',
      end: '15h30'
    },
    // 15h30 17h30
    creneau16h: {
      start: '15h30',
      end: '17h30'
    },
  },
  afpi: {
    // 8H30 10H30
    creneau8h: {
      start: '8h30',
      end: '10h30'
    },
    // 10H30 12H30
    creneau10h: {
      start: '10h30',
      end: '12h30'
    },
    // 13H30 15H30
    creneau14h: {
      start: '13h30',
      end: '15h30'
    },
    // 13H30 17H30
    creneau16h: {
      start: '15h30',
      end: '17h30'
    }
  }
};


/*
 * An object with a column as key and a colunm as value.
 * The key is the colunm of the lesson's cell
 * the value is the column to refer to get the date
 */
var columnToDate = {
  C: {
    columnToRefer: "B",
    creneau: "creneau8h"
  },
  D: {
    columnToRefer: "B",
    creneau: "creneau10h"
  },
  E: {
    columnToRefer: "B",
    creneau: "creneau14h"
  },
  F: {
    columnToRefer: "B",
    creneau: "creneau16h"
  },

  H: {
    columnToRefer: "G",
    creneau: "creneau8h"
  },
  I: {
    columnToRefer: "G",
    creneau: "creneau10h"
  },
  J: {
    columnToRefer: "G",
    creneau: "creneau14h"
  },
  K: {
    columnToRefer: "G",
    creneau: "creneau16h"
  },

  M: {
    columnToRefer: "L",
    creneau: "creneau8h"
  },
  N: {
    columnToRefer: "L",
    creneau: "creneau10h"
  },
  O: {
    columnToRefer: "L",
    creneau: "creneau14h"
  },
  P: {
    columnToRefer: "L",
    creneau: "creneau16h"
  },

  R: {
    columnToRefer: "Q",
    creneau: "creneau8h"
  },
  S: {
    columnToRefer: "Q",
    creneau: "creneau10h"
  },
  T: {
    columnToRefer: "Q",
    creneau: "creneau14h"
  },
  U: {
    columnToRefer: "Q",
    creneau: "creneau16h"
  },

  W: {
    columnToRefer: "V",
    creneau: "creneau8h"
  },
  X: {
    columnToRefer: "V",
    creneau: "creneau10h"
  },
  Y: {
    columnToRefer: "V",
    creneau: "creneau14h"
  },
  Z: {
    columnToRefer: "V",
    creneau: "creneau16h"
  },
};

var colorToLocation = {
  'CCFFCC': 'iut',
  '99CC00': 'iut',
  '00B050': 'iut',

  'FCD5B4': 'afpi',
  'FAC090': 'afpi',

  // All others color are supposed to be at CPE
};

var rawLocationToPrettyLocation = {
  iut: "IUT 17 Rue de France, 69100 Villeurbanne",
  afpi: 'AFPI 10 boulevard Edmond Michelet, 69008 Lyon',
  cpe: '3 rue Victor Grignard, 69100 VILLEURBANNE'
};

module.exports = {
  horaires: horaires,
  colorToLocation : colorToLocation,
  columnToDate: columnToDate,
  rawLocationToPrettyLocation: rawLocationToPrettyLocation
};
