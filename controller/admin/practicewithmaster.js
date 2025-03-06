"use strict";

module.exports = function (mongoose, utils, constants) {
  const PracticeWithMaster = mongoose.model("PracticeWithMaster");
  const ctrl = {};

  ctrl.uploadVideo = async (req, res) => {
    try {
      const { filename } = req.file;
      if (!req.file) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "No file Upload");
      }
      const audioPath = `${process.env.LOCAL_IP}/videos/${filename}`;
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", audioPath);
    } catch (error) {
      return utils.sendErrorNew(req, res, "BAD_REQUEST", error.message);
    }
  };

  ctrl.addPractice = async (req, res) => {
    try {
      const { name, description, videoUrl, shorts } = req.body;

      const existingName = await PracticeWithMaster.findOne({ name });
      console.log("existing",existingName);
      
      if (existingName) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Already this name is exists, try different name"
        );
      }
      const createPractice = await PracticeWithMaster.create({
        name,
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
        description,
        videoUrl,
        status,
        shorts,
      } = req.body;

      const practice = await PracticeWithMaster.findOne({
        _id: id,
        status: "active",
      });
      if (!practice) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "practice Not Found"
        );
      }
      if (Array.isArray(shorts) && shorts.length > 0) {
        const bulkOperations = shorts.map((short) => ({
          updateOne: {
            filter: { _id: id, "shorts._id": short.shortId },
            update: {
              $set: {
                "shorts.$.shortUrl": short.shortUrl,
                "shorts.$.question": short.question,
                "shorts.$.answer": short.answer,
              },
            },
          },
        }));
  
        await PracticeWithMaster.bulkWrite(bulkOperations);
      }
  
      // Update practice details
      const updatedPractice = await PracticeWithMaster.findOneAndUpdate(
        { _id: id, status: "active" },
        {
          $set: {
            description,
            videoUrl,
            status,
          },
        },
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
      const getPractice = await PracticeWithMaster.findOne({ _id: id , status:"active"}).lean();
      if (!getPractice) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "Message Not Found");
      }

      await PracticeWithMaster.updateOne(
        { _id: id },
        { $set: { status: "deleted" } }
      );

      return utils.sendResponseNew(
        req,
        res,
        "OK",
        "Message Deleted Successfully"
      );
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
      const { skip, limit } = req.query;
      const {status} = req.query;


      let filter = {};
        if (status) {
            filter.status = status; 
        }


      const getPractice = await PracticeWithMaster.find(filter)
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
