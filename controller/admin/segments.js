"use strict";

module.exports = function (mongoose, utils, constants) {

    const segmentsCtrl = {};
    const segmentsService = require('../../service/admin/segments')(mongoose, utils);

    segmentsCtrl.addSegment = async (req, res) => {
        try {
            const result = await segmentsService.addSegment(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    segmentsCtrl.updateSegment = async (req, res) => {
        try {
            const result = await segmentsService.updateSegment(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    segmentsCtrl.deleteSegment = async (req, res) => {
        try {
            const segmentData = req.body;

            const result = await segmentsService.deleteSegment(segmentData._id);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return segmentsCtrl;
}