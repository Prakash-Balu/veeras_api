const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = function (mongoose, utils) {
  const authenticate = {};
  const User = mongoose.model("User");
  const Attendance = mongoose.model("Attendance");

  authenticate.validateToken = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
      }
      const token = authorization.split(" ");
      if (token && token.length > 0 && token?.[0] !== 'Bearer') {
        return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
      }
      if (!token[1]) {
        return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
      }
      const decoded = jwt.verify(token[1], process.env.JWT_PRIVATE_KEY);
      if (!decoded) {
        return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
      }
      const user = await User.findOne({ _id: decoded._id }).lean();
      if (!user) {
        return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
      }
      const attendanceObj = {
        userId: user._id
      }
      if (!decoded.isMobile) {
        if (user.channelId !== decoded.channelId) {
          return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
        }
        attendanceObj.app = 'mobile';
      } else {
        if (user.deviceId !== decoded.deviceId) {
          return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
        }
        attendanceObj.app = 'web';
      }
      authenticate.updateAttendance(attendanceObj);
      req.userInfo = user;
      return next();
    } catch (error) {
      console.log(error);
      return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
    }
  };

  authenticate.checkToken = async (req, res) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
      }
      const token = authorization.split(" ");
      if (token && token.length > 0 && token?.[0] !== 'Bearer') {
        return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
      }
      if (!token[1]) {
        return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
      }
      const decoded = jwt.verify(token[1], process.env.JWT_PRIVATE_KEY);
      if (!decoded) {
        return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
      }
      const user = await User.findOne({ _id: decoded._id }).lean();
      if (!user) {
        return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
      }
      if (!decoded.isMobile) {
        if (user.channelId !== decoded.channelId) {
          return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
        }
      } else {
        if (user.deviceId !== decoded.deviceId) {
          return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
        }
      }
      return utils.sendResponseNew(req, res, 'OK', 'Valid')
    } catch (error) {
      return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
    }
  };

  authenticate.adminValidation = async (req, res, next) => {
    const { role } = req.userInfo;
    if (role !== constants.role.ADMIN) {
      return utils.sendErrorNew(req, res, 'UNAUTHORIZED', "Unauthorized");
    }
    return next();
  };

  authenticate.updateAttendance = async (attendanceObj) => {
    try {
      const { userId, app } = attendanceObj;
      const StartOfDay = moment().startOf('day');
      const EndOfDay = moment().endOf('day');
      const attendance = await Attendance.findOne({ userId, createdAt: { $gte: new Date(StartOfDay), $lte: new Date(EndOfDay) } });
      if (!attendance) {
        await Attendance.create({
          userId,
          app,
          date: moment(),
          dateOfDay: moment().format('DD'),
          isPresent: true
        })
      } else if (attendance.app !== app) {
        attendance.app = 'mobile & web'
        await attendance.save();
      }
      return true;
    } catch (error) {
      console.log('updateAttendance-err::', error.message)
    }

  };

  return authenticate;
};