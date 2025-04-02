module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../../controller/admin/segmentCategory-new')(mongoose, utils, constants);
    
    router.get("/listSegmentCategory", controller.listSegmentCategory);

    return router;
}