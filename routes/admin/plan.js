module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../../controller/admin/plan')(mongoose, utils, constants);
    
    router.post("/addPlan", controller.addPlan);
    router.post("/updatePlan", controller.updatePlan);
    router.post("/deletePlan", controller.deletePlan);

    return router;
}