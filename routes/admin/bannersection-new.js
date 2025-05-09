module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const authenticate = require("../../middleware/index")(mongoose, utils);
  const controller = require("../../controller/admin/bannerSection-new")(
    mongoose,
    utils,
    constants
  );
  const validator = require("../../validator/auth")(utils);

  router.post(
    "/addBannerSection",
    validator.bannerSection,
    controller.addBanner
  );
  router.put(
    "/updateBannerSection",
    validator.updateBannerSection,
    controller.updateBanner
  );
  router.get("/listBannerSection", controller.listBanner);

  return router;
};
