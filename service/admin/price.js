"use strict";

const planprices = require("../../models/planprices");

module.exports = function(mongoose, utils) {
    const priceService = {};    
    const Plan = mongoose.model("plan_details");
    const PlanPrice = mongoose.model("planprices"); // New plans
    const Locations = mongoose.model("locations"); // New Locations
    const LocationPlans = mongoose.model("locationPlans"); // New Location Plans
    const { IPinfoWrapper } = require("node-ipinfo");
    const ObjectId = mongoose.Types.ObjectId;

    priceService.addPrice = async(req, res) => {
        try {
            const priceData = req.body;

            return await PlanPrice(priceData).save();
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    priceService.updatePrice = async(req, res) => {
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

    priceService.deletePrice = async (_id) => {
        try {
            return await Plan.findByIdAndDelete({_id: _id});
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    priceService.getLocationPlanPrices = async(req, res) => {
        try {
            
            var threadObject = await LocationPlans.aggregate([
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
                    $unwind: "$plans" // Convert array to object
                },
                {
                    $lookup: {
                    from: "planprices", // Join with the Location collection
                    localField: "locationId",
                    foreignField: "_id",
                    as: "planprice"
                    }
                },
                {
                    $project: {
                    _id: 1,
                    location: 1,
                    plans: 1, // Include all plan details
                    planprice: 1,
                    createdAt: 1,
                    updatedAt: 1
                    }
                }
            ]);

            // console.log('====>', threadObject);
            // threadObject= [];
            return threadObject;


        
              
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    priceService.getLocationPrice = async(req, res) => {
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

            console.log('====>', threadObject);
           
            return threadObject;
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return priceService;
}