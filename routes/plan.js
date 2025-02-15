module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../controller/plan')(mongoose, utils, constants);
    
    router.get('/getPlanDetails', controller.getPlanDetails);
    router.get('/getPlanDetailsNew', controller.getPlanDetailsNew);

    return router;
}