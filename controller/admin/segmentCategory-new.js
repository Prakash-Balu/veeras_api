"use strict";

module.exports = function (mongoose, utils, constants) {
  const segmentCategoryCtrl = {};
  const SegmentCategory = mongoose.model("SegmentCategory");

  segmentCategoryCtrl.listSegmentCategory = async (req, res) => {
    try {
      const { skip, limit } = req.query;
      const segmentCategory = await SegmentCategory.find({})
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();
      const count = await SegmentCategory.countDocuments({});
      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        segmentCategory,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return segmentCategoryCtrl;
};
