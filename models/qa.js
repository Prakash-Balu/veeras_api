"use strict";

module.exports = function (mongoose) {
  const Schema = mongoose.Schema;

  let questionSchema = new Schema(
    {
      exercise: String,
      question: String,
      rawquestion: String,
      answers: [String],
      timeline: String,
    });

  let schema = new Schema(
    {
        segmentid: String,
        title: String,
        video: String,
        nofexercise: Number,
        questions: {
          type: Map,
          of: questionSchema
        },
        exercise: [String],
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("qa", schema);
};
