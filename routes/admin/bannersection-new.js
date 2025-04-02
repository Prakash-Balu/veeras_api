module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const authenticate = require("../../middleware/index")(mongoose, utils);
    const controller = require('../../controller/admin/bannerSection-new')(mongoose, utils, constants);
    


    router.post("/addBannerSection",authenticate.validateToken,controller.addBanner);
    router.put("/updateBannerSection",authenticate.validateToken, controller.updateBanner);
    router.get("/listBannerSection",authenticate.validateToken, controller.listBanner);

    return router;
}