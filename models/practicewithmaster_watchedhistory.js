"use strict";

module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;

    const schema = new Schema(
    {
      userId: {
        type: ObjectId,
        ref: "User",
      },
      practiceWithMasterId: {
        type: ObjectId,
        ref: "practicewithmaster",
      },
      shortId: {
        type: ObjectId,
        ref: "practicewithmaster",
      },    
      isDeleted: { type: Boolean,default: false, required: true }
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  // return mongoose.model("PracticeWithMaster_watchedhistory", schema);

  return mongoose.models["PracticeWithMaster_watchedhistory"] ||
  mongoose.model("PracticeWithMaster_watchedhistory", schema);
};
