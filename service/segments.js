"use strict";

module.exports = function(mongoose, utils) {
    const segmentsService = {};    
    const Segments = mongoose.model("segments");

    segmentsService.getSegments = async(req, res) => {
        try {
            
            return await Segments.find();
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return segmentsService;
}