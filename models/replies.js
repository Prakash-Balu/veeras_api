"use strict";

module.exports = function (mongoose) {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const repliesSchema = new Schema({
        // _id: String,
        // _id: {type: Schema.Types.ObjectId},
        userId: {type: ObjectId, ref: "users"},
        commentId: {type: ObjectId, ref: "comments"},
        seqNo: Number,
        text: String,
        audioPath: String,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
    });

    return mongoose.model("replies", repliesSchema);
}