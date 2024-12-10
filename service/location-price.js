"use strict";

module.exports = function (mongoose, utils) {

    const locationPriceService = {};
    const Location = mongoose.model("location_details");
    const PriceDetails = mongoose.model("location_prices");

    locationPriceService.getCountryPriceDetails = async (req, res) => {
        try {
            let { countryCode } = req.body;

            const isCountryExists = await Location.findOne({ country_code: countryCode });
            // console.log("isCountryExists",isCountryExists)
            if (isCountryExists == null) {
                countryCode = "OT";
            }
            // console.log("countryCode",countryCode)
            const query = [
                {
                    $match: {
                        country_code: countryCode
                    }
                },
                {
                    $project:
                    {
                        _id: 1,
                        country_name: 1,
                        country_code: 1,
                        phone_code: 1,
                        currency_code: 1,
                        country_flag: 1,
                        currency_symbol: 1,
                        currency_name: 1,
                        currency_symbol_position: 1,
                        localityLanguage: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    }
                }
            ];

            var threadObject = await Location.aggregate(query);

            // console.log('====>', threadObject);
            const finalObject = [];

            for (const val of threadObject) {
                let id = val._id.toString();
                const query1 = [
                    {
                        $match: {
                            location_id: val._id
                        }
                    },
                    {
                        $project:
                        {
                            _id: 1,
                            location_id: 1,
                            month_fee: 1,
                            extendedplan1_fee: 1,
                            extendedplan2_fee: 1,
                            createdAt: 1,
                            updatedAt: 1,
                        }
                    }
                ];

                var priceObject = await PriceDetails.aggregate(query1);
                val.price = priceObject;
                finalObject.push(val);
            }

            return finalObject;
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return locationPriceService;
};
