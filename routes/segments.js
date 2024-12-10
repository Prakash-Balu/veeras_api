module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../controller/segments')(mongoose, utils, constants);
    const authenticate = require('../middleware/index')(mongoose, utils);

    router.get("/getSegments", authenticate.validateToken, controller.getSegments);

    return router;
}