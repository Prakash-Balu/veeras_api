"use strict";
const privateKey = "63aed4efa5e8fa1cb63";
const { IPinfoWrapper } = require("node-ipinfo");

module.exports = function (mongoose, utils, pusher, constants) {
  const ctrl = {};
  const User = mongoose.model("User");
  const LoginHistory = mongoose.model("LoginHistory");
  const SessionHistory = mongoose.model("SessionHistory");
  const { authenticator, totp } = require('otplib');
  const twilio = require('twilio');

  // Twilio Credentials
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  const client = twilio(accountSid, authToken);


  ctrl.signin = async (req, res) => {
    try {
      const { phoneCode, phoneNo } = req.body;
      const isUserExist = await User.findOne({ phone: phoneNo, phoneCode }).lean();
      const secret = utils.codeGenerator(); // base32 encoded hex secret key
      totp.options = { digits: 6, step: 600 };
      const otp = totp.generate(secret);
      // Send OTP via Twilio SMS
      const twillioResp = await client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: twilioPhone,
        to: `${phoneCode}${phoneNo}`
      })
      console.log("twillioResp::", twillioResp);
      if (!isUserExist) {
        const userObj = {
          phone: phoneNo,
          phoneCode,
          otpSecret: secret
        };
        await User.create(userObj)
        
      } else {
        await User.updateOne({ _id: isUserExist._id }, { $set: { otpSecret: secret } })
      }
      return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', otp);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  };

  ctrl.verify = async (req, res) => {
    try {
      const { deviceId } = req.headers;
      console.log("headers::", req.headers);
      console.log("deviceID::", deviceId);
      
      
      const { phoneNo, otp } = req.body;
      const user = await User.findOne({ phone: phoneNo });
      if (!user) {
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', 'USER_NOT_FOUND');
      };
      const isValid = totp.check(otp, user.otpSecret);
      if (!isValid) {
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', 'Invalid otp or time Expire');
      }
      if (!user.isVerified) {
        user.isVerified = true;
      };
      user.otpSecret = '';
      user.deviceId = deviceId; //Updated deviceId

      await user.save();
      console.log("user::", user);
      
      const token = utils.generateToken({ _id: user._id, deviceId, phone: user.phone, isMobile: true }, '3d');
      await LoginHistory.findOneAndUpdate({ userId: user._id, status: constants.loginStatus.ACTIVE }, { $set: { status: constants.loginStatus.IN_ACTIVE } })

      ctrl.recordLogin(user._id, req);

      return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', token);
    } catch (err) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  };

  ctrl.generateQR = async (req, res) => {
    try {
      const hashedData = utils.channelDataHash();
      const TOKEN = process.env.IPINFO_TOKEN;
      const ipinfo = new IPinfoWrapper(TOKEN);
      console.log("req.headers::", req.headers);
      
      let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log("ipAddress::", ipAddress);
      
      ipAddress = ipAddress.split(',')[0].trim();
      console.log("ipAddress::", ipAddress);
      
      const { ip, city, region, country } = await ipinfo.lookupIp(ipAddress);
      const details = {
        browser: req.useragent.browser,
        ip: ip,
        location: `${city}, ${region}, ${country}`
      };

      
      return utils.sendResponseNew(req, res, 'OK', 'QR_DATA_CREATED', { hashedData, details })
      const encryptData = JSON.stringify({ hashedData, ...details })
      const encryptUtils = utils.encrypt(encryptData);
      return utils.sendResponseNew(req, res, 'OK', 'QR_DATA_CREATED', encryptUtils)
    } catch (error) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', error.message);
    }
  };

  ctrl.signinQR = async (req, res) => {
    try {
      const { channel } = req.body;
      await pusher.trigger(channel, "authorize-event", {
        // const decryptUtils = utils.decrypt(channel)
        // const decryptDetails = JSON.parse(decryptUtils);
        // const triggerId = decryptDetails.hashedData;
        // await pusher.trigger(triggerId, "authorize-event", {
        message: 'Confirm your app'
      });

      return utils.sendResponseNew(req, res, 'OK', 'AUTH_YOUR_APP');
    } catch (error) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', error.message);
    }
  };

  ctrl.authorizeQR = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { channel, isApprove } = req.body;
      if (!isApprove) {
        await pusher.trigger(channel, 'denied-event', {
          message: 'user denied'
        });
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', 'USER_DENIED');
      }
      const user = await User.findOne({ _id: userId });
      user.channelId = channel;
      user.isChannalActive = true;
      await user.save();
      const token = utils.generateToken({ _id: user._id, phone: user.phone, deviceId: user.deviceId, channelId: channel, isMobile: false }, '3d');
      if (isApprove) {
        await SessionHistory.updateOne({ userId, status: constants.loginStatus.ACTIVE }, { $set: { status: constants.loginStatus.IN_ACTIVE } })
      }
      // const decryptUtils = utils.decrypt(channel)
      // const decryptDetails = JSON.parse(decryptUtils);
      // const triggerId = decryptDetails.hashedData;
      await pusher.trigger(channel, "login-event", {
        token
      });

      return utils.sendResponseNew(req, res, 'OK', 'TOKEN_GENERATED_SUCC');
    } catch (error) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', error.message);
    }
  };

  ctrl.recordLogin = async (userId, req) => {
    const { ip, headers } = req;
    const { 'user-agent': userAgent, 'sec-ch-ua': browser } = headers;
    const deviceDetails = {
      browser: req.useragent.browser,
      version: req.useragent.version,
      os: req.useragent.os,
      platform: req.useragent.platform,
    };

    await LoginHistory.create({
      userId,
      ipAddress: ip,
      userAgent,
      browser: browser,
    });
    return true;
  }

  return ctrl;
};
