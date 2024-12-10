module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../../controller/admin/segments')(mongoose, utils, constants);
    
    router.post("/addSegment", controller.addSegment);
    router.post("/updateSegment", controller.updateSegment);
    router.post("/deleteSegment", controller.deleteSegment);

    return router;
}