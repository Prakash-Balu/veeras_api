module.exports = function (utils) {
  const validator = {};
  const Joi = require('joi');
  Joi.objectId = require("joi-objectid")(Joi);

  validator.createPayment = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object().keys({
      user: Joi.object().keys({
        name: Joi.string()
          .required()
          .error(() => Error("Invalid name")),
        phoneCode: Joi.string()
          .required()
          .error(() => Error("Invalid phoneCode")),
        phone: Joi.string()
          .required()
          .error(() => Error("Invalid phone")),
        whatsapp: Joi.string()
          .required()
          .error(() => Error("Invalid whatsapp")),
        email: Joi.email()
          .required()
          .error(() => Error("Invalid email")),
        country: Joi.string()
          .required()
          .error(() => Error("Invalid country")),
        state: Joi.string()
          .required()
          .error(() => Error("Invalid state")),
        city: Joi.string()
          .required()
          .error(() => Error("Invalid city")),
        pincode: Joi.number()
          .required()
          .error(() => Error("Invalid pincode")),
        isCompany: Joi.boolean()
          .required()
          .error(() => Error("Invalid isCompany")),
        companyName: Joi.string()
          .optional()
          .error(() => Error("Invalid companyName")),
        gstNumber: Joi.string()
          .optional()
          .error(() => Error("Invalid gstNumber")),
      }).required().error(() => "Invalid user object"),
      planId: Joi.string()
        .required()
        .error(() => Error("Invalid PlanId")),
      currencyCode: Joi.string()
        .required()
        .error(() => Error("Invalid CurrencyCode")),
      amount: Joi.number()
        .required()
        .error(() => Error("Invalid Amount")),
      duration: Joi.number()
        .valid([1, 3, 6])
        .required()
        .error(() => Error("Invalid Duration"))
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