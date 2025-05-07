
module.exports = (mongoose, utils, constants) => {
  const express = require('express');
  const router = express.Router();
  const multer = require('multer');
  const path = require('path')
  const fs = require('fs')
  const controller = require('../controller/chat')(mongoose, utils, constants);
  const authenticate = require('../middleware/index')(mongoose, utils, constants)
const validator = require("../validator/auth")(utils);

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const userIdAsString = req.userInfo._id;
      const dir = __dirname + "/../public/audios/" + userIdAsString;
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const userIdAsString = req.userInfo._id;
      const uniqueSuffix = 'hindi_edu_' + Date.now();
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });

  router.get('/common-chat/list', authenticate.validateToken,validator.listChat, controller.listChat);
  router.post('/common-chat', authenticate.validateToken,validator.addComment, controller.createChat);
  router.post('/common-chat/reply', authenticate.validateToken,validator.addReply, controller.replyChat);
  router.post('/upload/audio', authenticate.validateToken, upload.single('audio'), controller.uploadAudio);

  return router;
}
