"use strict";

const { required } = require("joi");

module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const shortSchema = new Schema({
    shortUrl: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    isDeleted: { type: Boolean,default: false, required: true },
    
    });

    const schema = new Schema(
    {
      subject: {
        type: String,
        required: true,
      },
      segmentId: 
        {
          type: ObjectId,
          ref: "Segment_new",
          require: true,
        },
      description: {
        type: String,
      },
      videoUrl: {
        type: String,
        required: true
      },
      slug_url: {
        type: String,
        required: false
      },
      isSubject: {
        type: Boolean,
        default:true
      },
      shorts: [shortSchema],
      status: {
        type: String,
        enum: [
          "active",
          "inActive",
          "deleted",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("PracticeWithMaster", schema);
};
