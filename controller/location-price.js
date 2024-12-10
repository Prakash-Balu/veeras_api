"use strict";

module.exports = function (mongoose, utils, constants) {

    const locationPriceCtrl = {};
    const locationPriceService = require('../service/location-price')(mongoose, utils);

    locationPriceCtrl.getCountryPriceDetails = async (req, res) => {
        try {
            const result = await locationPriceService.getCountryPriceDetails(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return locationPriceCtrl;
}
