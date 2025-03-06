"use strict";

module.exports = function (mongoose, utils, constants) {
  const Pwm_watchedhistory = require("../models/practicewithmaster_watchedhistory")(mongoose, constants);
  const User = mongoose.model("User");
  const PracticeWithMaster = mongoose.model("PracticeWithMaster");
  const ctrl = {};

  ctrl.addWatchedHistory = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const {practiceWithMasterId, shortId } = req.body;

      const user = await User.findOne({ _id: userId });
      if (!user) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "User not found");
      }

      const practiceWithMaster = await PracticeWithMaster.findOne({
        _id: practiceWithMasterId,
        status: "active",
      });

      if (!practiceWithMaster) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "practice not found"
        );
      }

      const shortExists = practiceWithMaster.shorts.some(
        (short) => short._id.toString() === shortId
      );
      if (!shortExists) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Short not found in practice"
        );
      }

      const alreadyWatched = await Pwm_watchedhistory.findOne({
        userId,
        shortId,
      });

      if (alreadyWatched) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "User has already watched this short"
        );
      }

      const watchedHistory = await Pwm_watchedhistory.create({
        userId,
        practiceWithMasterId,
        shortId,
      });

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", watchedHistory);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return ctrl;
};
