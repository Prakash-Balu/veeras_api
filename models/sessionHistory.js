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
      sessionId: {
        type: String,
        required: true
      },
      userAgent: {
        type: String
      },
      method: {
        type: String
      },
      ipAddress: {
        type: String
      },
      status: {
        type: Number,
        enum: Object.values(constants.loginStatus),
        default: constants.loginStatus.ACTIVE,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("SessionHistory", schema);
};
