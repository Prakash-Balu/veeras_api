"use strict";

module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;

  const shortSchema = new Schema({
    shortUrl: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    isDeleted: { type: Boolean,default: false, required: true },
    
    });

    const schema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
        required: true,
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
