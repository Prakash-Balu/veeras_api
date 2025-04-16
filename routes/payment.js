
module.exports = (mongoose, utils, constants) => {
  const express = require('express');
  const router = express.Router();
  const controller = require('../controller/payment')(mongoose, utils, constants);
  const validator = require('../validator/payment')(mongoose, utils, constants);
  const authenticate = require('../middleware/index')(mongoose, utils)

  router.post('/create',  controller.cretePaymentLink);
  router.get('/location', controller.getLocation);
  router.get('/callback', controller.razorpayCallback);

  router.post('/createnew',  controller.createPaymentLinkNew);
  router.get('/callbacknew', controller.razorpayCallbackNew);

  return router;
}
