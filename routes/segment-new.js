module.exports = (mongoose, utils, constants) => {
    const express = require("express");
    const router = express.Router();
    const controller = require("../controller/segment-new")(
      mongoose,
      utils,
      constants
    );
    const validator = require("../validator/auth")(utils);
    const authenticate = require("../middleware/index")(mongoose, utils);
 
    router.get(
      "/listSegments",
      controller.listSegment
    );
    
    return router;
  };
  