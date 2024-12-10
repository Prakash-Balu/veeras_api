"use strict";

module.exports = function (mongoose, utils) {
    const planService = {};
    const Plan = mongoose.model("plan_details");
    const Location = mongoose.model("location_details");
    const LocationPrice = mongoose.model("location_prices");
    const { IPinfoWrapper } = require("node-ipinfo");

    planService.getPlanDetails = async (req, res) => {
        try {
            const TOKEN = process.env.IPINFO_TOKEN;
            const ipinfo = new IPinfoWrapper(TOKEN);
            let ipAddress = req.headers['x-forwarded-for'] || '106.51.24.242'
            const info = await ipinfo.lookupIp(ipAddress);
            console.log(info);
            const locationInfo = await Location.findOne({ country_code: info.countryCode }).lean();
            const [locationPrice, plans] = await Promise.all([
                LocationPrice.findOne({ location_id: locationInfo._id }).lean(),
                Plan.find().lean()
            ]);
            plans.forEach(element => {
                element.locationPrice = locationPrice;
            });
            return plans;
        } catch (err) {
            console.log(err);
            return utils.sendErrorNew(req, res, 'BAD_REQUEST', err.message);
        }
    };

    return planService;
}