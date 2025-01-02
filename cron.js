/* eslint-disable no-undef */
"use strict";

module.exports = function (mongoose, utils, constants) {
  const cron = require("node-cron");
  const moment = require("moment");
  const Attendance = mongoose.model("Attendance");
  const User = mongoose.model("User");

  cron.schedule("*/5 0 * * *", async function () {
    try {
      const StartOfDay = moment().subtract(1, 'day').startOf('day');
      const EndOfDay = moment().subtract(1, 'day').endOf('day');
      const attendance = await Attendance.findOne({ createdAt: { $gte: new Date(StartOfDay), $lte: new Date(EndOfDay) } }).lean();
      const userIds = attendance.map(e => e.userId);
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
      return
    } catch (error) {
      console.log("something error occured on absend updated", error.message)
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