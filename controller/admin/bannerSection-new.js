"use strict";

module.exports = function (mongoose, utils, constants) {
  const BannerSection = mongoose.model("BannerSection_new");
  const ctrl = {};


  ctrl.addBanner = async (req, res) => {
    try {
      const { name, motivationalDescription, videoUrl } = req.body;

      const existingName = await BannerSection.findOne({ name });
      console.log("existing",existingName);
      
      if (existingName) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Already this banner name is exists, try different name"
        );
      }
      const createBanner = await BannerSection.create({
        name,
        motivationalDescription,
        videoUrl,
      });

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", createBanner);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  ctrl.updateBanner = async (req, res) => {
    try {
      const {
        id,
        motivationalDescription,
        videoUrl,
        status,
      } = req.body;

      const banner = await BannerSection.findOne({_id: id });


      if (!banner) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Banner Section Not Found"
        );
      }
  
      // Update practice details
      const updatedBannerSection = await BannerSection.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            motivationalDescription,
            videoUrl,
            status,
          },
        },
        { new: true }
      );

  
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", updatedBannerSection);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };



  ctrl.listBanner = async (req, res) => {
    try {
      const { skip, limit } = req.query;

      let filter = {};
      
          filter.status = "active"; 


      const getBanner = await BannerSection.find(filter)
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();
      const count = await BannerSection.countDocuments(filter);

      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        getBanner,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return ctrl;
};
