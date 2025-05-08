"use strict";
module.exports = function (mongoose, utils, constants) {
  const Chat = require("../models/chats")(mongoose);
  const Classroom = mongoose.model("classRoom_new");
  const ctrl = {};

  ctrl.uploadAudio = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { filename } = req.file;
      const audioPath = `/audios/${userId}/${filename}`;
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", audioPath);
    } catch (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.createChat = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { classRoomId, message, isAudio } = req.body;

      const classRoom = await Classroom.findOne({ _id: classRoomId }).lean();
      if (!classRoom) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Classroom Id Not Exists"
        );
      }


      const createdChatObj = await Chat.create({
        userId,
        message,
        classRoomId,
        isAudio,
        senderId: userId,
      });
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", createdChatObj);
    } catch (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.message);
    }
  };

  ctrl.replyChat = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { classRoomId, parentId, message, isAudio } = req.body;
      const parentInfo = await Chat.findOne({ _id: parentId }).lean();
      if (!parentInfo) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Parent Id Not Found"
        );
      }


    const classRoom = await Classroom.findOne({ _id: classRoomId }).lean();
      if (!classRoom) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Classroom Id Not Exists"
        );
      }
      const createdChatObj = await Chat.create({
        classRoomId,
        userId: parentInfo.userId,
        parentId: parentInfo._id,
        message,
        isAudio,
        senderId: userId,
        isReply: true,
      });
      const findCreatedObj = await Chat.findOne({ _id: createdChatObj._id })
        .populate("userId senderId parentId")
        .lean();
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", findCreatedObj);
    } catch (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.message);
    }
  };

  ctrl.deleteChat = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { id } = req.params;
      const getInfo = await Chat.findOne({ _id: id, userId }).lean();
      if (!getInfo) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "Message Not Found");
      }
      await Chat.updateOne({ _id: id, userId }, { $set: { isDeleted: true } });
      return utils.sendResponseNew(
        req,
        res,
        "OK",
        "Message Deleted Successfully"
      );
    } catch (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.message);
    }
  };

  ctrl.listChat = async (req, res) => {
    try {
      const { _id: userId } = req.userInfo;
      const { skip = 0, limit = 10, classRoomId } = req.query;

      const allChats = await Chat.find({ classRoomId, isDeleted: false })
        .sort({ createdAt: 1 })
        .populate("senderId", "name")
        .lean();

      if (!allChats.length || allChats.length === 0) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "chat not found");
      }

      const chatMap = {};
      allChats.forEach((chat) => {
        chat.replies = [];
        chatMap[chat._id.toString()] = chat;
      });

      const rootMessages = [];

      allChats.forEach((chat) => {
        if (chat.parentId) {
          const parent = chatMap[chat.parentId.toString()];
          if (parent) {
            parent.replies.push(chat);
          }
        } else {
          rootMessages.push(chat);
        }
      });

      const paginatedRoot = rootMessages.slice(
        Number(skip),
        Number(skip) + Number(limit)
      );

      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        paginatedRoot,
        rootMessages.length
      );
    } catch (error) {
      console.error("Chat list error:", error);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.message);
    }
  };
  return ctrl;
};
