"use strict";

module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

    const schema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      category: [
      {
        type: ObjectId,
        ref: "SegmentCategory",
        require: true,
      }
    ],
      status: {
        type: String,
        enum: [
          "active",
          "inActive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("Segment_new", schema);
};
