"use strict";

module.exports = function (mongoose, constants) {

    const Schema = mongoose.Schema;

    const plansSchema = new Schema({
        // _id: String,
        code: String,
        name: String,
        desc: String,
        details : String,
        popUpHeading: String,
        note: String,
        subBtnText: String,
        viewDtlBtnText: String,
        feeFieldName : String,
        duration: String,
        period: String,
        hasValidity: Boolean,
        validityDuration: String,
        validityPeriod: String,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
    });

    return mongoose.model("plans", plansSchema);
}