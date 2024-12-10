module.exports = function (utils) {
  const validator = {};
  const Joi = require('joi');
  Joi.objectId = require("joi-objectid")(Joi);

  validator.signin = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
      phoneCode: Joi.string()
        .required()
        .error(() => Error("Invalid Phone Code")),
      phoneNo: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
        .error(() => Error("Invalid Phone Number"))
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.verify = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
      phoneNo: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
        .error(() => Error("Invalid Phone No")),
      otp: Joi.string()
        .length(6)
        .pattern(/^[0-9]+$/)
        .required()
        .error(() => Error("Invalid OTP")),
    });

    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.signinQR = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
      channel: Joi.string()
        .required()
        .error(() => Error("Invalid Channel")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.authenticateQR = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
      channel: Joi.string()
        .required()
        .error(() => Error("Invalid Channel")),
      isApprove: Joi.boolean().default(false).required().error(() => Error("Invalid isApprove"))
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.verifyToken = function (req, res, next) {
    const data = req.query;
    const schema = Joi.object().keys({
      token: Joi.string()
        .required()
        .error(() => Error("Invalid Token"))
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.joiValidateParams = function (req, res, data, schema, next) {
    // validate the request data against the schema
    const { error } = schema.validate(data);
    if (error) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', error.toString());
    } else {
      return next();
    }
  }
  return validator;
};  