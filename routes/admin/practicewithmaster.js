module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const authenticate = require("../../middleware/index")(mongoose, utils);
  const validator = require("../../validator/auth")(utils);
  const controller = require("../../controller/admin/practicewithmaster")(
    mongoose,
    utils,
    constants
  );
  router.post(
    "/addPractice",
    validator.practiceWithMaster,
    controller.addPractice
  );
  router.put(
    "/updatePractice",
    validator.updatePracticeWithMaster,
    controller.updatePractice
  );
  router.delete(
    "/deletePractice",
    controller.deletePractice
  );
  router.get(
    "/getPractice/:id",

    controller.getByIdPractice
  );
  router.get(
    "/listPractices",
    validator.listPracticeWithMaster,
    controller.listPractices
  );

  return router;
};
