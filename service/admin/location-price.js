"use strict";

module.exports = function (mongoose, utils) {

    const locationPriceService = {};
    const Location = mongoose.model("location_details");
    const PriceDetails = mongoose.model("location_prices");

    // Method to add a new location
    locationPriceService.addLocation = async (req, res, data) => {
        try {
            // Create a new location document
            const locationDataObject = new Location({
                country_name: data.countryName,
                country_code: data.countryCode,
                phone_code: data.phoneCode,
                currency_code: data.currencyCode,
                country_flag: data.countryFlag,
                currency_symbol: data.currencySymbol,
                currency_name: data.currencyName,
                currency_symbol_position: data.currencySymbolPosition,
                localityLanguage: data.localityLanguage,
            });

            // Save the location document
            return await locationDataObject.save();
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    // Method to update or add price details
    locationPriceService.addPrice = async (req, res, _id, data) => {
        try {
            const priceDataObject = new PriceDetails({
                location_id: _id,
                month_fee: data.monthFee,
                extendedplan1_fee: data.extendedPlan1Fee,
                extendedplan2_fee: data.extendedPlan2Fee,
            });

            // Save the price document
            return await priceDataObject.save();
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    locationPriceService.updateLocation = async (req, res, data) => {
        try {
            const locationUpdate = {
                currency_symbol_position: data.currencySymbolPosition,
                localityLanguage: data.localityLanguage,
            }

            return await Location.findByIdAndUpdate(
                { _id: data.location_id },
                { ...locationUpdate },
                { new: true },
            );
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    locationPriceService.updatePrice = async (req, res, data) => {
        try {
            const priceUpdate = {
                month_fee: data.monthFee,
                extendedplan1_fee: data.extendedPlan1Fee,
                extendedplan2_fee: data.extendedPlan2Fee,
            }

            return await PriceDetails.findByIdAndUpdate(
                { _id: data._id },
                { ...priceUpdate },
                { new: true },
            );
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    locationPriceService.deleteLocation = async (_id) => {
        try {
            return await Location.findByIdAndDelete({_id: _id});
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    locationPriceService.deletePrice = async (_id) => {
        try {
            return await PriceDetails.findByIdAndDelete({_id: _id});
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    locationPriceService.getLocationPriceList = async () => {
        try {
            return await PriceDetails.aggregate([
                {
                    $lookup: {
                        from: "location_details",
                        localField: "location_id",
                        foreignField: "_id",
                        as: "locationdtl"
                    }
                },
                { $unwind: "$locationdtl" },
                {
                    $project:
                    {
                        _id: 1,
                        name: "$locationdtl.country_name",
                        code: "$locationdtl.country_code",
                        phone_code: "$locationdtl.phone_code",
                        currency_code: "$locationdtl.currency_code",
                        country_flag: "$locationdtl.country_flag",
                        currency_symbol: "$locationdtl.currency_symbol",
                        currency_name: "$locationdtl.currency_name",
                        currency_symbol_position: "$locationdtl.currency_symbol_position",
                        localityLanguage: "$locationdtl.localityLanguage",
                        location_id: "$locationdtl._id",
                        month_fee: 1,
                        extendedplan1_fee: 1,
                        extendedplan2_fee: 1,
                    }
                }
            ]);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return locationPriceService;
};
