"use strict";

module.exports = function (mongoose, utils, constants) {
  const segmentsCtrl = {};
  const Segment = mongoose.model("Segment_new");
  const PracticeWithMaster = mongoose.model("PracticeWithMaster");

  segmentsCtrl.listSegment = async (req, res) => {
    try {
      const { skip, limit } = req.query;

      const segments = await Segment.find({ status: "active" })
        .populate("category")
        .sort({ createdAt:  1})
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();

        const segmentIds = segments.map((seg)=> seg._id)

        const [practiceWithMaster] = await Promise.all([
          PracticeWithMaster.find({segmentId:{$in:segmentIds}})
        ])

        segments.map( (segment) => {
          const practiceWithMasters =  practiceWithMaster.filter((e)=>String(e.segmentId) === String(segment._id))

          const updatedCategory = segment.category.map((cat) => {
            if (cat.value === "practicewithmaster") {
              return {
                ...cat,
                subjects: practiceWithMasters,
              };
            }
            return cat;
          });

          return { ...segment, category: updatedCategory };
        } )

      const updatedSegments = await Promise.all(
        segments.map(async (segment) => {
          const practiceWithMaster = await PracticeWithMaster.find({
            segmentId: segment._id,
          }).lean();

          const updatedCategory = segment.category.map((cat) => {
            if (cat.value === "practicewithmaster") {
              return {
                ...cat,
                practicewithmaster: practiceWithMaster,
              };
            }
            return cat;
          });

          return { ...segment, category: updatedCategory };
        })
      );

      const count = await Segment.countDocuments({ status: "active" });

      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        updatedSegments,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return segmentsCtrl;
};
