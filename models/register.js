"use strict";
module.exports = function (mongoose) {
    const Schema = mongoose.Schema;

    let schema = new Schema(
        {
            name: {
                type: String
            },
            phoneCode: {
                type: String
            },
            phone: {
                type: String,
                index: true,
                unique: true,
                required: true,
            },
            whatsapp: {
                type: String,
            },
            email: {
                type: String
            },
            country: {
                type: String
            },
            state: {
                type: String
            },
            city: {
                type: String
            },
            pincode: {
                type: String
            },
            isCompany: {
                type: Boolean,
                default: false
            },
            companyName: {
                type: String
            },
            gstNumber: {
                type: String
            },
        },
        {
            timestamps: true,
            versionKey: false,
        }
    );

    return mongoose.model("Register", schema);
};
