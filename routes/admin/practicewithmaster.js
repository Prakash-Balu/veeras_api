module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const authenticate = require("../../middleware/index")(mongoose, utils);
    const controller = require('../../controller/admin/practicewithmaster')(mongoose, utils, constants);



    router.post("/addPractice", controller.addPractice);
    router.put("/updatePractice", controller.updatePractice);
    router.delete("/deletePractice", controller.deletePractice);
    router.get("/getPractice/:id", controller.getByIdPractice);
    router.get("/listPractices", controller.listPractices);

    return router;
}