"use strict";

module.exports = function (mongoose, utils, constants) {

    const planCtrl = {};
    const Plan = mongoose.model("plan_details");
    const Location = mongoose.model("location_details");
    const LocationPrice = mongoose.model("location_prices");
    const { IPinfoWrapper } = require("node-ipinfo");

    planCtrl.getPlanDetails = async (req, res) => {
        try {
            const TOKEN = process.env.IPINFO_TOKEN;
            const ipinfo = new IPinfoWrapper(TOKEN);
            let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            ipAddress = ipAddress.split(',')[0].trim();
            console.log('ipAddress::', ipAddress)
            ipAddress = "115.240.90.163";
            const info = await ipinfo.lookupIp(ipAddress);
            const locationInfo = await Location.findOne({ country_code: info.countryCode }).lean();
            console.log("locaInfo",locationInfo);
            
            if (!locationInfo) {
                return utils.sendErrorNew(req, res, 'BAD_REQUEST', 'Location Not found');
            }
            const [locationPrice, plans] = await Promise.all([
                LocationPrice.findOne({ location_id: locationInfo._id }).lean(),
                Plan.find().lean()
            ]);
            plans.forEach(element => {
                element.locationPrice = locationPrice;
                element.locationInfo = locationInfo;
            });
            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', plans);
        } catch (err) {
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    planCtrl.getPlans = async(req,res)=>{
 try {
            const TOKEN = process.env.IPINFO_TOKEN;
            const ipinfo = new IPinfoWrapper(TOKEN);
            let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            ipAddress = ipAddress.split(',')[0].trim();
            console.log('ipAddress::', ipAddress)
            // ipAddress = "115.240.90.163";
            const info = await ipinfo.lookupIp(ipAddress);
            const locationInfo = await Location.findOne({ country_code: info.countryCode }).lean();
            if (!locationInfo) {
                return utils.sendErrorNew(req, res, 'BAD_REQUEST', 'Location Not found');
            }
            const [locationPrice, plans] = await Promise.all([
                LocationPrice.findOne({ location_id: locationInfo._id }).lean(),
                Plan.find().lean()
            ]);
            plans.forEach(element => {
                element.locationPrice = locationPrice;
                element.locationInfo = locationInfo;
            });
            return utils.sendResponseNew(req, res, 'OK', 'SUCCESS', plans);
        } catch (err) {
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return planCtrl;
}
