module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../../controller/admin/price')(mongoose, utils, constants);
    
    router.post("/addPrice", controller.addPrice);
    router.post("/updatePrice", controller.updatePrice);
    router.post("/deletePrice", controller.deletePrice);
    router.get("/getLocationPlanPrices", controller.getLocationPlanPrices);
    router.get("/getLocationPrice", controller.getLocationPrice);

    return router;
}