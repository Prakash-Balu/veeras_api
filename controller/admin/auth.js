"use strict";

module.exports = function (mongoose, utils, constants) {
  const authCtrl = {};
  const UserProfile = mongoose.model("user_profiles");
  const LoginHistory = mongoose.model("LoginHistory");
  const SessionHistory = mongoose.model("SessionHistory");
  const bcrypt = require("bcryptjs");

  authCtrl.adminLogin = async (req, res) => {
    try {
      const { deviceId } = req.headers;
      const { email, password } = req.body;

      // Check if the email already exists
      const existingUser = await UserProfile.findOne({ mailId: email });

      if (!existingUser) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "USER_NOT_FOUND");
      }

      // Hash the password
      //const hashedPassword = await bcrypt.hash(password, 10);

      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (!passwordMatch) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "INVALID_CREDENTIALS");
      }

      if ("ADMIN"!== existingUser.role) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "INVALID_USER_ACCESS");
      }

      console.log("role",existingUser.role);
      

      const token = utils.generateToken({ _id: existingUser.user_id, deviceId, mail: existingUser.mailId, isMobile: false, role: existingUser.role, channelId: "" }, "3d");
      await LoginHistory.findOneAndUpdate(
        { userId: existingUser.user_id, status: constants.loginStatus.ACTIVE },
        { $set: { status: constants.loginStatus.IN_ACTIVE } }
      );
      await SessionHistory.updateOne(
        { userId: existingUser.user_id, status: constants.loginStatus.ACTIVE },
        { $set: { status: constants.loginStatus.IN_ACTIVE } }
      );

      authCtrl.recordLogin(existingUser.user_id, req);
      console.log("Token from user/verify: ", token);

      let authDetails = {
        userDetails: existingUser,
        token: token
      }

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", authDetails);
    } catch (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.message);
    }
  };

  authCtrl.recordLogin = async (userId, req) => {
    const { ip, headers } = req;
    const { "user-agent": userAgent, "sec-ch-ua": browser } = headers;
    const deviceDetails = {
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os,
      platform: req.useragent.platform,
    };

    let ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    ipAddress = ipAddress.split(",")[0].trim();

    await LoginHistory.create({
      userId,
      ipAddress: ipAddress,
      userAgent,
      browser: browser,
    });
    return true;
  };

  return authCtrl;
};
