module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const authenticate = require("../../middleware/index")(mongoose, utils);
    const controller = require('../../controller/admin/practicewithmaster')(mongoose, utils, constants);
    

 
    router.post("/addPractice",authenticate.validateToken,controller.addPractice);
    router.put("/updatePractice",authenticate.validateToken, controller.updatePractice);
    router.delete("/deletePractice",authenticate.validateToken, controller.deletePractice);
    router.get("/getPractice/:id", authenticate.validateToken,controller.getByIdPractice);
    router.get("/listPractices",authenticate.validateToken, controller.listPractices);

    return router;
}