"use strict";
module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  let schema = new Schema(
    {
      userId: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
      planId: {
        type: ObjectId,
        ref: "Plan",
        required: true,
      },
      paymentId: {
        type: ObjectId,
        ref: "Payment",
        required: true
      },
      startAt: Date,
      expiresAt: Date,
      status: {
        type: String,
        enum: Object.values(constants.subscriptionStatus),
        default: constants.subscriptionStatus.ACTIVE,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("Subscription", schema);
};
