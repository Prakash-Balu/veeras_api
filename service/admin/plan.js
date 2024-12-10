"use strict";

module.exports = function(mongoose, utils) {
    const planService = {};    
    const Plan = mongoose.model("plan_details");

    planService.addPlan = async(req, res) => {
        try {
            const planData = req.body;

            return await Plan(planData).save();
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    planService.updatePlan = async(req, res) => {
        try {
            const planDetails = req.body;

            const planUpdate = {
                code: planDetails.code,
                name: planDetails.name,
                description: planDetails.description,
                duration: planDetails.duration,
                offer_duration: planDetails.offer_duration,
                monthsno: planDetails.monthsno,
                feeFieldName: planDetails.feeFieldName,
            }

            return await Plan.findByIdAndUpdate(
                { _id: planDetails._id },
                { ...planUpdate },
                { new: true },
            );
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    planService.deletePlan = async (_id) => {
        try {
            return await Plan.findByIdAndDelete({_id: _id});
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return planService;
}