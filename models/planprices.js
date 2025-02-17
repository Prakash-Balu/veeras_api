"use strict";

module.exports = function (mongoose) {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const planPricesSchema = new Schema({
        locationId:{type: ObjectId, ref: "locations"},
        locationPlanId: {type: ObjectId, ref: "locationPlans"},
        createdAt: Date,
        updatedAt: Date,
    },
    { strict: false },
    {
        timestamps: true,
    });

    return mongoose.model("planprices", planPricesSchema);
}