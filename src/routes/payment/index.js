const {Router} = require('express');
const paymentRouter = Router();
const {handlePlaceOrder, handleSuccessfulPayment, handleFailurePayment, handlePendingPayment} = require('../../handlers');

paymentRouter.get('/placeOrder', handlePlaceOrder);
paymentRouter.get('/success', handleSuccessfulPayment);
paymentRouter.get('/failure', handleFailurePayment);
paymentRouter.get('/pending', handlePendingPayment);

module.exports = paymentRouter;