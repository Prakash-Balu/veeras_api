"use strict";
module.exports = function (mongoose) {
  const Schema = mongoose.Schema;

  let schema = new Schema(
    {
      phoneCode: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        index: true,
        unique: true,
        required: true,
      },
      otpSecret: {
        type: String
      },
      channelId: {
        type: String
      },
      isChannalActive: {
        type: Boolean,
        default: false
      },
      deviceId: {
        type: String
      },
      isVerified: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("User", schema);
};
