"use strict";

module.exports = function (mongoose, utils, constants) {

    const planCtrl = {};
    const planService = require('../../service/admin/plan')(mongoose, utils);

    planCtrl.addPlan = async (req, res) => {
        try {
            const result = await planService.addPlan(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    planCtrl.updatePlan = async (req, res) => {
        try {
            const result = await planService.updatePlan(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    planCtrl.deletePlan = async (req, res) => {
        try {
            const planDetails = req.body;

            const result = await planService.deletePlan(planDetails._id);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return planCtrl;
}
