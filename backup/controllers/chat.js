"use strict";
module.exports = function (mongoose, utils, constants) {
  const Chat = mongoose.model('Chat');
  const ctrl = {};

  ctrl.uploadAudio = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { filename } = req.file;
      const audioPath = `/audios/${userId}/${filename}`
      return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', audioPath);
    } catch (error) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  }

  ctrl.createChat = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { segmentId, message, isAudio } = req.body;
      const createdChatObj = await Chat.create({ userId, message, segmentId, isAudio, senderId: userId })
      return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', createdChatObj);
    } catch (error) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  }

  ctrl.replyChat = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { segmentId, parentId, message, isAudio } = req.body;
      const parentInfo = await Chat.findOne({ _id: parentId }).lean();
      if (!parentInfo) {
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', 'Parent Message Info Not Found');
      }
      const createdChatObj = await Chat.create({ segmentId, userId: parentInfo.userId, parentId: parentInfo._id, message, isAudio, senderId: userId, isReply: true });
      const findCreatedObj = await Chat.findOne({ _id: createdChatObj._id }).populate('userId senderId parentId').lean();
      return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', findCreatedObj);
    } catch (error) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  }

  ctrl.deleteChat = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { id } = req.params;
      const getInfo = await Chat.findOne({ _id: id, userId }).lean();
      if (!getInfo) {
        return utils.sendErrorNew(req, res, 'BAD_REQUEST', 'Message Not Found');
      }
      await Chat.updateOne({ _id: id, userId }, { $set: { isDeleted: true } })
      return utils.sendResponseNew(req, res, 'OK', 'Message Deleted Successfully');
    } catch (error) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  }

  ctrl.listChat = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { skip, limit, segmentId } = req.query;
      const getInfo = await Chat.find({ userId, segmentId, isDeleted: false }).sort({ createdAt: -1 }).skip(Number(skip)).limit(Number(limit)).populate('userId senderId parentId').lean();
      const count = await Chat.countDocuments({ userId, isDeleted: false });
      return utils.sendPaginationResponseNew(req, res, 'OK', 'Success', getInfo, count);
    } catch (error) {
      return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
    }
  }

  return ctrl;
};
