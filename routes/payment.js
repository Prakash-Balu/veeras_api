
module.exports = (mongoose, utils, constants) => {
  const express = require('express');
  const router = express.Router();
  const controller = require('../controller/payment')(mongoose, utils, constants);
  const validator = require('../validator/payment')(mongoose, utils, constants);
  const authenticate = require('../middleware/index')(mongoose, utils)

  router.post('/create', authenticate.validateToken, validator.createPayment, controller.cretePaymentLink);
  router.get('/callback', controller.razorpayCallback);

  return router;
}
