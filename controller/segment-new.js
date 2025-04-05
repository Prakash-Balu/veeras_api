"use strict";

const { UserPage } = require("twilio/lib/rest/conversations/v1/user");

module.exports = function (mongoose, utils, constants) {
  const segmentsCtrl = {};
  const Segment = mongoose.model("Segment_new");
  const PracticeWithMaster = mongoose.model("PracticeWithMaster");

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

      const [practiceWithMaster] = await Promise.all([
        PracticeWithMaster.find({ segmentId: { $in: segmentIds } }),
      ]);
      const subjects = [
            {
              "_id": "67ecebfc04072134f7122ec1",
              "name": "1.1 Hahaan",
              "segmentId": "67ebcc02ed786b75cfcd711e",
              "videoUrl": "https://",
              "shorts": [
                {
                  "shortUrl": "https://",
                  "question": "Test",
                  "answer": "Test",
                  "isDeleted": false,
                  "_id": null
                }
              ],
              "status": "active",
              "createdAt": "2025-04-02T07:49:16.529Z",
              "updatedAt": "2025-04-02T07:49:16.529Z"
            },
            {
              "_id": "67ed3763da9499d3ed44c15b",
              "name": "demo2",
              "segmentId": "67ebcc02ed786b75cfcd711e",
              "description": "demo2",
              "videoUrl": "https://vimeo.com",
              "shorts": [
                {
                  "shortUrl": "https://vimeo.com",
                  "question": "what is your country?",
                  "answer": "India",
                  "isDeleted": false,
                  "_id": "67ed3763da9499d3ed44c15c"
                }
              ],
              "status": "active",
              "createdAt": "2025-04-02T13:10:59.562Z",
              "updatedAt": "2025-04-02T13:10:59.562Z"
            }
          ]
      
     const listSegment =  segments.map((segment) => {
        const updatedCategory = segment.category.map((cat) => {
          if (cat.value === "practicewithmaster") {
            return {
              ...cat,
              subjects: practiceWithMaster.filter(
                (e) => String(e.segmentId) === String(segment._id)
              ),
            };
          }
          else {
            return {...cat, subjects};
          }
          
        });

        return { ...segment, category: updatedCategory };
      });

   

      const count = await Segment.countDocuments({ status: "active" });

      return utils.sendPaginationResponseNew(
        req,
        res,
        "OK",
        "Success",
        listSegment,
        count
      );
    } catch (err) {
      console.log(err);
      return utils.sendErrorNew(req, res, "BAD_REQUEST", err.message);
    }
  };

  return segmentsCtrl;
};
