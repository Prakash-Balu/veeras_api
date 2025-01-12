"use strict";
module.exports = function (mongoose) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  let schema = new Schema(
    {
      userId: {
        type: ObjectId,
        ref: "User",
        required: true
      },
      commentId: {
        type: ObjectId,
        ref: "comments",
      },
      replyId: {
        type: ObjectId,
        ref: "replies",
      },
      status: {
        type: String,
        default: "Processing"
      }
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("Notification", schema);
};
