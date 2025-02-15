module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../../controller/admin/location-price')(mongoose, utils, constants);
    
    router.post("/addLocationPrice", controller.addLocationPrice);
    router.post("/updateLocationPrice", controller.updateLocationPrice);
    router.post("/deleteLocationPrice", controller.deleteLocationPrice);
    router.get("/getLocationPriceList", controller.getLocationPriceList);

    //New Location Urls
    router.post("/addLocationNew", controller.addLocationNew);
    router.get("/getLocationNew", controller.getLocationNew);
    router.post("/addLocationPlans", controller.addLocationPlans);

    return router;
}