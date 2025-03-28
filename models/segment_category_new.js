"use strict";
module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;

  let schema = new Schema(
    {
        category_name: {
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
