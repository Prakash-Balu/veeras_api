
module.exports = (mongoose, utils, constants) => {
  const express = require('express');
  const router = express.Router();
  const controller = require('../controller/user')(mongoose, utils, constants);
  const authenticate = require('../middleware/index')(mongoose, utils)

  router.get('/@me', authenticate.validateToken, controller.myProfile);
  router.get('/record-sesion', authenticate.validateToken, controller.recordSession);
  router.get('/web-logout', authenticate.validateToken, controller.webLogout);
  router.get('/session', authenticate.validateToken, controller.getSession);
  router.post('/userDetails', authenticate.validateToken, controller.getUserDetails);

  return router;
}
