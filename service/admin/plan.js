"use strict";

module.exports = function(mongoose, utils) {
    const planService = {};    
    const Plan = mongoose.model("plan_details");
    const Plans = mongoose.model("plans"); // New plans

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

    planService.addPlanNew = async(req, res) => {
        try {
            const planData = req.body;

            return await Plans(planData).save();
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    planService.updatePlanNew = async(req, res) => {
        try {
            const planDetails = req.body;

            const planUpdate = {
                code: planDetails.code,
                name: planDetails.name,
                desc: planDetails.desc,
                duration: planDetails.duration,
                offer_duration: planDetails.offer_duration,
                monthsno: planDetails.monthsno,
                feeFieldName: planDetails.feeFieldName,
            }

            return await Plans.findByIdAndUpdate(
                { _id: planDetails._id },
                { ...planUpdate },
                { new: true },
            );
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    planService.deletePlanNew = async (_id) => {
        try {
            return await Plans.findByIdAndDelete({_id: _id});
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    planService.getPlanDetailsNew = async(req, res) => {
        try {
            
            return await Plans.find();
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return planService;
}