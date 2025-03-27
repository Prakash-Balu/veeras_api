"use strict";
const fs = require("fs");
const jwt = require("jsonwebtoken");
const user = require("../routes/user");
const privateKey = "63aed4efa5e8fa1cb63";
const moment = require("moment");
module.exports = function (mongoose, utils, constants) {
  const User = mongoose.model("User");
  const UserProfiles = mongoose.model("user_profiles");
  const Attendance = mongoose.model("Attendance");
  const SessionHistory = mongoose.model("SessionHistory");
  const ctrl = {};

  ctrl.myProfile = async (req, res) => {
    try {
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", req.userInfo);
    } catch (err) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.myAttendance = async (req, res) => {
    try {
      const { _id :userId} = req.userInfo;
      const { start, end } = req.query;
      
      const startDate = moment(start, "YYYY-MM-DD").startOf("day").utc().toDate();
     const endDate = moment(end, "YYYY-MM-DD").endOf("day").utc().toDate();

      const attendance = await Attendance.find({
        userId,
        createdAt: { $gte: startDate, $lte: endDate },
      }).lean();

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", attendance);
    } catch (err) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.reportAttendance = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { reportType } = req.query;

      let startDate, endDate;

      if (reportType === "weekly") {
          startDate = moment().startOf("isoWeek").utc().toDate();
          endDate = moment().endOf("isoWeek").utc().toDate();
      } else {
          startDate = moment().startOf("month").utc().toDate();
          endDate = moment().endOf("month").utc().toDate();
      }

      const attendance = await Attendance.find({
        userId,
        createdAt: { $gte: startDate, $lte: endDate },
      }).lean();
      console.log("attendance", attendance);

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", attendance);
    } catch (err) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.dashboard = async (req, res) => {
    try {
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", "coming soon");
    } catch (err) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.recordSession = async (req, res) => {
    try {
      const { _id: userId, channelId: sessionId } = req.userInfo;
      const { ip, headers } = req;
      const { "user-agent": userAgent, "sec-ch-ua": browser } = headers;
      const sessionRecord = await SessionHistory.create({
        userId,
        sessionId: sessionId,
        ipAddress: ip,
        userAgent,
        browser: browser,
      });
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", sessionRecord);
    } catch (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.message);
    }
  };

  ctrl.webLogout = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const user = await User.findOne({ _id: userId });
      if (user.isChannalActive === false) {
        return utils.sendResponseNew(req, res, "OK", "WEB_LOGOUT_SUCC");
      }
      user.channelId = "";
      user.isChannalActive = false;
      await user.save();
      return utils.sendResponseNew(req, res, "OK", "WEB_LOGOUT_SUCC");
    } catch (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.message);
    }
  };

  ctrl.getSession = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const session = await SessionHistory.find({
        userId,
        status: constants.loginStatus.ACTIVE,
      }).lean();
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", session);
    } catch (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.message);
    }
  };

  ctrl.getUserDetails = async (req, res) => {
    try {
      const { userId } = req.body;
      const userData = await UserProfiles.findOne({ user_id: userId });

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", userData);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return ctrl;
};
