"use strict";

module.exports = function (mongoose, utils, constants) {

    const segmentsCtrl = {};
    const segmentsService = require('../service/segments')(mongoose, utils);

    segmentsCtrl.getSegments = async (req, res) => {
        try {
            const result = await segmentsService.getSegments(req, res);
            
            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return segmentsCtrl;
}