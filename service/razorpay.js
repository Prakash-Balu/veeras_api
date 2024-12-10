"use strict";

module.exports = function () {
    const Razorpay = require('razorpay')
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_ID,
        key_secret: process.env.RAZORPAY_SECRET
    });

    const razorService = {};

    razorService.createPaymentLink = async (paymentLinkOptions) => {
        try {
            const response = await razorpay.paymentLink.create(paymentLinkOptions);
            return response;
        } catch (err) {
            throw { msg: err.message }
        }
    };

    return razorService;
}