"use strict";

module.exports = function (mongoose) {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const commentsSchema = new Schema({
        // _id:String,
        // _id: {type: Schema.Types.ObjectId},
        userId: {type: ObjectId, ref: "users"},
        // segment_id: String,
        segmentId: {type: ObjectId, ref: "segments"},
        seqNo: Number,
        text: String,
        audioPath: String,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
    });

    return mongoose.model("comments", commentsSchema);
}