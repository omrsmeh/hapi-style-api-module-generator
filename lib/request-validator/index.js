'use strict';

var Joi = require('joi');

class RequestValidator {

  constructor() {

    this.Joi = Joi;
    this.nameRegex = /^([a-zA-Z0-9\-\'\_\s]+)$/;
  }

  _validatorSchema() {

    return this.Joi;
  }

  get nameStringRegex() {

    return this.nameRegex;
  }

  get idValidator() {

    var schema = this._validatorSchema();

    return {
      params: {
        id: schema.number().integer().min(1)
      },
      failAction: function(request, reply, source, error) {
        var _message = 'Request fail: Id must be a number and larger than or equal to 1';
        request.log('[err] ' + error.message);
        reply({message: _message, source: source, req: request.params});
      }
    }
  }

  get postValidator() {
    // Body implemented with in api model
  }

  get updateValidator() {
    // Body implemented with in api model 
  }
}

module.exports = RequestValidator;
