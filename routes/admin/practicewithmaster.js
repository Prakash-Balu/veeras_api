module.exports = (mongoose, utils, constants) => {
    const express = require('express');
    const router = express.Router();
    const multer = require('multer'); 
    const path = require('path')
    const fs = require('fs')
    const authenticate = require("../../middleware/index")(mongoose, utils);
    const controller = require('../../controller/admin/practicewithmaster')(mongoose, utils, constants);
    
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = path.join(__dirname, "..", "..", "public", "videos"); 
      console.log("dirname",__dirname);
      console.log("dir",dir);
      
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = 'hindi_edu_' + Date.now();
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });

    router.post("/uploadVideo",upload.single('video'), controller.uploadVideo);
    router.post("/addPractice",authenticate.validateToken,controller.addPractice);
    router.put("/updatePractice",authenticate.validateToken, controller.updatePractice);
    router.delete("/deletePractice",authenticate.validateToken, controller.deletePractice);
    router.get("/getPractice/:id", authenticate.validateToken,controller.getByIdPractice);
    router.get("/listPractices",authenticate.validateToken, controller.listPractices);

    return router;
}