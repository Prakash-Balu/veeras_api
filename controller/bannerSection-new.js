"use strict";

module.exports = function (mongoose, utils, constants) {
  const BannerSection = mongoose.model("Banner");
  const ctrl = {};

  ctrl.listBanner = async (req, res) => {
    try {
      const { skip, limit } = req.query;

      let filter = {};

      filter.status = "active";

      const getBanner = await BannerSection.find(filter)
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();
      const count = await BannerSection.countDocuments(filter);

      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        getBanner,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return ctrl;
};
