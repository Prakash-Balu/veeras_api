"use strict";

module.exports = function(mongoose, utils) {
    const planService = {};    
    const Plan = mongoose.model("plan_details");
    const Plans = mongoose.model("plans"); // New plans
    const Locations = mongoose.model("locations"); // New Locations
    const LocationPlans = mongoose.model("locationPlans"); // New Location Plans
    const { IPinfoWrapper } = require("node-ipinfo");
    const ObjectId = mongoose.Types.ObjectId;

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
                note: planDetails.note,
                feeFieldName: planDetails.feeFieldName,
                duration: planDetails.duration,
                period: planDetails.period,
                hasValidity: planDetails.hasValidity,
                validityDuration: planDetails.validityDuration,
                validityPeriod: planDetails.validityPeriod,
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

    planService.getLocationPlans = async(req, res) => {
        try {
            
            const TOKEN = process.env.IPINFO_TOKEN;
            const ipinfo = new IPinfoWrapper(TOKEN);
            let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            ipAddress = ipAddress.split(',')[0].trim();
            
            ipAddress = "115.240.90.163";
            console.log('ipAddress::', ipAddress)
            const info = await ipinfo.lookupIp(ipAddress);
            const locationInfo = await Locations.findOne({ countryCode: info.countryCode }).lean();

          
            var threadObject = await LocationPlans.aggregate([
                // { $match: { locationId: new ObjectId(locationInfo._id) } },
                {
                    $lookup: {
                    from: "locations", // Join with the Location collection
                    localField: "locationId",
                    foreignField: "_id",
                    as: "location"
                    }
                },
                {
                    $unwind: "$location" // Convert array to object
                },
                {
                    $lookup: {
                    from: "plans", // Join with the Plans collection
                    localField: "availablePlans",
                    foreignField: "_id",
                    as: "plans"
                    }
                },
                {
                    $project: {
                    _id: 1,
                    location: {
                        _id: "$location._id",
                        countryName: "$location.countryName",
                        countryCode: "$location.countryCode",
                        phoneCode: "$location.phoneCode",
                        currencyCode: "$location.currencyCode",
                        countryFlag: "$location.countryFlag",
                        currencySymbol: "$location.currencySymbol",
                        currencyName: "$location.currencyName"
                    },
                    plans: 1, // Include all plan details
                    createdAt: 1,
                    updatedAt: 1
                    }
                }
            ]);

            // console.log('====>', threadObject);
           
            return threadObject;
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    planService.getAllPlans = async (req, res) => {
        try {
            return await Locations.aggregate([
                {
                    $lookup:{
                        from: "locationplans",
                        localField: "_id",
                        foreignField: "locationId",
                        as: "locationDetails"
                    }  
                },
                {
                    $unwind:"$locationDetails",
                },
                {
                    $unwind:"$locationDetails.availablePlans"
                },
                {
                    $lookup:{
                        from: "plans",
                        localField: "locationDetails.availablePlans",
                        foreignField: "_id",
                        as: "planDetails"
                    }
                },
                {
                    $unwind:"$planDetails"
                },
                {
                    $lookup:{
                        from: "planprices",
                        localField: "locationDetails._id",
                        foreignField: "locationPlanId",
                        as: "priceDetails"
                    }
                },
                {
                    $group:{
                        "_id": "$_id",
                        "countryName": { "$first": "$countryName" },
                        "countryCode": { "$first": "$countryCode" },
                        "phoneCode": { "$first": "$phoneCode" },
                        "countryFlag": { "$first": "$countryFlag" },
                        "currencySymbol": { "$first": "$currencySymbol" },
                        "currencyName": { "$first": "$currencyName" },
                        "plans": { "$addToSet": "$planDetails" },
                        "price":{"$first":"$priceDetails"},
                    }
                },
                {
                    "$project": {
                      "_id": 1,
                      "countryName": 1,
                      "countryCode": 1,
                      "phoneCode": 1,
                      "countryFlag": 1,
                      "currencySymbol": 1,
                      "currencyName": 1,
                      "plans": 1,
                      "price": 1
                    }
                },
                {
                    $sort: { "countryName": 1 } // Add this stage to sort by countryName
                }
            ]);
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return planService;
}