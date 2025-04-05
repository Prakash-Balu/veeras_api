"use strict";

const { string } = require("joi");

module.exports = function (mongoose, constants) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

    const schema = new Schema(
    {
      displayType: {
        type: String,
        enum: [
            "type1",
            "type2",
            "type3",
          ],
        required: true,
      },
      isSubject: {
        type: String,
        default:null
      },
      segmentId: 
      {
        type: ObjectId,
        ref: "Segment_new",
        require: true,
      },
      practices: [
      {
        questionInEnglish: {
          type: String,
          required: true,
        },
        questionInTamil: {
          type: String,
          required: true,
        },  
        answer:{
            type: String,
            required: true,
        }
    }
    ],
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

  return mongoose.model("selfPractice_new", schema);
};
