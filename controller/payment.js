"use strict";
module.exports = function (mongoose, utils, constants) {
  const moment = require('moment');
  const Payment = mongoose.model("Payment");
  const Subscription = mongoose.model("Subscription");
  const UserProfile = mongoose.model("user_profiles");
  const User = mongoose.model("User");
  const razorService = require('../service/razorpay')();
  const { IPinfoWrapper } = require("node-ipinfo");
  const ctrl = {};

  ctrl.cretePaymentLink = async (req, res) => {
    try {
      const { planId, currencyCode, amount, duration, user } = req.body;
      const { phone, phoneCode } = user;
      const userExists = await User.findOne({ phoneCode, phone });
      let userData, profileData;
      if (!userExists) {
        profileData = await UserProfile.create(user);
        userData = await User.create({ phone, phoneCode, userProfileId: profileData._id })
        await UserProfile.updateOne({ _id: profileData._id }, { $set: { user_id: userData._id } })
      };
      if (userExists && !userExists.userProfileId) {
        profileData = await UserProfile.create({ user, user_id: userExists._id });
        await User.updateOne({ _id: userExists._id }, { $set: { userProfileId: profileData._id } });
      };

      const { _id: userId } = userExists || userData;
      const isPaymentExists = await Payment.findOne({ planId, userId, status: constants.paymentStatus.PROCESSING })
      if (isPaymentExists) {
        return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', isPaymentExists.paymentShortLink);
      }
      const razorPaymentObj = {
        "amount": Math.round(amount * 100),  // Amount in paise (50000 paise = 500 INR)
        "currency": currencyCode,
        "accept_partial": false,
        "reminder_enable": true,
        customer: {
          contact: phone // Default phone number
        },
        callback_url: `${process.env.API_URL}/payment/callback`,
      }
      const paymentLinkResp = await razorService.createPaymentLink(razorPaymentObj);
      const paymentObj = {
        userId,
        planId,
        amount,
        currencyCode,
        duration,
        expireIn: moment().add(15, 'minutes'),
        paymentLinkId: paymentLinkResp.id,
        paymentShortLink: paymentLinkResp.short_url
      }
      await Payment.create(paymentObj);
      return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', paymentLinkResp.short_url);
    } catch (err) {
      if (err.msg) {
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.msg);
      }
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  };

  ctrl.razorpayCallback = async (req, res) => {
    try {
      const {
        razorpay_payment_id,
        razorpay_payment_link_id,
        razorpay_payment_link_status,
        razorpay_signature
      } = req.query;
      const checkPayment = await Payment.findOne({ paymentLinkId: razorpay_payment_link_id, status: constants.paymentStatus.PROCESSING }).populate('planId').lean();
      if (!checkPayment) {
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', 'Payment Link id not found');
      }
      const updateObj = {
        paymentId: razorpay_payment_id,
        paymentSignature: razorpay_signature,
        status: razorpay_payment_link_status === 'paid' ? constants.paymentStatus.SUCCESS : constants.paymentStatus.FAILED
      }
      await Payment.updateOne({ _id: checkPayment._id }, { $set: updateObj });
      if (razorpay_payment_link_status === 'paid') {
        const subscriptionObj = {
          userId: checkPayment.userId,
          planId: checkPayment.planId._id,
          paymentId: checkPayment._id,
          startAt: moment(),
          expiresAt: moment().add(checkPayment.duration, 'months')
        }
        await Subscription.create(subscriptionObj);
        const user = await User.findOne({ _id: checkPayment.userId });
        await UserProfile.updateOne({ _id: user.userProfileId }, { $set: { isPaid: true } })
        res.redirect(301, process.env.UI_URL + "/payment-success");
      } else {
        res.redirect(301, process.env.UI_URL + "/payment-failure");
      }
      return

    } catch (err) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  };

  ctrl.getLocation = async (req, res) => {
    try {
      const TOKEN = process.env.IPINFO_TOKEN;
      const ipinfo = new IPinfoWrapper(TOKEN);
      let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      ipAddress = ipAddress.split(',')[0].trim();
      // ipAddress = "115.240.90.163";
      const info = await ipinfo.lookupIp(ipAddress);
      return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', info);
    } catch (err) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  };

  return ctrl;
};
