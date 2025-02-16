"use strict";

module.exports = function (mongoose) {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const planPricesSchema = new Schema({
        locationPlanId: {type: ObjectId, ref: "locations"},
        createdAt: Date,
        updatedAt: Date,
    },
    { strict: false },
    {
        timestamps: true,
    });

    return mongoose.model("planprices", planPricesSchema);
}