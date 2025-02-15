"use strict";

module.exports = function (mongoose) {
    const Schema = mongoose.Schema;

    const locationsSchema = new Schema({
        // _id: {type: Schema.Types.ObjectId},
        country_name: String,
        country_code: String,
        phone_code: String,
        currency_code: String,
        country_flag: String,
        currency_symbol: String,
        currency_name: String,
        currency_symbol_position: String,
        localityLanguage: String,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
    });

    return mongoose.model("locations", locationsSchema);
}