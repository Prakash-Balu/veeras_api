"use strict";

module.exports = function (mongoose) {
    const Schema = mongoose.Schema;

    const segmentsSchema = new Schema({
        // _id: String,
        name: String,
        description: String,
        video_url: String,
        // iconName: String,
        pageName: String,
        routeUrl: String,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
    });

    return mongoose.model("segments", segmentsSchema);
}