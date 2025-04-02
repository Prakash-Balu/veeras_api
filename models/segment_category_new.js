"use strict";
module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;

  let schema = new Schema(
    {
      value: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      colorCode: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("SegmentCategory", schema);
};
