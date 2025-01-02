"use strict";

module.exports = function (mongoose, utils, constants) {

    const commentsCtrl = {};
    const commentsService = require('../service/comments')(mongoose, utils);

    commentsCtrl.addComment = async (req, res) => {
        try {
            const result = await commentsService.addComment(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    commentsCtrl.addReplies = async (req, res) => {
        try {
            const result = await commentsService.addReplies(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    commentsCtrl.viewComment = async (req, res) => {
        try {
            const result = await commentsService.viewComment(req, res);

            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', result);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return commentsCtrl;
}