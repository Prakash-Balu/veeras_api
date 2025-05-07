"use strict";

module.exports = function (mongoose, utils, constants) {
  const ClassRoom = mongoose.model("classRoom_new");
  const Segment = mongoose.model("Segment_new");
  const ctrl = {};

  ctrl.addClassRoom = async (req, res) => {
    try {
      let { subject, segmentId, video_url, isSubject } = req.body;
      if (subject) {
        subject = subject.trim();
      }

      const segmentData = await Segment.findOne({ _id: segmentId }).lean();
      if (!segmentData) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Segment Not Exists"
        );
      }

      if (subject && segmentData.title.match(/\d+/g)?.[0] !== subject.match(/\d+/g)?.[0]) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Subject does not belong to Segment"
        );
      }

      if (subject) {
        const existingSubject = await ClassRoom.findOne({ subject });
        if (existingSubject) {
          return utils.sendErrorNew(
            req,
            res,
            "BAD_REQUEST",
            "Already this subject is exists, try different name"
          );
        }
      }

      const slugTitle = subject
        ? utils.slug(subject)
        : `${utils.slug("no subject")}_${Date.now()}`;

      const createClassRoom = await ClassRoom.create({
        segmentId,
        subject,
        slug_url: slugTitle,
        video_url,
        isSubject
      });

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", createClassRoom);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.updateClassRoom = async (req, res) => {
    try {
      const { id, subject, segmentId, video_url, isSubject } = req.body;

      const classroom = await ClassRoom.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!classroom) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "ClassRoom Not Found"
        );
      }

      const updateObj = {};

      (updateObj.segmentId = segmentId),
        (updateObj.video_url = video_url),
        (updateObj.isSubject = isSubject);
      updateObj.subject = subject;

      if (subject) {
        updateObj.slug_url = utils.slug(subject);
      }
      // Update practice details
      const updatedClassRoom = await ClassRoom.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $set: updateObj },
        { new: true }
      );

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", updatedClassRoom);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.deleteClassRoom = async (req, res) => {
    try {
      const { id } = req.body;
      const getClassRoom = await ClassRoom.findOne({
        _id: id,
        isDeleted: false,
      }).lean();
      if (!getClassRoom) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "ClassRoom Not Found"
        );
      }

      await ClassRoom.updateOne({ _id: id }, { $set: { isDeleted: true } });

      return utils.sendResponseNew(req, res, "OK", "Deleted Successfully");
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.getByIdClassRoom = async (req, res) => {
    try {
      const { id } = req.params;
      const getClassRoom = await ClassRoom.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!getClassRoom) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "No ClassRoom Found"
        );
      }
      return utils.sendResponseNew(req, res, "OK", "Success", getClassRoom);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.listClassRoom = async (req, res) => {
    try {
      const { skip, limit, segmentId } = req.query;

      let filter = {
        ...(segmentId ? { segmentId } : {}),
      };

      filter.isDeleted = false;

      const getClassRoom = await ClassRoom.find(filter)
        .populate("segmentId")
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();
      const count = await ClassRoom.countDocuments(filter);

      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        getClassRoom,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return ctrl;
};
