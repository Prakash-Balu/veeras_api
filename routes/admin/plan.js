module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../../controller/admin/plan')(mongoose, utils, constants);
    
    router.post("/addPlan", controller.addPlan);
    router.post("/updatePlan", controller.updatePlan);
    router.post("/deletePlan", controller.deletePlan);

    //New Plan Urls
    router.post("/addPlanNew", controller.addPlanNew);
    router.post("/updatePlanNew", controller.updatePlanNew);
    router.post("/deletePlanNew", controller.deletePlanNew);
    router.get('/getPlanDetailsNew', controller.getPlanDetailsNew);
    router.get('/getLocationPlans', controller.getLocationPlans);

    return router;
}