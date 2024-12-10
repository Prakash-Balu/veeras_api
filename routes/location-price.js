module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../controller/location-price')(mongoose, utils, constants);
    
    router.post("/getCountryPriceDetails", controller.getCountryPriceDetails);

    return router;
}