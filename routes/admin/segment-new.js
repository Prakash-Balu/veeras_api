module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const controller = require("../../controller/admin/segment-new")(
    mongoose,
    utils,
    constants
  );
  const validator = require("../../validator/auth")(utils);
  const authenticate = require("../../middleware/index")(mongoose, utils);

  router.post(
    "/addSegment",
    validator.segment,
    controller.addSegment
  );
  router.put(
    "/updateSegment",
    validator.updateSegment,
    controller.updateSegment
  );
  router.put(
    "/deleteSegment",
    controller.deleteSegment
  );
  router.get(
    "/listSegments",
    controller.listSegment
  );
  router.get("/:id", controller.getById);

  return router;
};
