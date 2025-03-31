"use strict";

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
      email: {
        type: String,
      },
      currencyCode: {
        type: String,
        required: true
      },
      planId: {
        type: ObjectId,
        ref: "Plan",
        require: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      referralId: {
        type: ObjectId,
        ref: "User",
        require: false,
      },
      expireIn: {
        type: Date,
        requied: true
      },
      paymentLinkId: {
        type: String,
        required: true
      },
      paymentShortLink: {
        type: String,
        required: true
      },
      paymentId: {
        type: String
      },
      paymentSignature: {
        type: String
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
