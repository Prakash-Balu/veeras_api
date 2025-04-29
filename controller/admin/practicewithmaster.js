"use strict";

module.exports = function (mongoose, utils, constants) {
  const PracticeWithMaster = mongoose.model("PracticeWithMaster");
  const Segment = mongoose.model("Segment_new");
  const ctrl = {};

  ctrl.addPractice = async (req, res) => {
    try {
      const { subject, isSubject, segmentId, description, videoUrl, shorts } =
        req.body;

      const existingSubject = await PracticeWithMaster.findOne({ subject });
      if (existingSubject) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Already this Subject is exists, try different subject"
        );
      }

      const existingSegment = await Segment.findOne({
        _id: segmentId,
        status: "active",
      });
      if (!existingSegment) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Segment is not found"
        );
      }

      const slugTitle = utils.slug(subject);

      console.log("practicewithmaster", slugTitle);

      const createPractice = await PracticeWithMaster.create({
        segmentId,
        subject,
        isSubject,
        slug_url: slugTitle,
        description,
        videoUrl,
        shorts,
      });

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", createPractice);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.updatePractice = async (req, res) => {
    try {
      const {
        id,
        subject,
        segmentId,
        description,
        slug_url,
        videoUrl,
        isSubject,
        status,
        shorts,
      } = req.body;

      const practice = await PracticeWithMaster.findOne({ _id: id });

      if (!practice) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "practice Not Found"
        );
      }

      const updateObj = {};
      if (segmentId !== undefined) updateObj.segmentId = segmentId;
      if (subject !== undefined) updateObj.subject = subject;
      if (isSubject !== undefined) updateObj.isSubject = isSubject;
      if (description !== undefined) updateObj.description = description;
      if (slug_url !== undefined) updateObj.slug_url = slug_url;
      if (videoUrl !== undefined) updateObj.videoUrl = videoUrl;
      if (shorts !== undefined) updateObj.shorts = shorts;
      if (status !== undefined) updateObj.status = status;

      if (subject) {
        updateObj.slug_url = utils.slug(subject);
      }
      // Update practice details
      const updatedPractice = await PracticeWithMaster.findOneAndUpdate(
        { _id: id },
        { $set: updateObj },
        { new: true }
      );

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", updatedPractice);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.deletePractice = async (req, res) => {
    try {
      const { id } = req.body;
      const getPractice = await PracticeWithMaster.findOne({
        _id: id,
        status: "active",
      }).lean();
      if (!getPractice) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "Not Found");
      }

      await PracticeWithMaster.updateOne(
        { _id: id },
        { $set: { status: "deleted" } }
      );

      return utils.sendResponseNew(req, res, "OK", "Deleted Successfully");
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.getByIdPractice = async (req, res) => {
    try {
      const { id } = req.params;
      const getPractice = await PracticeWithMaster.findOne({
        _id: id,
        status: "active",
      });
      if (!getPractice) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "No practice found");
      }
      return utils.sendResponseNew(req, res, "OK", "Success", getPractice);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.listPractices = async (req, res) => {
    try {
      const { skip, limit, status, segmentId } = req.query;

      let filter = {
        ...(segmentId ? { segmentId } : {}),
      };
      if (status) {
        filter.status = status;
      }


      const getPractice = await PracticeWithMaster.find(filter)
        .populate("segmentId")
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();
      const count = await PracticeWithMaster.countDocuments(filter);

      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        getPractice,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return ctrl;
};
