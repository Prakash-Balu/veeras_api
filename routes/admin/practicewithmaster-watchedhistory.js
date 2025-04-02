module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
  
    const controller = require('../../controller/admin/practicewithmaster-watchedhistory')(mongoose, utils, constants);
    
   
    router.post("/addWatchedHistory", controller.addWatchedHistory);
    router.put("/updateWatchedHistory", controller.updateWatchedHistory);
    router.delete("/deleteWatchedHistory", controller.deleteWatchedHistory);
    router.get("/getWatchedHistory/:id", controller.getByIdWatchedHistory);
    router.get("/listWatchedHistory", controller.listWatchedHistory);

    return router;
}