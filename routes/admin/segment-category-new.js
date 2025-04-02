module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../../controller/admin/segmentCategory-new')(mongoose, utils, constants);
    const authenticate = require("../../middleware/index")(mongoose, utils);
    
    router.get("/listSegmentCategory",controller.listSegmentCategory);

    return router;
}