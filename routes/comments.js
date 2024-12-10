module.exports = (mongoose, utils, constants, io) => {
    const express = require('express');
    const router = express.Router();
    const controller = require('../controller/comments')(mongoose, utils, constants, io);
    const authenticate = require('../middleware/index')(mongoose, utils);

    router.post("/addComment", authenticate.validateToken, controller.addComment);
    router.post("/addReplies", authenticate.validateToken, controller.addReplies);
    router.get('/viewComment', authenticate.validateToken, controller.viewComment);

    return router;
}