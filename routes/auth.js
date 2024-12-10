module.exports = (mongoose, utils, pusher, constants) => {
  const express = require('express');
  const router = express.Router();
  const validator = require('../validator/auth')(utils);
  const controller = require('../controller/auth')(mongoose, utils, pusher, constants);
  const authenticate = require('../middleware/index')(mongoose, utils)

  router.post('/signin', validator.signin, controller.signin);
  router.post('/signin/verify', validator.verify, controller.verify);

  router.get('/generate-qr', controller.generateQR);
  router.post('/signin-qr', authenticate.validateToken, validator.signinQR, controller.signinQR);
  router.post('/authorize-qr', authenticate.validateToken, validator.authenticateQR, controller.authorizeQR);


  router.get('/validate-token', authenticate.checkToken);

  return router;
}