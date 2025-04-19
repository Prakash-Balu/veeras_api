"use strict";

module.exports = function (mongoose, utils, constants) {
  const PracticeWithMaster = mongoose.model("PracticeWithMaster");
  const Pwm_watchedhistory =
    require("../models/practicewithmaster_watchedhistory")(mongoose, constants);
  const User = mongoose.model("User");
  const ctrl = {};

  ctrl.getByIdPractice = async (req, res) => {
      
    try {
      const { id } = req.params;
      // const { _id: userId } = req.userInfo;

      // const user = await User.findOne({ _id: userId });
      // if (!user) {
      //   return utils.sendErrorNew(req, res, "BAD_REQUEST", "User not found");
      // }

      const getPractice = await PracticeWithMaster.findOne({
        _id: id,
        status: "active",
      }).lean();

      
      if (!getPractice) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "No practice found");
      }

      const watchedHistory = await Pwm_watchedhistory.find({ })
      .select("practiceWithMasterId shortId")
      .lean();

    const watchedSet = new Set(
      watchedHistory.map((w) => `${w.practiceWithMasterId}-${w.shortId}`)
    );
    
    const modifiedPractice = {
      ...getPractice,
      shorts: getPractice.shorts.map((short) => ({
        ...short,
        watched: watchedSet.has(`${getPractice._id}-${short._id}`),
      })),
    };

      return utils.sendResponseNew(req, res, "OK", "Success", modifiedPractice);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.listPractices = async (req, res) => {

    try {
      const { skip, limit } = req.query;
 
      const getPractice = await PracticeWithMaster.find({
        status: "active",
      })
        .select("name description")
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();

      const count = await PracticeWithMaster.countDocuments({
        status: "active",
      });

      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        getPractice,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return ctrl;
};
