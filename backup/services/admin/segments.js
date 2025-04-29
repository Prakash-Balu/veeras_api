"use strict";

module.exports = function (mongoose, utils) {
    const segmentsService = {};
    const Segments = mongoose.model("segments");

    segmentsService.addSegment = async (req, res) => {
        try {
            const segementData = req.body;

            return await Segments(segementData).save();
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    segmentsService.updateSegment = async (req, res) => {
        try {
            const segementData = req.body;

            const segmentUpdate = {
                name: segementData.name,
                description: segementData.description,
                video_url: segementData.video_url,
                iconName: segementData.iconName,
                routeUrl: segementData.routeUrl
            }

            return await Segments.findByIdAndUpdate(
                { _id: segementData._id },
                { ...segmentUpdate },
                { new: true },
            );
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    segmentsService.deleteSegment = async (_id) => {
        try {
            return await Segments.findByIdAndDelete({ _id: _id });
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return segmentsService;
}