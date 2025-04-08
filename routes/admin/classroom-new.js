module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const authenticate = require("../../middleware/index")(mongoose, utils);
  const validator = require("../../validator/auth")(utils);
  const controller = require("../../controller/admin/classRoom-new")(
    mongoose,
    utils,
    constants
  );
  router.post("/add", validator.classRoom, controller.addClassRoom);
  router.put("/update", validator.updateClassRoom, controller.updateClassRoom);
  router.delete("/delete", controller.deleteClassRoom);
  router.get("/get/:id", controller.getByIdClassRoom);
  router.get("/lists", controller.listClassRoom);

  return router;
};
