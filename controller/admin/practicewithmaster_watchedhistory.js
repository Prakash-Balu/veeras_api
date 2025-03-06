"use strict";

module.exports = function (mongoose, utils, constants) {
  const Pwm_watchedhistory = require("../../models/practicewithmaster_watchedhistory")(mongoose, constants);
  const User = mongoose.model("User");
  const PracticeWithMaster = mongoose.model("PracticeWithMaster");
  const ctrl = {};

  ctrl.addWatchedHistory = async (req, res) => {
    try {
      const { userId, practiceWithMasterId, shortId } = req.body;

      const user = await User.findOne({ _id: userId });
      if (!user) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "Watched History not found");
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

  ctrl.updateWatchedHistory = async (req, res) => {
    try {
      const { id, practiceWithMasterId, shortId } = req.body;

      const watchedHistory = await Pwm_watchedhistory.findOne({
        _id: id,
        isDeleted:false,
      });
      if (!watchedHistory) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "watchedHistory Not Found"
        );
      }

      const practiceWithMaster = await practiceWithMaster.findOne({
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
          "Short Id not found in practice"
        );
      }

      const updatedWatchedHistory = await Pwm_watchedhistory.findOneAndUpdate(
        { _id: id, isDeleted:false },
        {
          $set: {
            practiceWithMasterId,
            shortId,
          },
        },
        { new: true }
      );

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", updatedWatchedHistory);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.deleteWatchedHistory = async (req, res) => {
    try {
      const { id } = req.body;
      const getWatchedHistory = await Pwm_watchedhistory.findOne({ _id: id , isDeleted:false }).lean();
   

      if (!getWatchedHistory) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "WatchedHistory Not Found");
      }

      await Pwm_watchedhistory.updateOne(
        { _id: id }, 
        { $set: { isDeleted: true } }
      );

      return utils.sendResponseNew(
        req,
        res,
        "OK",
        "Deleted Successfully"
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.getByIdWatchedHistory = async (req, res) => {
    try {
      const { id } = req.params;

      const getWatchedHistory = await Pwm_watchedhistory.findOne({
        _id: id,
        isDeleted:false,
      });
      if (!getWatchedHistory) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "No WatchedHistory found");
      }
      return utils.sendResponseNew(req, res, "OK", "Success", getWatchedHistory);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.listWatchedHistory = async (req, res) => {
    try {
      const { skip, limit } = req.query;
      const getWatchedHistory = await Pwm_watchedhistory.find({
        isDeleted:false,
      })
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();
      const count = await Pwm_watchedhistory.countDocuments({ 
        isDeleted:false,
      });
      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        getWatchedHistory,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return ctrl;
};
