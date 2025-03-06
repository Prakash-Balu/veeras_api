"use strict";

module.exports = function (mongoose) {
  const Schema = mongoose.Schema;

  let schema = new Schema(
    {
      exercise: String,
      question: String,
      rawquestion: String,
      answers: [String],
      timeline: String,
    },
    {
      timestamps: true,
      versionKey: true,
    }
  );

  return mongoose.model("questions", schema);
};
