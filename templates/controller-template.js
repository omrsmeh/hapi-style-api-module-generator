'use strict';

var MODULEVAR = require('./MODULEPATH');
var RequestValidator = require('./../validator');

exports.register = function (server, options, next) {

  server.route([
    // Get List of MODULENAME
    {
      method: 'GET',
      path: '/MODULENAME/{id}',
      handler: function (request, reply) {

        var model = new MODULEVAR(server.settings.app);
        reply({ message: "Welcome To MODULENAME..., Request Id: "+request.params.id });
      },
      config: {
        validate: RequestValidator.idValidator
      }
    },

    // Get MODULENAME Information By Id
    {
      method: 'GET',
      path: '/MODULENAMEs',
      handler: function (request, reply) {

        var model = new MODULEVAR(server.settings.app);
        reply({ message: "Welcome To MODULENAME..., Request load all MODULENAMEs" });
      }
    },

    // Create New MODULENAME
    {
      method: 'POST',
      path: '/MODULENAME/create',
      handler: function (request, reply) {

        var model = new MODULEVAR(server.settings.app);
        reply({ message: "Welcome To MODULENAME..., Create Request" });
      },
      config: {
        validate: RequestValidator.postValidator
      }
    },

    // Updatiing MODULENAME Information
    {
      method: 'PUT',
      path: '/MODULENAME/update',
      handler: function (request, reply) {

        var model = new MODULEVAR(server.settings.app);
        reply({ message: "Welcome To MODULENAME..., Update Request" });
      },
      config: {
        validate: RequestValidator.updateValidator
      }
    },

    // Delete/Drop MODULENAME By Id
    {
      method: 'DELETE',
      path: '/MODULENAME/{id}',
      handler: function (request, reply) {

        var model = new MODULEVAR(server.settings.app);
        reply({ message: "Welcome To MODULENAME..., Delete Request" });
      },
      config: {
        validate: RequestValidator.idValidator
      }
    }

  ]);

  next();
};

exports.register.attributes = {
  name: 'MODULENAME'
};
