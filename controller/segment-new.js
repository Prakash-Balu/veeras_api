"use strict";

const { UserPage } = require("twilio/lib/rest/conversations/v1/user");

module.exports = function (mongoose, utils, constants) {
  const segmentsCtrl = {};
  const Segment = mongoose.model("Segment_new");
  const PracticeWithMaster = mongoose.model("PracticeWithMaster");
  const SelfPractice = mongoose.model("selfPractice_new");

  segmentsCtrl.listSegment = async (req, res) => {
    try {
      const { skip, limit } = req.query;

      const segments = await Segment.find({ status: "active" })
        .populate("category")
        .sort({ createdAt: 1 })
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();

      const segmentIds = segments.map((seg) => seg._id);

      const [practiceWithMaster, selfPracticeData] = await Promise.all([
        PracticeWithMaster.find({ segmentId: { $in: segmentIds } }),
        SelfPractice.find({ segmentId: { $in: segmentIds } }),
      ]);

      const listSegment = segments.map((segment) => {
        const updatedCategory = segment.category.map((cat) => {
          if (cat.value === "practice-with-master") {
            return {
              ...cat,
              subjects: practiceWithMaster.filter(
                (e) => String(e.segmentId) === String(segment._id)
              ),
            };
          } else if (cat.value === "self-practice") {
            return {
              ...cat,
              subjects: selfPracticeData.filter(
                (e) => String(e.segmentId) === String(segment._id)
              ),
            };
          } else {
            return {
              ...cat,
              subjects: [],
            };
          }
        });

        return { ...segment, category: updatedCategory };
      });

      let properData = [];
      listSegment.forEach(element => {
        const category = element.category;
        delete element.category;
        const filterCategory = category.filter((e) => e.subjects.length > 0);
        if (filterCategory.length > 0) {
          properData.push({ ...element, category: filterCategory })
        }

      });s

      const count = await Segment.countDocuments({ status: "active" });

      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        properData,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return segmentsCtrl;
};
