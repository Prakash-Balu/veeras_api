"use strict";

module.exports = function (mongoose, utils, constants) {

    const priceCtrl = {};
    const priceService = require('../../service/admin/price')(mongoose, utils);

    priceCtrl.addPrice = async (req, res) => {
        try {
            const result = await priceService.addPrice(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    priceCtrl.updatePrice = async (req, res) => {
        try {
            const result = await priceService.updatePrice(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    priceCtrl.deletePrice = async (req, res) => {
        try {
            const planDetails = req.body;

            const result = await priceService.deletePrice(planDetails._id);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    priceCtrl.getLocationPlanPrice = async (req, res) => {
        try {
            const result = await priceService.getLocationPlanPrice(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    priceCtrl.getLocationPlanPrices = async (req, res) => {
        try {
            const result = await priceService.getLocationPlanPrices(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    priceCtrl.getLocationPrice = async (req, res) => {
        try {
            const result = await priceService.getLocationPrice(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    priceCtrl.getLocationPlans = async (req, res) => {
        try {
            const result = await planService.getLocationPlans(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return priceCtrl;
}
