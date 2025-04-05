module.exports = (mongoose, utils, constants) => {
    const express = require("express");
    const router = express.Router();
    const authenticate = require("../../middleware/index")(mongoose, utils);
    const validator = require("../../validator/auth")(utils);
    const controller = require("../../controller/admin/selfPractice-new")(
      mongoose,
      utils,
      constants
    );
  
    router.post(
      "/add",
      validator.selfPractice,
      controller.addSelfPractice
    );
    router.put(
      "/update",
      validator.updateSelfPractice,
      controller.updateSelfPractice
    );
    router.delete(
      "/delete",
      controller.deleteSelfPractice
    );
    router.get(
      "/get/:id",
  
      controller.getByIdSelfPractice
    );
    router.get(
      "/lists",
      controller.listSelfPractice
    );
  
    return router;
  };
  