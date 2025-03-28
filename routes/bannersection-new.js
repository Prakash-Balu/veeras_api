module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const authenticate = require("../middleware/index")(mongoose, utils);
  const controller = require("../controller/bannerSection-new")(
    mongoose,
    utils,
    constants
  );

  router.get(
    "/listBannerSection",
    authenticate.validateToken,
    controller.listBanner
  );

  return router;
};
