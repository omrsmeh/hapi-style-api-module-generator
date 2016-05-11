'use strict';

var RequestValidator = require('./../../../../../lib/request-validator');

class MODULEVARValidator extends RequestValidator {

  constructor() {
    super();
  }

  get postValidator() {

    var schema = super._validatorSchema();

    return {
      payload: {
        name: schema.string().regex(this.nameRegex),
        isactive: schema.boolean()
      },
      failAction: function(request, reply, source, error) {
        request.log('[err] ' + error.message);
        reply({message: error.message, source: source, req: request.params});
      }
    }
  }

  get updateValidator() {

    var schema = super._validatorSchema();

    return {
      payload: {
        id: schema.number().integer().min(1),
        name: schema.string().regex(this.nameRegex),
        isactive: schema.boolean()
      },
      failAction: function(request, reply, source, error) {
        request.log('[err] ' + error.message);
        reply({message: error.message, source: source, req: request.params});
      }
    }
  }
}


module.exports = new MODULEVARValidator();
