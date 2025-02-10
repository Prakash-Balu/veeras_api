"use strict";

module.exports = function (mongoose, constants) {

    const Schema = mongoose.Schema;

    const planDetailsSchema = new Schema({
        // _id: String,
        code: String,
        name: String,
        description: String,
        feeFieldName : String,
        duration: String,
        period: String,
        hasValidity: Boolean,
        validityDuration: String,
        validityPeriod: String,
        processingFee: Number,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
    });

    return mongoose.model("plan_details", planDetailsSchema);
}