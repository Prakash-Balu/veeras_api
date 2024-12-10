"use strict";

module.exports = function (mongoose, utils, constants) {

    const locationPriceCtrl = {};
    const locationPriceService = require('../../service/admin/location-price')(mongoose, utils);

    locationPriceCtrl.addLocationPrice = async (req, res) => {
        try {
            const locationPriceDetails = req.body;

            const A = await locationPriceService.addLocation(req, res, locationPriceDetails);

            const B = await locationPriceService.addPrice(req, res, A._id, locationPriceDetails)

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', B);
        } catch (err) {
            // Abort the transaction in case of error
            // await session.abortTransaction();
            // session.endSession();
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    locationPriceCtrl.updateLocationPrice = async (req, res) => {
        try {
            const locationPriceDetails = req.body;

            const A = await locationPriceService.updateLocation(req, res, locationPriceDetails);

            const B = await locationPriceService.updatePrice(req, res, locationPriceDetails);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', { ...A.toObject(), ...B.toObject() });
        } catch (err) {
            // Abort the transaction in case of error
            // await session.abortTransaction();
            // session.endSession();
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    locationPriceCtrl.deleteLocationPrice = async (req, res) => {
        try {
            const locationPriceDetails = req.body;

            const A = await locationPriceService.deleteLocation(locationPriceDetails.location_id);

            const B = await locationPriceService.deletePrice(locationPriceDetails._id);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', { ...A.toObject(), ...B.toObject() });
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    locationPriceCtrl.getLocationPriceList = async (req, res) => {
        try {
            const result = await locationPriceService.getLocationPriceList();

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return locationPriceCtrl;
}
