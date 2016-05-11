'use strict';

var Sequelize = require('sequelize');

var MODULEVAR = function(_DBResource) {

  var MODULENAME = _DBResource.db.define('MODULENAME', {
    name: {type: Sequelize.STRING},
    age: {type: Sequelize.INTEGER}
  }, _DBResource.tableRules);

  return {
    doSync: function(callback) {
      var _cb = callback || function() {
        console.log('[info] MODULENAME Table is created.');
      }
      MODULENAME.sync().then(_cb);
    }
  }
}

module.exports = MODULEVAR;
