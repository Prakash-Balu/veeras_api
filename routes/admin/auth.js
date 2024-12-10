module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const controller = require("../../controller/admin/auth")(mongoose, utils, constants);
  const authenticate = require("../../middleware/index")(mongoose, utils);

  router.post("/admin-login", controller.adminLogin);

  return router;
};
