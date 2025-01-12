"use strict";

module.exports = function (mongoose, utils, constants) {

    const commentsCtrl = {};
    const commentsService = require('../service/comments')(mongoose, utils);

    const Notification = mongoose.model("Notification")
    const moment = require("moment")

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

    commentsCtrl.viewNotification = async (req, res) => {
        try {
            const { _id: userId } = req.userInfo;
            const pendingMatch = {
                $match: {
                    userId,
                    status: 'Processing'
                }
            };
            const solvedMatchQry = {
                $match: {
                    userId,
                    status: 'Solved'
                }
            };
            const commonAggregate = [
                {
                    $lookup: {
                        from: 'comments',
                        localField: 'commentId',
                        foreignField: '_id',
                        as: 'comments'
                    }
                },
                {
                    $unwind: {
                        path: '$comments',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'segments',
                        localField: 'comments.segmentId',
                        foreignField: '_id',
                        as: 'segments'
                    }
                },
                {
                    $unwind: {
                        path: '$segments',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'replies',
                        localField: 'commentId',
                        foreignField: 'commentId',
                        as: 'replies'
                    }
                },
                {
                    $unwind: {
                        path: '$replies',
                        preserveNullAndEmptyArrays: true
                    }
                },
            ];
            const aggregate = [pendingMatch, ...commonAggregate,
                {
                    $sort: {
                        createdAt: -1
                    }
                }];
            const aggregate_1 = [solvedMatchQry, ...commonAggregate,
                {
                    $sort: {
                        "replies.createdAt": -1
                    }
                }];
            let [askedQuestions, answeredQuestions] = await Promise.all([
                Notification.aggregate(aggregate),
                Notification.aggregate(aggregate_1)
            ])
            askedQuestions = askedQuestions.map(e => { return { ...e, ago: moment(e.createdAt).fromNow() } });
            answeredQuestions = answeredQuestions.map(e => { return { ...e, ago: moment(e.createdAt).fromNow(), replyAgo: moment(e.replies.createdAt).fromNow() } });
            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', { askedQuestions, answeredQuestions });
        } catch (err) {
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return commentsCtrl;
}