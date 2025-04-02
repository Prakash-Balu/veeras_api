module.exports = (mongoose, utils, constants) => {
  const express = require("express");
  const router = express.Router();
  const multer = require("multer");
  const path = require("path");
  const fs = require("fs");
  const authenticate = require("../../middleware/index")(mongoose, utils);
  const controller = require("../../controller/admin/fileUpload-new")(
    mongoose,
    utils,
    constants
  );

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const { section } = req.body;
      const dir = path.join(__dirname, "..", "..", "public", "videos", section);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = "hindi_edu_" + Date.now();
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage: storage });

  router.post("/", upload.single("video"), controller.uploadVideo);

  return router;
};
