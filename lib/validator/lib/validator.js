const Joi     = require('joi');
const i18n    = require('i18n');

/**
 * Default Validation Callback.
 * @param req {Object} request
 * @param res {Object} response
 * @param next {Function} next function
 * @param options {Object} middleware options
 * @returns {Function}
 */
function validationCallback(validationField, req, res, next, options) {
  return (err, value) => {
    // Check if error exists
    if (err) {
      const details = err.details[0]

      const objErr = {
        userMessage: i18n.__('validator_missing_fields', {type: validationField, extra:details.message.replace(/\"/g,'') }),
        serverInfo: details.path.slice(1),
        data:{},
      }
      return res.badRequest(objErr)
    }
    next();
  };
}

/**
 * Validator function.
 * @param schema {Object} Schema to validate
 * @param options {Object} Middleware function
 * @returns {Function}
 */
exports.requests = (schema, options = {}) => {

  return (req, res, next) => {

    // Test if schema exists
    if (!schema)
      return next();
    

    if(schema.desktop){
      schema = req.device.type != "desktop" ? schema.mobile : schema.desktop;
    }

    // Object to validate
    let validationField = '';
    const objectToValidate = {};
    const fields = [
        'params',
        'body',
        'query',
        'headers'
    ];
    fields.forEach((key) => {
        if (schema[key]){
          validationField = key;
          objectToValidate[key] = req[key];
        }
    });

    // Get joi options
    const joiOptions = options || {};

    return Joi.validate(objectToValidate, schema, joiOptions, validationCallback(validationField, req, res, next, options));
  };
}