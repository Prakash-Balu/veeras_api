"use strict";

module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;

    const schema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      motivationalDescription: {
        type: String,
        required: true,
      },
      slug_url: {
        type: String,
        required: false
      },
      videoUrl: {
        type: String,
        required: true,
      },
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

  return mongoose.model("BannerSection_new", schema);
};
