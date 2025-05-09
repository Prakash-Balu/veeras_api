"use strict";

module.exports = function (mongoose, utils, constants) {
  const segmentsCtrl = {};
  const Segment = mongoose.model("Segment_new");
  const SegmentCategory = mongoose.model("SegmentCategory");

  segmentsCtrl.addSegment = async (req, res) => {
    try {
      const { title, category } = req.body;

      if (!title || !Array.isArray(category) || category.length === 0) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Title and category are required"
        );
      }

      const slugTitle = utils.slug(title);

      const [isSegmentExist, existingCategory] = await Promise.all([
        Segment.findOne({ slug_url: slugTitle }).lean(),
        SegmentCategory.find({ _id: { $in: category } })
      ])
      if (isSegmentExist) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Segment Already Exists."
        );
      }
      if (existingCategory.length !== category.length) {
        return utils.sendErrorNew(
          req,
          res,
          "BAD_REQUEST",
          "Segment Category Not Found"
        );
      }
      //slugify the title


      const segment = await Segment.create({
        title,
        slug_url: slugTitle,
        category,
      });
      return utils.sendResponseNew(req, res, "OK", "SUCCESS", segment);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  segmentsCtrl.updateSegment = async (req, res) => {
    try {
      const { id, title, category, status } = req.body;

      const existingSegment = await Segment.findOne({
        _id: id
      });
      if (existingSegment.title !== title) {
        const slugTitle = utils.slug(title);
        const isSegmentExist = await
          Segment.findOne({ slug_url: slugTitle }).lean();
        if (isSegmentExist) {
          return utils.sendErrorNew(
            req,
            res,
            "BAD_REQUEST",
            "Segment Already Exists."
          );
        }
      }

      if (!existingSegment) {
        return utils.sendErrorNew(req, res, "BAD_REQUEST", "Segment Not Found");
      }

      if (category) {
        const existingCategory = await SegmentCategory.find({
          _id: { $in: category },
        });
        if (existingCategory.length !== category.length) {
          return utils.sendErrorNew(
            req,
            res,
            "BAD_REQUEST",
            "Segment Category Not Found"
          );
        }
      }

      let updateObj = {
        category: category,
        status: status,
      };

      if (title) {
        updateObj.title = title;
        updateObj.slug_url = utils.slug(title);
      }

      const result = await Segment.findByIdAndUpdate(
        id,
        { $set: updateObj },
        { new: true }
      );

      return utils.sendResponseNew(req, res, "OK", "SUCCESS", result);
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };


  segmentsCtrl.listSegment = async (req, res) => {
    try {
      const { skip, limit } = req.query;
      const segment = await Segment.find({
        status: "active"
      }).populate('category')
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();
      const count = await Segment.countDocuments({
        status: "active",
      });
      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        segment,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  segmentsCtrl.getById = async (req, res) => {
    try {
      const { id } = req.params;
      const segment = await Segment.find({
        _id: id
      }).populate('category')
        .lean();
      return utils.sendResponseNew(
        req,
        res,
        "OK",
        "Success",
        segment,
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };


  // segmentsCtrl.deleteSegment = async (req, res) => {
  //   try {
  //     const { id } = req.body;
  //     const segment = await Segment.findOne({
  //       _id: id,
  //       status: "active",
  //     }).lean();

  //     if (!segment) {
  //       return utils.sendErrorNew(req, res, "BAD_REQUEST", "Segment Not Found");
  //     }

  //     await Segment.updateOne({ _id: id }, { $set: { status: "inActive" } });

  //     return utils.sendResponseNew(req, res, "OK", "Deleted Successfully");
  //   } catch (err) {
  //     console.log(err);
  //     return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
  //   }
  // };


  return segmentsCtrl;
};
