"use strict";

module.exports = function (mongoose, utils, constants) {
  const SelfPractice = mongoose.model("selfPractice_new");
  const Segment = mongoose.model("Segment_new");
  const ctrl = {};

  ctrl.addSelfPractice = async (req, res) => {
    try {
      const { displayType,subject,isSubject,segmentId, practices } = req.body;

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

      const createSelfPractice = await SelfPractice.create({
        displayType,
        subject ,
        slug_url:slugTitle,
        segmentId,
        practices,
        isSubject
      });

      return utils.sendResponseNew(
        req,
        res,
        "OK",
        "SUCCESS",
        createSelfPractice
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.updateSelfPractice = async (req, res) => {
    try {
      const { id, subject,isSubject, segmentId, displayType, practices } = req.body;

      const selfPractice = await SelfPractice.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!selfPractice) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Self practice Not Found"
        );
      }

      if(segmentId) {
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
    }

    const updateObj = {}
   updateObj.subject = subject
    updateObj.isSubject = isSubject
    updateObj.displayType = displayType 
    updateObj.practices = practices
    updateObj.segmentId = segmentId


    if(subject) {
       updateObj.slug_url = utils.slug(subject);
    }

      // Update SelfPractice details
      const updatedSelfPractice = await SelfPractice.findOneAndUpdate(
        { _id: id, isDeleted: false },
        {$set: updateObj},
        { new: true }
      );

      return utils.sendResponseNew(
        req,
        res,
        "OK",
        "SUCCESS",
        updatedSelfPractice
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.deleteSelfPractice = async (req, res) => {
    try {
      const { id } = req.body;
      const getSelfPractice = await SelfPractice.findOne({
        _id: id,
        isDeleted: false,
      }).lean();
      if (!getSelfPractice) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", " Not Found");
      }

      await SelfPractice.updateOne({ _id: id }, { $set: { isDeleted: true } });

      return utils.sendResponseNew(req, res, "OK", "Deleted Successfully");
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.getByIdSelfPractice = async (req, res) => {
    try {
      const { id } = req.params;
      const getSelfPractice = await SelfPractice.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!getSelfPractice) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "No self practice found"
        );
      }
      return utils.sendResponseNew(req, res, "OK", "Success", getSelfPractice);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.listSelfPractice = async (req, res) => {
    try {
      const { skip, limit } = req.query;
      let filter = {};
      filter.isDeleted = false;

      const getSelfPractice = await SelfPractice.find(filter)
        .sort({ createdAt: 1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();
      const count = await SelfPractice.countDocuments(filter);

      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        getSelfPractice,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return ctrl;
};
