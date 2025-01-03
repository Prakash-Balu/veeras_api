"use strict";
module.exports = function (mongoose, utils, constants) {
  const moment = require('moment');
  const Payment = mongoose.model("Payment");
  const Subscription = mongoose.model("Subscription");
  const Register = mongoose.model("Register");
  const User = mongoose.model("User");
  const razorService = require('../service/razorpay')();
  const ctrl = {};

  ctrl.cretePaymentLink = async (req, res) => {
    try {
      const { planId, currencyCode, amount, duration, user } = req.body;
      const { phone, phoneCode } = user;
      const userExists = await Register.findOne({ phoneCode, phone }).lean();
      if (userExists) {
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', 'User already exists. please login to continue');
      }
      const [register, userObj] = await Promise.all([Register.create(user), User.create(user)]);
      const { _id: userId } = userObj;
      const isPaymentExists = await Payment.findOne({ planId, userId, status: constants.paymentStatus.PROCESSING })
      if (isPaymentExists) {
        return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', isPaymentExists.paymentShortLink);
      }
      const razorPaymentObj = {
        "amount": amount,  // Amount in paise (50000 paise = 500 INR)
        "currency": currencyCode,
        "accept_partial": false,
        "expire_by": Date.now() * 15,  // Optional: Unix timestamp for expiration
        "reminder_enable": true,
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
      const subscriptionObj = {
        userId: checkPayment.userId,
        planId: checkPayment.planId._id,
        paymentId: checkPayment._id,
        startAt: moment(),
        expiresAt: moment().add(checkPayment.duration, 'months')
      }
      await Subscription.create(subscriptionObj);
      return utils.sendResponseNew(req, res, 'OK', 'SUCCESS');
    } catch (err) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  };

  return ctrl;
};
