/* eslint-disable no-undef */
"use strict";

module.exports = function (mongoose, utils, constants) {
  const cron = require("node-cron");
  const moment = require("moment");
  const Attendance = mongoose.model("Attendance");
  const Notification = mongoose.model("Notification");
  const Replies = mongoose.model("replies");
  const User = mongoose.model("User");

  cron.schedule("* * * * *", async function () {
    try {
      console.log("Attendance Absent cron running fine");
      const StartOfDay = moment().subtract(3, 'day').startOf('day');
      const EndOfDay = moment().subtract(3, 'day').endOf('day');
      console.log(StartOfDay);
      console.log(EndOfDay);
      const attendance = await Attendance.findOne({ createdAt: { $gte: new Date(StartOfDay), $lte: new Date(EndOfDay) } }).lean();
      console.log(attendance);

      // const userIds = attendance.map(e => e.userId);
      const userIds = attendance ? attendance.userId : [];
      const absendUsers = await User.find({ _id: { $nin: userIds } }).lean();
      const absendUserIds = absendUsers.map(e => e._id);
      const attendanceInsertMany = [];
      for (const user of absendUserIds) {
        attendanceInsertMany.push({
          userId: user,
          app: 'no',
          date: EndOfDay,
          dateOfDay: moment(EndOfDay).format('DD'),
          isPresent: false
        })
      }
      await Attendance.insertMany(attendanceInsertMany);
      console.log("Attendance absent running successfully");
      return
    } catch (error) {
      console.log("something error occured on absend updated", error.message)
    }

  });

  cron.schedule("0 8 * * *", async function () {
    try {
      const pendingNotifications = await Notification.find({ status: "Processing" }).lean();
      if (pendingNotifications.length > 0) {
        const commentsIds = pendingNotifications.map(e => e.commentId);
        const repliesData = await Replies.find({ commentId: { $in: commentsIds } });
        if (repliesData.length > 0) {
          for (const ele of pendingNotifications) {
            const replyId = repliesData.find((e) => String(e.commentId) === String(ele.commentId));
            if (replyId) {
              await Notification.updateOne({ _id: ele._id }, { $set: { replyId: replyId?._id, status: 'Solved' } })
            }
          }
        }
      }
      return
    } catch (error) {
      console.log("reply updating error occured", error.message)
    }

  });

  cron.schedule("* * * * *", async function () {
    try {
      console.log("Cron Running Fine")
    } catch (error) {
      console.log("something error occured on absend updated", error.message)
    }
  });

};