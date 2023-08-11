const { Router } = require('express');
const paymentRouter = Router();
const {
  handlePlaceOrder,
  handleSuccessfulPayment,
  handleFailurePayment,
  handlePendingPayment,
} = require('../../handlers');
const verifySession = require('../../middlewares/verifySession');

paymentRouter.post('/placeOrder', verifySession, handlePlaceOrder);
paymentRouter.get('/success', handleSuccessfulPayment);
paymentRouter.get('/failure', handleFailurePayment);
paymentRouter.get('/pending', handlePendingPayment);

module.exports = paymentRouter;
