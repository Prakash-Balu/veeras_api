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
            console.log("payOption",paymentLinkOptions);
            
            const response = await razorpay.paymentLink.create(paymentLinkOptions);
            console.log("response",response);
            
            return response;
        } catch (err) {

            console.log("err",err.message);
            console.log(err);
            
            throw { msg: err.message }
        
            
        }
    };

    return razorService;
}