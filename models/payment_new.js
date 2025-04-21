"use strict";

const { required } = require("joi");

module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  let schema = new Schema(
    {
      phoneCode: {
        type: String,
        require: true,
      },
      phone: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      currencyCode: {
        type: String,
        required: true,
      },
      planId: {
        type: ObjectId,
        ref: "plans",
        require: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      tax: {
        type: Number,
        required: true,
      },
      totalamount: {
        type: Number,
        required: true,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      referralId: {
        type: ObjectId,
        ref: "User",
        required: false,
      },
      expireIn: {
        type: Date,
        requied: true,
      },
      invoiceUrl: {
        type: String,
        required: false,
      },
      paymentLinkId: {
        type: String,
        required: true,
      },
      paymentShortLink: {
        type: String,
        required: true,
      },
      paymentId: {
        type: String,
      },
      paymentSignature: {
        type: String,
      },
      status: {
        type: String,
        enum: Object.values(constants.paymentStatus),
        default: constants.paymentStatus.PROCESSING,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("Payment_new", schema);
};
