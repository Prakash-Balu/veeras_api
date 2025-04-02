module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const controller = require("../controller/practicewithmaster")(
    mongoose,
    utils,
    constants
  );
  const authenticate = require("../middleware/index")(mongoose, utils);
  const validator = require("../validator/auth")(utils);

  router.get(
    "/getPractice/:id",
    authenticate.validateToken,
    controller.getByIdPractice
  );
  router.get(
    "/listPractices",
    authenticate.validateToken,
    validator.listPracticeWithMaster,
    controller.listPractices
  );

  return router;
};
