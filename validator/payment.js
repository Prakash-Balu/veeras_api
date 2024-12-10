module.exports = function (utils) {
  const validator = {};
  const Joi = require('joi');
  Joi.objectId = require("joi-objectid")(Joi);

  validator.createPayment = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
      planId: Joi.string()
        .required()
        .error(() => Error("Invalid PlanId")),
      currencyCode: Joi.string()
        .required()
        .error(() => Error("Invalid CurrencyCode")),
      amount: Joi.number()
        .required()
        .error(() => Error("Invalid Amount"))
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.joiValidateParams = function (req, res, data, schema, next) {
    const { error } = schema.validate(data);
    if (error) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', error.toString());
    } else {
      return next();
    }
  }
  return validator;
};  