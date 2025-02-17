"use strict";

module.exports = function (mongoose) {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const planPricesSchema = new Schema({
        locationId:{type: ObjectId, ref: "locations"},
        locationPlanId: {type: ObjectId, ref: "locationPlans"},
        gstPercent: Number,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
        strict: false
    });

    return mongoose.model("planprices", planPricesSchema);
}