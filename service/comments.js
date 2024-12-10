"use strict";

module.exports = function (mongoose, utils) {
    const commentsService = {};
    const Comments = mongoose.model("comments");
    const Replies = mongoose.model("replies");
    const ObjectId = mongoose.Types.ObjectId;

    commentsService.addComment = async (req, res) => {
        try {
          const commentsObject = await Comments.create({
            userId: req.userInfo._id,
            segmentId: req.body.segmentId,
            seqNo: req.body.seqNo,
            text: req.body.text,
            audioPath: req.body.audioPath,
          });
    
          //   console.log(commentsObject);
          return commentsObject;
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    commentsService.addReplies = async (req, res) => {
        try {

            // console.log(req.body);
            var replyObject = await Replies.create({
                userId: req.userInfo._id,
                commentId: req.body.commentId,
                seqNo: req.body.seqNo,
                text: req.body.text,
                audioPath: req.body.audioPath,
            });
            return replyObject;
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    commentsService.viewComment = async (req, res) => {
        try {
            const segmentId = req.query.segmentId;
            // const commentData = await Comments.find({});
            var threadObject = await Comments.aggregate([
                { $match: { segmentId: new ObjectId(segmentId) } },
                {
                    $lookup: {
                        from: "user_profiles",
                        localField: "userId",
                        foreignField: "user_id",
                        as: "userdata"
                    }
                },
                { $unwind: "$userdata" },
                {
                    $project:
                    {
                        _id: 1,
                        userId: 1,
                        segmentId: 1,
                        seqNo: 1,
                        text: 1,
                        audioPath: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        userName: "$userdata.userName",
                        role: "$userdata.role",
                    }
                }
            ]);

            console.log('====>', threadObject);
            const finalObject = [];
            for (const val of threadObject) {
                let id = val._id.toString();
                const query = [
                    {
                        $match: {
                            commentId: val._id
                        }
                    },
                    {
                        $lookup: {
                            from: "user_profiles",
                            localField: "userId",
                            foreignField: "user_id",
                            as: "user"
                        }
                    },
                    { $unwind: "$user" },

                    {
                        $project:
                        {
                            _id: 1,
                            userId: 1,
                            commentId: 1,
                            seqNo: 1,
                            text: 1,
                            audioPath: 1,
                            createdAt: 1,
                            updatedAt: 1,
                            userName: "$user.userName",
                            role: "$user.role",
                        }
                    }
                ];

                var replyObject = await Replies.aggregate(query);
                val.reply = replyObject;
                finalObject.push(val);
            }
            return finalObject;
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return commentsService;
}