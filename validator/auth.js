module.exports = function (utils) {
  const validator = {};
  const Joi = require("joi");
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
        .error(() => Error("Invalid Phone Number")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.verifyToken = function (req, res, next) {
    const data = req.query;
    const schema = Joi.object().keys({
      token: Joi.string()
        .required()
        .error(() => Error("Invalid Token")),
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
      isApprove: Joi.boolean()
        .default(false)
        .required()
        .error(() => Error("Invalid isApprove")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.practiceWithMaster = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object({
      description: Joi.string().optional(),
      subject: Joi.string().optional(),
      isSubject: Joi.boolean().optional(),
      segmentId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .error(() => Error("Invalid Segment ID")),
      videoUrl: Joi.string()
        .required()
        .error(() => Error("Invalid Video URL")),
      slug_url: Joi.string().optional(),
      shorts: Joi.array()
        .items(
          Joi.object({
            shortUrl: Joi.string().required(),
            question: Joi.string().required(),
            answer: Joi.string().required(),
          })
        )
        .required()
        .error(() => Error("Invalid Shorts Format")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.updatePracticeWithMaster = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object({
      id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .error(() => Error("Invalid ID")),
      description: Joi.string().optional(),
      subject: Joi.string().optional(),
      status: Joi.string().optional(),
      isSubject: Joi.boolean().optional(),
      slug_url: Joi.string().optional(),
      segmentId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional()
        .error(() => Error("Invalid Segment ID")),

      videoUrl: Joi.string()
        .optional()
        .error(() => Error("Invalid Video URL")),

      shorts: Joi.array()
        .items(
          Joi.object({
            id: Joi.string()
              .pattern(/^[0-9a-fA-F]{24}$/)
              .optional()
              .error(() => Error("Invalid ID")),
            shortUrl: Joi.string().optional(),
            question: Joi.string().optional(),
            answer: Joi.string().optional(),
          })
        )
        .optional()
        .error(() => Error("Invalid Shorts Format")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.listPracticeWithMaster = function (req, res, next) {
    const data = req.query;

    const schema = Joi.object({
      skip: Joi.string().optional(),
      limit: Joi.string().optional(),
      segmentId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional()
        .error(() => Error("Invalid Segment ID")),
      status: Joi.string()
        .valid("active", "inActive", "deleted")
        .optional()
        .error(() =>
          Error("Invalid status, Allowed values are active ,inActive,delete ")
        ),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.segment = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object({
      title: Joi.string().required(),
      slug_url: Joi.string().optional(),
      category: Joi.array()
        .items(
          Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .error(() => Error("Invalid category Id"))
        )
        .required()
        .error(() => Error("Required category Id")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.updateSegment = function (req, res, next) {
    const data = req.body;

    const schema = Joi.object({
      id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional()
        .error(() => Error("Invalid ID")),
      title: Joi.string().optional(),
      slug_url: Joi.string().optional(),
      category: Joi.array()
        .items(
          Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .optional()
            .error(() => Error("Invalid category Id"))
        )
        .optional()
        .error(() => Error("Required category Id")),
      status: Joi.string()
        .valid("active", "inActive")
        .optional()
        .error(() =>
          Error("Invalid status, Allowed values are active ,inActive")
        ),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.bannerSection = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
      motivationalDescription: Joi.string().required(),
      slug_url: Joi.string().optional(),
      videoUrl: Joi.string()
        .uri()
        .required()
        .error(() => Error("Invalid Video URL")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.updateBannerSection = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object({
      id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional()
        .error(() => Error("Invalid ID")),
      name: Joi.string().optional(),
      motivationalDescription: Joi.string().optional(),
      slug_url: Joi.string().optional(),
      videoUrl: Joi.string()
        .uri()
        .optional()
        .error(() => Error("Invalid Video URL")),
      status: Joi.string()
        .valid("active", "inActive")
        .optional()
        .error(() =>
          Error("Invalid status, Allowed values are active ,inActive")
        ),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.selfPractice = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object({
      displayType: Joi.string().valid("type1", "type2", "type3").required(),
      segmentId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .error(() => Error("Invalid Segment ID")),
      subject: Joi.string().optional(),
      isSubject: Joi.boolean().optional(),
      slug_url: Joi.string().optional(),
      practices: Joi.array()
        .items(
          Joi.object({
            questionInEnglish: Joi.string().required(),
            questionInTamil: Joi.string().required(),
            answer: Joi.string().required(),
          })
        )
        .required()
        .error(() => Error("Invalid practice Format")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.updateSelfPractice = function (req, res, next) {
    const data = req.body;
    const schema = Joi.object({
      id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .error(() => Error("Invalid ID")),
      displayType: Joi.string().valid("type1", "type2", "type3").optional(),
      isSubject: Joi.boolean().optional(),
      subject: Joi.string().optional(),
      slug_url: Joi.string().optional(),
      segmentId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional()
        .error(() => Error("Invalid Segment ID")),
      practices: Joi.array()
        .items(
          Joi.object({
            questionInEnglish: Joi.string().optional(),
            questionInTamil: Joi.string().optional(),
            answer: Joi.string().optional(),
            _id: Joi.string().optional(),
          })
        )
        .optional()
        .error(() => Error("Invalid practice Format")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.classRoom = function (req, res, next) {
    const data = req.body;

    const schema = Joi.object({
      segmentId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .error(() => Error("Invalid Segment ID")),
      isSubject: Joi.boolean().required(),
      subject: Joi.string().when('isSubject', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.forbidden()
      }).error(() => Error("Invalid Subject")),
      video_url: Joi.string()
        .uri()
        .required()
        .error(() => Error("Invalid Video URL")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.updateClassRoom = function (req, res, next) {
    const data = req.body;

    const schema = Joi.object({
      id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional()
        .error(() => Error("Invalid ID")),
      segmentId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional()
        .error(() => Error("Invalid Segment ID")),
      subject: Joi.string().optional(),
      slug_url: Joi.string().optional(),
      isSubject: Joi.boolean().optional(),
      video_url: Joi.string()
        .uri()
        .optional()
        .error(() => Error("Invalid Video URL")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };


  validator.addComment = function (req, res, next) {
    const data = req.body;

    const schema = Joi.object({
      classRoomId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .error(() => Error("Invalid ClassRoom ID")),
      message: Joi.string()
      .required()
      .error(() => Error("Invalid Message")),
      isAudio: Joi.boolean().required().error(() => Error("Isaudio Must be true or false"))
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.addReply = function (req, res, next) {
    const data = req.body;

    const schema = Joi.object({
    parentId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .error(() => Error("Invalid Parent ID")),
    classRoomId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .error(() => Error("Invalid ClassRoom ID")),
    message: Joi.string()
      .required()
      .error(() => Error("Invalid Message")),
    isAudio: Joi.boolean().required().error(() => Error("Isaudio Must be true or false"))
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.listChat = function (req, res, next) {
    const data = req.query;

    const schema = Joi.object({
      skip: Joi.string().optional(),
      limit: Joi.string().optional(),
      classRoomId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional()
        .error(() => Error("Invalid classroom ID")),
    });
    return validator.joiValidateParams(req, res, data, schema, next);
  };

  validator.joiValidateParams = function (req, res, data, schema, next) {
    // validate the request data against the schema
    const { error } = schema.validate(data);
    if (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.toString());
    } else {
      return next();
    }
  };
  return validator;
};
