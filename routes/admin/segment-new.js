module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../../controller/admin/segment_new')(mongoose, utils, constants);
    
    router.post("/addSegment", controller.addSegment);
    router.put("/updateSegment", controller.updateSegment);
    router.put("/deleteSegment", controller.deleteSegment);
    router.get("/listSegments", controller.listSegment);

    return router;
}