"use strict";

module.exports = function (mongoose) {
  const Schema = mongoose.Schema;

  let schema = new Schema(
    {
        segmentid: String,
        title: String,
        video: String,
        nofexercise: Number,
        questions: {
          type: Map,
          ref: 'questions'
        },
        exercise: [String],
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("SelfpracticeSegment", schema);
};
