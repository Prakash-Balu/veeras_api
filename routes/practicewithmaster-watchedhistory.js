module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
  
    const controller = require('../controller/practicewithmaster-watchedhistory')(mongoose, utils, constants);
    const authenticate = require("../middleware/index")(mongoose, utils); 
   
    router.post("/addWatchedHistory",authenticate.validateToken, controller.addWatchedHistory);


    return router;
}