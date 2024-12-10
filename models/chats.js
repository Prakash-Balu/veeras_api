"use strict";
module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  let schema = new Schema(
    {
      userId: {
        type: ObjectId,
        ref: "User",
      },
      senderId: {
        type: ObjectId,
        ref: "User",
      },
      segmentId: {
        type: ObjectId,
        ref: "segments",
      },
      message: {
        type: String,
        required: true
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      isReply: {
        type: Boolean,
        default: false
      },
      isAudio: {
        type: Boolean,
        default: false
      },
      parentId: {
        type: ObjectId,
        ref: "CommonChat",
      }
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("Chat", schema);
};
