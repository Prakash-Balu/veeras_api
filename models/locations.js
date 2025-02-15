"use strict";

module.exports = function (mongoose) {
    const Schema = mongoose.Schema;

    const locationsSchema = new Schema({
        // _id: {type: Schema.Types.ObjectId},
        countryName: String,
        countryCode: String,
        phoneCode: String,
        currencyCode: String,
        countryFlag: String,
        currencySymbol: String,
        currencyName: String,
        // currency_symbol_position: String,
        // localityLanguage: String,
        createdAt: Date,
        updatedAt: Date,
    },
    {
        timestamps: true,
    });

    return mongoose.model("locations", locationsSchema);
}