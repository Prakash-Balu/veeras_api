"use strict";

module.exports = function (mongoose) {

    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const plansSchema = new Schema({
        // _id: String,
        code: String,
        combinePlanId: { type: ObjectId, ref: "plans" }, // default null
        name: String,
        desc: String,
        note: String,
        feeFieldName : String,
        duration: Number,
        period: String,
        hasValidity: Boolean,
        validityDuration: Number,
        validityPeriod: String,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
    });

    return mongoose.model("plans", plansSchema);
}