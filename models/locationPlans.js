"use strict";

module.exports = function (mongoose) {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const locationPlansSchema = new Schema({
        locationId: {type: ObjectId, ref: "locations"},
        availablePlans: [{type: ObjectId, ref: "plans"}],
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
    });

    return mongoose.model("locationPlans", locationPlansSchema);
}