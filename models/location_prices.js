"use strict";

module.exports = function (mongoose) {
    const Schema = mongoose.Schema;

    const priceDetailsSchema = new Schema({
        // _id: {type: Schema.Types.ObjectId},
        location_id: {type: Schema.Types.ObjectId, ref: "location_details"},
        month_fee: Number,
        extendedplan1_fee: Number,
        extendedplan2_fee: Number,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
    });

    return mongoose.model("location_prices", priceDetailsSchema);
}