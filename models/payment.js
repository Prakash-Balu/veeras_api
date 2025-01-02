"use strict";

module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  let schema = new Schema(
    {
      userId: {
        type: ObjectId,
        ref: "User",
        require: true,
      },
      planId: {
        type: ObjectId,
        ref: "plan_details",
        require: true,
      },
      amount: {
        type: Number,
        required: true
      },
      currencyCode: {
        type: String,
        required: true
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
      duration: {
        type: Number
      },
      status: {
        type: String,
        enum: Object.values(constants.paymentStatus),
        default: constants.paymentStatus.PROCESSING,
      }
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("Payment", schema);
};
