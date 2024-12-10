"use strict";
module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  let notificationsSchema = new Schema({
    type: {
      type: String,
      enum: ["comment", "reply"], // Define types of notifications
      required: true,
    },
    segmentId: {
      type: ObjectId,
      ref: "segments", // Reference to the Post model
      required: true,
    },
    commentId: {
      type: ObjectId,
      ref: "comments", // Reference to the Comment model
      required: false, // Optional, only for comment or reply notifications
    },
    senderId: {
      type: ObjectId,
      ref: "users", // Reference to the User who triggered the notification
      required: true,
    },
    receiverId: {
      type: ObjectId,
      ref: "users", // Reference to the User who will receive the notification
      required: true,
    },
    message: {
      type: String,
      required: true, // Example: "John commented on your post."
    },
    isRead: {
      type: Boolean,
      default: false, // Tracks if the notification has been read
    },
    createdAt: {
      type: Date,
      default: Date.now, // Timestamp for when the notification was created
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Timestamp for when the notification was updated
    },
  });

  return mongoose.model("notifications", notificationsSchema);
};
