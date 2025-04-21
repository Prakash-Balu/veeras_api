"use strict";


module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

    const classRoomSchema = new Schema(
    {
      subject: {
        type: String,
        default:null
      },
      segmentId: 
      {
        type: ObjectId,
        ref: "Segment_new",
        require: true,
      },
      video_url: {
        type: String,
        required: false
      },
      slug_url: {
        type: String,
        required: false
      },
      isSubject: {
        type: Boolean,
        default:true
      },
      isDeleted: {
        type: String,
        default: false,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  return mongoose.model("classRoom_new", classRoomSchema);
};
