"use strict";

module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  let schema = new Schema(
    {
      userId: {
        type: ObjectId,
        ref: "User",
        require: true,
      },
      app: {
        type: String,
        required: true
      },
      isPresent: {
        type: String,
        required: true,
        default: false
      }
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("Attendance", schema);
};
